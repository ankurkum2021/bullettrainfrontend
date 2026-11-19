import { SITE_NAME, SITE_URL } from "@/lib/site";
import {
  loadCorridorUpdates,
  updateDetailPath,
  updateTeaser,
} from "@/lib/updates";

export const revalidate = 300;

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const updates = await loadCorridorUpdates();
  const items = updates
    .slice(0, 50)
    .map((item) => {
      const link = `${SITE_URL}${updateDetailPath(item.id)}`;
      return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      <description>${escapeXml(updateTeaser(item))}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml(SITE_NAME)} — corridor updates</title>
    <link>${SITE_URL}/updates</link>
    <description>Unofficial MAHSR progress news curated from official NHSRCL releases.</description>
    <language>en-in</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
    },
  });
}