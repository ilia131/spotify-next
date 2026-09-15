"use client";

import { useEffect, useRef, useState } from "react";
import { Vazirmatn } from "next/font/google";
import Link from "next/link";
import {
  ArrowLeft,
  Camera,
  Loader2,
  Save,
  UserRound,
} from "lucide-react";

import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from "@/redux/services/profileApiSlice";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  display: "swap",
});

export default function SettingsPage() {

  const {
    data: profile,
    isLoading,
    isError,
  } = useGetMyProfileQuery();

  const [
    updateProfile,
    {
      isLoading: isUpdating,
    },
  ] = useUpdateMyProfileMutation();

  const fileInputRef =
    useRef<HTMLInputElement>(null);

  const [
    username,
    setUsername,
  ] = useState("");

  const [
    firstName,
    setFirstName,
  ] = useState("");

  const [
    lastName,
    setLastName,
  ] = useState("");

  const [
    preview,
    setPreview,
  ] = useState<string | null>(null);

  const [
    selectedFile,
    setSelectedFile,
  ] = useState<File | null>(null);

  const [
    message,
    setMessage,
  ] = useState("");

  useEffect(() => {

    if (!profile) {
      return;
    }

    setUsername(
      profile.username ?? ""
    );

    setFirstName(
      profile.first_name ?? ""
    );

    setLastName(
      profile.last_name ?? ""
    );

    setPreview(
      profile.image_url ?? null
    );

  }, [profile]);

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    setSelectedFile(file);

    const objectUrl =
      URL.createObjectURL(file);

    setPreview(objectUrl);
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();

    setMessage("");

    try {

      await updateProfile({
        username,
        first_name: firstName,
        last_name: lastName,
        profile_pic: selectedFile,
      }).unwrap();

      setMessage(
        "تغییرات با موفقیت ذخیره شد."
      );

      setSelectedFile(null);

    } catch (error: any) {

      console.error(error);

      const backendMessage =
        error?.data?.username?.[0] ||
        error?.data?.detail ||
        "ذخیره تغییرات ناموفق بود.";

      setMessage(
        backendMessage
      );
    }
  };

  if (isLoading) {

    return (
      <main
        dir="rtl"
        className={`${vazirmatn.className} min-h-screen bg-[#0b0b0b] text-white`}
      >
        <div className="mx-auto max-w-[440px] px-4 pt-6">

          <div className="h-10 w-32 animate-pulse rounded bg-white/[0.06]" />

          <div className="mt-8 h-28 animate-pulse rounded-2xl bg-white/[0.05]" />

          <div className="mt-4 h-14 animate-pulse rounded-xl bg-white/[0.05]" />

          <div className="mt-3 h-14 animate-pulse rounded-xl bg-white/[0.05]" />

          <div className="mt-3 h-14 animate-pulse rounded-xl bg-white/[0.05]" />

        </div>
      </main>
    );
  }

  if (isError || !profile) {

    return (
      <main
        dir="rtl"
        className={`${vazirmatn.className} flex min-h-screen items-center justify-center bg-[#0b0b0b] px-5 text-white`}
      >
        خطا در دریافت اطلاعات پروفایل
      </main>
    );
  }

  return (
    <main
      dir="rtl"
      className={`${vazirmatn.className} min-h-screen bg-[#0b0b0b] px-4 pb-28 pt-5 text-white`}
    >

      <div className="mx-auto w-full max-w-[440px]">

        {/* HEADER */}

        <header className="mb-7 flex items-center justify-between">

          <Link
            href="/profile"
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-full
              border border-white/[0.06]
              bg-white/[0.04]
              text-white/70
              transition
              hover:bg-white/[0.08]
            "
          >
            <ArrowLeft size={19} />
          </Link>

          <h1 className="text-lg font-semibold">
            تنظیمات
          </h1>

          <div className="h-10 w-10" />

        </header>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* PROFILE IMAGE */}

          <section
            className="
              rounded-3xl
              border border-white/[0.06]
              bg-[#121212]
              p-6
            "
          >

            <div className="flex flex-col items-center">

              <button
                type="button"
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="
                  group relative
                  h-24 w-24
                  overflow-hidden
                  rounded-full
                  border-2
                  border-purple-500/30
                  bg-gradient-to-br
                  from-purple-500
                  to-fuchsia-600
                "
              >

                {preview ? (
                  <img
                    src={preview}
                    alt={profile.username}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <UserRound size={36} />
                  </div>
                )}

                <div
                  className="
                    absolute inset-0
                    flex items-center justify-center
                    bg-black/60
                    opacity-0
                    transition
                    group-hover:opacity-100
                  "
                >
                  <Camera size={22} />
                </div>

              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />

              <p className="mt-3 text-xs text-white/35">
                تغییر عکس پروفایل
              </p>

            </div>

          </section>

          {/* FORM */}

          <section
            className="
              rounded-2xl
              border border-white/[0.06]
              bg-[#121212]
              p-4
            "
          >

            {/* USERNAME */}

            <div className="mb-4">

              <label className="mb-2 block text-xs text-white/40">
                نام کاربری
              </label>

              <input
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                className="
                  w-full
                  rounded-xl
                  border border-white/[0.07]
                  bg-white/[0.04]
                  px-4 py-3
                  text-sm text-white
                  outline-none
                  transition
                  placeholder:text-white/20
                  focus:border-purple-500/40
                  focus:bg-white/[0.06]
                "
                placeholder="نام کاربری"
              />

            </div>

            {/* FIRST NAME */}

            <div className="mb-4">

              <label className="mb-2 block text-xs text-white/40">
                نام
              </label>

              <input
                value={firstName}
                onChange={(e) =>
                  setFirstName(e.target.value)
                }
                className="
                  w-full
                  rounded-xl
                  border border-white/[0.07]
                  bg-white/[0.04]
                  px-4 py-3
                  text-sm text-white
                  outline-none
                  transition
                  focus:border-purple-500/40
                "
                placeholder="نام"
              />

            </div>

            {/* LAST NAME */}

            <div className="mb-4">

              <label className="mb-2 block text-xs text-white/40">
                نام خانوادگی
              </label>

              <input
                value={lastName}
                onChange={(e) =>
                  setLastName(e.target.value)
                }
                className="
                  w-full
                  rounded-xl
                  border border-white/[0.07]
                  bg-white/[0.04]
                  px-4 py-3
                  text-sm text-white
                  outline-none
                  transition
                  focus:border-purple-500/40
                "
                placeholder="نام خانوادگی"
              />

            </div>

            {/* EMAIL */}

            <div>

              <label className="mb-2 block text-xs text-white/40">
                ایمیل
              </label>

              <input
                value={profile.email}
                disabled
                className="
                  w-full
                  rounded-xl
                  border border-white/[0.05]
                  bg-white/[0.02]
                  px-4 py-3
                  text-sm text-white/30
                  outline-none
                "
              />

              <p className="mt-2 text-[10px] text-white/20">
                ایمیل قابل تغییر نیست.
              </p>

            </div>

          </section>

          {/* MESSAGE */}

          {message && (
            <div
              className="
                rounded-xl
                border border-emerald-500/15
                bg-emerald-500/[0.06]
                px-4 py-3
                text-xs
                text-emerald-400
              "
            >
              {message}
            </div>
          )}

          {/* SAVE */}

          <button
            type="submit"
            disabled={isUpdating}
            className="
              flex w-full
              items-center justify-center gap-2
              rounded-2xl
              bg-purple-600
              px-4 py-3.5
              text-sm font-semibold
              text-white
              shadow-[0_10px_30px_rgba(147,51,234,0.2)]
              transition
              hover:bg-purple-500
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            {isUpdating ? (
              <>
                <Loader2
                  size={18}
                  className="animate-spin"
                />

                در حال ذخیره...
              </>
            ) : (
              <>
                <Save size={18} />

                ذخیره تغییرات
              </>
            )}

          </button>

        </form>

      </div>
    </main>
  );
}
