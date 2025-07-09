"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

type Balance = {
  id: number;
  userId: number;
  amount: number;
};

export async function p2pTransfer(to: string, amount: number) {
  try {
    const session = await getServerSession(authOptions);
    const from = session?.user?.id;
    if (!from) {
      return { message: "Error while sending" };
    }
    const toUser = await prisma.user.findFirst({
      where: { number: to },
    });
    if (!toUser) {
      return { message: "User not found" };
    }

    await prisma.$transaction(async (tx) => {
      const [fromBalanceRow] = await Promise.all([
        tx.$queryRaw<
          Balance[]
        >`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`,
        tx.$queryRaw<
          Balance[]
        >`SELECT * FROM "Balance" WHERE "userId" = ${Number(toUser.id)} FOR UPDATE`,
      ]);
      const fromBalance = fromBalanceRow[0];
      if (!fromBalance || fromBalance.amount < amount) {
        throw new Error("Insufficient funds");
      }
      await tx.balance.update({
        where: { userId: Number(from) },
        data: { amount: { decrement: amount } },
      });
      await tx.balance.update({
        where: { userId: toUser.id },
        data: { amount: { increment: amount } },
      });
      await tx.p2pTransfer.create({
        data: {
          fromUserId: Number(from),
          toUserId: toUser.id,
          amount,
          timestamp: new Date(),
        },
      });
    });

    return { message: "Transfer successful" };
  } catch (e: any) {
    return { message: e?.message || "An error occurred" };
  }
}
