"use client";
import { Vazirmatn } from "next/font/google";
import {
  X,
  Home,
  Search,
  Library,
  User,
  Settings,
  ChevronRight,
  Crown,
  Heart,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import AccountButton from "../NavSlider/AccountButton";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    icon: Home,
    title: "خانه",
    href: "/",
  },
  {
    icon: Search,
    title: "جستجو",
    href: "/search",
  },
  {
    icon: Library,
    title: "کتابخانه",
    href: "/library",
  },
  {
    icon: Heart,
    title: "آهنگ‌های پسندیده",
    href: "/library/LikedSongs",
  },
];

const accountItems = [
  {
    icon: User,
    title: "پروفایل",
    href: "/profile",
  },
  {
    icon: Settings,
    title: "تنظیمات",
    href: "/settings",
  },
];

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
});
const MenuBar = ({
  isOpen,
  onClose,
}: Props) => {
  return (
    <>
      {/* ================= BACKDROP ================= */}

      <div
        onClick={onClose}
        className={`
          fixed
          inset-0
          z-[199]
          bg-black/70
          backdrop-blur-md
          transition-all
          duration-500
          ${
            isOpen
              ? "visible opacity-100"
              : "invisible opacity-0"
          }
        `}
      />

      {/* ================= MENU ================= */}
      <aside
  className={`
    ${vazirmatn.className}

    fixed
    top-0
    right-0
    z-[200]
    h-screen
    w-full
    max-w-[400px]
    overflow-hidden
    bg-[#121212]
    border-l
    border-white/[0.08]
    shadow-[-20px_0_80px_rgba(0,0,0,0.45)]
    transition-transform
    duration-500
    ease-[cubic-bezier(0.22,1,0.36,1)]
    flex
    flex-col

    ${
      isOpen
        ? "translate-x-0"
        : "translate-x-full"
    }
  `}
>
        {/* ================= HEADER ================= */}

        <div className="relative px-5 pt-5 pb-4">

          {/* Glow */}

          <div
            className="
              pointer-events-none
              absolute
              -top-32
              -right-24
              w-64
              h-64
              rounded-full
              bg-purple-600/10
              blur-[90px]
            "
          />

          <div className="relative flex items-center justify-between">

            {/* Profile */}

            <div className="flex items-center gap-3">

              <div
                className="
                  flex
                  items-center
                  justify-center

                  w-12
                  h-12

                  rounded-full

                  bg-gradient-to-br
                  from-purple-500
                  to-fuchsia-600

                  shadow-[0_0_25px_rgba(168,85,247,0.25)]
                "
              >
                <AccountButton />
              </div>

              <div>
                <p className="text-[13px] text-white/45">
                  حساب کاربری
                </p>

                <p className="text-[15px] font-semibold text-white">
                  حساب من
                </p>
              </div>
            </div>

            {/* Close */}

            <button
              onClick={onClose}
              aria-label="بستن منو"
              className="
                flex
                items-center
                justify-center

                w-10
                h-10

                rounded-full

                bg-white/[0.05]

                border
                border-white/[0.06]

                text-white/60

                hover:bg-white/[0.1]
                hover:text-white

                active:scale-90

                transition-all
              "
            >
              <X size={20} />
            </button>

          </div>
        </div>

        {/* Divider */}

        <div className="mx-5 h-px bg-white/[0.06]" />

        {/* ================= CONTENT ================= */}

        <div className="h-[calc(100vh-150px)] overflow-y-auto px-4 py-5 scrollbar-hide">

          {/* ================= PREMIUM ================= */}

          <div
            className="
              relative
              overflow-hidden

              mb-6
              p-4

              rounded-2xl

              bg-gradient-to-br
              from-[#211333]
              via-[#18121f]
              to-[#141414]

              border
              border-purple-500/20

              shadow-[0_10px_40px_rgba(0,0,0,0.2)]
            "
          >

            {/* Glow */}

            <div
              className="
                absolute
                -right-10
                -top-10

                w-32
                h-32

                rounded-full

                bg-purple-500/20

                blur-3xl
              "
            />

            <div className="relative flex items-center gap-3">

              <div
                className="
                  flex
                  items-center
                  justify-center

                  w-10
                  h-10

                  rounded-xl

                  bg-purple-500/15

                  text-purple-400
                "
              >
                <Crown size={20} />
              </div>

              <div className="flex-1">

                <p className="text-sm font-semibold text-white">
                  Milify Premium
                </p>

                <p className="mt-0.5 text-[11px] text-white/40">
                  تجربه موسیقی بدون محدودیت
                </p>

              </div>

              <ChevronRight
                size={17}
                className="text-white/30"
              />

            </div>
          </div>

          {/* ================= MAIN MENU ================= */}

          <p
            className="
              px-3
              mb-2

              text-[11px]
              font-semibold
              uppercase
              tracking-[0.15em]

              text-white/30
            "
          >
            Milify
          </p>

          <div className="space-y-1">

            {menuItems.map((item) => {

              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={onClose}
                  className="
                    group

                    relative

                    flex
                    items-center
                    gap-4

                    px-3
                    py-3

                    rounded-xl

                    text-white/65

                    hover:bg-white/[0.06]
                    hover:text-white

                    transition-all
                    duration-200
                  "
                >

                  {/* Active indicator */}

                  <span
                    className="
                      absolute
                      left-0

                      w-0.5
                      h-5

                      rounded-full

                      bg-purple-500

                      opacity-0

                      group-hover:opacity-100

                      transition
                    "
                  />

                  <div
                    className="
                      flex
                      items-center
                      justify-center

                      w-10
                      h-10

                      rounded-xl

                      bg-white/[0.04]

                      border
                      border-white/[0.04]

                      group-hover:bg-purple-500/10
                      group-hover:border-purple-500/10

                      transition-all
                    "
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.8}
                    />
                  </div>

                  <span
                    className="
                      flex-1

                      text-[15px]
                      font-medium
                    "
                  >
                    {item.title}
                  </span>

                  <ChevronRight
                    size={16}
                    className="
                      text-white/20

                      group-hover:text-white/50

                      group-hover:translate-x-0.5

                      transition
                    "
                  />

                </Link>
              );
            })}

          </div>

          {/* ================= ACCOUNT ================= */}

          <div className="mt-7">

            <p
              className="
                px-3
                mb-2

                text-[11px]
                font-semibold
                uppercase
                tracking-[0.15em]

                text-white/30
              "
            >
              حساب
            </p>

            <div className="space-y-1">

              {accountItems.map((item) => {

                const Icon = item.icon;

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={onClose}
                    className="
                      group

                      flex
                      items-center
                      gap-4

                      px-3
                      py-3

                      rounded-xl

                      text-white/65

                      hover:bg-white/[0.06]
                      hover:text-white

                      transition-all
                    "
                  >

                    <div
                      className="
                        flex
                        items-center
                        justify-center

                        w-10
                        h-10

                        rounded-xl

                        bg-white/[0.04]

                        group-hover:bg-white/[0.08]

                        transition
                      "
                    >
                      <Icon
                        size={20}
                        strokeWidth={1.8}
                      />
                    </div>

                    <span className="flex-1 text-[15px] font-medium">
                      {item.title}
                    </span>

                    <ChevronRight
                      size={16}
                      className="
                        text-white/20
                        group-hover:text-white/50
                        transition
                      "
                    />

                  </Link>
                );
              })}

            </div>
          </div>

          {/* ================= LOGOUT ================= */}

          <button
            className="
              group

              mt-7

              w-full

              flex
              items-center
              gap-4

              px-3
              py-3

              rounded-xl

              text-white/40

              hover:bg-red-500/[0.08]
              hover:text-red-400

              transition-all
            "
          >

            <div
              className="
                flex
                items-center
                justify-center

                w-10
                h-10

                rounded-xl

                bg-white/[0.03]

                group-hover:bg-red-500/10

                transition
              "
            >
              <LogOut
                size={20}
                strokeWidth={1.8}
              />
            </div>

            <span className="text-[15px] font-medium">
              خروج از حساب
            </span>

          </button>

        </div>

        {/* ================= FOOTER ================= */}

        <div
          className="
            absolute
            bottom-0
            left-0
            right-0

            px-5
            py-4

            bg-[#121212]/95
            backdrop-blur-xl

            border-t
            border-white/[0.06]
          "
        >

          <div className="flex items-center justify-between">

            <div>
              <p className="text-[11px] text-white/25">
                MILIFY
              </p>

              <p className="text-[10px] text-white/15">
                Music for your world
              </p>
            </div>

            <span className="text-[10px] text-white/20">
              v1.0.0
            </span>

          </div>

        </div>

      </aside>
    </>
  );
};

export default MenuBar;