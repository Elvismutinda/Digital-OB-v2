import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Digital O.B V2",
  description: "Version 2 of my Digital O.B website",
};

const Layout = async ({ children }: { children: React.ReactNode }) => {

  // if (session?.user.email && session?.user.role === "admin") {
    return (
      <div>
        <p>Admin page</p>
        <div>{children}</div>
      </div>
    );
  }

//   return <p>You're not authorized to view this page</p>;
// };

export default Layout;
