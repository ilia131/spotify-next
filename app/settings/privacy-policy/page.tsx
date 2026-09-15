"use client";

import { Vazirmatn } from "next/font/google";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  Ban,
  CheckCircle2,
  ChevronLeft,
  FileText,
  Gavel,
  Info,
  Scale,
  Shield,
  UserX,
  Wallet,
} from "lucide-react";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
});

const sections = [
  {
    icon: Shield,
    number: "01",
    title: "مسئولیت صفحه هنرمند",
    body: "مسئولیت کامل محتوای صفحه هنرمند، از جمله نام، بیوگرافی، لینک‌ها، تصویر پروفایل، پست‌ها، موسیقی‌ها، ویدیوهای کوتاه و سایر مطالب منتشرشده، بر عهده خود هنرمند است. میلیفای بستر انتشار و ارائه خدمات است و مسئولیت محتوای ارسالی هنرمند بر عهده وی خواهد بود.",
  },
  {
    icon: AlertTriangle,
    number: "02",
    title: "محتوای غیرمجاز",
    body: "بارگذاری، تولید، انتشار یا ترویج محتوای غیرقانونی، مغایر با قوانین جمهوری اسلامی ایران، خلاف عفت عمومی، توهین‌آمیز، تهدیدآمیز، خشونت‌بار غیرقانونی یا ناقض حقوق اشخاص در موسیقی، ویدیوهای کوتاه و سایر بخش‌های پلتفرم ممنوع است.",
  },
  {
    icon: Ban,
    number: "03",
    title: "تعلیق و مسدودسازی حساب",
    body: "در صورت احراز تخلف جدی یا تکرار تخلفات، میلیفای می‌تواند نسبت به حذف محتوا، محدود کردن دسترسی، تعلیق موقت یا مسدودسازی دائمی حساب اقدام کند. در موارد جدی، امکان اعمال محدودیت بدون اخطار قبلی وجود خواهد داشت.",
  },
  {
    icon: Wallet,
    number: "04",
    title: "درآمد و موجودی حساب",
    body: "در صورت مسدودسازی حساب به دلیل تخلف، وضعیت درآمد، موجودی کیف پول و مبالغ مرتبط با حساب مطابق قوانین پلتفرم، شرایط استفاده و الزامات قانونی بررسی خواهد شد. در صورت وجود تخلف مالی یا قانونی، میلیفای می‌تواند پرداخت یا برداشت مبالغ مرتبط را تا تعیین تکلیف نهایی متوقف کند.",
  },
  {
    icon: Scale,
    number: "05",
    title: "قوانین حاکم",
    body: "استفاده از خدمات میلیفای به معنای پذیرش شرایط استفاده، قوانین و سیاست‌های اعلام‌شده در پلتفرم است. استفاده‌کننده موظف است در تمام مدت فعالیت خود قوانین جاری جمهوری اسلامی ایران و حقوق اشخاص ثالث را رعایت کند.",
  },
  {
    icon: Gavel,
    number: "06",
    title: "ابزارهای هوشمند و هوش مصنوعی",
    body: "ابزارهای هوشمند میلیفای، از جمله پیشنهاد متن، برچسب‌گذاری یا قابلیت‌های مبتنی بر هوش مصنوعی، صرفاً ابزار کمکی هستند. مسئولیت بررسی و تأیید نهایی محتوایی که منتشر می‌شود بر عهده کاربر یا هنرمند است.",
  },
];

export default function PrivacyPolicyPage() {
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
              bg-white/[0.035]
              text-white/60
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
            <p className="text-[9px] font-medium tracking-[0.2em] text-purple-400/60">
              MILIFY
            </p>

            <h1 className="mt-0.5 text-base font-bold">
              حریم خصوصی و قوانین
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
            px-5 pb-6 pt-7
          "
        >
          {/* Glow */}
          <div
            className="
              pointer-events-none absolute
              -right-20 -top-20
              h-48 w-48 rounded-full
              bg-purple-600/20 blur-[70px]
            "
          />

          <div
            className="
              pointer-events-none absolute
              -bottom-20 -left-20
              h-40 w-40 rounded-full
              bg-fuchsia-600/10 blur-[60px]
            "
          />

          <div className="relative flex flex-col items-center text-center">
            {/* Icon */}
            <div className="relative">
              <div
                className="
                  absolute inset-0 rounded-[23px]
                  bg-purple-500/25 blur-2xl
                "
              />

              <div
                className="
                  relative flex h-[76px] w-[76px]
                  items-center justify-center
                  rounded-[23px]
                  border border-purple-300/20
                  bg-gradient-to-br
                  from-purple-500
                  via-purple-600
                  to-fuchsia-600
                  shadow-[0_15px_45px_rgba(139,92,246,0.22)]
                "
              >
                <FileText
                  size={30}
                  strokeWidth={1.7}
                />
              </div>
            </div>

            <p className="mt-5 text-[10px] font-medium tracking-[0.18em] text-purple-400/65">
              TERMS & PRIVACY
            </p>

            <h2 className="mt-2 text-xl font-black">
              قوانین میلیفای
            </h2>

            <p className="mt-3 max-w-[315px] text-[11px] leading-7 text-white/35">
              برای حفظ یک فضای امن، حرفه‌ای و قابل اعتماد برای
              هنرمندان و شنوندگان، رعایت قوانین زیر برای تمام
              کاربران الزامی است.
            </p>

            {/* Status */}
            <div
              className="
                mt-5 flex items-center gap-2
                rounded-full
                border border-green-500/10
                bg-green-500/[0.05]
                px-3 py-1.5
              "
            >
              <CheckCircle2
                size={12}
                className="text-green-400"
              />

              <span className="text-[9px] text-green-300/70">
                قوانین و شرایط استفاده
              </span>
            </div>
          </div>
        </section>

        {/* IMPORTANT NOTICE */}
        <section
          className="
            relative mb-5 overflow-hidden
            rounded-[22px]
            border border-red-500/15
            bg-gradient-to-br
            from-red-500/[0.08]
            to-transparent
            p-4
          "
        >
          <div className="flex gap-3">
            <div
              className="
                flex h-9 w-9 shrink-0
                items-center justify-center
                rounded-xl
                bg-red-500/10
                text-red-400
              "
            >
              <AlertTriangle size={17} />
            </div>

            <div>
              <h3 className="text-xs font-bold text-red-300">
                هشدار مهم
              </h3>

              <p className="mt-1.5 text-[10px] leading-6 text-red-200/50">
                انتشار محتوای غیرقانونی یا نقض حقوق دیگران
                می‌تواند منجر به حذف محتوا، محدودیت حساب،
                تعلیق یا مسدودسازی دائمی شود.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION TITLE */}
        <div className="mb-3 flex items-end justify-between px-1">
          <div>
            <p className="text-[9px] font-medium tracking-wider text-purple-400/60">
              PLATFORM RULES
            </p>

            <h3 className="mt-1 text-sm font-bold text-white/90">
              قوانین و شرایط
            </h3>
          </div>

          <span className="text-[9px] text-white/20">
            ۰۶ بخش
          </span>
        </div>

        {/* RULES */}
        <div className="space-y-3">
          {sections.map((item) => {
            const Icon = item.icon;

            return (
              <section
                key={item.title}
                className="
                  group relative overflow-hidden
                  rounded-[21px]
                  border border-white/[0.06]
                  bg-[#101010]
                  p-4
                  transition-all duration-300
                  hover:border-purple-500/15
                  hover:bg-[#121212]
                "
              >
                {/* Number */}
                <div
                  className="
                    absolute left-3 top-3
                    text-[9px] font-medium
                    text-white/[0.08]
                  "
                >
                  {item.number}
                </div>

                <div className="relative">
                  <div className="mb-3 flex items-center gap-3">
                    <div
                      className="
                        flex h-10 w-10 shrink-0
                        items-center justify-center
                        rounded-xl
                        border border-purple-500/15
                        bg-purple-500/[0.08]
                        text-purple-300
                        transition-all duration-300
                        group-hover:bg-purple-500/15
                      "
                    >
                      <Icon
                        size={17}
                        strokeWidth={1.8}
                      />
                    </div>

                    <h2 className="text-xs font-bold text-white/85">
                      {item.title}
                    </h2>
                  </div>

                  <p className="text-[10px] leading-7 text-white/35">
                    {item.body}
                  </p>
                </div>
              </section>
            );
          })}
        </div>

        {/* USER RESPONSIBILITY */}
        <section
          className="
            mt-5 overflow-hidden
            rounded-[22px]
            border border-white/[0.06]
            bg-[#101010]
          "
        >
          <div className="flex items-center gap-3 border-b border-white/[0.05] p-4">
            <div
              className="
                flex h-9 w-9 items-center justify-center
                rounded-xl
                bg-purple-500/10
                text-purple-300
              "
            >
              <UserX size={17} />
            </div>

            <div>
              <p className="text-[9px] text-white/25">
                YOUR RESPONSIBILITY
              </p>

              <h3 className="mt-0.5 text-xs font-bold">
                مسئولیت کاربر
              </h3>
            </div>
          </div>

          <div className="space-y-3 p-4">
            <ResponsibilityItem text="اطلاعات و محتوای منتشرشده باید صحیح و قانونی باشد." />
            <ResponsibilityItem text="حقوق مالکیت فکری و حقوق اشخاص دیگر باید رعایت شود." />
            <ResponsibilityItem text="استفاده از حساب برای فعالیت غیرقانونی ممنوع است." />
            <ResponsibilityItem text="کاربر مسئول حفظ امنیت اطلاعات ورود حساب خود است." />
          </div>
        </section>

        {/* INFO */}
        <section
          className="
            mt-5 rounded-[20px]
            border border-blue-500/10
            bg-blue-500/[0.04]
            p-4
          "
        >
          <div className="flex gap-3">
            <Info
              size={16}
              className="mt-0.5 shrink-0 text-blue-400/70"
            />

            <p className="text-[10px] leading-6 text-blue-200/40">
              قوانین و شرایط استفاده ممکن است با توجه به
              تغییرات سرویس، الزامات قانونی یا ویژگی‌های جدید
              پلتفرم به‌روزرسانی شوند. نسخه جدید قوانین از
              طریق همین صفحه در دسترس کاربران قرار خواهد گرفت.
            </p>
          </div>
        </section>

        {/* AGREEMENT */}
        <section
          className="
            relative mt-5 overflow-hidden
            rounded-[23px]
            border border-purple-500/15
            bg-gradient-to-br
            from-purple-500/[0.08]
            to-transparent
            px-5 py-5
            text-center
          "
        >
          <div
            className="
              mx-auto flex h-10 w-10
              items-center justify-center
              rounded-full
              bg-purple-500/10
              text-purple-300
            "
          >
            <Scale size={18} />
          </div>

          <h3 className="mt-4 text-xs font-bold">
            پذیرش قوانین
          </h3>

          <p className="mt-2 text-[10px] leading-6 text-white/30">
            ادامه استفاده از خدمات میلیفای به منزله مطالعه و
            پذیرش شرایط و قوانین اعلام‌شده در این صفحه است.
          </p>
        </section>

        {/* FOOTER */}
        <footer className="mt-7 text-center">
          <div className="mx-auto mb-3 h-px w-16 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

          <p className="text-[9px] font-medium text-white/25">
            میلیفای
          </p>

          <p className="mt-1 text-[8px] text-white/15">
            همراه موسیقی و هنرمندان ایران
          </p>

          <p className="mt-3 text-[8px] text-white/10">
            آخرین به‌روزرسانی: ۱۴۰۵
          </p>
        </footer>
      </div>
    </main>
  );
}

function ResponsibilityItem({
  text,
}: {
  text: string;
}) {
  return (
    <div className="flex items-start gap-2.5">
      <div
        className="
          mt-1 flex h-4 w-4 shrink-0
          items-center justify-center
          rounded-full bg-purple-500/10
        "
      >
        <CheckCircle2
          size={10}
          className="text-purple-400/70"
        />
      </div>

      <p className="text-[10px] leading-6 text-white/35">
        {text}
      </p>
    </div>
  );
}
