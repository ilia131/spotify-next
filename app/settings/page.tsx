"use client";

import { Vazirmatn } from "next/font/google";
import Link from "next/link";
import { useLogoutMutation } from "@/redux/services/authApiSlice";
import { useAppDispatch } from '@/redux/hook';
import { logout } from '@/redux/features/authSlice';
import { apiSlice } from '@/redux/services/apiSlice';
import {
  ArrowLeft,
  ChevronLeft,
  UserRound,
  Bell,
  Lock,
  LogOut,
  ShieldCheck,
  Info,
  Moon,
  Volume2,
  Wifi,
  Trash2,
} from "lucide-react";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
});

const settingItems = [
  {
    icon: UserRound,
    title: "اطلاعات حساب",
    description: "نام، ایمیل و اطلاعات پروفایل",
    href: "/profile",
  },
  {
    icon: Bell,
    title: "اعلان‌ها",
    description: "مدیریت اعلان‌های Milify",
    href: "#",
  },
  {
    icon: Lock,
    title: "امنیت و ورود",
    description: "رمز عبور و امنیت حساب",
    href: "settings/change-password",
  },
];

export default function SettingsPage() {

    const dispatch = useAppDispatch();

const [logoutRequest, { isLoading: isLoggingOut }] =
  useLogoutMutation();

const handleLogout = async () => {
  try {
    await logoutRequest(null).unwrap();
  } catch (error) {
    console.error('Logout error:', error);
  } finally {
    // پاک کردن auth
    dispatch(logout());

    // پاک کردن تمام cache های RTK Query
    dispatch(apiSlice.util.resetApiState());

    // خروج کامل
    window.location.replace('/');
  }
};
  return (
    <main
      dir="rtl"
      className={`${vazirmatn.className} min-h-screen bg-[#0b0b0b] px-4 pb-28 pt-5 text-white`}
    >
      <div className="mx-auto w-full max-w-[440px]">

        {/* ================= HEADER ================= */}

        <header className="mb-7 flex items-center justify-between">

          <Link
            href="/"
            className="
              flex h-10 w-10 items-center justify-center
              rounded-full
              border border-white/[0.06]
              bg-white/[0.04]
              text-white/70
              transition
              hover:bg-white/[0.08]
              hover:text-white
              active:scale-95
            "
          >
            <ArrowLeft size={19} />
          </Link>

          <h1 className="text-lg font-semibold">
            تنظیمات
          </h1>

          <div className="h-10 w-10" />

        </header>

        {/* ================= ACCOUNT ================= */}

        <section>

          <p className="mb-2 px-2 text-[11px] font-semibold text-white/30">
            حساب کاربری
          </p>

          <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#121212]">

            {settingItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className={`
                    group flex items-center gap-3
                    px-4 py-4
                    transition
                    hover:bg-white/[0.04]
                    active:bg-white/[0.06]
                    ${
                      index !== settingItems.length - 1
                        ? "border-b border-white/[0.05]"
                        : ""
                    }
                  `}
                >

                  <div
                    className="
                      flex h-11 w-11 shrink-0
                      items-center justify-center
                      rounded-xl
                      bg-white/[0.04]
                      text-white/60
                      transition
                      group-hover:bg-purple-500/10
                      group-hover:text-purple-400
                    "
                  >
                    <Icon size={20} strokeWidth={1.8} />
                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="text-sm font-medium text-white/85">
                      {item.title}
                    </p>

                    <p className="mt-1 truncate text-[11px] text-white/30">
                      {item.description}
                    </p>

                  </div>

                  <ChevronLeft
                    size={17}
                    className="
                      text-white/20
                      transition
                      group-hover:-translate-x-0.5
                      group-hover:text-white/50
                    "
                  />

                </Link>
              );
            })}

          </div>

        </section>

        {/* ================= PLAYER ================= */}

        <section className="mt-7">

          <p className="mb-2 px-2 text-[11px] font-semibold text-white/30">
            پخش موسیقی
          </p>

          <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#121212]">

            {/* Quality */}

            <button
              className="
                flex w-full items-center gap-3
                border-b border-white/[0.05]
                px-4 py-4
                text-right
                transition
                hover:bg-white/[0.04]
              "
            >

              <div
                className="
                  flex h-11 w-11 shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-purple-500/10
                  text-purple-400
                "
              >
                <Volume2 size={20} strokeWidth={1.8} />
              </div>

              <div className="min-w-0 flex-1">

                <p className="text-sm font-medium text-white/85">
                  کیفیت پخش
                </p>

                <p className="mt-1 text-[11px] text-white/30">
                  کیفیت پیش‌فرض پخش موسیقی
                </p>

              </div>

              <span className="text-xs text-purple-300">
                بالا
              </span>

            </button>

            {/* Data Saver */}

            <div
              className="
                flex items-center gap-3
                border-b border-white/[0.05]
                px-4 py-4
              "
            >

              <div
                className="
                  flex h-11 w-11 shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-white/[0.04]
                  text-white/55
                "
              >
                <Wifi size={20} strokeWidth={1.8} />
              </div>

              <div className="min-w-0 flex-1">

                <p className="text-sm font-medium text-white/85">
                  صرفه‌جویی در اینترنت
                </p>

                <p className="mt-1 text-[11px] text-white/30">
                  کاهش مصرف اینترنت هنگام پخش
                </p>

              </div>

              <button
                type="button"
                className="
                  relative h-6 w-11
                  rounded-full
                  bg-white/[0.12]
                  transition
                "
              >
                <span
                  className="
                    absolute right-1 top-1
                    h-4 w-4
                    rounded-full
                    bg-white/50
                    transition
                  "
                />
              </button>

            </div>

            {/* Background Play */}

            <div
              className="
                flex items-center gap-3
                px-4 py-4
              "
            >

              <div
                className="
                  flex h-11 w-11 shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-white/[0.04]
                  text-white/55
                "
              >
                <Moon size={20} strokeWidth={1.8} />
              </div>

              <div className="min-w-0 flex-1">

                <p className="text-sm font-medium text-white/85">
                  پخش در پس‌زمینه
                </p>

                <p className="mt-1 text-[11px] text-white/30">
                  ادامه پخش هنگام خروج از صفحه
                </p>

              </div>

              <div className="relative h-6 w-11 rounded-full bg-purple-500/80">

                <span
                  className="
                    absolute left-1 top-1
                    h-4 w-4
                    rounded-full
                    bg-white
                    shadow-sm
                  "
                />

              </div>

            </div>

          </div>

        </section>

        {/* ================= PRIVACY ================= */}

        <section className="mt-7">

          <p className="mb-2 px-2 text-[11px] font-semibold text-white/30">
            حریم خصوصی
          </p>

          <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#121212]">

            <Link
              href="settings/privacy-policy"
              className="
                group flex items-center gap-3
                border-b border-white/[0.05]
                px-4 py-4
                transition
                hover:bg-white/[0.04]
              "
            >

              <div
                className="
                  flex h-11 w-11
                  items-center justify-center
                  rounded-xl
                  bg-emerald-500/10
                  text-emerald-400
                "
              >
                <ShieldCheck size={20} />
              </div>

              <div className="flex-1">

                <p className="text-sm font-medium text-white/85">
                  حریم خصوصی
                </p>

                <p className="mt-1 text-[11px] text-white/30">
                  مدیریت اطلاعات و حریم خصوصی
                </p>

              </div>

              <ChevronLeft
                size={17}
                className="text-white/20"
              />

            </Link>

            <Link
              href="#"
              className="
                group flex items-center gap-3
                px-4 py-4
                transition
                hover:bg-white/[0.04]
              "
            >

              <div
                className="
                  flex h-11 w-11
                  items-center justify-center
                  rounded-xl
                  bg-white/[0.04]
                  text-white/55
                "
              >
                <Info size={20} />
              </div>

              <div className="flex-1">

                <Link href={"settings/about-us"} className="text-sm font-medium text-white/85">
                  درباره Milify
                </Link>

                <p className="mt-1 text-[11px] text-white/30">
                  نسخه و اطلاعات برنامه
                </p>

              </div>

              <span className="text-[10px] text-white/20">
                v1.0.0
              </span>

            </Link>

          </div>

        </section>

        {/* ================= LOGOUT ================= */}
        <section className="mt-7">
  <button
    type="button"
    onClick={handleLogout}
    disabled={isLoggingOut}
    className="
      group flex w-full items-center gap-3
      rounded-2xl
      border border-red-500/10
      bg-red-500/[0.04]
      px-4 py-4
      text-right
      transition
      hover:bg-red-500/[0.08]
      disabled:cursor-not-allowed
      disabled:opacity-50
    "
  >
    <div
      className="
        flex h-11 w-11
        items-center justify-center
        rounded-xl
        bg-red-500/10
        text-red-400
      "
    >
      <LogOut size={20} />
    </div>

    <div className="flex-1">
      <p className="text-sm font-medium text-red-400">
        {isLoggingOut
          ? "در حال خروج..."
          : "خروج از حساب"}
      </p>

      <p className="mt-1 text-[11px] text-red-400/35">
        {isLoggingOut
          ? "لطفاً صبر کنید"
          : "خروج از حساب کاربری Milify"}
      </p>
    </div>

    {!isLoggingOut && (
      <ChevronLeft
        size={17}
        className="text-red-400/30"
      />
    )}
  </button>
</section>

        {/* ================= DELETE ================= */}

        <button
          type="button"
          className="
            mt-4 flex w-full items-center justify-center gap-2
            py-3
            text-xs
            text-white/20
            transition
            hover:text-red-400
          "
        >
          <Trash2 size={14} />
          حذف حساب کاربری
        </button>

        {/* ================= FOOTER ================= */}

        <div className="mt-5 pb-5 text-center">

          <p className="text-[10px] tracking-[0.25em] text-white/15">
            MILIFY
          </p>

          <p className="mt-1 text-[10px] text-white/10">
            Music for your world
          </p>

        </div>

      </div>
    </main>
  );
}
