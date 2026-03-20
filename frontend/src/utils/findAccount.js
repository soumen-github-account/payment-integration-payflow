// utils/findAccount.js
import { bank_data } from "../assets/bank_data";

export const findAccountByMobile = (mobile) => {
  for (let bank of bank_data) {
    for (let acc of bank.accounts) {
      if (acc.mobileNumber === mobile && acc.status === "ACTIVE") {
        return { bank, account: acc };
      }
    }
  }
  return null;
};
