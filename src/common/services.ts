export const isValidPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.length === 8 && phoneNumber.match(/^[0-9]+$/) !== null;
}

export const isValidOtp = (otp: string) => {
  return otp.length === 6 && otp.match(/^[0-9]+$/) !== null;
}