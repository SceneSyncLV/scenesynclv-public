import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabase } from "../../lib/supabase";

export default async function PromoterDashboard() {
  // Get user session from cookies
  const cookieStore = cookies();
  const access_token = cookieStore.get("sb-access-token")?.value;
  if (!access_token) return redirect("/login");

  // Get user info
  const { data: { user } } = await supabase.auth.getUser(access_token);
  if (!user) return redirect("/login");

  // Query events created by this user
  const { data: events } = await supabase
    .from("events")
    .select("id,title,starts_at,venue_name,featured_until")
    .eq("created_by", user.id)
    .order("starts_at", { ascending: true });

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Your Events</h1>
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="text-slate-400 text-sm">
            <th>Title</th>
            <th>Date</th>
            <th>Venue</th>
            <th>Featured Until</th>
          </tr>
        </thead>
        <tbody>
          {events?.map(ev => (
            <tr key={ev.id} className="bg-slate-800 rounded">
              <td className="py-2 px-3 font-semibold">{ev.title}</td>
              <td className="py-2 px-3">{new Date(ev.starts_at).toLocaleString()}</td>
              <td className="py-2 px-3">{ev.venue_name}</td>
              <td className="py-2 px-3">{ev.featured_until ? new Date(ev.featured_until).toLocaleDateString() : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
