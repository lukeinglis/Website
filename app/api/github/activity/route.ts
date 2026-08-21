import { fetchRecentActivity } from "@/lib/github";

export const revalidate = 3600;

export async function GET() {
  try {
    const activity = await fetchRecentActivity();
    return Response.json(activity);
  } catch {
    return Response.json([]);
  }
}
