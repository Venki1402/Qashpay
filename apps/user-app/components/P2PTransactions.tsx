import { Card } from "@repo/ui/card";

export const P2PTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    type: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent P2P Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent P2P Transactions">
      <div className="pt-2">
        {transactions.map((t) => {
          let statusColor =
            t.type === "sent" ? "text-red-600" : "text-green-600";
          return (
            <div className={`flex justify-between ${statusColor}`}>
              <div>
                <div className="text-sm">
                  {t.type === "sent" ? "Sent INR" : "Received INR"}
                </div>
                <div className="text-slate-600 text-xs">
                  {t.time.toDateString()}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                {t.type === "sent" ? "-" : "+"} Rs {t.amount / 100}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
