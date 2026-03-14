import { Inter } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import { cookies, headers } from "next/headers";
import { AppWrapper } from "@/context";
import Navbar from "@/components/Navbar";
import HeroFooter from "@/components/HeroFooter";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Cendekia | Interactive Learning Platform",
  description: "Interactive Learning Platform",
};

export default function RootLayout({ children }) {
  const findToken = async () => {
    const data = cookies().get("Authorization");
    if (!data) {
      return (
        <html lang="en">
          <body
            className={`${inter.className} min-h-screen bg-slate-950 text-slate-100`}
          >
            <Navbar />
            <div className="flex min-h-screen flex-col">
              <main className="flex-1">{children}</main>
              <HeroFooter />
            </div>
          </body>
        </html>
      );
    }

    let token = data.value.split(" ")[1];
    if (token) {
      return (
        <html lang="en">
          <body
            className={`${inter.className} min-h-screen bg-slate-950 text-slate-100`}
          >
            <div className="flex min-h-screen">
              <AppWrapper>
                <Sidebar />
                <main className="w-full flex-1">{children}</main>
              </AppWrapper>
            </div>
          </body>
        </html>
      );
    }
  };

  return <>{findToken()}</>;
}
