import { apiSlice } from "./apiSlice";
import { Song } from "../features/playerSlice";

export interface Shorts {
  id: number;
  user: {username: string};
  main_artist: number;
  video: string;
  video_url: string;
  thumbnail: string | null;
  caption: string;
  duration: number;
  views: number;
  likes_count: number;
  created_at: string;
  uuid: string;
}


export type ArtistPickProps2 = {
  image: string;
  title: string;
};

export type Artist = {
  id: number;
  artistname: string;
  profile_pic: string;
  background: string;
  songs: Song[];
  shorts:Shorts[]
  bio:string
  artist_pick:ArtistPickProps2
  monthly_listeners: number
  uuid:string
};

export type Album = {
   id:number;
   title:string;
   release_date: string
   cover:string
   tracks:Song[]
   
   artist: {name: string}[]
}

export type ShortVideo = {
  results: string[]
}

export const ArtistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    artists: builder.query<Artist[], void>({
      query: () => "artists/",
    }),

    artistDetail: builder.query<Artist, string>({
      query: (artistname) => `artists/${artistname}/`,
    }),

    getSongPlayer: builder.query<Song, string>({
      query: (unique_id) => `player/${unique_id}/`,
    }),
   
    listenSong: builder.mutation<{ success: boolean },{ id: string; seconds: number }>({
    query: ({ id, seconds }) => {
      return {
        url: `player/${id}/listen/`,
        method: "POST",
        body: { seconds },
      };
    },
    }),
  getFreshTrack: builder.query<Song[], void>({
      query: () => `fresh-tracks/`,
    }),
  getTredingTrack: builder.query<Song[], void>({
      query: () => `trending/`,
    }),
  getPopularAlbum: builder.query<Album[], void>({
      query: () => `albums/popular/`,
    }),
   getPopularAlbumDetail: builder.query<Album[],{ artist: string; albums: string }>({
    query: ({ artist, albums }) =>
      `albums/popular/detail/?title=${albums}&artist=${artist}`,
  }),
  getAlbumDetail: builder.query<Album,{ artist: string; albums: string }>({
    query: ({ artist, albums }) =>
      `album/${artist}/${albums}/`,
  }),
  getArtistsList: builder.query({
    query: () => "/artistslist/",
  }),

  getFavArtists: builder.query({
    query: () => "me/favorite-artists/",
    providesTags: ["FavoriteArtists"],
  }),
  
  addFavArtist: builder.mutation({
    query: (artistname: string) => ({
      url: "me/favorite-artists/",
      method: "POST",
      body: { artistname },
    }),
    invalidatesTags: ["FavoriteArtists"],
  }),
  
  removeFavArtist: builder.mutation({
    query: (artistname: string) => ({
      url: "me/favorite-artists/",
      method: "DELETE",
      body: { artistname },
    }),
    invalidatesTags: ["FavoriteArtists"],
  }),

  getShortVideo: builder.query({
    query: (params) => ({
      url: "shorts/explore/",
      params,
    }),
  }),

  getShortVideoDetail: builder.query<Shorts , string>({
       query: (unique_id) => `shorts/${unique_id}/`,
    }),
  }),
});

export const {
  useAddFavArtistMutation,
  useRemoveFavArtistMutation,
  useGetFavArtistsQuery,
  useGetArtistsListQuery,
  useLazyGetShortVideoQuery,
  useGetShortVideoDetailQuery,
  useGetShortVideoQuery,
  useArtistsQuery,
  useArtistDetailQuery,
  useGetSongPlayerQuery,
  useLazyGetSongPlayerQuery,
  useListenSongMutation,
  useGetFreshTrackQuery,
  useGetTredingTrackQuery,
  useGetPopularAlbumQuery,
  useGetPopularAlbumDetailQuery,
  useGetAlbumDetailQuery,
} = ArtistApiSlice;
