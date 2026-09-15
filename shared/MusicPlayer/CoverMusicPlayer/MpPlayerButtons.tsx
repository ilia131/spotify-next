import Shuffle from "@/public/Icons/Shuffle";
import BackButtonIcon from "@/public/Icons/BackButtonIcon";
import PauseCircle from "@/public/Icons/PauseCircle";
import NextButtonIcon from "@/public/Icons/NextButtonIcon";
import TimerButton from "@/public/Icons/TimerButton";
import PlayCircle from "@/public/Icons/PlayCircle";

import {
  useAppDispatch,
  useAppSelector,
} from "@/redux/hook";

import {
  togglePlay,
  playPrev,
} from "@/redux/features/playerSlice";

const MpPlayerButtons = ({
  onNext,
  onPrevious
}: {
  onNext: () => void;
  onPrevious :  ()=>void

}) => {
  const dispatch = useAppDispatch();

  const {
    isPlaying,
    queue,
  } = useAppSelector(
    (state) => state.player
  );

  const disabled =
    queue.length === 0;

  return (
    <div className="flex justify-between mt-2 mx-1 items-center">

      {/* Shuffle */}
      <button
        className="text-white"
        title="shuffle"
        type="button"
        disabled={disabled}
      >
        <Shuffle />
      </button>

      {/* Previous */}
      <button
        type="button"
        disabled={disabled}
        onClick={onPrevious}
      >
        <BackButtonIcon />
      </button>

      {/* Play / Pause */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => dispatch(togglePlay())}
      >
        {isPlaying ? (
          <PauseCircle />
        ) : (
          <PlayCircle />
        )}
      </button>

      {/* Next */}
      <button
        type="button"
        disabled={disabled}
        onClick={onNext}
      >
        <NextButtonIcon />
      </button>

      {/* Timer */}
      <button
        type="button"
        title="timerButton"
      >
        <TimerButton />
      </button>

    </div>
  );
};

export default MpPlayerButtons;