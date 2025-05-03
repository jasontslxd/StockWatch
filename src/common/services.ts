export const isValidPhoneNumber = (phoneNumber: string) => {
  return phoneNumber.length === 8 && phoneNumber.match(/^[0-9]+$/) !== null;
}

export const isValidOtp = (otp: string) => {
  return otp.length === 6 && otp.match(/^[0-9]+$/) !== null;
}

export const parseChangeAmount = (value: string) => {
  // Convert to number and handle invalid inputs
  const num = parseFloat(value);
  if (isNaN(num)) return value;

  // Format to 2 decimal places
  const formattedNumber = Math.abs(num).toFixed(2);
  
  // Add sign and dollar symbol
  const sign = num >= 0 ? '+' : '-';
  return `${sign}$${formattedNumber}`;
}

export const parseChangePercentage = (value: string) => {
  // Remove any existing % sign and convert to number
  const cleanValue = value.replace('%', '');
  const num = parseFloat(cleanValue);
  if (isNaN(num)) return value;

  // Format to 2 decimal places
  const formattedNumber = Math.abs(num).toFixed(2);
  
  // Add sign and percentage symbol
  const sign = num >= 0 ? '+' : '-';
  return `${sign}${formattedNumber}%`;
}

