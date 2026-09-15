"use client";

import { Vazirmatn } from "next/font/google";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpLeft,
  Headphones,
  HeartHandshake,
  Mic2,
  Music2,
  Play,
  Sparkles,
  Users,
  Video,
  Waves,
} from "lucide-react";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
});

const highlights = [
  {
    icon: Mic2,
    number: "01",
    title: "برای هنرمندان",
    body: "میلیفای با تمرکز روی نیازهای واقعی آرتیست‌های ایرانی ساخته شده تا مسیر انتشار، معرفی و رشد ساده‌تر شود.",
  },
  {
    icon: Sparkles,
    number: "02",
    title: "کشف استعدادهای جدید",
    body: "هدف ما این است که هنرمندانی که هنوز فرصت دیده شدن پیدا نکرده‌اند، بتوانند صدایشان را به مخاطب برسانند.",
  },
  {
    icon: Music2,
    number: "03",
    title: "انتشار موسیقی",
    body: "مدیریت و انتشار آثار موسیقی در یک فضای یکپارچه؛ بدون اینکه هنرمند درگیر پیچیدگی‌های فنی شود.",
  },
  {
    icon: Video,
    number: "04",
    title: "ویدیوهای کوتاه",
    body: "آرتیست می‌تواند با ویدیوهای کوتاه، قطعات، پشت‌صحنه و لحظات خلاقانه خودش را با مخاطب به اشتراک بگذارد.",
  },
  {
    icon: Users,
    number: "05",
    title: "ارتباط با مخاطب",
    body: "صفحه اختصاصی هنرمند، دنبال‌کننده‌ها و تعامل مستقیم؛ برای ساختن یک جامعه واقعی حول موسیقی.",
  },
  {
    icon: HeartHandshake,
    number: "06",
    title: "همراهی در مسیر رشد",
    body: "میلیفای فقط محل انتشار آهنگ نیست؛ ما می‌خواهیم در مسیر رشد و دیده شدن هنرمند همراهش باشیم.",
  },
];

export default function AboutPage() {
  return (
    <main
      dir="rtl"
      className={`${vazirmatn.className} min-h-screen overflow-hidden bg-[#070707] px-4 pb-28 pt-4 text-white`}
    >
      <div className="mx-auto w-full max-w-[440px]">
        {/* HEADER */}
        <header className="mb-5 flex items-center justify-between">
          <Link
            href="/settings"
            className="
              group flex h-10 w-10 items-center justify-center
              rounded-full border border-white/[0.07]
              bg-white/[0.035] text-white/60
              transition-all duration-300
              hover:border-purple-500/20
              hover:bg-purple-500/10
              hover:text-white
            "
          >
            <ArrowLeft
              size={18}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
          </Link>

          <div className="text-center">
            <p className="text-[10px] font-medium text-purple-400/70">
              MILIFY
            </p>

            <h1 className="mt-0.5 text-base font-bold">
              درباره ما
            </h1>
          </div>

          <div className="h-10 w-10" />
        </header>

        {/* HERO */}
        <section
          className="
            relative mb-4 overflow-hidden
            rounded-[28px]
            border border-white/[0.07]
            bg-[#101010]
            px-5 pb-6 pt-8
          "
        >
          {/* Background glow */}
          <div
            className="
              pointer-events-none absolute -right-24 -top-24
              h-56 w-56 rounded-full
              bg-purple-600/20 blur-[80px]
            "
          />

          <div
            className="
              pointer-events-none absolute -bottom-24 -left-20
              h-48 w-48 rounded-full
              bg-fuchsia-600/10 blur-[70px]
            "
          />

          {/* Decorative waves */}
          <div className="pointer-events-none absolute right-4 top-4 opacity-[0.04]">
            <Waves size={120} />
          </div>

          <div className="relative flex flex-col items-center text-center">
            {/* Logo */}
            <div className="relative">
              <div
                className="
                  absolute inset-0 rounded-[25px]
                  bg-purple-500/30 blur-2xl
                "
              />

              <div
                className="
                  relative flex h-[82px] w-[82px]
                  items-center justify-center
                  rounded-[25px]
                  border border-purple-300/20
                  bg-gradient-to-br
                  from-purple-500
                  via-purple-600
                  to-fuchsia-600
                  shadow-[0_15px_50px_rgba(139,92,246,0.25)]
                "
              >
                <Headphones
                  size={35}
                  strokeWidth={1.7}
                />

                <div
                  className="
                    absolute bottom-2 right-2
                    h-2 w-2 rounded-full
                    bg-green-400
                    shadow-[0_0_12px_rgba(74,222,128,0.8)]
                  "
                />
              </div>
            </div>

            <p className="mt-5 text-[10px] font-medium tracking-[0.22em] text-purple-400/70">
              MUSIC • ARTISTS • COMMUNITY
            </p>

            <h2 className="mt-2 text-[26px] font-black tracking-tight">
              میلیفای
            </h2>

            <p className="mt-1 text-xs text-white/35">
              خانه‌ای برای موسیقی و هنرمندان ایرانی
            </p>

            <p className="mt-5 max-w-[330px] text-[11px] leading-7 text-white/40">
              میلیفای با یک هدف ساده ساخته شده؛
              <span className="text-white/65">
                {" "}
                صدای هنرمندان ایرانی بیشتر شنیده شود.
              </span>
              {" "}
              ما می‌خواهیم انتشار اثر، ارتباط با مخاطب و رشد یک هنرمند،
              ساده‌تر از همیشه باشد.
            </p>

            {/* Mini stats */}
            <div className="mt-6 grid w-full grid-cols-3 gap-2">
              <Stat
                value="∞"
                label="استعداد"
              />

              <Stat
                value="24/7"
                label="موسیقی"
              />

              <Stat
                value="1"
                label="هدف"
              />
            </div>
          </div>
        </section>

        {/* MISSION */}
        <section
          className="
            relative mb-5 overflow-hidden
            rounded-[24px]
            border border-purple-500/15
            bg-gradient-to-br
            from-purple-500/[0.11]
            via-purple-500/[0.045]
            to-transparent
            p-5
          "
        >
          <div
            className="
              absolute -left-10 -top-10
              h-28 w-28 rounded-full
              bg-purple-500/10 blur-3xl
            "
          />

          <div className="relative">
            <div className="mb-3 flex items-center gap-2">
              <div
                className="
                  flex h-8 w-8 items-center justify-center
                  rounded-xl border border-purple-400/15
                  bg-purple-500/10 text-purple-300
                "
              >
                <Sparkles size={15} />
              </div>

              <p className="text-xs font-bold text-purple-200">
                مأموریت ما
              </p>
            </div>

            <p className="text-[11px] leading-7 text-white/45">
              ما باور داریم هر هنرمند یک داستان برای گفتن دارد.
              میلیفای ساخته شده تا فاصله بین{" "}
              <span className="text-white/70">
                خلق یک اثر
              </span>{" "}
              و{" "}
              <span className="text-white/70">
                رسیدن آن به گوش مخاطب
              </span>{" "}
              کوتاه‌تر شود.
            </p>

            <div className="mt-4 flex items-center gap-2 text-[10px] text-purple-300/60">
              <div className="h-px flex-1 bg-purple-500/15" />

              <span>MAKE • RELEASE • GROW</span>

              <div className="h-px flex-1 bg-purple-500/15" />
            </div>
          </div>
        </section>

        {/* SECTION TITLE */}
        <div className="mb-3 flex items-end justify-between px-1">
          <div>
            <p className="text-[10px] font-medium text-purple-400/60">
              FOR ARTISTS
            </p>

            <h3 className="mt-1 text-sm font-bold text-white/90">
              چیزی که می‌سازیم
            </h3>
          </div>

          <span className="text-[10px] text-white/20">
            06 امکانات
          </span>
        </div>

        {/* HIGHLIGHTS */}
        <div className="grid grid-cols-2 gap-3">
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <section
                key={item.title}
                className="
                  group relative overflow-hidden
                  rounded-[20px]
                  border border-white/[0.06]
                  bg-[#101010]
                  p-4
                  transition-all duration-300
                  hover:border-purple-500/20
                  hover:bg-[#131313]
                "
              >
                <div
                  className="
                    absolute -left-8 -top-8
                    h-20 w-20 rounded-full
                    bg-purple-500/0 blur-2xl
                    transition-all duration-500
                    group-hover:bg-purple-500/10
                  "
                />

                <div className="relative">
                  <div className="mb-4 flex items-start justify-between">
                    <div
                      className="
                        flex h-9 w-9 items-center justify-center
                        rounded-xl
                        border border-purple-500/15
                        bg-purple-500/[0.08]
                        text-purple-300
                        transition-all duration-300
                        group-hover:scale-105
                        group-hover:bg-purple-500/15
                      "
                    >
                      <Icon size={17} strokeWidth={1.8} />
                    </div>

                    <span className="text-[9px] font-medium text-white/15">
                      {item.number}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold leading-5 text-white/85">
                    {item.title}
                  </h4>

                  <p className="mt-2 text-[10px] leading-6 text-white/35">
                    {item.body}
                  </p>
                </div>
              </section>
            );
          })}
        </div>

        {/* VISION */}
        <section
          className="
            relative mt-5 overflow-hidden
            rounded-[24px]
            border border-white/[0.06]
            bg-[#101010]
            p-5
          "
        >
          <div
            className="
              absolute -right-20 top-1/2
              h-40 w-40 -translate-y-1/2
              rounded-full
              bg-purple-600/10 blur-[60px]
            "
          />

          <div className="relative">
            <div className="flex items-center gap-2">
              <div
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-xl bg-white/[0.05]
                  text-white/60
                "
              >
                <Play size={16} fill="currentColor" />
              </div>

              <div>
                <p className="text-[9px] text-white/25">
                  OUR VISION
                </p>

                <h3 className="mt-0.5 text-sm font-bold">
                  آینده موسیقی
                </h3>
              </div>
            </div>

            <p className="mt-4 text-[11px] leading-7 text-white/40">
              ما می‌خواهیم میلیفای فقط یک اپلیکیشن پخش موسیقی نباشد؛
              بلکه تبدیل به بستری شود که هنرمند بتواند در آن
              <span className="text-white/70">
                {" "}
                خلق کند، منتشر کند، مخاطب بسازد و رشد کند.
              </span>
            </p>

            <div className="mt-5 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />

              <div className="h-px flex-1 bg-gradient-to-l from-purple-500/30 to-transparent" />

              <span className="text-[9px] tracking-[0.15em] text-purple-300/40">
                THE FUTURE IS LOUD
              </span>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="
            relative mt-5 overflow-hidden
            rounded-[24px]
            border border-purple-500/15
            bg-gradient-to-br
            from-[#18121f]
            to-[#0f0f0f]
            px-5 py-6
            text-center
          "
        >
          <div className="absolute left-1/2 top-0 h-24 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/15 blur-3xl" />

          <div className="relative">
            <div
              className="
                mx-auto flex h-10 w-10
                items-center justify-center
                rounded-full
                bg-purple-500/10
                text-purple-300
              "
            >
              <Music2 size={18} />
            </div>

            <p className="mt-4 text-sm font-bold">
              صدای تو ارزش شنیده شدن دارد.
            </p>

            <p className="mx-auto mt-2 max-w-[300px] text-[10px] leading-6 text-white/30">
              اگر هنرمند هستی، میلیفای جایی برای ساختن،
              منتشر کردن و پیدا کردن مخاطب توست.
            </p>

            <Link
              href="/"
              className="
                mx-auto mt-5 flex h-11 w-full max-w-[250px]
                items-center justify-center gap-2
                rounded-xl
                bg-purple-600
                text-xs font-bold
                shadow-[0_10px_30px_rgba(124,58,237,0.2)]
                transition-all duration-300
                hover:bg-purple-500
                hover:shadow-[0_10px_35px_rgba(124,58,237,0.35)]
              "
            >
              ورود به میلیفای
              <ArrowUpLeft size={15} />
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <div className="mt-7 text-center">
          <div className="mx-auto mb-3 h-px w-16 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

          <p className="text-[10px] font-medium text-white/25">
            میلیفای
          </p>

          <p className="mt-1 text-[9px] text-white/15">
            همراه هنرمندان، شنونده‌ها و موسیقی ایران
          </p>

          <p className="mt-3 text-[8px] tracking-wider text-white/10">
            © {new Date().getFullYear()} MILIFY
          </p>
        </div>
      </div>
    </main>
  );
}

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div
      className="
        rounded-2xl
        border border-white/[0.05]
        bg-white/[0.025]
        px-2 py-3
      "
    >
      <p className="text-sm font-bold text-white/80">
        {value}
      </p>

      <p className="mt-1 text-[9px] text-white/25">
        {label}
      </p>
    </div>
  );
}
