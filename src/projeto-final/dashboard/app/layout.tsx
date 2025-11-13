import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

import "@/app/ui/global.css";

export const metadata = {
  title: "Datalivery Dashboard",
  description: "Entregando dados e acelerando resultados",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="font-[Poppins] bg-[#EFE9DD] text-[#3A2F2A]">
        {children}
      </body>
    </html>
  );
}