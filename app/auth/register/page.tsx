"use client";

import {   useMemo, useState } from "react";
import { useRegisterMutation } from "@/redux/services/authApiSlice";
import { useGetArtistsListQuery } from "@/redux/services/artistApislice";
import Image from "next/image";
import { toast } from "react-toastify";

type Artist = {
  id: number;
  artistname: string;
  profile_pic?: string | null;
};

export default function RegisterPage() {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    password: "",
    re_password: "",
    favorite_artists: [] as string[],
  });

  const [artistQuery, setArtistQuery] = useState("");
  const { data: artists = [], isLoading: artistsLoading } =useGetArtistsListQuery(0);
  const [register, { isLoading, isError, error, isSuccess }] =
    useRegisterMutation();


  const filteredArtists = useMemo(() => {
    if (!artistQuery.trim()) return artists;
    return artists.filter((artist: { artistname: string; }) =>
      artist.artistname.toLowerCase().includes(artistQuery.toLowerCase())
    );
  }, [artistQuery, artists]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleArtist = (artistname: string) => {
    setFormData((prev) => {
      const exists = prev.favorite_artists.includes(artistname);

      if (exists) {
        return {
          ...prev,
          favorite_artists: prev.favorite_artists.filter(
            (name) => name !== artistname
          ),
        };
      }

      return {
        ...prev,
        favorite_artists: [...prev.favorite_artists, artistname],
      };
    });
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.re_password
    ) {
      alert("Please fill all required fields.");
      return;
    }

    if (formData.password !== formData.re_password) {
      alert("Passwords do not match.");
      return;
    }

    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        console.log(formData)

      await register(formData).unwrap();
       toast.success("✅ Registration successful! Check your email for activation.");
    } catch (err) {
        const apiError = err as { data?: Record<string, string> };
      
        if (apiError?.data) {
          const message = Object.values(apiError.data).flat().join("\n");
          toast.error(message);
        } else {
          toast.error("Registration failed.");
        }
      }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex items-center justify-center px-4 ">
      <div className="w-full max-w-2xl px-4 py-2 shadow-lg">
        <h1 className="text-3xl font-bold mb-2 text-center">Milify</h1>
        <p className="text-center text-gray-400 mb-2">
          Step {step} of 2
        </p>

        {step === 1 && (
          <form onSubmit={handleNextStep} className="flex flex-col gap-4">
            <div>
              <label htmlFor="first_name" className="text-sm mb-1 block">
                First name
              </label>
              <input
                id="first_name"
                name="first_name"
                type="text"
                placeholder="First Name"
                required
                value={formData.first_name}
                onChange={handleChange}
                className="w-full p-3 rounded bg-[#282828] text-white outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="last_name" className="text-sm mb-1 block">
                Last name
              </label>
              <input
                id="last_name"
                name="last_name"
                type="text"
                placeholder="Last Name"
                required
                value={formData.last_name}
                onChange={handleChange}
                className="w-full p-3 rounded bg-[#282828] text-white outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="username" className="text-sm mb-1 block">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 rounded bg-[#282828] text-white outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-sm mb-1 block">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 rounded bg-[#282828] text-white outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="text-sm mb-1 block">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 rounded bg-[#282828] text-white outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label htmlFor="re_password" className="text-sm mb-1 block">
                Confirm password
              </label>
              <input
                id="re_password"
                name="re_password"
                type="password"
                placeholder="Confirm Password"
                required
                value={formData.re_password}
                onChange={handleChange}
                className="w-full p-3 rounded bg-[#282828] text-white outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              className="mt-4 bg-green-500 hover:bg-green-600 text-black font-semibold py-3 rounded-[34px]"
            >
              Continue
            </button>
          </form>
        )}

{step === 2 && (
  <form onSubmit={handleSubmit} className="flex flex-col gap-6">

    {/* Search */}
    <div>
      <input
        type="text"
        placeholder="Search artists..."
        value={artistQuery}
        onChange={(e) => setArtistQuery(e.target.value)}
        className="w-full p-3 px-4 rounded-full bg-white text-black placeholder-gray-500 outline-none focus:ring-2 focus:ring-green-500"
      />
    </div>

    {/* Artists grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-h-105 py-2 overflow-y-auto pr-2">
      {artistsLoading ? (
        <p className="text-gray-400">Loading artists...</p>
      ) : (
        filteredArtists.map((artist: Artist) => {
          const selected = formData.favorite_artists.includes(
            artist.artistname
          );

          return (
            <button
              key={artist.id}
              type="button"
              onClick={() => toggleArtist(artist.artistname)}
              className="flex flex-col items-center group"
            >
              <div className="relative">

                <Image
                  width={112}
                  height={112}
                  src={artist.profile_pic || "/artist-placeholder.jpg"}
                  alt={artist.artistname}
                  className={`w-28 h-28 object-cover rounded-full transition ${
                    selected ? "ring-4 ring-green-500" : ""
                  }`}
                />

                {/* overlay */}
                {selected && (
                  <div className="absolute inset-0 bg-green-500/40 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-black font-bold">
                      ✓
                    </div>
                  </div>
                )}
              </div>

              <span className="mt-2 text-sm text-center text-white group-hover:text-green-400">
                {artist.artistname}
              </span>
            </button>
          );
        })
      )}
    </div>

    {/* Selected artists */}
    {formData.favorite_artists.length > 0 && (
      <div>
        <p className="text-sm text-gray-400 mb-2">Selected artists</p>
        <div className="flex flex-wrap gap-2">
          {formData.favorite_artists.map((artist) => (
            <span
              key={artist}
              className="px-3 py-1 bg-green-500 text-black rounded-full text-sm"
            >
              {artist}
            </span>
          ))}
        </div>
      </div>
    )}

    {/* buttons */}
    <div className="flex gap-3">
      <button
        type="button"
        onClick={() => setStep(1)}
        className="w-1/2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-full"
      >
        Back
      </button>

      <button
        type="submit"
        disabled={isLoading}
        className="w-1/2 bg-green-500 hover:bg-green-600 text-black font-semibold py-3 rounded-full"
      >
        {isLoading ? "Creating..." : "Complete"}
      </button>
    </div>
  </form>
)}
        <div className="text-center text-sm text-gray-400 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-green-500 hover:underline">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
}
