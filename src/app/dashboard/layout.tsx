import { createClient } from "../../lib/superbase";


export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const {
    data: { },
  } = await supabase.auth.getUser();

  return <>{children}</>;
}
