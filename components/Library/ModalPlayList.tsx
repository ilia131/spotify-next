import { useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string) => void;
};

const ModalPlayList = ({
  isOpen,
  onClose,
  onCreate,
}: Props) => {
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!name.trim()) return;

    onCreate(name);
    setName("");
    onClose();
  };

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        p-5
      "
    >
      {/* Liquid Glass Overlay */}

      <div
        className="
          absolute inset-0
          bg-black/40
          backdrop-blur-2xl
        "
        onClick={onClose}
      />

      {/* Floating Lights */}

      <div
        className="
          absolute
          w-96 h-96
          rounded-full
          bg-green-500/10
          blur-3xl
          -top-20
          -left-20
        "
      />

      <div
        className="
          absolute
          w-96 h-96
          rounded-full
          bg-cyan-500/10
          blur-3xl
          bottom-0
          right-0
        "
      />

      {/* Modal */}

      <div
        className="
          relative
          w-full
          max-w-md

          rounded-[32px]

          bg-white/5
          backdrop-blur-3xl

          border
          border-white/10

          shadow-[0_20px_80px_rgba(0,0,0,0.45)]

          overflow-hidden

          animate-[modalShow_.25s_ease]
        "
      >
        {/* Glass Shine */}

        <div
          className="
            absolute
            inset-0

            bg-gradient-to-br
            from-white/10
            via-transparent
            to-transparent

            pointer-events-none
          "
        />

        {/* Header */}

        <div className="relative p-7 pb-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/50 text-sm">
                Playlist
              </p>

              <h2 className="text-white text-2xl font-bold mt-1">
                Create Playlist
              </h2>
            </div>

            <button
              onClick={onClose}
              className="
                w-10 h-10
                rounded-full

                bg-white/5
                border border-white/10

                flex items-center justify-center

                text-white/60
                hover:text-white
                hover:bg-white/10

                transition-all
              "
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}

        <div className="px-7">
          <label className="text-white/50 text-sm">
            Playlist Name
          </label>

          <input
            type="text"
            placeholder="My Playlist"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="
              mt-3
              w-full
              h-14

              rounded-2xl

              bg-black/20
              border border-white/10

              px-5

              text-white
              placeholder:text-white/30

              outline-none

              focus:border-green-500/50
              focus:ring-4
              focus:ring-green-500/10

              transition-all
            "
          />
        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 p-7">
          <button
            onClick={onClose}
            className="
              px-5
              h-11

              rounded-full

              text-white/60
              hover:text-white

              transition
            "
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="
              px-6
              h-11

              rounded-full

              bg-green-500
              hover:bg-green-400

              text-black
              font-semibold

              shadow-lg
              shadow-green-500/20

              transition-all
              hover:scale-105
              active:scale-95
            "
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPlayList;