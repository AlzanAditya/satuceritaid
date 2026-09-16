import React, { useState } from 'react';
import { Link, useNavigate } from '../../lib/tanstack-router';

export interface RegisterFormProps {
  onSuccess?: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!fullName.trim()) {
      setErrorMessage('Nama lengkap wajib diisi.');
      return;
    }

    if (!phone.trim()) {
      setErrorMessage('Nomor WhatsApp aktif wajib diisi.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password minimal terdiri dari 6 karakter.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Konfirmasi password tidak cocok.');
      return;
    }

    if (!agreeTerms) {
      setErrorMessage('Anda harus menyetujui Syarat & Ketentuan.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Direct user to OTP page for WhatsApp verification
      navigate({ to: '/otp', search: { phone, name: fullName, type: 'register' } as any });
    }, 800);
  };

  const handleGoogleSignUp = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Pendaftaran dengan Google berhasil!');
      navigate({ to: '/' });
    }, 600);
  };

  return (
    <div className="auth-card">
      {/* Brand Header */}
      <Link to="/" className="auth-brand">
        <img src="/logo.jpg" alt="Satu Cerita Logo" className="w-10 h-10 rounded-xl object-cover shadow-sm shrink-0" />
        <span>Satu Cerita</span>
      </Link>

      <div className="text-center">
        <div className="auth-badge">
          <i className="fa-solid fa-[#00A896] fa-wand-magic-sparkles"></i> Gratis 100% Coba Dulu
        </div>
        <h1 className="auth-title">Buat Akun Baru</h1>
        <p className="auth-subtitle">
          Mulai buat undangan digital website &amp; video cantik hanya dalam hitungan menit.
        </p>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center gap-2">
          <i className="fa-solid fa-circle-exclamation text-rose-500"></i>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3.5">
        {/* Full Name */}
        <div className="auth-form-group">
          <label className="auth-label">
            <span>Nama Lengkap</span>
          </label>
          <div className="auth-input-wrapper">
            <i className="fa-solid fa-user auth-input-icon"></i>
            <input
              type="text"
              className="auth-input"
              placeholder="Contoh: Rizky Pratama"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
        </div>

        {/* WhatsApp Phone Number */}
        <div className="auth-form-group">
          <label className="auth-label">
            <span>Nomor WhatsApp Aktif</span>
          </label>
          <div className="auth-input-wrapper">
            <i className="fa-brands fa-whatsapp auth-input-icon"></i>
            <input
              type="tel"
              className="auth-input"
              placeholder="Contoh: 081234567890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <span className="text-[11px] text-gray-400 mt-1">
            *Kode verifikasi OTP akan dikirimkan ke nomor ini.
          </span>
        </div>

        {/* Email */}
        <div className="auth-form-group">
          <label className="auth-label">
            <span>Email</span>
          </label>
          <div className="auth-input-wrapper">
            <i className="fa-solid fa-envelope auth-input-icon"></i>
            <input
              type="email"
              className="auth-input"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="auth-form-group">
          <label className="auth-label">
            <span>Password</span>
          </label>
          <div className="auth-input-wrapper">
            <i className="fa-solid fa-lock auth-input-icon"></i>
            <input
              type={showPassword ? 'text' : 'password'}
              className="auth-input pr-10"
              placeholder="Buat password (min. 6 karakter)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="auth-input-action"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="auth-form-group">
          <label className="auth-label">
            <span>Konfirmasi Password</span>
          </label>
          <div className="auth-input-wrapper">
            <i className="fa-solid fa-shield-halved auth-input-icon"></i>
            <input
              type={showPassword ? 'text' : 'password'}
              className="auth-input"
              placeholder="Ulangi password di atas"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Agree Terms */}
        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-gray-600 select-none leading-snug">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 mt-0.5 rounded text-[#00A896] focus:ring-[#00A896] border-gray-300"
            />
            <span>
              Saya menyetujui <Link to="/faq" className="text-[#00A896] underline font-medium">Syarat &amp; Ketentuan</Link> serta Ketentuan Privasi Satu Cerita.
            </span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-full justify-center py-3.5 text-sm font-semibold rounded-xl shadow-lg shadow-[#00A896]/20 transition-all duration-200 mt-3"
        >
          {isLoading ? (
            <>
              <i className="fa-solid fa-circle-notch fa-spin mr-2"></i> Membuat Akun...
            </>
          ) : (
            <>
              Daftar Sekarang <i className="fa-solid fa-arrow-right ml-1"></i>
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="auth-divider">
        <span className="auth-divider-text">Atau Daftar Dengan</span>
      </div>

      {/* Google Sign Up */}
      <button type="button" onClick={handleGoogleSignUp} className="auth-social-btn">
        <svg className="w-4 h-4" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        Daftar dengan Google
      </button>

      {/* Footer Switch */}
      <p className="mt-6 text-center text-xs text-gray-500">
        Sudah punya akun?{' '}
        <Link to="/login" className="font-bold text-[#00A896] hover:underline">
          Masuk di sini
        </Link>
      </p>
    </div>
  );
}
