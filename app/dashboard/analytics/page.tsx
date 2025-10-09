"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Download, BarChart3, PieChart, Clock, TrendingUp } from "lucide-react";
import Papa from "papaparse";
import { toast } from "sonner";

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

// Register chart components
ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// Mock data
const analyticsData = {
  overallConversionRate: 68,
  avgDuration: "4m 23s",
  dropOffRate: 27,
  conversionByPersona: [
    { name: "Friendly Seller", value: 72 },
    { name: "Tough Negotiator", value: 58 },
    { name: "Consultative Advisor", value: 64 },
  ],
  dropOffPoints: [
    { stage: "Greeting", percentage: 10 },
    { stage: "Price Negotiation", percentage: 45 },
    { stage: "Closing", percentage: 27 },
    { stage: "Follow-up", percentage: 18 },
  ],
  topProducts: [
    { name: "Cocoa Powder", requests: 120 },
    { name: "Shea Butter", requests: 98 },
    { name: "Ginger Oil", requests: 76 },
    { name: "Turmeric Extract", requests: 54 },
  ],
};

const AnalyticsPage = () => {
  const [period, setPeriod] = useState("Week");

  const handleExportCSV = () => {
    const csv = Papa.unparse(analyticsData.topProducts);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "analytics.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Analytics exported successfully!");
  };

  const handleExportPDF = () => {
    toast.info("PDF export coming soon 🚀");
  };

  // Chart Data
  const personaData = {
    labels: analyticsData.conversionByPersona.map((p) => p.name),
    datasets: [
      {
        data: analyticsData.conversionByPersona.map((p) => p.value),
        backgroundColor: ["#6366F1", "#10B981", "#F59E0B"],
        borderWidth: 1,
      },
    ],
  };

  const dropOffData = {
    labels: analyticsData.dropOffPoints.map((d) => d.stage),
    datasets: [
      {
        label: "Drop-off (%)",
        data: analyticsData.dropOffPoints.map((d) => d.percentage),
        backgroundColor: "#6366F1",
        borderRadius: 8,
      },
    ],
  };

  const topProductsData = {
    labels: analyticsData.topProducts.map((p) => p.name),
    datasets: [
      {
        label: "Requests",
        data: analyticsData.topProducts.map((p) => p.requests),
        backgroundColor: "#10B981",
        borderRadius: 8,
      },
    ],
  };

  return (
    <DashboardLayout>
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <BarChart3 className="w-6 h-6 text-indigo-500" /> Analytics & Insights
        </h1>

        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Today">Today</SelectItem>
              <SelectItem value="Week">This Week</SelectItem>
              <SelectItem value="Month">This Month</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="w-4 h-4 mr-1" /> CSV
          </Button>
          <Button variant="outline" onClick={handleExportPDF}>
            <Download className="w-4 h-4 mr-1" /> PDF
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <TrendingUp className="w-6 h-6 text-green-500 mb-2" />
            <p className="text-gray-500 text-sm">Conversion Rate</p>
            <h3 className="text-2xl font-bold">{analyticsData.overallConversionRate}%</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <Clock className="w-6 h-6 text-blue-500 mb-2" />
            <p className="text-gray-500 text-sm">Avg. Negotiation Duration</p>
            <h3 className="text-2xl font-bold">{analyticsData.avgDuration}</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <PieChart className="w-6 h-6 text-yellow-500 mb-2" />
            <p className="text-gray-500 text-sm">Drop-off Rate</p>
            <h3 className="text-2xl font-bold">{analyticsData.dropOffRate}%</h3>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Conversion by Persona */}
        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate by Persona</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex justify-center">
              <Pie data={personaData} />
            </div>
          </CardContent>
        </Card>

        {/* Drop-off Points */}
        <Card>
          <CardHeader>
            <CardTitle>Drop-off Points in Negotiation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Bar
                data={dropOffData}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } },
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Most Requested Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <Bar
                data={topProductsData}
                options={{
                  responsive: true,
                  plugins: { legend: { display: false } },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card className="bg-indigo-50 border border-indigo-200">
        <CardHeader>
          <CardTitle className="text-indigo-700">
            AI-Powered Recommendations (Coming Soon 🤖)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700">
            Based on trends, try a <span className="font-semibold">softer tone</span> for{" "}
            <span className="font-semibold">Shea Butter</span> negotiations to improve conversions by{" "}
            <span className="text-green-600 font-semibold">12%</span>.
          </p>
        </CardContent>
      </Card>
    </div>
    </DashboardLayout>
  );
};

export default AnalyticsPage;
