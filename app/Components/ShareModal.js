"use client";

import React, { useState, useEffect } from "react";
import { Share2, Copy, Check, X, MessageCircle } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";

function Toast({ message, type, show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
      <div
        className={`px-4 py-3 rounded-lg shadow-lg ${
          type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">{message}</span>
          <button onClick={onClose} className="ml-2">
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ShareModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const currentUrl =
    typeof window !== "undefined" ? window.location.href : "https://example.com";

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });
  };

  const hideToast = () => {
    setToast((prev) => ({ ...prev, show: false }));
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      showToast("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showToast("Failed to copy link", "error");
    }
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
    window.open(facebookUrl, "_blank");
  };

  const shareOnInstagram = () => {
    copyToClipboard();
    showToast("Link copied! Paste it in your Instagram story or bio.");
  };

  const shareOnYouTube = () => {
    copyToClipboard();
    showToast("Link copied! You can paste it in your YouTube description.");
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}`;
    window.open(twitterUrl, "_blank");
  };

  const shareOnWhatsApp = () => {
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(currentUrl)}`;
    window.open(whatsappUrl, "_blank");
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-sm transition-colors duration-200"
      >
        <Share2 color="black" size={16} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Share this page</h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Share on social media</label>
                <div className="grid grid-cols-3 gap-3">
                  <SocialButton icon={<FaFacebook size={16} />} color="bg-blue-600" label="Facebook" onClick={shareOnFacebook} />
                  <SocialButton icon={<FaInstagram size={16} />} color="bg-gradient-to-r from-purple-500 to-pink-500" label="Instagram" onClick={shareOnInstagram} />
                  <SocialButton icon={<FaYoutube size={16} />} color="bg-red-600" label="YouTube" onClick={shareOnYouTube} />
                  <SocialButton icon={<FaXTwitter size={16} />} color="bg-blue-400" label="Twitter" onClick={shareOnTwitter} />
                  <SocialButton icon={<MessageCircle size={16} />} color="bg-green-500" label="WhatsApp" onClick={shareOnWhatsApp} />
                </div>
              </div>

              <div className="space-y-3">
                <label htmlFor="page-link" className="text-sm font-medium text-gray-700">
                  Or copy link
                </label>
                <div className="flex gap-2">
                  <input
                    id="page-link"
                    value={currentUrl}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="px-3 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors duration-200 flex items-center justify-center min-w-[44px]"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Toast message={toast.message} type={toast.type} show={toast.show} onClose={hideToast} />
    </>
  );
}

function SocialButton({ icon, color, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-2 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
    >
      <div className={`w-8 h-8 ${color} rounded-full flex items-center justify-center text-white`}>
        {icon}
      </div>
      <span className="text-xs text-gray-600">{label}</span>
    </button>
  );
}
