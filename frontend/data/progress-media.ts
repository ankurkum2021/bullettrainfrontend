/** Shared progress image shape (station-specific files live under /public/progress/{slug}/). */

export type ProgressImage = {
  /** Stable key for React (e.g. surat-phase-2). */
  id: string;
  /** Display URL — usually a Commons thumb from thumb.wikimedia.org */
  src: string;
  remoteFull?: string;
  /** Mirrored file: /progress/{station-slug}/phase-{n}.jpg */
  localSrc?: string;
  alt: string;
  credit: string;
  sourceUrl: string;
  width: number;
  height: number;
};