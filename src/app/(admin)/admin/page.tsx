import { redirect} from "next/navigation";

import { getCurrentUser } from "@/lib/session";
import { authOptions } from "@/lib/auth";
import SiteShell from "@/components/SiteShell";
import SiteHeader from "@/components/SiteHeader";

export const metadata = {
  title: "Admin",
}

const AdminPage = async () => {
  // const user = await getCurrentUser()

  // if (!user) {
  //   redirect(authOptions?.pages?.signIn || "/login")
  // }

  return (
    <SiteShell>
      <SiteHeader heading="Dashboard" />
      <div></div>
    </SiteShell>
  );
};

export default AdminPage;
