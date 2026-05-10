import { useState } from "react";

type Props = {
    isOpen: boolean
    onClose: () => void
    onCreate: (name: string) => void
}


const ModalPlayList = ({ isOpen, onClose, onCreate }: Props) => {
  const [name, setName] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!name.trim()) return;
    onCreate(name);
    setName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 px-6">
      
      <div className="bg-[#121212] w-107.5 max-[430px]:w-full rounded-lg p-6 text-white">
        
        {/* header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Create playlist</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-lg"
          >
            ✕
          </button>
        </div>

        {/* input */}
        <input
          type="text"
          placeholder="My Playlist"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-[#242424] rounded px-4 py-3 outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="bg-green-500 hover:bg-green-400 text-black font-semibold px-5 py-2 rounded-full"
          >
            Create
          </button>
        </div>

      </div>
    </div>
  );
};

export default ModalPlayList;
