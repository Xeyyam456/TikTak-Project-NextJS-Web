import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#114F2E",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 140,
            fontWeight: 800,
            letterSpacing: "0.03em",
            color: "#ffffff",
          }}
        >
          TIK TAK
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 36,
            color: "#92D871",
          }}
        >
          Onlayn Supermarket
        </div>
      </div>
    ),
    { ...size },
  );
}
