"use client";

import { useState } from "react";
import { ProfileInfoSection, ChangePasswordSection } from "@/components/Shop";
import { Button } from "@/components/common";

export default function ProfilePage() {
  const [loading, setLoading] = useState(false);

  const initialProfile = {
    firstName: "Arthur",
    lastName: "Morgan",
    address: "",
    email: "arthurmorgan@gmail.com",
    phone: "1-555-555-0123",
    country: "USA",
    city: "Blackwater",
    postalCode: "10001",
  };

  const initialAvatar = "/images/default-avatar.jpg";

  const handleSaveProfile = async (updatedProfile: typeof initialProfile) => {
    setLoading(true);
    try {
      console.log("Updated Profile:", updatedProfile);
      // TODO: Call backend API
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSavePassword = async (passwords: {
    currentPassword: string;
    newPassword: string;
  }) => {
    setLoading(true);
    try {
      console.log("Password updated:", passwords);
      // TODO: Call backend API
      alert("Password updated successfully!");
    } catch (err) {
      alert("Failed to update password");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = () => {
    if (!confirm("Are you sure you want to delete your account?")) return;
    setLoading(true);
    // TODO: Call backend API
    setTimeout(() => {
      alert("Account deleted.");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="p-4 sm:p-6 w-full mx-auto">
      <div className="text-sm text-gray-500 mb-6 space-x-2">
        <span>Home</span>
        <span>&gt;</span>
        <span className="font-medium text-gray-800">My Profile</span>
      </div>
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      <div className="w-full max-w-5xl mx-auto">
        <ProfileInfoSection
          initialProfile={initialProfile}
          initialAvatar={initialAvatar}
          loading={loading}
          onSaveProfile={handleSaveProfile}
        />
        <hr className="my-10 border-gray-300" />
        <ChangePasswordSection
          loading={loading}
          onSavePassword={handleSavePassword}
        />
        <hr className="my-10 border-gray-300" />
        <section>
          <h2 className="text-lg font-semibold mb-2">Delete My Account</h2>
          <p className="text-sm text-gray-500 mb-4">
            Once deleted you will permanently lose all your data linked to this
            account.
          </p>
          <Button
            theme="attention"
            className="bg-red-600 hover:bg-red-700 text-white"
            disabled={loading}
            onClick={handleDeleteAccount}
          >
            {loading ? "Deleting..." : "Close Your Account"}
          </Button>
        </section>
      </div>
    </div>
  );
}
