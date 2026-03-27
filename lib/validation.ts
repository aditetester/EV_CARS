/**
 * Validation utility for EV_CARS application
 */

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Matches 10 digits
  const re = /^\d{10}$/;
  return re.test(phone);
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const validateOTP = (otp: string[] | string): boolean => {
  if (Array.isArray(otp)) {
    return otp.every((digit) => digit.length === 1 && /\d/.test(digit));
  }
  return /^\d{4}$/.test(otp);
};

export const validateVIN = (vin: string): boolean => {
  // VIN is typically 17 characters
  return vin.trim().length === 17;
};

export const validateExpiry = (expiry: string): boolean => {
  // Matches MM/YY format
  const re = /^(0[1-9]|1[0-2])\/\d{2}$/;
  return re.test(expiry);
};

export const validateCardNumber = (cardNumber: string): boolean => {
  // Matches 16 digits (simplified)
  const re = /^\d{16}$/;
  return re.test(cardNumber.replace(/\s/g, ""));
};

export const validateCVV = (cvv: string): boolean => {
  // Matches 3 digits
  const re = /^\d{3}$/;
  return re.test(cvv);
};

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0;
};
