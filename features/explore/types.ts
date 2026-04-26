export interface ShortVideo {
    uuid: string;
    video: string;
  }
  
  export interface ShortsApiResponse {
    next: string | null;
    results: ShortVideo[];
  }