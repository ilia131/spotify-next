"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { Vazirmatn } from "next/font/google";

import { useChangePasswordMutation } from "@/redux/services/profileApiSlice";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
});

export default function SecurityPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [changePassword, { isLoading }] =
    useChangePasswordMutation();

  const handleChangePassword = async () => {
    setMessage("");
    setError("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("لطفاً تمام فیلدها را تکمیل کنید.");
      return;
    }

    if (newPassword.length < 8) {
      setError("رمز عبور جدید باید حداقل ۸ کاراکتر باشد.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("تکرار رمز عبور با رمز جدید مطابقت ندارد.");
      return;
    }

    try {
      await changePassword({
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      }).unwrap();

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");

      setMessage("رمز عبور با موفقیت تغییر کرد.");
    } catch (error: any) {
      const apiError =
        error?.data?.current_password?.[0] ||
        error?.data?.new_password?.[0] ||
        error?.data?.confirm_password?.[0] ||
        error?.data?.detail ||
        "تغییر رمز عبور انجام نشد.";

      setError(apiError);
    }
  };

  const passwordStrength =
    newPassword.length === 0
      ? 0
      : newPassword.length < 8
      ? 1
      : newPassword.length < 12
      ? 2
      : 3;

  return (
    <main
      dir="rtl"
      className={`${vazirmatn.className} min-h-screen bg-[#090909] text-white`}
    >
      <div className="mx-auto min-h-screen w-full max-w-[440px] px-4 pb-10">
        {/* Header */}
        <header className="flex h-16 items-center justify-between">
          <Link
            href="/settings"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.05] transition hover:bg-white/[0.09]"
          >
            <ArrowLeft size={19} />
          </Link>

          <div className="flex items-center gap-2">
            <ShieldCheck
              size={19}
              className="text-purple-400"
            />

            <h1 className="text-base font-semibold">
              امنیت
            </h1>
          </div>

          <div className="w-10" />
        </header>

        {/* Security intro */}
        <section className="mt-5 rounded-2xl border border-purple-500/10 bg-gradient-to-br from-purple-500/[0.12] to-transparent p-5">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10">
            <ShieldCheck
              size={22}
              className="text-purple-400"
            />
          </div>

          <h2 className="text-sm font-semibold">
            امنیت حساب کاربری
          </h2>

          <p className="mt-2 text-[11px] leading-6 text-white/40">
            برای محافظت بیشتر از حساب Milify، می‌توانید
            رمز عبور خود را تغییر دهید.
          </p>
        </section>

        {/* Password */}
        <section className="mt-5">
          <div className="mb-2 px-2">
            <p className="text-[11px] font-semibold text-white/30">
              رمز عبور
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-[#121212] p-4">
            {/* Current password */}
            <PasswordInput
              label="رمز عبور فعلی"
              value={currentPassword}
              onChange={setCurrentPassword}
              visible={showCurrent}
              setVisible={setShowCurrent}
              placeholder="رمز عبور فعلی"
            />

            {/* New password */}
            <div className="mt-4">
              <PasswordInput
                label="رمز عبور جدید"
                value={newPassword}
                onChange={setNewPassword}
                visible={showNew}
                setVisible={setShowNew}
                placeholder="حداقل ۸ کاراکتر"
              />

              {newPassword && (
                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-[10px] text-white/30">
                      قدرت رمز عبور
                    </span>

                    <span
                      className={`text-[10px] ${
                        passwordStrength === 1
                          ? "text-red-400"
                          : passwordStrength === 2
                          ? "text-yellow-400"
                          : "text-green-400"
                      }`}
                    >
                      {passwordStrength === 1
                        ? "ضعیف"
                        : passwordStrength === 2
                        ? "متوسط"
                        : "قوی"}
                    </span>
                  </div>

                  <div className="flex gap-1">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className={`h-1 flex-1 rounded-full ${
                          item <= passwordStrength
                            ? passwordStrength === 1
                              ? "bg-red-500"
                              : passwordStrength === 2
                              ? "bg-yellow-500"
                              : "bg-green-500"
                            : "bg-white/[0.06]"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm */}
            <div className="mt-4">
              <PasswordInput
                label="تکرار رمز عبور جدید"
                value={confirmPassword}
                onChange={setConfirmPassword}
                visible={showConfirm}
                setVisible={setShowConfirm}
                placeholder="رمز عبور جدید را دوباره وارد کنید"
              />

              {confirmPassword && (
                <div className="mt-2 text-[10px]">
                  {newPassword === confirmPassword ? (
                    <span className="text-green-400">
                      رمزها با هم مطابقت دارند
                    </span>
                  ) : (
                    <span className="text-red-400">
                      رمزها با هم مطابقت ندارند
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Error */}
            {error && (
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-500/10 bg-red-500/[0.06] p-3">
                <AlertCircle
                  size={15}
                  className="mt-0.5 shrink-0 text-red-400"
                />

                <p className="text-[11px] leading-5 text-red-300">
                  {error}
                </p>
              </div>
            )}

            {/* Success */}
            {message && (
              <div className="mt-4 flex items-start gap-2 rounded-xl border border-green-500/10 bg-green-500/[0.06] p-3">
                <CheckCircle2
                  size={15}
                  className="mt-0.5 shrink-0 text-green-400"
                />

                <p className="text-[11px] leading-5 text-green-300">
                  {message}
                </p>
              </div>
            )}

            {/* Button */}
            <button
              type="button"
              onClick={handleChangePassword}
              disabled={
                isLoading ||
                !currentPassword ||
                !newPassword ||
                !confirmPassword
              }
              className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-purple-600 text-sm font-semibold transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:bg-white/[0.06] disabled:text-white/20"
            >
              <Lock size={16} />

              {isLoading
                ? "در حال تغییر..."
                : "تغییر رمز عبور"}
            </button>
          </div>
        </section>

        {/* Security tips */}
        <section className="mt-5 rounded-2xl border border-white/[0.05] bg-[#101010] p-4 mb-30">
          <h3 className="text-xs font-semibold">
            نکات امنیتی
          </h3>

          <ul className="mt-3 space-y-2 text-[10px] leading-5 text-white/35">
            <li>
              • از رمز عبور حداقل ۸ کاراکتری استفاده کنید.
            </li>

            <li>
              • از رمز عبور حساب‌های دیگر خود استفاده نکنید.
            </li>

            <li>
              • رمز عبور خود را با دیگران به اشتراک نگذارید.
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}

type PasswordInputProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  setVisible: (value: boolean) => void;
  placeholder: string;
};

function PasswordInput({
  label,
  value,
  onChange,
  visible,
  setVisible,
  placeholder,
}: PasswordInputProps) {
  return (
    <div>
      <label className="mb-2 block text-[11px] text-white/45">
        {label}
      </label>

      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-12 w-full rounded-xl border border-white/[0.06] bg-[#0c0c0c] px-4 pl-12 text-xs text-white outline-none transition placeholder:text-white/20 focus:border-purple-500/40"
          dir="ltr"
        />

        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-white/30 transition hover:bg-white/[0.05] hover:text-white/60"
        >
          {visible ? (
            <EyeOff size={16} />
          ) : (
            <Eye size={16} />
          )}
        </button>
      </div>
    </div>
  );
}