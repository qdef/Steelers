
import "./styles/globals.css";
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">

      <body className="m-0 p-0">

        <Banner />
        <Navbar />

        <div className="flex justify-center items-start w-full">
          {children}
        </div>

        <Footer />
        
      </body>
    </html>
  );
}
