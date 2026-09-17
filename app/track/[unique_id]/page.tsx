import type { Metadata } from "next";

import TrackDetail from "./TrackDetail";

/* =========================================================
   TYPES
========================================================= */

interface SongSEO {
  type: "song";

  unique_id: string;

  name: string;

  description: string;

  image: string;

  artist_name: string;

  title: string;

  seo_description: string;

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

    byArtist?: {
      "@type": string;
      name: string;
    };

    datePublished?: string;
  };
}

/* =========================================================
   API
========================================================= */

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

/* =========================================================
   GET SONG SEO
========================================================= */

async function getSongSEO(
  uniqueId: string
): Promise<SongSEO | null> {
  try {
    const response = await fetch(
      `${API_URL}/api/seo/song/${encodeURIComponent(
        uniqueId
      )}/`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (!response.ok) {
      console.error(
        "Song SEO API Error:",
        response.status,
        response.statusText
      );

      return null;
    }

    const data =
      (await response.json()) as SongSEO;

    return data;
  } catch (error) {
    console.error(
      "Song SEO Fetch Error:",
      error
    );

    return null;
  }
}

/* =========================================================
   METADATA
========================================================= */

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    unique_id: string;
  }>;
}): Promise<Metadata> {
  const { unique_id } = await params;

  const seo = await getSongSEO(
    unique_id
  );

  /* =======================================================
     FALLBACK
  ======================================================= */

  if (!seo) {
    return {
      title: "Milify | آهنگ",

      description:
        "گوش دادن به آهنگ ها و موزیک های ایرانی در میلیفای",

      robots: {
        index: true,
        follow: true,
      },
    };
  }

  /* =======================================================
     METADATA
  ======================================================= */

  return {
    title: seo.title,

    description:
      seo.seo_description ||
      seo.description,

    keywords: seo.keywords,

    robots: seo.robots,

    alternates: {
      canonical:
        seo.canonical_url ||
        undefined,
    },

    /* =====================================================
       OPEN GRAPH
    ===================================================== */

    openGraph: {
      title:
        seo.open_graph?.title ||
        seo.title,

      description:
        seo.open_graph?.description ||
        seo.seo_description ||
        seo.description,

      url:
        seo.open_graph?.url ||
        seo.canonical_url ||
        undefined,

      type: "music.song",

      images: seo.open_graph?.image
        ? [
            {
              url: seo.open_graph.image,

              alt:
                seo.name ||
                "Milify Song",

              width: 1200,

              height: 630,
            },
          ]
        : undefined,
    },

    /* =====================================================
       TWITTER
    ===================================================== */

    twitter: {
      card: "summary_large_image",

      title:
        seo.twitter?.title ||
        seo.title,

      description:
        seo.twitter?.description ||
        seo.seo_description ||
        seo.description,

      images: seo.twitter?.image
        ? [seo.twitter.image]
        : undefined,
    },

    /* =====================================================
       AUTHOR
    ===================================================== */

    authors: seo.artist_name
      ? [
          {
            name: seo.artist_name,
          },
        ]
      : undefined,

    creator:
      seo.artist_name ||
      "Milify",

    publisher: "Milify",

    category: "Music",
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function TrackPage({
  params,
}: {
  params: Promise<{
    unique_id: string;
  }>;
}) {
  const { unique_id } = await params;

  const seo = await getSongSEO(
    unique_id
  );

  return (
    <>
      {/* =====================================================
          JSON-LD
      ===================================================== */}

      {seo?.json_ld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              seo.json_ld
            ),
          }}
        />
      )}

      {/* =====================================================
          TRACK UI
      ===================================================== */}

      <TrackDetail />
    </>
  );
}