// app/opengraph-image.tsx
import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const runtime = "nodejs";
export const alt = "justinlevine.me";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontPath = path.join(process.cwd(), "public", "fonts", "IBMPlexMono-Bold.ttf");
const fontData = fs.readFileSync(fontPath);

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#000",
          color: "#fff",
          padding: 64,
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "IBM Plex Mono",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: -1,
          }}
        >
          justinlevine.me
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
