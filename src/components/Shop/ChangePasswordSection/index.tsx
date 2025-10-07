"use client";

import { useForm } from "react-hook-form";
import { Button, Input } from "@/components/common";
import { passwordValidation } from "@/helper/validation";
import { PasswordFormValues } from "@/types/auth";

interface ChangePasswordSectionProps {
  loading: boolean;
  onSavePassword: (passwords: { currentPassword: string, newPassword: string }) => Promise<void>;
}

export default function ChangePasswordSection({
  loading,
  onSavePassword,
}: ChangePasswordSectionProps) {

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm<PasswordFormValues>({
    mode: "onChange",
    defaultValues: {
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    }
  });

  const newPasswordValue = watch("newPassword");

  const onSubmit = (data: PasswordFormValues) => {
    onSavePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
    reset({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    });
  };
  
  return (
    <section>
      <h2 className="text-lg font-semibold mb-4">Change Password</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input
            type="password"
            label="Current Password"
            error={errors.currentPassword}
            disabled={loading}
            {...register("currentPassword", passwordValidation)}
          />
          <div className="md:col-span-2"></div>
          <Input
            type="password"
            label="New Password"
            error={errors.newPassword}
            disabled={loading}
            {...register("newPassword", passwordValidation)}
          />
          <Input
            type="password"
            label="Confirm New Password"
            error={errors.confirmNewPassword}
            disabled={loading}
            {...register("confirmNewPassword", {
                ...passwordValidation,
                validate: (value) =>
                    value === newPasswordValue || "Passwords do not match",
            })}
          />
        </div>

        <Button theme="dark" disabled={loading || !isValid} type="submit">
          {loading ? "Saving..." : "Save New Password"}
        </Button>
      </form>
    </section>
  );
}