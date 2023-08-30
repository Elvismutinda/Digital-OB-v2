import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Digital O.B V2",
  description: "Version 2 of my Digital O.B website",
};

const Layout = async ({ children }: { children: React.ReactNode }) => {

  // if (session?.user.role === "admin") {
    return (
      <body className="pt-0">
        {children}
      </body>
    );
  }

//   return <p>You're not authorized to view this page</p>;
// };

export default Layout;
