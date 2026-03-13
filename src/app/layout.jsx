import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Cendekia - Interactive Learning Platform | Online Education",
    template: "%s | Cendekia Learning Platform"
  },
  description: "Transform your learning journey with Cendekia's interactive online education platform. Access courses, track progress, and achieve your educational goals with personalized learning experiences.",
  keywords: [
    "online learning platform",
    "interactive education",
    "e-learning",
    "online courses",
    "educational platform",
    "digital learning",
    "skill development",
    "personalized learning",
    "Cendekia",
    "learning management system",
    "online education"
  ],
  authors: [{ name: "Cendekia Team" }],
  creator: "Cendekia Learning Platform",
  publisher: "Cendekia Education",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        </body>
    </html>
  );
}
