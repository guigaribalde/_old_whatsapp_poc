import "./globals.css";

export const metadata = {
  title: "RR Whatsapp AB",
  description: "Whatsapp Runrunit AB test",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="w-full h-full">
      <body className="w-full h-full">{children}</body>
    </html>
  );
}
