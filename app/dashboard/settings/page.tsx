"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Upload, Trash2, KeyRound, Loader2 } from "lucide-react";
import { toast } from "sonner";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { apiRequest } from "@/lib/api"; // your API helper
import { useAppStore } from "@/store/useAppStore"; // global auth
import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("business");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // VENDOR PROFILE
  const [vendor, setVendor] = useState({
    businessName: "",
    email: "",
    phone: "",
    currency: "USD",
    contactName: "",
    // logo: "",
  });

  const [passwords, setPasswords] = useState({
    old: "",
    new: "",
    confirm: "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    updates: true,
  });

  const token = (user as any)?.accessToken || "";

  // Fetch vendor profile
  useEffect(() => {
    const fetchVendorProfile = async () => {
      try {
        const res = await apiRequest("vendor/profile", "GET", undefined, token);
        setVendor({
          businessName: res.business_name || "",
          email: res.email || "",
          phone: res.phone || "",
          currency: res.currency || "USD",
          contactName: res.contact_name || ""
          // logo: res.logo || "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchVendorProfile();
  }, [token]);

  // Handle vendor update
  const handleBusinessSave = async () => {
    setSaving(true);
    try {
      const res = await apiRequest("vendor/profile", "PATCH", vendor, token);
      setVendor(res);
      toast.success("Business info updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update business info");
    } finally {
      setSaving(false);
    }
  };

  // Handle password change
  const handleSecuritySave = async () => {
    if (!passwords.old || !passwords.new || !passwords.confirm) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      toast.error("New passwords do not match");
      return;
    }

    setSaving(true);
    try {
      await apiRequest("vendor/change-password", "PUT", passwords, token);
      toast.success("Password changed successfully");
      setPasswords({ old: "", new: "", confirm: "" });
    } catch (err) {
      console.error(err);
      toast.error("Failed to change password");
    } finally {
      setSaving(false);
    }
  };

  // Logo upload
  // const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files?.[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => setVendor({ ...vendor, logo: reader.result as string });
  //     reader.readAsDataURL(file);
  //   }
  // };

  const handleDeleteAccount = () => {
    toast.warning("Account deletion is disabled in demo mode");
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="animate-spin text-primary-500" size={32} />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row p-6 gap-8">
        {/* LEFT SIDEBAR */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex flex-col lg:flex-row w-full class"
        >
          <TabsList className="flex lg:flex-col gap-6 w-full lg:w-64 lg:h-[40vh] bg-gray-100 shadow-lg  rounded-xl border">
            <TabsTrigger value="business" className="w-full justify-start">
              Business Info
            </TabsTrigger>
            <TabsTrigger value="security" className="w-full justify-start">
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="w-full justify-start">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="billing" className="w-full justify-start">
              Billing
            </TabsTrigger>
            <TabsTrigger value="account" className="w-full justify-start text-red-600">
              Account
            </TabsTrigger>
          </TabsList>

          {/* MAIN CONTENT */}
          <div className="flex-1 mt-6 lg:mt-0 lg:ml-8 space-y-6">
            {/* BUSINESS INFO */}
            <TabsContent value="business" className="space-y-4">
              <Card className="shadow-md border rounded-2xl">
                <CardHeader>
                  <CardTitle>Business Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label>Business Name</Label>
                      <Input
                        value={vendor.businessName}
                        onChange={(e) => setVendor({ ...vendor, businessName: e.target.value })}
                        placeholder="Your business name"
                      />
                    </div>
                    <div>
                      <Label>Contact Name</Label>
                      <Input
                        value={vendor.contactName}
                        onChange={(e) => setVendor({ ...vendor, contactName: e.target.value })}
                        placeholder="Your business name"
                      />
                    </div>
                    <div>
                      <Label>Contact Email</Label>
                      <Input
                        type="email"
                        value={vendor.email}
                        onChange={(e) => setVendor({ ...vendor, email: e.target.value })}
                        placeholder="example@email.com"
                      />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input
                        value={vendor.phone}
                        onChange={(e) => setVendor({ ...vendor, phone: e.target.value })}
                        placeholder="+234..."
                      />
                    </div>
                    <div>
                      <Label>Default Currency</Label>
                      <select
                        className="w-full p-2 border rounded-md"
                        value={vendor.currency}
                        onChange={(e) => setVendor({ ...vendor, currency: e.target.value })}
                      >
                        <option value="USD">USD</option>
                        <option value="NGN">NGN</option>
                        <option value="EUR">EUR</option>
                      </select>
                    </div>
                  </div>

                  {/* <div>
                    <Label>Business Logo</Label>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="w-20 h-20 border rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                        {vendor.logo ? (
                          <img
                            src={vendor.logo}
                            alt="Logo"
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <Upload className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      <Input type="file" accept="image/*" onChange={handleLogoChange} />
                    </div>
                  </div> */}

                  <Button disabled={saving} onClick={handleBusinessSave}>
                    {saving ? (
                      <>
                        <Loader2 className="animate-spin mr-2 h-4 w-4" /> Saving...
                      </>
                    ) : (
                      "Save Changes"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* SECURITY */}
            <TabsContent value="security" className="space-y-4">
              <Card className="shadow-md rounded-2xl">
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
                        setPasswords({ ...passwords, old: e.target.value })
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
                        setPasswords({ ...passwords, new: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label>Confirm Password</Label>
                    <Input
                      type="password"
                      placeholder="Confirm new password"
                      value={passwords.confirm}
                      onChange={(e) =>
                        setPasswords({ ...passwords, confirm: e.target.value })
                      }
                    />
                  </div>

                  <Button disabled={saving} onClick={handleSecuritySave}>
                    {saving ? (
                      <>
                        <Loader2 className="animate-spin mr-2 h-4 w-4" /> Updating...
                      </>
                    ) : (
                      "Update Password"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* NOTIFICATIONS */}
            <TabsContent value="notifications">
              <Card className="shadow-md rounded-2xl">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {["email", "sms", "updates"].map((type) => (
                    <div
                      key={type}
                      className="flex items-center justify-between border-b pb-2"
                    >
                      <Label className="capitalize">{type} Alerts</Label>
                      <Switch
                        checked={notifications[type as keyof typeof notifications]}
                        onCheckedChange={(val) =>
                          setNotifications({ ...notifications, [type]: val })
                        }
                      />
                    </div>
                  ))}
                  <Button onClick={() => toast.success("Preferences saved!")}>
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ACCOUNT */}
            <TabsContent value="account">
              <Card className="shadow-md border-red-300 rounded-2xl">
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
          </div>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
