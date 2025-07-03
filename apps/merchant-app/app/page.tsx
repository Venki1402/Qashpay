"use client";

import { useBalance } from "@repo/store/balance";

export default function () {
  const balance = useBalance ? useBalance() : 0;
  return <div>hi there {balance}</div>;
}
