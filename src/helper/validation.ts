export const categoryIdValidation = {
  required: "ID is required",
  pattern: {
    value: /^[a-z]+$/,
    message: "Only lowercase letters allowed (no spaces, numbers, or special chars)",
  },
  minLength: { value: 2, message: "ID must be at least 2 characters" },
};

export const categoryNameValidation = {
  required: "Name is required",
  minLength: { value: 2, message: "Name must be at least 2 characters" },
};

export const requiredValidation = { required: "This field is required" };

export const phoneValidation = {
  required: "Phone is required",
  pattern: {
    value: /^\d{10}$/, // Basic 10-digit phone validation
    message: "Invalid phone number format",
  },
};