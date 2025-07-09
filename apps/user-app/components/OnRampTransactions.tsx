import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: string;
    amount: number;
    // TODO: Can the type of `status` be more specific?
    status: string;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Bank Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <Card title="Recent Bank Transactions">
      <div className="pt-2">
        {transactions.map((t) => {
          let statusColor = "text-gray-500";
          if (t.status === "Success") statusColor = "text-green-600";
          else if (t.status === "Processing") statusColor = "text-blue-600";
          else if (t.status === "Failure") statusColor = "text-red-600";

          return (
            <div className={`flex justify-between ${statusColor}`}>
              <div>
                <div className="text-sm">Received INR</div>
                <div className="text-slate-600 text-xs">
                  {new Date(t.time).toLocaleDateString()}
                </div>
              </div>
              <div className="flex flex-col justify-center">
                + Rs {t.amount / 100}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
