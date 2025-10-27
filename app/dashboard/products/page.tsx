"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, FileDown, FileUp } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import AddProductModal from "@/components/dashboard/AddProductModal";
import EditProductModal from "@/components/dashboard/EditProductModal";

import Papa from "papaparse";
import { toast } from "sonner";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { apiRequest } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const ProductsPage = () => {
  const { user } = useAuth();
  const token = (user as any)?.accessToken || "";

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await apiRequest("products", "GET", undefined, token);
      setProducts(res || []);
    } catch (err) {
      toast.error("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async (newProduct: any) => {
    try {
      await apiRequest("add_product", "POST", newProduct, token);
      toast.success("Product added successfully!");
      fetchProducts(); // refresh list
    } catch (err) {
      toast.error("Failed to add product");
      console.error(err);
    }
  };

  const handleEditProduct = async (updated: any) => {
    try {
      await apiRequest(`products/${updated.id}`, "PUT", updated, token);
      toast.success("Product updated successfully!");
      fetchProducts();
    } catch (err) {
      console.error("Update failed:", err);
      toast.error("Failed to update product");
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    try {
      await apiRequest(
        `products/${deleteId}`,
        "DELETE",
        undefined,
        token
      );
      toast.success("Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete product");
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const handleExport = () => {
    const csv = Papa.unparse(products);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "products.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Products exported successfully!");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const imported = results.data.map((row: any) => ({
          id: Date.now() + Math.random(),
          name: row.name || "Untitled",
          sku: row.sku || "",
          floorPrice: Number(row.floorPrice) || 0,
          ceilingPrice: Number(row.ceilingPrice) || 0,
          status: row.status || "Inactive",
        }));
        setProducts([...products, ...imported]);
        toast.success("Products imported successfully!");
      },
    });
  };

  return (
    <DashboardLayout>
      <div className="py-6 space-y-6">
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="text-xl font-semibold">
              Product Management
            </CardTitle>

            <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
              <Button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2"
              >
                <PlusCircle size={18} /> Add Product
              </Button>

              <label className="flex items-center gap-2 border px-3 py-2 rounded-md cursor-pointer hover:bg-gray-50">
                <FileUp size={18} /> Import
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>

              <Button
                variant="outline"
                onClick={handleExport}
                className="flex items-center gap-2"
              >
                <FileDown size={18} /> Export
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {loading ? (
              <div className="text-center py-10">Loading products...</div>
            ) : (
              <DataTable
                data={products}
                onEdit={setEditProduct}
                onDelete={handleDeleteClick}
              />
            )}
          </CardContent>
        </Card>

        {showAddModal && (
          <AddProductModal
            onClose={() => setShowAddModal(false)}
            onAdd={handleAddProduct}
          />
        )}

        {editProduct && (
          <EditProductModal
            product={editProduct}
            onClose={() => setEditProduct(null)}
            onSave={handleEditProduct}
          />
        )}

        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-sm text-center">
              <h3 className="text-lg font-semibold mb-3">Delete Product</h3>
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete this product? This action cannot
                be undone.
              </p>
              <div className="flex justify-center gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleConfirmDelete}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ProductsPage;
