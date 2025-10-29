"use client";

import React, { useState } from "react";
import { Edit, Trash2, Search } from "lucide-react";

interface Product {
  id: number;
  name: string;
  sku?: string;
  floorPrice?: number;
  ceilingPrice?: number;
  floor_price?: number;
  ceiling_price?: number;
  status?: string;
}

interface DataTableProps {
  data: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export const DataTable: React.FC<DataTableProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = data.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-3">
      {/* Search Bar */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left font-semibold">Product Name</th>
              <th className="p-3 text-left font-semibold">SKU</th>
              <th className="p-3 text-left font-semibold">Floor Price</th>
              <th className="p-3 text-left font-semibold">Ceiling Price</th>
              <th className="p-3 text-left font-semibold">Status</th>
              <th className="p-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((product) => {
              const floor = product.floorPrice ?? product.floor_price ?? 0;
              const ceiling =
                product.ceilingPrice ?? product.ceiling_price ?? 0;

              return (
                <tr key={product.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{product.name || "—"}</td>
                  <td className="p-3">{product.sku || "—"}</td>
                  <td className="p-3">₦{floor.toLocaleString()}</td>
                  <td className="p-3">₦{ceiling.toLocaleString()}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        product.status === "Active" 
                          ? "bg-green-100 text-green-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {product.status || "Active"}
                    </span>
                  </td>
                  <td className="p-3 text-center flex justify-center gap-3">
                    <button
                      onClick={() => onEdit(product)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-4 text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
