import type { ProgressImage } from "@/data/progress-media";

/** Wikimedia thumbnail via thumb.wikimedia.org (upload.wikimedia.org often 429s from server proxies). */
export function wikimediaThumb(originalUrl: string, width = 500): string {
  try {
    const u = new URL(originalUrl);
    if (u.hostname === "www.nhsrcl.in" || u.hostname === "nhsrcl.in") {
      return originalUrl;
    }
    if (u.hostname !== "upload.wikimedia.org" || !u.pathname.includes("/wikipedia/commons/")) {
      return originalUrl;
    }
    const parts = u.pathname.split("/");
    const filename = decodeURIComponent(parts[parts.length - 1]!);
    const dir1 = parts[parts.length - 2]!;
    const dir0 = parts[parts.length - 3]!;
    const encName = encodeURIComponent(filename);
    return `https://thumb.wikimedia.org/wikipedia/commons/thumb/${dir0}/${dir1}/${encName}/${width}px-${encName}`;
  } catch {
    return originalUrl;
  }
}

/** Default display: Commons thumbnail (small enough for browser hotlink). */
export function progressImageDisplaySrc(image: ProgressImage): string {
  return image.src;
}

/** Commons thumb first (reliable), then local mirror, then full file. */
export function progressImageFallbackChain(image: ProgressImage): string[] {
  const chain = [image.src, image.localSrc, image.remoteFull];
  return chain.filter((u, i) => u && chain.indexOf(u) === i) as string[];
}