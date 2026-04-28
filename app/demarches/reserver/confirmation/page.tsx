import type { Metadata } from "next";
import { Footer, Header } from "../../../components/site-chrome";
import { ConfirmationContent } from "./confirmation-content";

export const metadata: Metadata = {
  title: "Demande envoyée — SachaRbone Démarches",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ConfirmationPage() {
  return (
    <main className="w-full max-w-full overflow-x-hidden bg-cream">
      <Header />
      <ConfirmationContent />
      <Footer />
    </main>
  );
}
