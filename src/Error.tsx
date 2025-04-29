import { ReactNode } from "react";

export default function Error({ children }: { children: ReactNode }) {
  return <p className="text-sm text-red mt-1">{children}</p>;
}
