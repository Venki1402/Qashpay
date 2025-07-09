import { Card } from "@repo/ui/card";

export const SimpleBalanceCard = ({ amount }: { amount: number }) => {
  return (
    <Card title="Balance">
      <div className="flex justify-between py-2">
        <div>{amount / 100} INR</div>
      </div>
    </Card>
  );
};
