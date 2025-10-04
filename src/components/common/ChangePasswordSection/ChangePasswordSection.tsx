"use client";

import { Button } from "@/components/common/Button/Button";
import { Input } from "@/components/common/Input/Input";

interface ChangePasswordSectionProps {
  passwords: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  };
  loading: boolean;
  onPasswordChange: (field: string, value: string) => void;
  onSavePassword: () => void;
}

export default function ChangePasswordSection({
  passwords,
  loading,
  onPasswordChange,
  onSavePassword,
}: ChangePasswordSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-lg font-semibold mb-2">Change Password</h2>
      <p className="text-sm text-gray-500 mb-4">
        Your password must contain at least 8 characters with a minimum of 1
        number and 1 special character (@?*.)
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input
          type="password"
          placeholder="Current Password"
          value={passwords.currentPassword}
          onChange={(e) =>
            onPasswordChange("currentPassword", e.target.value)
          }
        />
        <Input
          type="password"
          placeholder="New Password"
          value={passwords.newPassword}
          onChange={(e) => onPasswordChange("newPassword", e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirm New Password"
          value={passwords.confirmNewPassword}
          onChange={(e) =>
            onPasswordChange("confirmNewPassword", e.target.value)
          }
        />
      </div>
      <Button theme="dark" disabled={loading} onClick={onSavePassword}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </section>
  );
}