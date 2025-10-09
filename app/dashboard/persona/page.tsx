"use client";

import React, { useState } from "react";
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
import { Sparkles } from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function PersonaSetup() {
  const [selectedPersona, setSelectedPersona] = useState("friendly");
  const [selectedChannel, setSelectedChannel] = useState("global");
  const [customPersona, setCustomPersona] = useState({
    name: "",
    description: "",
    tone: "",
  });
  const [openModal, setOpenModal] = useState(false);

  const personas = [
    {
      id: "friendly",
      title: "Friendly Seller",
      description: "Warm, helpful, and approachable. Builds trust quickly.",
      preview:
        "Hey there! 😊 I’d love to help you find the best deal possible!",
    },
    {
      id: "tough",
      title: "Tough Negotiator",
      description: "Confident and firm but fair. Focuses on maintaining value.",
      preview:
        "Our product quality speaks for itself — I can’t go below this price.",
    },
    {
      id: "advisor",
      title: "Consultative Advisor",
      description:
        "Professional and insightful. Helps the buyer make smart decisions.",
      preview:
        "Based on your needs, I’d recommend this package for long-term value.",
    },
  ];

  const channels = [
    { id: "global", name: "Global Default" },
    { id: "whatsapp", name: "WhatsApp" },
    { id: "email", name: "Email" },
    { id: "webchat", name: "Website Chat" },
  ];

  const currentPersona = personas.find((p) => p.id === selectedPersona);

  const handleSaveCustomPersona = () => {
    if (!customPersona.name) return;
    personas.push({
      id: customPersona.name.toLowerCase(),
      title: customPersona.name,
      description: customPersona.description,
      preview: customPersona.tone || "Your AI will adapt this custom style.",
    });
    setOpenModal(false);
    setCustomPersona({ name: "", description: "", tone: "" });
  };

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
            <div className="grid md:grid-cols-3 gap-6">
              {personas.map((persona) => (
                <motion.div
                  key={persona.id}
                  whileHover={{ scale: 1.03 }}
                  className={`border rounded-2xl p-4 cursor-pointer transition ${
                    selectedPersona === persona.id
                      ? "border-indigo-500 bg-indigo-50"
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedPersona(persona.id)}
                >
                  <h3 className="font-semibold text-lg">{persona.title}</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {persona.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Persona Preview */}
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50">
          <CardHeader>
            <CardTitle>Persona Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {currentPersona && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100"
              >
                <p className="font-semibold text-indigo-600 mb-2">
                  {currentPersona.title}
                </p>
                <p className="text-gray-700">{currentPersona.preview}</p>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Custom Persona Modal */}
        <Dialog open={openModal} onOpenChange={setOpenModal}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Custom Persona</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div>
                <Label>Name</Label>
                <Input
                  placeholder="E.g. The Persuasive Expert"
                  value={customPersona.name}
                  onChange={(e) =>
                    setCustomPersona({ ...customPersona, name: e.target.value })
                  }
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  placeholder="Describe the persona’s style and tone"
                  value={customPersona.description}
                  onChange={(e) =>
                    setCustomPersona({
                      ...customPersona,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label>Example Tone / Message</Label>
                <Textarea
                  placeholder="E.g. 'I’m here to help you make a smart choice!'"
                  value={customPersona.tone}
                  onChange={(e) =>
                    setCustomPersona({ ...customPersona, tone: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleSaveCustomPersona}>Save Persona</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
