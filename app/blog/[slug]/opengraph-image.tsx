// app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";
import { getAllPosts } from "@/lib/posts";

export const runtime = "nodejs";
export const alt = "Blog post — Justin Levine";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontPath = path.join(process.cwd(), "public", "fonts", "IBMPlexMono-Bold.ttf");
const fontData = fs.readFileSync(fontPath);

export default async function Image({ params }: { params: { slug: string } }) {
  const post = getAllPosts().find((p) => p.slug === params.slug);
  const title = post?.title ?? params.slug;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#000",
          color: "#fff",
          padding: 80,
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "IBM Plex Mono",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: title.length > 40 ? 72 : 88,
            fontWeight: 700,
            lineHeight: 1.1,
            maxWidth: 1000,
            whiteSpace: "pre-wrap",
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "IBM Plex Mono",
          data: fontData,
          weight: 700,
          style: "normal",
        },
      ],
    }
  );
}
