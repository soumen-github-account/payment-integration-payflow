import { user_data } from "../assets/user_data";

export const currentUserIdentity = {
  accountIds: user_data.linkedAccounts.map(acc => acc.accountId),
  upiIds: user_data.enabledUpiApps.map(app => app.upiId),
  mobileNumber: user_data.mobileNumber,
};
