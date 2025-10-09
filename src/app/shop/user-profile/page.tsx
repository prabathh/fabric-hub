"use client";

import { useState, useEffect } from "react";
import { ProfileInfoSection, ChangePasswordSection } from "@/components/Shop";
import { Button } from "@/components/common";
import Breadcrumbs from "@/components/common/Breadcrumbs/Breadcrumbs";
import { useAuthStore } from "@/store/useAuthStore";
import { 
    updateUserProfile, 
    updateUserPassword, 
    deleteCurrentUserAccount 
} from "@/lib/user";
import { getErrorMessage, mapCurrentUserToProfile } from "@/helper/utils";
import { useRouter } from "next/navigation";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

interface StatusState {
    loading: boolean;
    error: string | null;
    success: string | null;
}

export default function ProfilePage() {
  const router = useRouter();
  const { currentUser, setCurrentUser } = useAuthStore();
  const [status, setStatus] = useState<StatusState>({
    loading: false,
    error: null,
    success: null,
  });
  const [initialProfile, setInitialProfile] = useState(mapCurrentUserToProfile(currentUser));

  useEffect(() => {
    if (currentUser) {
        setInitialProfile(mapCurrentUserToProfile(currentUser));
    }
    setStatus(prev => ({ ...prev, error: null, success: null }));
  }, [currentUser]);
  
  const setFinalStatus = (error: string | null, success: string | null) => {
    setStatus({ loading: false, error, success });
    if (success) {
      setTimeout(() => setStatus(prev => ({ ...prev, success: null })), 5000);
    }
  };

  const handleSaveProfile = async (updatedProfile: typeof initialProfile) => {
    setStatus(prev => ({ ...prev, loading: true, error: null, success: null }));
    try {
      if (!currentUser?.uid) throw new Error("Authentication error: User ID is missing.");
      await updateUserProfile(currentUser.uid, updatedProfile);
      setFinalStatus(null, "Profile updated successfully! 🎉");
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setFinalStatus(`Failed to update profile: ${errorMessage}`, null);
    }
  };

  const handleSavePassword = async (passwords: {
    currentPassword: string;
    newPassword: string;
  }) => {
    setStatus(prev => ({ ...prev, loading: true, error: null, success: null }));
    try {
      if (!currentUser?.email) throw new Error("Email is missing for re-authentication.");
      await updateUserPassword(
        currentUser.email, 
        passwords.currentPassword, 
        passwords.newPassword
      );
      handleLogout();
      setFinalStatus(null, "Password updated successfully! Please log in with your new password. 🔑");
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setFinalStatus(`Failed to update password: ${errorMessage}`, null);
    }
  };

  const handleDeleteAccount = async () => {
    if (!confirm("Are you ABSOLUTELY sure you want to delete your account? This action is irreversible.")) return;
    setStatus(prev => ({ ...prev, loading: true, error: null, success: null }));
    try {
        if (!currentUser?.uid) throw new Error("User ID is missing.");
        await deleteCurrentUserAccount(currentUser.uid);
        router.replace("/shop");
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setFinalStatus(`Failed to delete account. Error: ${errorMessage}`, null);
    }
  };

  const handleLogout = async () => {
      try {
        await signOut(auth);
        setCurrentUser(null);
        router.push("/shop");
      } catch (error) {
        console.error("Logout Error:", error);
      }
    };

  if (!currentUser) {
    return <div className="p-6 text-center text-gray-600">Please log in to view your profile.</div>;
  }

  const displayMessage = status.error || status.success;
  const isSuccess = !!status.success;

  return (
    <div className="p-4 sm:p-6 w-full mx-auto">
      <Breadcrumbs 
        items={[
            { label: "Home", href: "/shop" }, 
            { label: "My Profile" }
        ]} 
      />
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>
      
      {/* Dynamic Status Message Display */}
      {displayMessage && (
          <div 
            className={`flex items-center px-4 py-3 rounded mb-8 ${isSuccess ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'}`} 
            role="alert"
          >
              {isSuccess ? <FaCheckCircle className="mr-3 w-5 h-5" /> : <FaExclamationTriangle className="mr-3 w-5 h-5" />}
              <span className="block sm:inline font-medium">{displayMessage}</span>
          </div>
      )}

      <div className="w-full max-w-6xl mx-auto">
        <ProfileInfoSection
          initialProfile={initialProfile}
          initialAvatar={currentUser?.imageUrl}
          loading={status.loading}
          onSaveProfile={handleSaveProfile}
        />
        <hr className="my-10 border-gray-300" />
        <ChangePasswordSection
          loading={status.loading}
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
            disabled={status.loading}
            onClick={handleDeleteAccount}
          >
            {status.loading ? "Deleting..." : "Close Your Account"}
          </Button>
        </section>
      </div>
    </div>
  );
}