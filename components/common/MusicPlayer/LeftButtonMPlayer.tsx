"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { togglePlay } from "@/redux/features/playerSlice";



import CastPlayer from "./CastPlayer"
import PauseSvg from "./PauseSvg"
import PlaySvg from "./PlaySvg"

type LeftButtonMPlayerProps = {
  onClick: () => void;
};

const LeftButtonMPlayer = ({onClick}:LeftButtonMPlayerProps) => {
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector((state) => state.player.isPlaying);

  const handleToggle = () => {
    dispatch(togglePlay());
  };

  return (
    <div className=" w-14 flex items-center justify-between">
       <button onClick={onClick} title="play">
        <CastPlayer />
        </button>
        <button onClick={handleToggle} className="active:scale-95 transition flex items-center ">
        {isPlaying ? <PauseSvg /> : <PlaySvg />}
        </button>
  </div>
  )
}

export default LeftButtonMPlayer