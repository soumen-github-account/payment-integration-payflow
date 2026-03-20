import React, { useEffect } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";

const ScanQrScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      {
        fps: 10,
        qrbox: 250
      },
      false
    );

    scanner.render(
      (decodedText) => {
        scanner.clear();

        // Parse UPI QR
        const params = new URLSearchParams(decodedText.split("?")[1]);

        const upiId = params.get("pa");
        const name = params.get("pn");
        const amount = params.get("am");

        if (!upiId) {
          alert("Invalid UPI QR");
          return;
        }

        // Navigate to payment page
        navigate("/scan-pay", {
          state: {
            upiId,
            name,
            amount
          }
        });
      },
      (error) => {
        // ignore scan errors
      }
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [navigate]);

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      {/* HEADER */}
      <div className="p-4 flex items-center gap-3 border-b border-gray-800">
        <GoArrowLeft
          className="text-2xl cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <p className="text-lg font-medium">Scan any QR</p>
      </div>

      {/* CAMERA */}
      <div className="flex-1 flex items-center justify-center">
        <div id="qr-reader" className="w-[300px]" />
      </div>

      <p className="text-center text-gray-400 text-sm mb-6">
        Align QR code within frame
      </p>
    </div>
  );
};

export default ScanQrScreen;
