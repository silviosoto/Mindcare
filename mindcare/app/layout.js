import { Inter } from "next/font/google";

import { ProtectedRoutesProvider } from './Providers/protectedRoutes.provider';
import { ContextProvider } from "./context/context";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mind care",
  description: "Mindcare Ap´p",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider>
          <ProtectedRoutesProvider>{children}</ProtectedRoutesProvider>

        </ContextProvider>
        </body>
    </html>
  );
}
