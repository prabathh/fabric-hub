export const categoryIdValidation = {
  required: "ID is required",
  pattern: {
    value: /^[a-z]+$/,
    message:
      "Only lowercase letters allowed (no spaces, numbers, or special chars)",
  },
  minLength: { value: 2, message: "ID must be at least 2 characters" },
};

export const categoryNameValidation = {
  required: "Name is required",
  minLength: { value: 2, message: "Name must be at least 2 characters" },
};

export const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /\S+@\S+\.\S+/,
    message: "Invalid email format",
  },
};

export const requiredValidation = { required: "This field is required" };

export const passwordValidation = {
    required: "Password is required",
    minLength: {
        value: 8,
        message: "Password must be at least 8 characters",
    },
};