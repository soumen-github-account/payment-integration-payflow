
import hdfc_logo from './images/hdfc.png'
import sbi_logo from './images/sbi.png'
import icici_logo from './images/icici.png'
import axis_logo from './images/axis.png'
import pnb_logo from './images/pnb.png'
import kotak_logo from './images/kotak.png'
import yes_logo from './images/yes.png'
import idfc_logo from './images/idfc.png'


export const bank_data = [
  {
    bankId: "HDFC",
    bankName: "HDFC Bank",
    logo: hdfc_logo,
    accounts: [
      {
        accountId: "ACC1001",
        name: "Rahul Sharma",
        accountNumber: "123456789012",
        ifscCode: "HDFC0001234",
        mobileNumber: "9876543210",
        upiPin: "1234",
        balance: 25000.0,
        status: "ACTIVE",
        upiProfiles: [
          { upiId: "rahul@okhdfc", app: "GPay", active: true },
          { upiId: "rahul@ybl", app: "PhonePe", active: false }
        ]
      }
    ]
  },

  {
    bankId: "SBI",
    logo: sbi_logo, 
    bankName: "State Bank of India",
    accounts: [
      {
        accountId: "ACC2001",
        name: "Anita Verma",
        accountNumber: "234567890123",
        ifscCode: "SBIN0005678",
        mobileNumber: "9123456789",
        upiPin: "4321",
        balance: 18000.5,
        status: "DISACTIVE",
        upiProfiles: [
          { upiId: "anita@oksbi", app: "GPay", active: true }
        ]
      }
    ]
  },

  {
    bankId: "ICICI",
    logo: icici_logo,
    bankName: "ICICI Bank",
    accounts: [
      {
        accountId: "ACC3001",
        name: "Vikram Singh",
        accountNumber: "345678901234",
        ifscCode: "ICIC0009012",
        mobileNumber: "9988776655",
        upiPin: "1111",
        balance: 52000.0,
        status: "ACTIVE",
        upiProfiles: [
          { upiId: "vikram@okicici", app: "PhonePe", active: true },
          { upiId: "vikram@paytm", app: "Paytm", active: false }
        ]
      }
    ]
  },

  {
    bankId: "AXIS",
    logo: axis_logo,
    bankName: "Axis Bank",
    accounts: [
      {
        accountId: "ACC4001",
        name: "Neha Kapoor",
        accountNumber: "456789012345",
        ifscCode: "UTIB0003344",
        mobileNumber: "9090909090",
        upiPin: "2222",
        balance: 30500.75,
        status: "ACTIVE",
        upiProfiles: [
          { upiId: "neha@okaxis", app: "GPay", active: true }
        ]
      }
    ]
  },

  {
    bankId: "PNB",
    logo: pnb_logo,
    bankName: "Punjab National Bank",
    accounts: [
      {
        accountId: "ACC5001",
        name: "Amit Kumar",
        accountNumber: "567890123456",
        ifscCode: "PUNB0011223",
        mobileNumber: "9812345678",
        upiPin: "3333",
        balance: 12000.0,
        status: "ACTIVE",
        upiProfiles: [
          { upiId: "amit@okpnb", app: "BHIM", active: true }
        ]
      }
    ]
  },

  {
    bankId: "KOTAK",
    logo: kotak_logo,
    bankName: "Kotak Mahindra Bank",
    accounts: [
      {
        accountId: "ACC6001",
        name: "Pooja Mehta",
        accountNumber: "678901234567",
        ifscCode: "KKBK0007788",
        mobileNumber: "9898989898",
        upiPin: "4444",
        balance: 41000.25,
        status: "ACTIVE",
        upiProfiles: [
          { upiId: "pooja@okkotak", app: "PhonePe", active: true }
        ]
      }
    ]
  },

  {
    bankId: "YES",
    logo: yes_logo,
    bankName: "Yes Bank",
    accounts: [
      {
        accountId: "ACC7001",
        name: "Rohan Das",
        accountNumber: "789012345678",
        ifscCode: "YESB0004455",
        mobileNumber: "9701234567",
        upiPin: "5555",
        balance: 9500.0,
        status: "ACTIVE",
        upiProfiles: [
          { upiId: "rohan@okyes", app: "Paytm", active: true }
        ]
      }
    ]
  },

  {
    bankId: "IDFC",
    logo: idfc_logo,
    bankName: "IDFC First Bank",
    accounts: [
      {
        accountId: "ACC8001",
        name: "Sneha Roy",
        accountNumber: "890123456789",
        ifscCode: "IDFB0009988",
        mobileNumber: "9666554433",
        upiPin: "6666",
        balance: 67000.0,
        status: "ACTIVE",
        upiProfiles: [
          { upiId: "sneha@okidfc", app: "GPay", active: true }
        ]
      }
    ]
  }
];

