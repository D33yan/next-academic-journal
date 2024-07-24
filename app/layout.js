import "./globals.css";
import Navbar from "@/components/Navbar";
export const metadata = {
  title: "UofA for academic journals",
  description: "A website for displaying and collecting academic journals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-900">
        <Navbar  />
        {children}
      </body>
    </html>
  );
}
