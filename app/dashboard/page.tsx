"use client";

import { useAuth } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="flex justify-between items-center bg-white shadow p-4">
        <h1 className="text-xl font-semibold">Negotron Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700">{user?.email}</span>
          <Button onClick={handleLogout} variant="outline">Logout</Button>
        </div>
      </nav>

      <main className="p-8">
        <h2 className="text-2xl font-semibold mb-4">Welcome to your Dashboard 👋</h2>
        <p className="text-gray-600">You are now logged in as {user?.email}</p>
      </main>
    </div>
  );
}
