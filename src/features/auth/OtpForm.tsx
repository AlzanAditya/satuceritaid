import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useSearch } from '../../lib/tanstack-router';

export interface OtpFormProps {
  phoneNumber?: string;
  onVerifySuccess?: () => void;
}

export function OtpForm({ phoneNumber: initialPhone, onVerifySuccess }: OtpFormProps) {
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false }) as any;
  const targetPhone = initialPhone || searchParams?.phone || '0812-3456-7890';

  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  // Mask phone number for display (e.g., 0812-****-7890)
  const formatMaskedPhone = (phoneStr: string) => {
    const cleaned = phoneStr.replace(/\D/g, '');
    if (cleaned.length < 8) return phoneStr;
    const prefix = cleaned.slice(0, 4);
    const suffix = cleaned.slice(-4);
    return `${prefix}-****-${suffix}`;
  };

  // Timer countdown
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto move to next input box
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pastedData) {
      const digits = pastedData.split('');
      const newOtp = [...otp];
      digits.forEach((digit, idx) => {
        if (idx < 6) newOtp[idx] = digit;
      });
      setOtp(newOtp);
      const nextFocus = Math.min(digits.length, 5);
      inputRefs.current[nextFocus]?.focus();
    }
  };

  const handleResend = () => {
    if (!canResend) return;
    setOtp(['', '', '', '', '', '']);
    setCountdown(60);
    setCanResend(false);
    setErrorMessage('');
    alert(`Kode OTP baru telah dikirimkan ke WhatsApp ${targetPhone}`);
    inputRefs.current[0]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const fullCode = otp.join('');
    if (fullCode.length < 6) {
      setErrorMessage('Harap masukkan 6 digit kode OTP secara lengkap.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      setTimeout(() => {
        if (onVerifySuccess) {
          onVerifySuccess();
        } else {
          alert('Verifikasi OTP Berhasil! Akun Anda telah aktif.');
          navigate({ to: '/' });
        }
      }, 1200);
    }, 1000);
  };

  return (
    <div className="auth-card">
      {/* Brand Header */}
      <Link to="/" className="auth-brand">
        <div className="auth-brand-icon">
          <i className="fa-solid fa-rotate"></i>
        </div>
        One Moment
      </Link>

      <div className="text-center">
        <div className="auth-badge">
          <i className="fa-brands fa-whatsapp text-emerald-600"></i> Verifikasi Keamanan
        </div>
        <h1 className="auth-title">Masukkan Kode OTP</h1>
        <p className="auth-subtitle">
          Kami telah mengirimkan 6 digit kode verifikasi ke nomor WhatsApp{' '}
          <strong className="text-gray-900 font-bold block mt-1">{formatMaskedPhone(targetPhone)}</strong>
        </p>
      </div>

      {isSuccess ? (
        <div className="my-8 text-center py-6 bg-emerald-50 rounded-2xl border border-emerald-200">
          <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-2xl shadow-lg shadow-emerald-500/30 animate-bounce">
            <i className="fa-solid fa-check"></i>
          </div>
          <h3 className="text-lg font-bold text-emerald-900">Verifikasi Berhasil!</h3>
          <p className="text-xs text-emerald-700 mt-1">Mengarahkan Anda ke dashboard...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center justify-center gap-2">
              <i className="fa-solid fa-circle-exclamation text-rose-500"></i>
              {errorMessage}
            </div>
          )}

          {/* 6 Digit OTP Inputs */}
          <div className="otp-box-group" onPaste={handlePaste}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className={`otp-box ${digit ? 'filled' : ''}`}
                autoFocus={idx === 0}
              />
            ))}
          </div>

          {/* Resend Countdown */}
          <div className="text-center my-6">
            {!canResend ? (
              <span className="text-xs text-gray-500 flex items-center justify-center gap-1.5">
                <i className="fa-solid fa-clock-rotate-left text-[#00A896]"></i>
                Kirim ulang kode dalam <strong className="font-bold text-gray-800">00:{countdown < 10 ? `0${countdown}` : countdown}</strong>
              </span>
            ) : (
              <button
                type="button"
                onClick={handleResend}
                className="text-xs font-bold text-[#00A896] hover:underline inline-flex items-center gap-1.5 cursor-pointer"
              >
                <i className="fa-solid fa-[#00A896] fa-paper-plane"></i> Kirim Ulang Kode OTP WhatsApp
              </button>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || otp.join('').length < 6}
            className="btn btn-primary w-full justify-center py-3.5 text-sm font-semibold rounded-xl shadow-lg shadow-[#00A896]/20 transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <i className="fa-solid fa-circle-notch fa-spin mr-2"></i> Memverifikasi...
              </>
            ) : (
              <>
                Verifikasi &amp; Lanjutkan <i className="fa-solid fa-shield-check ml-1"></i>
              </>
            )}
          </button>
        </form>
      )}

      {/* Footer link to change phone number */}
      <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
        <Link to="/login" className="hover:text-gray-900 flex items-center gap-1">
          <i className="fa-solid fa-arrow-left"></i> Kembali ke Login
        </Link>
        <Link to="/register" className="text-[#00A896] font-medium hover:underline">
          Ubah Nomor HP
        </Link>
      </div>
    </div>
  );
}
