export interface Track {
    unique_id: string;
    track_url: string;
    name?: string;
    artistname?: string;
    pic?: string;
  }
  
  export interface ListenTracker {
    trackProgress: (delta: number) => void;
    check30s: () => void;
    onSongEnd: () => void;
    onSongChange: () => void;
    lastTimeRef: React.MutableRefObject<number>;
    totalListenedRef: React.MutableRefObject<number>;
    reset: () => void;
  }
  
  export interface AudioTimeData {
    currentTime: number;
    duration: number;
    buffered: number;
  }
  