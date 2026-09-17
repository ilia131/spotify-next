import type { Metadata } from "next";

import ArtistDetail from "./ArtistDetail";

/* =========================================================
   TYPES
========================================================= */

interface ArtistSEO {
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

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

/* =========================================================
   GET ARTIST SEO
========================================================= */

async function getArtistSEO(
  artistname: string
): Promise<ArtistSEO | null> {
  try {
    const encodedArtistName =
      encodeURIComponent(artistname);

    const response = await fetch(
      `${API_URL}/api/seo/artist/${encodedArtistName}/`,
      {
        next: {
          revalidate: 300,
        },
      }
    );

    if (!response.ok) {
      console.error(
        "Artist SEO API Error:",
        response.status,
        response.statusText
      );

      return null;
    }

    const data =
      (await response.json()) as ArtistSEO;

    return data;
  } catch (error) {
    console.error(
      "Artist SEO Fetch Error:",
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
    artistname: string;
  }>;
}): Promise<Metadata> {
  const { artistname } = await params;

  const decodedArtistName =
    decodeURIComponent(artistname);

  const seo = await getArtistSEO(
    decodedArtistName
  );

  /* =======================================================
     FALLBACK
  ======================================================= */

  if (!seo) {
    return {
      title: "Milify | هنرمندان",

      description:
        "آهنگ ها و موزیک های هنرمندان در میلیفای",

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

    description: seo.description,

    keywords: seo.keywords,

    robots: seo.robots,

    alternates: {
      canonical:
        seo.canonical_url || undefined,
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
        seo.description,

      url:
        seo.open_graph?.url ||
        seo.canonical_url ||
        undefined,

      type: "profile",

      images: seo.open_graph?.image
        ? [
            {
              url: seo.open_graph.image,

              width: 1200,

              height: 630,

              alt:
                seo.name ||
                "Milify Artist",
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
        seo.description,

      images: seo.twitter?.image
        ? [seo.twitter.image]
        : undefined,
    },

    /* =====================================================
       OTHER
    ===================================================== */

    authors: [
      {
        name: seo.name || "Milify",
      },
    ],

    creator: "Milify",

    publisher: "Milify",

    category: "Music",
  };
}

/* =========================================================
   PAGE
========================================================= */

export default async function ArtistPage({
  params,
}: {
  params: Promise<{
    artistname: string;
  }>;
}) {
  const { artistname } = await params;

  const decodedArtistName =
    decodeURIComponent(artistname);

  const seo = await getArtistSEO(
    decodedArtistName
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
          ARTIST PAGE
      ===================================================== */}

      <ArtistDetail />
    </>
  );
}