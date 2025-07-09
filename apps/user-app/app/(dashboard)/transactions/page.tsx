import prisma from "@repo/db/client";
import { P2PTransactions } from "../../../components/P2PTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getP2PTransactions() {
  const session = await getServerSession(authOptions);
  const userId = Number(session?.user?.id);

  const transactions = await prisma.p2pTransfer.findMany({
    where: {
      OR: [{ fromUserId: userId }, { toUserId: userId }],
    },
  });
  return transactions.map((t) => ({
    time: t.timestamp,
    amount: t.amount,
    type: t.fromUserId === userId ? "sent" : "received",
  }));
}

export default async function () {
  const transactions = await getP2PTransactions();
  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transactions
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <P2PTransactions transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
