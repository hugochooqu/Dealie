"use client";

import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MessageSquare,
  Package,
  Zap,
  Percent,
  CalendarDays,
  Copy,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import NegotiationChart from "@/components/NegotiationChart";
import SalesProfitChart from "@/components/SalesProfitChart";
import { apiRequest } from "@/lib/api";
import { toast } from "sonner";

const mockStats = {
  totalProducts: 24,
  activeChannels: 3,
  totalNegotiations: 68,
  conversionRate: "34%",
};

const mockConversations = [
  {
    id: 1,
    customer: "Jane Doe",
    topic: "Negotiation on Product X",
    status: "Ongoing",
  },
  {
    id: 2,
    customer: "John Smith",
    topic: "Closed deal on Herbal Tea",
    status: "Closed",
  },
  {
    id: 3,
    customer: "Mary Johnson",
    topic: "Inquiry about bulk pricing",
    status: "Pending",
  },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [whatsappLink, setWhatsappLink] = useState<string | null>(null);
  const [stats] = useState(mockStats);
  const { user } = useAuth();
  const token = (user as any)?.accessToken || "";
  console.log(user);

  useEffect(() => {
    const fetchWhatsAppLink = async () => {
      try {
        const data = await apiRequest(
          "vendor/whatsapp-link",
          "GET",
          undefined,
          token
        );
        setWhatsappLink(data.whatsapp_link);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load WhatsApp link");
      } finally {
        setLoading(false);
      }
    };
    fetchWhatsAppLink();
  }, [token]);

  const handleCopy = () => {
    if (whatsappLink) {
      navigator.clipboard.writeText(whatsappLink);
      toast.success("WhatsApp link copied to clipboard!");
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="w-full lg:w-[68%] mb-6 flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Hello, {user?.displayName || "Vendor"} 👋
        </h1>

        <div className="flex items-center gap-2 text-gray-600 mt-2 md:mt-0">
          <CalendarDays className="w-5 h-5 text-indigo-600" />
          <span className="text-sm md:text-base font-medium">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        <div className="w-full md:w-[70%] bg-indigo-700 rounded-2xl text-white p-6 md:p-10 flex flex-col justify-between shadow-lg">
          <div>
            <p className="uppercase text-sm font-medium tracking-wide text-indigo-100">
              Grow with Dealie
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mt-2 leading-snug">
              Turn Conversations into{" "}
              <span className="text-yellow-300">Profits</span>
            </h2>
            <p className="text-indigo-100 mt-2 max-w-md">
              Add your products and let our AI negotiator help you close more
              deals — automatically.
            </p>
          </div>

          <Link href="/dashboard/products" className="mt-4">
            <Button
              variant="secondary"
              className="bg-black text-white hover:bg-indigo-100 font-semibold"
            >
              Add Product <span className="animate-pulse"> + </span>
            </Button>
          </Link>
        </div>

        {/* Quick Access */}
        <div className="w-full md:w-[30%] rounded-2xl bg-white text-gray-800 p-6 md:p-10 flex flex-col justify-between shadow-lg">
          <CardHeader>
            <CardTitle>Your WhatsApp Link</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-6">
                <Loader2 className="animate-spin text-indigo-500" />
              </div>
            ) : whatsappLink ? (
              <div className="flex flex-col items-center justify-between border p-3 rounded-lg bg-gray-50 w-full max-w-sm md:max-w-md">
                <h1 className="text-sm text-center mb-2">
                  Share this link with your customers to start up a conversation
                  on WhatsApp
                </h1>

                <div className="flex items-center gap-2 w-full overflow-hidden">
                  <span className="truncate text-indigo-600 font-medium flex-1">
                    {whatsappLink}
                  </span>
                  <Button
                    variant="outline"
                    onClick={handleCopy}
                    className="shrink-0"
                  >
                    <Copy size={16} className="mr-1" /> Copy
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 italic">
                No link yet. Create your first product to unlock your WhatsApp
                link.
              </p>
            )}
          </CardContent>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Button variant="default">View Products</Button>
        <Button variant="outline">Connect WhatsApp</Button>
        <Button variant="secondary">Test Negotiation</Button>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon={<Package className="text-blue-500" />}
        />
        <StatCard
          title="Active Channels"
          value={stats.activeChannels}
          icon={<Zap className="text-green-500" />}
        />
        <StatCard
          title="Total Negotiations"
          value={stats.totalNegotiations}
          icon={<MessageSquare className="text-orange-500" />}
        />
        <StatCard
          title="Conversion Rate"
          value={stats.conversionRate}
          icon={<Percent className="text-purple-500" />}
        />
      </div>

      {/* Negotiation Chart */}
      <Card className="shadow-md w-full mb-8">
        <CardHeader>
          <CardTitle>Negotiation Activity (This Week)</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <NegotiationChart />
        </CardContent>
      </Card>

      <div className="flex flex-col lg:flex-row gap-6 mb-2">
        {/* Sales & Profit Chart */}
        <Card className="shadow-md w-full mb-8 ">
          <CardHeader>
            <CardTitle>Sales & Profit Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[350px]">
            <SalesProfitChart />
          </CardContent>
        </Card>

        {/* Recent Conversations */}
        <Card className="shadow-md w-full">
          <CardHeader>
            <CardTitle>Recent Conversations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-gray-200">
              {mockConversations.map((c) => (
                <div
                  key={c.id}
                  className="flex justify-between items-center py-3"
                >
                  <div>
                    <p className="font-medium text-gray-800">{c.customer}</p>
                    <p className="text-sm text-gray-500">{c.topic}</p>
                  </div>
                  <span
                    className={`text-sm font-semibold px-3 py-1 rounded-full ${
                      c.status === "Closed"
                        ? "bg-green-100 text-green-700"
                        : c.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <Card className="flex items-center gap-4 p-5 shadow-sm">
      <div className="p-3 rounded-full bg-gray-100">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-semibold">{value}</h3>
      </div>
    </Card>
  );
}
