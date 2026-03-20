import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

const GenerateQr = () => {
  const [qr, setQr] = useState("");
  
  const upiData =
    "upi://pay?pa=rahul@okhdfc&pn=Rahul%20Sharma&am=500&cu=INR";

  useEffect(() => {
    QRCode.toDataURL(upiData, {
      width: 300,
      margin: 2
    })
      .then(url => setQr(url))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <p className="mb-4 text-lg font-medium">Scan this UPI QR</p>

      {qr && (
        <img
          src={qr}
          alt="UPI QR"
          className="bg-white p-3 rounded-xl"
        />
      )}

      <p className="text-sm text-gray-400 mt-4">
        rahul@okhdfc • ₹500
      </p>
    </div>
  );
};

export default GenerateQr;
