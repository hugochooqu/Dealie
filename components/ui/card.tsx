import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("bg-white rounded-xl shadow p-4", className)}>{children}</div>;
}

export function CardHeader({ children }: { children: ReactNode }) {
  return <div className="mb-2">{children}</div>;
}

export function CardTitle({ children }: { children: ReactNode }) {
  return <h3 className="text-lg font-semibold">{children}</h3>;
}

export function CardContent({ children, className, ...props }: CardContentProps) {
  return <div>{children}</div>;
}
