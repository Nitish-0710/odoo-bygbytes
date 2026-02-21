exports.checkDriverValidity = (driver) => {
  const today = new Date();
  const expiry = new Date(driver.licenseExpiry);

  if (expiry < today) {
    return {
      valid: false,
      reason: "License expired"
    };
  }

  if (driver.status !== "OnDuty") {
    return {
      valid: false,
      reason: "Driver not OnDuty"
    };
  }

  return { valid: true };
};