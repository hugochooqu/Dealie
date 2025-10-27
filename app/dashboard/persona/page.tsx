"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { Loader2, Sparkles, Trash2, Pencil } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { toast } from "sonner";
import { apiRequest } from "@/lib/api";
import { usePersonaStore } from "@/store/personaStore";
import { useAuth } from "@/context/AuthContext";
import { Separator } from "@/components/ui/separator";

export default function PersonaSetup() {
  const {
    selectedPersona,
    selectedChannel,
    setSelectedPersona,
    setSelectedChannel,
    personas,
    setPersonas,
  } = usePersonaStore();

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | number | null>(null);
  const [editPersona, setEditPersona] = useState<any>(null);

  const [customPersona, setCustomPersona] = useState({
    name: "",
    description: "",
    tone: "",
    strategy: "",
  });

  const { user } = useAuth();
  const token = (user as any)?.accessToken || "";

  // Fetch personas + active persona on mount
  const fetchPersonas = async () => {
    setLoading(true);
    try {
      const allPersonas = await apiRequest("personas", "GET", undefined, token);
      setPersonas(allPersonas || []);

      const activePersona = await apiRequest(
        "personas/active",
        "GET",
        undefined,
        token
      );
      if (activePersona) setSelectedPersona(activePersona);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load personas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // Create custom persona
  const handleSaveCustomPersona = async () => {
    if (!customPersona.name) return toast.error("Please enter a name");

    setActionLoading(true);
    try {
      const newPersona = await apiRequest(
        "personas/custom",
        "POST",
        customPersona,
        token
      );
      setPersonas([...personas, newPersona]);
      toast.success("Persona created successfully");
      setOpenModal(false);
      setCustomPersona({ name: "", description: "", tone: "", strategy: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to create persona");
    } finally {
      setActionLoading(false);
    }
  };

  // Select persona (set active)
  const handleSelectPersona = async (persona: any) => {
    try {
      await apiRequest(
        `personas/select/${persona.id}`,
        "POST",
        undefined,
        token
      );
      setSelectedPersona(persona);
      toast.success(`Persona "${persona.name}" is now active`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to select persona");
    }
  };

  // Open delete modal
  const handleDeletePersonaClick = (id: string | number) => {
    setDeleteId(id);
    setDeleteModal(true);
  };

  // Confirm delete
  const handleDeletePersona = async () => {
    if (deleteId == null) return;

    const personaToDelete = personas.find(
      (p) => p.id.toString() === deleteId.toString()
    );
    if (!personaToDelete) {
      toast.error("Persona not found");
      return;
    }

    // Prevent deleting global persona
    if (!personaToDelete.vendor_id) {
      toast.error("You cannot delete a global persona");
      setDeleteModal(false);
      return;
    }

    // Prevent deleting active persona
    if (selectedPersona && selectedPersona.id === personaToDelete.id) {
      toast.error("You cannot delete the currently active persona");
      setDeleteModal(false);
      return;
    }

    setActionLoading(true);
    try {
      await apiRequest(`personas/${deleteId}`, "DELETE", undefined, token);
      setPersonas(
        personas.filter((p) => p.id.toString() !== deleteId.toString())
      );
      toast.success("Persona deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete persona");
    } finally {
      setActionLoading(false);
      setDeleteModal(false);
    }
  };

  // Open edit modal
  const handleEditPersonaClick = (persona: any) => {
    setEditPersona(persona);
    setEditModal(true);
  };

  // Save edits
  const handleUpdatePersona = async () => {
    if (!editPersona?.id) return;
    setActionLoading(true);

    try {
      await apiRequest(
        `personas/${editPersona.id}`,
        "PUT",
        {
          name: editPersona.name,
          description: editPersona.description,
          tone: editPersona.tone,
          strategy: editPersona.strategy,
        },
        token
      );

      toast.success("Persona updated successfully");
      setEditModal(false);

      // ✅ Refetch the list from server for accurate data
      await fetchPersonas();

      // ✅ If that persona was the active one, re-select it
      const updatedActive = personas.find(
        (p) => String(p.id) === String(editPersona.id)
      );
      if (updatedActive) setSelectedPersona(updatedActive);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update persona");
    } finally {
      setActionLoading(false);
    }
  };

  const channels = [
    { id: "global", name: "Global Default" },
    { id: "whatsapp", name: "WhatsApp" },
    { id: "email", name: "Email" },
    { id: "webchat", name: "Website Chat" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Persona Setup</h2>
          <Button onClick={() => setOpenModal(true)}>
            <Sparkles className="mr-2 h-4 w-4" /> Create Custom Persona
          </Button>
        </div>

        {/* Channel Selector */}
        <Card>
          <CardHeader>
            <CardTitle>Assign Persona Per Channel</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              className="flex flex-wrap gap-4"
              value={selectedChannel}
              onValueChange={setSelectedChannel}
            >
              {channels.map((channel) => (
                <Label
                  key={channel.id}
                  htmlFor={channel.id}
                  className={`flex items-center gap-2 border rounded-xl px-4 py-2 cursor-pointer transition ${
                    selectedChannel === channel.id
                      ? "bg-indigo-50 border-indigo-500 text-indigo-700"
                      : "hover:bg-gray-50 border-gray-200"
                  }`}
                >
                  <RadioGroupItem value={channel.id} id={channel.id} />
                  {channel.name}
                </Label>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Persona Selector */}
        <Card>
          <CardHeader>
            <CardTitle>Select Persona Tone</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="animate-spin text-indigo-500" size={28} />
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-6">
                {personas.map((persona, index) => (
                  <motion.div
                    key={String(persona.id)}
                    whileHover={{ scale: 1.03 }}
                    className={`border rounded-2xl p-4 cursor-pointer transition relative ${
                      selectedPersona?.id === persona.id
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                    onClick={() => handleSelectPersona(persona)}
                  >
                    {/* Edit/Delete only for vendor-owned personas */}
                    {persona.vendor_id && (
                      <div className="absolute top-2 right-2 flex gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditPersonaClick(persona);
                          }}
                          className="text-gray-400 hover:text-indigo-600"
                          title="Edit Persona"
                        >
                          <Pencil size={17} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePersonaClick(persona.id);
                          }}
                          className="text-gray-400 hover:text-red-500"
                          title="Delete Persona"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    )}

                    <h3 className="font-semibold text-lg">{persona.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {persona.description}
                    </p>

                    {!persona.vendor_id && (
                      <span className="absolute bottom-2 right-3 text-[11px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                        Global
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Persona Preview */}
        {selectedPersona && (
          <Card className="bg-gradient-to-br from-indigo-50 to-purple-50">
            <CardHeader>
              <CardTitle>Persona Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
              >
                <p className="font-semibold text-indigo-600 mb-2">
                  {selectedPersona.name}
                </p>
                <h4 className="font-semibold text-lg capitalize">
                  Tone:&nbsp;{selectedPersona.tone}
                </h4>
                <p className="mb-5">{selectedPersona.description}</p>
                <Separator />
                <p className="text-gray-600 text-lg font-bold mt-1">
                  Strategy:&nbsp;{selectedPersona.strategy}
                </p>
              </motion.div>
            </CardContent>
          </Card>
        )}

        {/* Create Persona Modal */}
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Custom Persona</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <Input
                placeholder="Persona Name"
                value={customPersona.name}
                onChange={(e) =>
                  setCustomPersona({ ...customPersona, name: e.target.value })
                }
              />
              <Textarea
                placeholder="Description"
                value={customPersona.description}
                onChange={(e) =>
                  setCustomPersona({
                    ...customPersona,
                    description: e.target.value,
                  })
                }
              />
              <Textarea
                placeholder="Tone Example"
                value={customPersona.tone}
                onChange={(e) =>
                  setCustomPersona({ ...customPersona, tone: e.target.value })
                }
              />
              <Textarea
                placeholder="Strategy"
                value={customPersona.strategy}
                onChange={(e) =>
                  setCustomPersona({
                    ...customPersona,
                    strategy: e.target.value,
                  })
                }
              />
            </div>
            <DialogFooter>
              <Button
                disabled={actionLoading}
                onClick={handleSaveCustomPersona}
              >
                {actionLoading && (
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                )}
                Save Persona
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Persona Modal */}
        <Dialog open={editModal} onOpenChange={setEditModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Persona</DialogTitle>
            </DialogHeader>
            {editPersona && (
              <div className="space-y-4 py-2">
                <Input
                  placeholder="Persona Name"
                  value={editPersona.name}
                  onChange={(e) =>
                    setEditPersona({ ...editPersona, name: e.target.value })
                  }
                />
                <Textarea
                  placeholder="Description"
                  value={editPersona.description}
                  onChange={(e) =>
                    setEditPersona({
                      ...editPersona,
                      description: e.target.value,
                    })
                  }
                />
                <Textarea
                  placeholder="Tone Example"
                  value={editPersona.tone}
                  onChange={(e) =>
                    setEditPersona({ ...editPersona, tone: e.target.value })
                  }
                />
                <Textarea
                  placeholder="Strategy"
                  value={editPersona.strategy}
                  onChange={(e) =>
                    setEditPersona({ ...editPersona, strategy: e.target.value })
                  }
                />
              </div>
            )}
            <DialogFooter>
              <Button disabled={actionLoading} onClick={handleUpdatePersona}>
                {actionLoading && (
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                )}
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Confirmation Modal */}
        <Dialog open={deleteModal} onOpenChange={setDeleteModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
            </DialogHeader>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this persona? This action cannot
              be undone.
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteModal(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                disabled={actionLoading}
                onClick={handleDeletePersona}
              >
                {actionLoading && (
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                )}
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
