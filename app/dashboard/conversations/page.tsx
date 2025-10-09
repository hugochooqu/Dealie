"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, Tag } from "lucide-react";
import Papa from "papaparse";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

// Mock Data
const mockConversations = [
  {
    id: 1,
    buyer: "John Doe",
    product: "Organic Cocoa Powder",
    channel: "Website",
    date: "2025-10-05",
    status: "Open",
    tags: ["price-sensitive"],
    messages: [
      { sender: "Buyer", text: "Can you lower the price a bit?" },
      { sender: "AI", text: "I can offer 5% off for bulk orders." },
      { sender: "Buyer", text: "Deal, let’s go ahead!" },
    ],
  },
  {
    id: 2,
    buyer: "Linda Smith",
    product: "Shea Butter",
    channel: "Instagram",
    date: "2025-10-07",
    status: "Closed",
    tags: ["lost-lead"],
    messages: [
      { sender: "Buyer", text: "Maybe next time." },
      { sender: "AI", text: "No worries! We’ll be here when you’re ready." },
    ],
  },
  {
    id: 3,
    buyer: "Michael Green",
    product: "Ginger Oil",
    channel: "WhatsApp",
    date: "2025-10-09",
    status: "Open",
    tags: ["repeat-buyer"],
    messages: [
      { sender: "Buyer", text: "Can you deliver by Friday?" },
      { sender: "AI", text: "Yes, delivery within 48 hours is possible." },
    ],
  },
];

const ConversationsTablePage = () => {
  const [conversations, setConversations] = useState(mockConversations);
  const [selected, setSelected] = useState<any>(null);
  const [filters, setFilters] = useState({
    search: "",
    product: "All",
    channel: "All",
    date: "",
  });

  // 🔄 Auto-update status based on tags
  const autoUpdateStatus = (convs: typeof conversations) =>
    convs.map((c) => ({
      ...c,
      status:
        c.tags.includes("lost-lead") || c.tags.includes("closed")
          ? "Closed"
          : c.tags.includes("price-sensitive") || c.tags.includes("won")
          ? "Won"
          : c.status,
    }));

  const handleExport = () => {
    const csv = Papa.unparse(conversations);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "conversations.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Conversations exported!");
  };

  const handleAddTag = (id: number, tag: string) => {
    setConversations((prev) => {
      const updated = prev.map((c) =>
        c.id === id && !c.tags.includes(tag)
          ? { ...c, tags: [...c.tags, tag] }
          : c
      );
      return autoUpdateStatus(updated);
    });
  };

  // Apply filters
  const filtered = conversations.filter((conv) => {
    const searchMatch = conv.buyer
      .toLowerCase()
      .includes(filters.search.toLowerCase());
    const productMatch =
      filters.product === "All" || conv.product === filters.product;
    const channelMatch =
      filters.channel === "All" || conv.channel === filters.channel;
    const dateMatch =
      !filters.date || new Date(conv.date).toDateString() ===
        new Date(filters.date).toDateString();

    return searchMatch && productMatch && channelMatch && dateMatch;
  });

  const uniqueProducts = [
    "All",
    ...new Set(conversations.map((c) => c.product)),
  ];
  const uniqueChannels = [
    "All",
    ...new Set(conversations.map((c) => c.channel)),
  ];

  return (
    <DashboardLayout>
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle className="text-xl font-semibold">
            Conversations
          </CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <Input
              placeholder="Search buyer..."
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="w-48 sm:w-64"
            />

            <Select
              value={filters.product}
              onValueChange={(value) =>
                setFilters({ ...filters, product: value })
              }
            >
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Product" />
              </SelectTrigger>
              <SelectContent>
                {uniqueProducts.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.channel}
              onValueChange={(value) =>
                setFilters({ ...filters, channel: value })
              }
            >
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Channel" />
              </SelectTrigger>
              <SelectContent>
                {uniqueChannels.map((ch) => (
                  <SelectItem key={ch} value={ch}>
                    {ch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              type="date"
              value={filters.date}
              onChange={(e) =>
                setFilters({ ...filters, date: e.target.value })
              }
              className="w-40"
            />

            <Button variant="outline" onClick={handleExport}>
              <Download className="w-4 h-4 mr-1" /> Export
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Buyer</th>
                  <th className="p-3">Product</th>
                  <th className="p-3">Channel</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Tags</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((conv) => (
                  <tr
                    key={conv.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-medium">{conv.buyer}</td>
                    <td className="p-3">{conv.product}</td>
                    <td className="p-3">{conv.channel}</td>
                    <td className="p-3">{conv.date}</td>
                    <td className="p-3">
                      <Badge
                        variant={
                          conv.status === "Won"
                            ? "default"
                            : conv.status === "Open"
                            ? "secondary"
                            : "outline"
                        }
                      >
                        {conv.status}
                      </Badge>
                    </td>
                    <td className="p-3 space-x-1">
                      {conv.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </td>
                    <td className="p-3 flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelected(conv)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>

                      <Select
                        onValueChange={(tag) => handleAddTag(conv.id, tag)}
                      >
                        <SelectTrigger className="w-20">
                          <Tag className="w-4 h-4" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="price-sensitive">
                            Price-Sensitive
                          </SelectItem>
                          <SelectItem value="won">Won</SelectItem>
                          <SelectItem value="lost-lead">Lost Lead</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                          <SelectItem value="repeat-buyer">
                            Repeat Buyer
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* View Conversation Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selected?.buyer} – {selected?.product}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {selected?.messages.map((msg: any, i: number) => (
              <div
                key={i}
                className={`p-3 rounded-lg max-w-[75%] ${
                  msg.sender === "AI"
                    ? "bg-blue-100 self-end ml-auto"
                    : "bg-gray-200"
                }`}
              >
                <p className="text-sm">
                  <span className="font-semibold">{msg.sender}: </span>
                  {msg.text}
                </p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </DashboardLayout>
  );
};

export default ConversationsTablePage;
