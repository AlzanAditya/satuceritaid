import React, { useEffect } from 'react';
import { Link } from '../lib/tanstack-router';
import { OtpForm } from '../features/auth/OtpForm';

export function OtpPage() {
  useEffect(() => {
    document.title = 'Verifikasi Kode OTP - Satu Cerita Undangan Digital';
  }, []);

  return (
    <div className="auth-page">
      <div className="auth-bg-decoration"></div>

      {/* Floating Back to Home Button */}
      <div className="auth-top-nav">
        <Link to="/" className="auth-back-link">
          <i className="fa-solid fa-arrow-left"></i> Kembali ke Beranda
        </Link>
      </div>

      <div className="w-full max-w-md my-auto py-6">
        <OtpForm />
      </div>
    </div>
  );
}
