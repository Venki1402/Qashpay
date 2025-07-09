import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { SimpleBalanceCard } from "../../../components/SimpleBalanceCard";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

export default async function () {
  const session = await getServerSession(authOptions);
  const username = session?.user?.name;
  const balance = getBalance();

  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Hi, {username}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        {/* <div>Balance: {(await balance).amount / 100} INR</div> */}
        <SimpleBalanceCard amount={(await balance).amount} />
      </div>
    </div>
  );
}
