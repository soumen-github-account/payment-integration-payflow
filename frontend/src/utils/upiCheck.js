

export const hasActiveUpiByMobile = (banks, mobileNumber) => {
  return banks.some(bank =>
    bank.accounts.some(account =>
      account.mobileNumber === mobileNumber &&
      account.status === "ACTIVE" &&
      account.upiProfiles.some(upi => upi.active)
    )
  );
};
