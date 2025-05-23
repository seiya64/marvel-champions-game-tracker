import { GameTrackerStoreProvider } from "@/providers/game-tracker-store-provider";
import "./globals.css";
import ReactQueryProvider from "@/providers/react-query-provider";

const navigation = [
  {
    name: "Game tracker",
    href: "/game-tracker",
  },
  {
    name: "Campaign tracker",
    href: "/campaign-tracker",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <div className="container mx-auto">
          <div className="py-5 text-center">
            <h1 className="text-5xl">Marvel Champions game tracker</h1>
          </div>
          <div className="flex items-center justify-center space-x-6 py-5">
            {navigation.map((item) => (
              <a key={item.name} href={item.href}>
                {item.name}
              </a>
            ))}
          </div>
        </div>
        <ReactQueryProvider>
          <GameTrackerStoreProvider>{children}</GameTrackerStoreProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}

