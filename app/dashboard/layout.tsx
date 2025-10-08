import ProtectedRoute from "@/components/ProtectedRoute";

interface DashboardLayoutProps {
  children: React.ReactNode;
  className?: string;
}


export default function DashboardLayout({ children, className }: DashboardLayoutProps) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
