import "./globals.css";
import Header from '../components/Header';

// Define the type for the children prop
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-black">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}