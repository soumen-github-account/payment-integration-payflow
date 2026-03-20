

export const user_data = {
  "userId": "PFU1001",
  "name": "Rahul Sharma",
  "email": "rahul@gmail.com",
  "mobileNumber": "9876543210",
  "verifyOtp":"",
  "verifyOtpExpireAt":"",
  "kycStatus": "VERIFIED",
  "createdAt": "2026-01-10T09:30:00Z",

  "linkedAccounts": [
    {
      "accountId": "ACC1001",
      "bankId": "HDFC",
      "maskedAccountNumber": "123456789012",
      "primary": true
    }
  ],

  "enabledUpiApps": [
    {
      "app": "GPay",
      "upiId": "rahul@okhdfc",
      "linkedAccountId": "ACC1001",
      "active": true
    },
    {
      "app": "PhonePe",
      "upiId": "rahul@ybl",
      "linkedAccountId": "ACC1001",
      "active": true
    }
  ]
}



// export const user_data = {
//   userId: "PFU1001",
//   name: "Rahul Sharma",
//   email: "rahul@gmail.com",
//   mobileNumber: "9876543210",
//   kycStatus: "VERIFIED",
//   createdAt: "2026-01-10T09:30:00Z",

//   linkedAccounts: [
//     {
//       accountId: "ACC1001",
//       bankId: "HDFC",
//       maskedAccountNumber: "XXXXXX9012",
//       primary: true
//     }
//   ],

//   enabledUpiApps: [
//     {
//       app: "GPay",
//       upiId: "rahul@okhdfc",
//       linkedAccountId: "ACC1001",
//       active: true,

//       qrPayload: "payflow://pay?upiId=rahul@okhdfc&name=Rahul%20Sharma"
//     },
//     {
//       app: "PhonePe",
//       upiId: "rahul@ybl",
//       linkedAccountId: "ACC1001",
//       active: true,

//       qrPayload: "payflow://pay?upiId=rahul@ybl&name=Rahul%20Sharma"
//     }
//   ]
// };
