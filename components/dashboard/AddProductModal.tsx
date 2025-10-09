"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const productSchema = z
  .object({
    name: z.string().min(2, "Product name required"),
    sku: z.string().min(1, "SKU required"),
    floorPrice: z.number().min(1, "Enter valid floor price"),
    ceilingPrice: z.number().min(1, "Enter valid ceiling price"),
    status: z.string().min(1, "Status required"),
  })
  .refine((data) => data.floorPrice < data.ceilingPrice, {
    message: "Floor price must be less than ceiling price",
    path: ["ceilingPrice"],
  });

type ProductForm = z.infer<typeof productSchema>;

interface Props {
  onClose: () => void;
  onAdd: (product: ProductForm) => void;
}

const AddProductModal: React.FC<Props> = ({ onClose, onAdd }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data: ProductForm) => {
    onAdd(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={onClose}
        >
          <X size={20} />
        </button>

        <h2 className="text-lg font-semibold mb-4">Add New Product</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="text-sm font-medium">Product Name</label>
            <input {...register("name")} className="w-full border rounded p-2 mt-1" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">SKU</label>
            <input {...register("sku")} className="w-full border rounded p-2 mt-1" />
            {errors.sku && <p className="text-red-500 text-sm">{errors.sku.message}</p>}
          </div>

          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="text-sm font-medium">Floor Price</label>
              <input
                type="number"
                {...register("floorPrice", { valueAsNumber: true })}
                className="w-full border rounded p-2 mt-1"
              />
              {errors.floorPrice && (
                <p className="text-red-500 text-sm">{errors.floorPrice.message}</p>
              )}
            </div>

            <div className="w-1/2">
              <label className="text-sm font-medium">Ceiling Price</label>
              <input
                type="number"
                {...register("ceilingPrice", { valueAsNumber: true })}
                className="w-full border rounded p-2 mt-1"
              />
              {errors.ceilingPrice && (
                <p className="text-red-500 text-sm">{errors.ceilingPrice.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Status</label>
            <select {...register("status")} className="w-full border rounded p-2 mt-1">
              <option value="">Select status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
          </div>

          <Button type="submit" className="w-full mt-3">
            Add Product
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
