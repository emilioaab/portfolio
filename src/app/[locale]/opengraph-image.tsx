import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Hero" });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          background: "#050607",
          padding: "80px",
        }}
      >
        <div style={{ display: "flex", color: "#22d3ee", fontSize: 28 }}>$ whoami</div>
        <div
          style={{
            display: "flex",
            fontSize: 72,
            fontWeight: 700,
            color: "#f4f4f5",
            marginTop: 24,
          }}
        >
          {t("name")}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#8b8b93",
            marginTop: 24,
            maxWidth: 900,
          }}
        >
          {t("tagline")}
        </div>
      </div>
    ),
    { ...size },
  );
}
