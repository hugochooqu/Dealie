"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Upload, Trash2, KeyRound } from "lucide-react";
import { toast } from "sonner";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function SettingsPage() {
  const [logo, setLogo] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [passwords, setPasswords] = useState({
    old: "",
    new: "",
    confirm: "",
  });
  const [passwordStrength, setPasswordStrength] = useState("");
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    updates: true,
  });

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords({ ...passwords, [field]: value });

    if (field === "new") {
      if (value.length < 6) setPasswordStrength("Weak");
      else if (/[A-Z]/.test(value) && /\d/.test(value))
        setPasswordStrength("Strong");
      else setPasswordStrength("Medium");
    }
  };

  const handleBusinessSave = () => {
    if (!email || !validateEmail(email)) {
      toast.error("Please enter a valid business email");
      return;
    }
    toast.success("Business info saved successfully!");
  };

  const handleSecuritySave = () => {
    if (!passwords.old || !passwords.new) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      toast.error("New passwords do not match");
      return;
    }
    toast.success("Security settings updated successfully!");
  };

  const handleNotificationSave = () => {
    toast.success("Notification preferences saved!");
  };

  const handleDeleteAccount = () => {
    toast.warning("Account deletion is disabled in demo mode");
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>

        <Tabs defaultValue="business" className="space-y-4">
          <TabsList className="bg-gray-100 dark:bg-gray-900 p-1 rounded-lg flex flex-wrap">
            <TabsTrigger value="business">Business Info</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
          </TabsList>

          {/* BUSINESS INFO */}
          <TabsContent value="business">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label>Business Name</Label>
                    <Input placeholder="Enter your business name" />
                  </div>
                  <div>
                    <Label>Contact Email</Label>
                    <Input
                      type="email"
                      placeholder="example@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={
                        !validateEmail(email) && email ? "border-red-500" : ""
                      }
                    />
                    {!validateEmail(email) && email && (
                      <p className="text-sm text-red-500 mt-1">
                        Invalid email format
                      </p>
                    )}
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input placeholder="+234..." />
                  </div>
                  <div>
                    <Label>Default Currency</Label>
                    <select className="w-full p-2 border rounded-md">
                      <option value="USD">USD</option>
                      <option value="NGN">NGN</option>
                      <option value="EUR">EUR</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label>Business Logo</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="w-20 h-20 border rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                      {logo ? (
                        <img
                          src={logo}
                          alt="Logo"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <Upload className="w-6 h-6 text-gray-400" />
                      )}
                    </div>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoChange}
                    />
                  </div>
                </div>

                <Button onClick={handleBusinessSave}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SECURITY */}
          <TabsContent value="security">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Old Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter old password"
                    value={passwords.old}
                    onChange={(e) =>
                      handlePasswordChange("old", e.target.value)
                    }
                  />
                </div>
                <div>
                  <Label>New Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter new password"
                    value={passwords.new}
                    onChange={(e) =>
                      handlePasswordChange("new", e.target.value)
                    }
                  />
                  {passwords.new && (
                    <p
                      className={`text-sm mt-1 ${
                        passwordStrength === "Weak"
                          ? "text-red-500"
                          : passwordStrength === "Medium"
                          ? "text-yellow-500"
                          : "text-green-600"
                      }`}
                    >
                      Strength: {passwordStrength}
                    </p>
                  )}
                </div>
                <div>
                  <Label>Confirm Password</Label>
                  <Input
                    type="password"
                    placeholder="Confirm new password"
                    value={passwords.confirm}
                    onChange={(e) =>
                      handlePasswordChange("confirm", e.target.value)
                    }
                    className={
                      passwords.confirm && passwords.confirm !== passwords.new
                        ? "border-red-500"
                        : ""
                    }
                  />
                  {passwords.confirm && passwords.confirm !== passwords.new && (
                    <p className="text-sm text-red-500 mt-1">
                      Passwords do not match
                    </p>
                  )}
                </div>

                <div className="border-t pt-4">
                  <Label>API Keys</Label>
                  <div className="flex items-center justify-between p-3 border rounded-md mt-2">
                    <p className="text-sm text-gray-600">
                      sk_live_*************************
                    </p>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => toast.info("New API key generated")}
                    >
                      <KeyRound className="w-4 h-4 mr-1" /> Generate New
                    </Button>
                  </div>
                </div>

                <Button onClick={handleSecuritySave}>
                  Update Security Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* NOTIFICATIONS */}
          <TabsContent value="notifications">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Email Alerts</Label>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(val) =>
                      setNotifications({ ...notifications, email: val })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>SMS Alerts</Label>
                  <Switch
                    checked={notifications.sms}
                    onCheckedChange={(val) =>
                      setNotifications({ ...notifications, sms: val })
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Product Updates</Label>
                  <Switch
                    checked={notifications.updates}
                    onCheckedChange={(val) =>
                      setNotifications({ ...notifications, updates: val })
                    }
                  />
                </div>

                <Button onClick={handleNotificationSave}>
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* BILLING */}
          <TabsContent value="billing">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Billing & Subscription</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between border p-3 rounded-lg">
                  <div>
                    <p className="font-semibold">Current Plan: Pro</p>
                    <p className="text-sm text-gray-500">
                      Next billing date: 24 Oct 2025
                    </p>
                  </div>
                  <div className="flex gap-3 mt-2 md:mt-0">
                    <Button variant="outline">Upgrade</Button>
                    <Button variant="destructive">Cancel</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* ACCOUNT */}
          <TabsContent value="account">
            <Card className="shadow-md border-red-300">
              <CardHeader>
                <CardTitle className="text-red-600">Delete Account</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Deleting your account will remove all your data permanently.
                  This action cannot be undone.
                </p>
                <Button variant="destructive" onClick={handleDeleteAccount}>
                  <Trash2 className="w-4 h-4 mr-2" /> Delete My Account
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
