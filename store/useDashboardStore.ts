import { create } from "zustand";
import { apiRequest } from "@/lib/api"; // adjust path
import { toast } from "sonner"; // or your preferred toast

interface DashboardStats {
  totalProducts: number;
  activeChannels: number;
  totalNegotiations: number;
  conversionRate: string;
}

interface DashboardStore {
  stats: DashboardStats;
  loading: boolean;
  fetchDashboardStats: (token: string) => Promise<void>;
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  stats: {
    totalProducts: 0,
    activeChannels: 0,
    totalNegotiations: 0,
    conversionRate: "0%",
  },
  loading: false,

  fetchDashboardStats: async (token) => {
    set({ loading: true });
    try {
      const products = await apiRequest("products", "GET", undefined, token);

      // Replace placeholders as endpoints become available
      set({
        stats: {
          totalProducts: products?.length || 0,
          activeChannels: 3, // mock for now
          totalNegotiations: 68, // mock for now
          conversionRate: "34%", // mock for now
        },
        loading: false,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
      toast.error("Failed to load dashboard data");
      set({ loading: false });
    }
  },
}));
