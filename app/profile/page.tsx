"use client";

import Link from "next/link";
import { Vazirmatn } from "next/font/google";

import {
  ArrowLeft,
  ChevronLeft,
  Crown,
  Heart,
  Music,
  Settings,
  Wallet,
  CalendarDays,
  UserRound,
} from "lucide-react";

import { useGetMyProfileQuery } from "@/redux/services/profileApiSlice";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
});
export default function ProfilePage() {
  const {
    data: profile,
    isLoading,
    isError,
  } = useGetMyProfileQuery();

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#0b0b0b] px-4 py-6 text-white">
        <div className="mx-auto w-full max-w-[440px] animate-pulse">
          <div className="mb-6 h-8 w-24 rounded-lg bg-white/[0.06]" />

          <div className="flex flex-col items-center">
            <div className="h-24 w-24 rounded-full bg-white/[0.08]" />
            <div className="mt-4 h-5 w-32 rounded bg-white/[0.06]" />
            <div className="mt-2 h-4 w-40 rounded bg-white/[0.04]" />
          </div>

          <div className="mt-8 h-24 rounded-2xl bg-white/[0.05]" />

          <div className="mt-4 h-20 rounded-2xl bg-white/[0.05]" />
          <div className="mt-3 h-20 rounded-2xl bg-white/[0.05]" />
        </div>
      </main>
    );
  }

  if (isError || !profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0b0b0b] px-5 text-white">
        <div className="text-center">
          <UserRound className="mx-auto mb-4 text-white/30" size={42} />

          <h1 className="text-lg font-semibold">
            دریافت پروفایل ناموفق بود
          </h1>

          <p className="mt-2 text-sm text-white/40">
            دوباره تلاش کنید.
          </p>
        </div>
      </main>
    );
  }

  const fullName =
    `${profile.first_name ?? ""} ${profile.last_name ?? ""}`.trim();

  const displayName = fullName || profile.username;

  const activeArtistSubscriptions =
    profile.artist_subscriptions?.filter(
      (subscription) => subscription.is_active_subscription
    ) ?? [];

  return (
    <main
      dir="rtl"
      className={`min-h-screen bg-[#0b0b0b] px-4 pb-28 pt-5 text-white     ${vazirmatn.className}
`}
    >
      <div className="mx-auto w-full max-w-[440px]">

        {/* Header */}
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
            پروفایل
          </h1>

          <Link
            href="/settings"
            className="
              flex h-10 w-10 items-center justify-center
              rounded-full
              border border-white/[0.06]
              bg-white/[0.04]
              text-white/60
              transition
              hover:bg-white/[0.08]
              hover:text-white
              active:scale-95
            "
          >
            <Settings size={19} />
          </Link>
        </header>

        {/* Profile */}
        <section className="relative overflow-hidden rounded-3xl border border-white/[0.07] bg-[#121212] p-6">

          <div
            className="
              pointer-events-none absolute
              -right-16 -top-20
              h-48 w-48
              rounded-full
              bg-purple-600/20
              blur-[80px]
            "
          />

          <div
            className="
              pointer-events-none absolute
              -bottom-20 -left-10
              h-40 w-40
              rounded-full
              bg-fuchsia-600/10
              blur-[70px]
            "
          />

          <div className="relative flex flex-col items-center">

            {/* Avatar */}
            <div
              className="
                h-24 w-24 overflow-hidden
                rounded-full
                border-2 border-purple-500/30
                bg-gradient-to-br
                from-purple-500
                via-fuchsia-500
                to-purple-700
                shadow-[0_0_35px_rgba(168,85,247,0.2)]
              "
            >
              {profile.image_url ? (
                <img
                  src={profile.image_url}
                  alt={displayName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <UserRound size={38} className="text-white/80" />
                </div>
              )}
            </div>

            <h2 className="mt-4 text-xl font-bold">
              {displayName}
            </h2>

            <p className="mt-1 text-sm text-white/40">
              @{profile.username}
            </p>

            {profile.is_artist && (
              <div
                className="
                  mt-3 flex items-center gap-1.5
                  rounded-full
                  border border-purple-500/20
                  bg-purple-500/10
                  px-3 py-1
                  text-xs text-purple-300
                "
              >
                <Music size={13} />
                هنرمند
              </div>
            )}

            <Link
              href="/settings/edit-profile"
              className="
                mt-5 flex items-center gap-2
                rounded-xl
                bg-white/[0.06]
                px-5 py-2.5
                text-sm font-medium
                text-white/80
                transition
                hover:bg-white/[0.1]
                active:scale-[0.98]
              "
            >
              ویرایش پروفایل
              <ChevronLeft size={16} />
            </Link>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-4 grid grid-cols-2 gap-3">

          <div className="rounded-2xl border border-white/[0.06] bg-[#121212] p-4">
            <div className="flex items-center gap-2 text-white/40">
              <Heart size={16} />
              <span className="text-xs">
                هنرمندان مورد علاقه
              </span>
            </div>

            <p className="mt-3 text-2xl font-bold">
              {profile.favorite_artists?.length ?? 0}
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.06] bg-[#121212] p-4">
            <div className="flex items-center gap-2 text-white/40">
              <Music size={16} />
              <span className="text-xs">
                ژانرهای مورد علاقه
              </span>
            </div>

            <p className="mt-3 text-2xl font-bold">
              {profile.favorite_genres?.length ?? 0}
            </p>
          </div>

        </section>

        {/* Subscription */}
        <section className="mt-4">

          <div className="mb-3 flex items-center justify-between px-1">
            <h3 className="text-sm font-semibold">
              اشتراک
            </h3>

            <Crown size={17} className="text-purple-400" />
          </div>

          <div
            className="
              relative overflow-hidden
              rounded-2xl
              border
              border-purple-500/15
              bg-gradient-to-br
              from-[#211333]
              via-[#17121d]
              to-[#121212]
              p-4
            "
          >

            <div
              className="
                pointer-events-none absolute
                -right-10 -top-10
                h-32 w-32
                rounded-full
                bg-purple-500/15
                blur-3xl
              "
            />

            <div className="relative flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex h-11 w-11
                    items-center justify-center
                    rounded-xl
                    bg-purple-500/15
                    text-purple-400
                  "
                >
                  <Crown size={21} />
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    {profile.has_active_subscription
                      ? "اشتراک فعال"
                      : "بدون اشتراک"}
                  </p>

                  <p className="mt-1 text-[11px] text-white/40">
                    {profile.has_active_subscription
                      ? "اشتراک شما فعال است"
                      : "از تجربه کامل Milify استفاده کنید"}
                  </p>
                </div>

              </div>

              <ChevronLeft
                size={18}
                className="text-white/30"
              />

            </div>

          </div>
        </section>

        {/* Artist subscriptions */}
        {activeArtistSubscriptions.length > 0 && (
          <section className="mt-6">

            <div className="mb-3 flex items-center justify-between px-1">
              <h3 className="text-sm font-semibold">
                اشتراک هنرمندان
              </h3>

              <span className="text-xs text-white/30">
                {activeArtistSubscriptions.length}
              </span>
            </div>

            <div className="space-y-2">

              {activeArtistSubscriptions.map((subscription) => (
                <div
                  key={subscription.id}
                  className="
                    flex items-center gap-3
                    rounded-2xl
                    border border-white/[0.06]
                    bg-[#121212]
                    p-3
                  "
                >

                  <div
                    className="
                      flex h-11 w-11
                      items-center justify-center
                      rounded-full
                      bg-gradient-to-br
                      from-purple-500
                      to-fuchsia-600
                    "
                  >
                    <Music size={19} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {subscription.artist_name}
                    </p>

                    <p className="mt-1 text-[11px] text-white/35">
                      {subscription.plan_name}
                    </p>
                  </div>

                  <div className="text-left">
                    <p className="text-xs text-purple-300">
                      فعال
                    </p>

                    <p className="mt-1 text-[10px] text-white/25">
                      {subscription.expires_at
                        ? new Date(
                            subscription.expires_at
                          ).toLocaleDateString("fa-IR")
                        : "—"}
                    </p>
                  </div>

                </div>
              ))}

            </div>
          </section>
        )}

        {/* Wallet */}
        <section className="mt-6">

          <div className="mb-3 px-1">
            <h3 className="text-sm font-semibold">
              کیف پول
            </h3>
          </div>

          <div
            className="
              flex items-center gap-4
              rounded-2xl
              border border-white/[0.06]
              bg-[#121212]
              p-4
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
              <Wallet size={21} />
            </div>

            <div className="flex-1">
              <p className="text-xs text-white/35">
                موجودی
              </p>

              <p className="mt-1 text-lg font-bold">
                {Number(profile.wallet?.balance ?? 0).toLocaleString(
                  "fa-IR"
                )}

                <span className="mr-1 text-xs font-normal text-white/35">
                  تومان
                </span>
              </p>
            </div>

          </div>
        </section>

        {/* Account info */}
        <section className="mt-6">

          <div className="mb-3 px-1">
            <h3 className="text-sm font-semibold">
              اطلاعات حساب
            </h3>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#121212]">

            <div className="flex items-center justify-between border-b border-white/[0.05] px-4 py-3.5">
              <span className="text-xs text-white/35">
                نام کاربری
              </span>

              <span className="text-sm text-white/75">
                @{profile.username}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-white/[0.05] px-4 py-3.5">
              <span className="text-xs text-white/35">
                ایمیل
              </span>

              <span className="max-w-[220px] truncate text-sm text-white/75">
                {profile.email}
              </span>
            </div>

            <div className="flex items-center justify-between px-4 py-3.5">
              <span className="text-xs text-white/35">
                عضویت
              </span>

              <span className="text-sm text-white/75">
                {new Date(profile.created_at).toLocaleDateString(
                  "fa-IR"
                )}
              </span>
            </div>

          </div>
        </section>

        {/* Footer */}
        <div className="mt-8 pb-4 text-center">
          <p className="text-[10px] tracking-widest text-white/15">
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
