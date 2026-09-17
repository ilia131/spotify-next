import { apiSlice } from "../apiSlice";

/* =========================================================
   TYPES
========================================================= */

export interface ArtistSEO {
  type: "artist";

  uuid: string;
  name: string;
  bio: string;
  image: string;

  title: string;
  description: string;
  canonical_url: string;
  keywords: string[];
  robots: string;

  open_graph: {
    title: string;
    description: string;
    image: string;
    type: string;
    url: string;
  };

  twitter: {
    card: string;
    title: string;
    description: string;
    image: string;
  };

  json_ld: {
    "@context": string;
    "@type": string;
    name: string;
    description: string;
    url: string;
    image?: string;
  };
}

/* =========================================================
   API
========================================================= */

export const seoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getArtistSEO: builder.query<ArtistSEO, string>({
      query: (artistname) =>
        `seo/artist/${encodeURIComponent(artistname)}/`,
    }),
  }),

  overrideExisting: false,
});

/* =========================================================
   HOOKS
========================================================= */

export const {
  useGetArtistSEOQuery,
} = seoApiSlice;