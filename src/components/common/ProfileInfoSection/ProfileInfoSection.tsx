"use client";

import { ChangeEvent } from "react";
import { Button } from "@/components/common/Button/Button";
import { Input } from "@/components/common/Input/Input";

interface ProfileInfoSectionProps {
  profile: {
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    phone: string;
    country: string;
    city: string;
    postalCode: string;
  };
  avatar: string | null;
  loading: boolean;
  onProfileChange: (field: string, value: string) => void;
  onUploadPhoto: (e: ChangeEvent<HTMLInputElement>) => void;
  onDeletePhoto: () => void;
  onSaveProfile: () => void;
}

export default function ProfileInfoSection({
  profile,
  avatar,
  loading,
  onProfileChange,
  onUploadPhoto,
  onDeletePhoto,
  onSaveProfile,
}: ProfileInfoSectionProps) {
  return (
    <section className="mb-12">
      {/* Header (photo + name + email + buttons) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
            {avatar ? (
              <img
                src={avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Photo
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              {profile.firstName || profile.lastName
                ? `${profile.firstName} ${profile.lastName}`
                : "Arthur Morgan"}
            </h2>
            <p className="text-gray-500">
              {profile.email || "No email provided"}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <label className="w-full sm:w-auto">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onUploadPhoto}
            />
            <Button
              theme="dark"
              size="small"
              className="w-full sm:w-auto justify-center"
            >
              Upload New Photo
            </Button>
          </label>

          <button
            onClick={onDeletePhoto}
            className="px-3 py-1 border border-red-500 text-red-500 font-bold uppercase hover:bg-red-50 transition-colors w-full sm:w-auto justify-center rounded-md"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Personal Information */}
      <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input
          placeholder="First Name"
          value={profile.firstName}
          onChange={(e) => onProfileChange("firstName", e.target.value)}
        />
        <Input
          placeholder="Last Name"
          value={profile.lastName}
          onChange={(e) => onProfileChange("lastName", e.target.value)}
        />
        <Input
          placeholder="Address"
          value={profile.address}
          onChange={(e) => onProfileChange("address", e.target.value)}
          className="md:col-span-2"
        />
        <Input
          placeholder="Email Address"
          value={profile.email}
          onChange={(e) => onProfileChange("email", e.target.value)}
        />
        <Input
          placeholder="Phone Number"
          value={profile.phone}
          onChange={(e) => onProfileChange("phone", e.target.value)}
        />
        <Input
          placeholder="Country/Region"
          value={profile.country}
          onChange={(e) => onProfileChange("country", e.target.value)}
        />
        <Input
          placeholder="City"
          value={profile.city}
          onChange={(e) => onProfileChange("city", e.target.value)}
        />
        <Input
          placeholder="Postal Code"
          value={profile.postalCode}
          onChange={(e) => onProfileChange("postalCode", e.target.value)}
        />
      </div>

      <Button theme="dark" disabled={loading} onClick={onSaveProfile}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </section>
  );
}
