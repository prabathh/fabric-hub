"use client";

import { useState, ChangeEvent } from "react";
import ProfileInfoSection from "@/components/common/ProfileInfoSection/ProfileInfoSection";
import ChangePasswordSection from "@/components/common/ChangePasswordSection/ChangePasswordSection";
import { Button } from "@/components/common/Button/Button";

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    firstName: "Arthur",
    lastName: "Morgan",
    address: "",
    email: "arthurmorgan@gmail.com", 
    phone: "",    
    country: "",
    city: "",
    postalCode: "",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Handlers
  const handleProfileChange = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswords((prev) => ({ ...prev, [field]: value }));
  };

  const handleUploadPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = () => {
    setAvatar(null);
  };

  const handleSaveProfile = async () => {
    if (profile.email && !/\S+@\S+\.\S+/.test(profile.email)) {
      alert("Please enter a valid email address");
      return;
    }

    setLoading(true);
    try {
      console.log("Updated Profile:", profile);
      // TODO: Call backend API with fetch/axios
      alert("Profile updated successfully!");
    } catch (err) {
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleSavePassword = async () => {
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      alert("Passwords do not match");
      return;
    }
    if (passwords.newPassword.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
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

  const handleDeleteAccount = async () => {
    if (!confirm("Are you sure you want to delete your account?")) return;
    setLoading(true);
    try {
      console.log("Account deleted");
      // TODO: Call backend API
      alert("Account deleted successfully");
    } catch (err) {
      alert("Failed to delete account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 w-full mx-auto max-w-5xl">
      <div className="text-sm text-gray-500 mb-6 space-x-2">
        <span>Home</span>
        <span>&gt;</span>
        <span className="font-medium text-gray-800">My Profile</span>
      </div>

      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <ProfileInfoSection
        profile={profile}
        avatar={avatar}
        loading={loading}
        onProfileChange={handleProfileChange}
        onUploadPhoto={handleUploadPhoto}
        onDeletePhoto={handleDeletePhoto}
        onSaveProfile={handleSaveProfile}
      />

      <hr className="my-10 border-gray-300" />

      <ChangePasswordSection
        passwords={passwords}
        loading={loading}
        onPasswordChange={handlePasswordChange}
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
  );
}