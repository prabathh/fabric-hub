"use client";

import { useState, ChangeEvent } from "react";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { Button, Input } from "@/components/common";
import { ProfileFormValues } from "@/types/auth";
import { emailValidation, requiredValidation } from "@/helper/validation";
import { StaticImageData } from "next/image";

interface ProfileInfoSectionProps {
  initialProfile: ProfileFormValues;
  initialAvatar?: StaticImageData | null;
  loading: boolean;
  onSaveProfile: (profile: ProfileFormValues) => Promise<void>;
}

export default function ProfileInfoSection({
  initialProfile,
  initialAvatar,
  loading,
  onSaveProfile,
}: ProfileInfoSectionProps) {
  const [avatar, setAvatar] = useState<StaticImageData | null>(initialAvatar || null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ProfileFormValues>({
    mode: "onChange",
    defaultValues: initialProfile,
  });

  const onSubmit = (data: ProfileFormValues) => {
    onSaveProfile(data);
  };

  const handleUploadPhoto = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      //const reader = new FileReader();
      //reader.onloadend = () => setAvatar(reader.result as string);
      //reader.readAsDataURL(file);
    }
  };

  const handleDeletePhoto = () => {
    setAvatar(null);
  };

  return (
    <section className="mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div className="flex items-center space-x-6">
          <div className="relative w-24 h-24 rounded-full bg-gray-200 overflow-hidden border border-gray-300">
            {avatar && avatar !== initialAvatar ? (
              <Image
                src={avatar}
                alt="Profile Avatar"
                fill
                className="object-cover"
                sizes="96px"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <FaUser size={30} />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-xl font-semibold">
              {initialProfile.firstName || initialProfile.lastName
                ? `${initialProfile.firstName} ${initialProfile.lastName}`
                : "User Name"}
            </h2>
            <p className="text-gray-500">
              {initialProfile.email || "No email provided"}
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <label className="w-full sm:w-auto">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUploadPhoto}
              disabled={loading}
            />
            <Button
              theme="dark"
              size="small"
              className="w-full sm:w-auto justify-center"
              type="button"
              disabled={loading}
            >
              Upload New Photo
            </Button>
          </label>

          <button
            onClick={handleDeletePhoto}
            className="px-3 py-1 border border-red-500 text-red-500 font-bold uppercase hover:bg-red-50 transition-colors w-full sm:w-auto justify-center rounded-lg text-sm"
            type="button"
            disabled={loading}
          >
            Delete
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input
            placeholder="First Name"
            error={errors.firstName}
            disabled={loading}
            {...register("firstName", requiredValidation)}
          />
          <Input
            placeholder="Last Name"
            error={errors.lastName}
            disabled={loading}
            {...register("lastName", requiredValidation)}
          />
          <Input
            placeholder="Address"
            error={errors.address}
            className="md:col-span-2"
            disabled={loading}
            {...register("address")}
          />
          <Input
            placeholder="Email Address"
            error={errors.email}
            disabled={loading}
            {...register("email", emailValidation)}
          />
          <Input
            placeholder="Phone Number"
            error={errors.phone}
            disabled={loading}
            {...register("phone")}
          />
          <Input
            placeholder="Country/Region"
            error={errors.country}
            disabled={loading}
            {...register("country")}
          />
          <Input
            placeholder="City"
            error={errors.city}
            disabled={loading}
            {...register("city")}
          />
          <Input
            placeholder="Postal Code"
            error={errors.postalCode}
            disabled={loading}
            {...register("postalCode")}
          />
        </div>

        <Button theme="dark" disabled={loading || !isValid} type="submit">
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </section>
  );
}