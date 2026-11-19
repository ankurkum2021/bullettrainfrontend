import { NextResponse } from "next/server";
import { loadStationExploreProfile } from "@/lib/places";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const profile = await loadStationExploreProfile(slug);
  return NextResponse.json({ profile });
}