import React, { useState } from 'react';
import { Link, useNavigate } from '../../lib/tanstack-router';

export interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!identifier.trim()) {
      setErrorMessage('Nomor WhatsApp atau Email wajib diisi.');
      return;
    }

    if (loginMethod === 'password' && !password) {
      setErrorMessage('Password wajib diisi.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (loginMethod === 'otp') {
        // Redirect to OTP page with identifier query
        navigate({ to: '/otp', search: { phone: identifier, type: 'login' } as any });
      } else {
        if (onSuccess) {
          onSuccess();
        } else {
          // Success feedback
          alert('Berhasil Masuk! Selamat datang kembali di One Moment.');
          navigate({ to: '/' });
        }
      }
    }, 800);
  };

  const handleGoogleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert('Masuk dengan Google berhasil!');
      navigate({ to: '/' });
    }, 600);
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
          <i className="fa-solid fa-[#00A896] fa-shield-halved"></i> Area Pelanggan
        </div>
        <h1 className="auth-title">Masuk ke Akun</h1>
        <p className="auth-subtitle">
          Kelola undangan digital, pantau ucapan, dan atur RSVP acara kamu di satu tempat.
        </p>
      </div>

      {/* Login Mode Toggle */}
      <div className="flex bg-gray-100 p-1 rounded-xl mb-6 text-xs font-semibold">
        <button
          type="button"
          onClick={() => setLoginMethod('password')}
          className={`flex-1 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 ${
            loginMethod === 'password' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <i className="fa-solid fa-key"></i> Password
        </button>
        <button
          type="button"
          onClick={() => setLoginMethod('otp')}
          className={`flex-1 py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-1.5 ${
            loginMethod === 'otp' ? 'bg-white text-[#00A896] shadow-sm' : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <i className="fa-brands fa-whatsapp"></i> OTP WhatsApp
        </button>
      </div>

      {errorMessage && (
        <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-600 text-xs flex items-center gap-2">
          <i className="fa-solid fa-circle-exclamation text-rose-500"></i>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Identifier Field */}
        <div className="auth-form-group">
          <label className="auth-label">
            <span>{loginMethod === 'otp' ? 'Nomor WhatsApp' : 'Email / Nomor WhatsApp'}</span>
          </label>
          <div className="auth-input-wrapper">
            <i className={`fa-solid ${loginMethod === 'otp' ? 'fa-phone' : 'fa-envelope'} auth-input-icon`}></i>
            <input
              type={loginMethod === 'otp' ? 'tel' : 'text'}
              className="auth-input"
              placeholder={loginMethod === 'otp' ? 'Contoh: 081234567890' : 'Email atau 081234567890'}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              required
            />
          </div>
        </div>

        {/* Password Field */}
        {loginMethod === 'password' && (
          <div className="auth-form-group">
            <label className="auth-label">
              <span>Password</span>
              <Link to="/faq" className="text-xs text-[#00A896] hover:underline lowercase normal-case">
                Lupa Password?
              </Link>
            </label>
            <div className="auth-input-wrapper">
              <i className="fa-solid fa-lock auth-input-icon"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                className="auth-input pr-10"
                placeholder="Masukkan password kamu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="auth-input-action"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
              >
                <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
              </button>
            </div>
          </div>
        )}

        {/* Remember Me */}
        {loginMethod === 'password' && (
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-gray-600 select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded text-[#00A896] focus:ring-[#00A896] border-gray-300"
              />
              Ingat Saya di Perangkat Ini
            </label>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn btn-primary w-full justify-center py-3.5 text-sm font-semibold rounded-xl shadow-lg shadow-[#00A896]/20 transition-all duration-200 mt-2"
        >
          {isLoading ? (
            <>
              <i className="fa-solid fa-circle-notch fa-spin mr-2"></i> Memproses...
            </>
          ) : loginMethod === 'otp' ? (
            <>
              Kirim Kode OTP WhatsApp <i className="fa-solid fa-arrow-right ml-1"></i>
            </>
          ) : (
            <>
              Masuk Sekarang <i className="fa-solid fa-right-to-bracket ml-1"></i>
            </>
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="auth-divider">
        <span className="auth-divider-text">Atau Masuk Dengan</span>
      </div>

      {/* Google Sign In */}
      <button type="button" onClick={handleGoogleLogin} className="auth-social-btn">
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
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          />
        </svg>
        Lanjutkan dengan Google
      </button>

      {/* Footer Switch */}
      <p className="mt-8 text-center text-xs text-gray-500">
        Belum memiliki akun One Moment?{' '}
        <Link to="/register" className="font-bold text-[#00A896] hover:underline">
          Daftar Gratis
        </Link>
      </p>
    </div>
  );
}
