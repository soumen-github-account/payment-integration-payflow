export const getTransactionType = (txn, currentUser) => {
  const userAccountIds = currentUser.linkedAccounts.map(
    acc => acc.accountId
  );

  const userUpiIds = currentUser.enabledUpiApps
    .filter(app => app.active)
    .map(app => app.upiId);

  const userMobile = currentUser.mobileNumber;

  const isSender =
    userAccountIds.includes(txn.sender.accountId) ||
    userUpiIds.includes(txn.sender.upiId) ||
    txn.sender.mobileNumber === userMobile;

  const isReceiver =
    userAccountIds.includes(txn.receiver.accountId) ||
    userUpiIds.includes(txn.receiver.upiId) ||
    txn.receiver.mobileNumber === userMobile;

  if (isSender) return "DEBIT";
  if (isReceiver) return "CREDIT";

  return "UNKNOWN";
};
