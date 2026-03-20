import React, { useRef } from "react";
import { GoArrowLeft } from "react-icons/go";
import { NavLink, useLocation } from "react-router-dom";
import html2canvas from "html2canvas";
import { user_data } from "../assets/user_data";
import { getTransactionType } from "../utils/transactionType";
import { IoShareSocialOutline } from "react-icons/io5";

const TransactionDetails = () => {
  const { state: txn } = useLocation();
  const receiptRef = useRef(null);

  if (!txn) {
    return <div className="text-white p-4">Transaction not found</div>;
  }

  const type = getTransactionType(txn, user_data);
  const isDebit = type === "DEBIT";

  // Screenshot + Share
  const handleShare = async () => {
    const canvas = await html2canvas(receiptRef.current, {
      backgroundColor: "#000000", // prevents oklch crash
      scale: 2,
      useCORS: true
    });

    canvas.toBlob(async (blob) => {
      if (!blob) return;

      const file = new File([blob], "transaction-receipt.png", {
        type: "image/png"
      });

      // Mobile share
      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Transaction Receipt",
          text: "UPI Transaction Details",
          files: [file]
        });
      } else {
        // Desktop fallback
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "transaction-receipt.png";
        link.click();
      }
    });
  };

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col">
      {/* HEADER */}
      <nav className="p-4 flex items-center gap-3 border-b border-gray-800">
        <NavLink to={-1}>
          <GoArrowLeft className="text-2xl cursor-pointer" />
        </NavLink>
        <p className="text-lg font-medium">Transaction Details</p>
      </nav>

      {/* RECEIPT AREA (NO TAILWIND COLORS INSIDE) */}
      <div
        ref={receiptRef}
        className="flex-1 p-4"
        style={{ backgroundColor: "#000", color: "#fff" }}
      >
        {/* AMOUNT CARD */}
        <div
          style={{
            backgroundColor: "#111",
            borderRadius: 16,
            padding: 24,
            textAlign: "center",
            marginBottom: 20
          }}
        >
          <p style={{ color: "#9CA3AF", fontSize: 14 }}>
            {isDebit ? "Paid" : "Received"}
          </p>

          <p
            style={{
              fontSize: 32,
              fontWeight: 600,
              marginTop: 10,
              color: isDebit ? "#EF4444" : "#22C55E"
            }}
          >
            {isDebit ? "-" : "+"}₹{txn.amount}
          </p>

          <p style={{ fontSize: 12, color: "#9CA3AF", marginTop: 8 }}>
            {txn.status}
          </p>
        </div>

        {/* DETAILS CARD */}
        <div
          style={{
            backgroundColor: "#111",
            borderRadius: 16,
            padding: 16
          }}
        >
          <Detail label="Transaction ID" value={txn.transactionId} />
          <Detail label="From" value={txn.sender.upiId} />
          <Detail label="To" value={txn.receiver.upiId} />
          <Detail label="Bank" value={`${txn.sender.bankId} → ${txn.receiver.bankId}`} />
          <Detail
            label="Date"
            value={new Date(txn.completedAt).toLocaleString()}
          />
        </div>
      </div>

      {/* SHARE BUTTON */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={handleShare}
          className="w-full py-3 flex items-center justify-center gap-3 rounded-full bg-teal-600 font-medium"
        >
        <IoShareSocialOutline className="text-[22px]" />
        <p>Share Screenshot</p>
        </button>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      fontSize: 14,
      marginBottom: 12
    }}
  >
    <span style={{ color: "#9CA3AF" }}>{label}</span>
    <span style={{ maxWidth: "60%", textAlign: "right", wordBreak: "break-word" }}>
      {value}
    </span>
  </div>
);

export default TransactionDetails;
