export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return date.toLocaleDateString("en-US", options).replace(",", "");
};

export const formatCurrency = (amount: string | number): string => {
  const num =
    typeof amount === "string"
      ? parseFloat(amount.replace(/[^0-9.-]+/g, ""))
      : amount;
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  })
    .format(num)
    .replace("NGN", "₦");
};

export const formatPhoneNumber = (phone: string): string => {
  // Remove non-numeric characters
  const cleaned = phone.replace(/\D/g, "");

  // Format as Nigerian phone number
  if (cleaned.length === 11 && cleaned.startsWith("0")) {
    return cleaned.replace(/(\d{4})(\d{3})(\d{4})/, "$1$2$3");
  }

  return phone;
};

export const capitalizeFirst = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};
