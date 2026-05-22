import type { Metadata } from "next";
import BagelGeneratorClient from "./BagelGeneratorClient";

export const metadata: Metadata = {
  title: "Unbearable Bagel Name Generator",
  description:
    "Generate your next Unbearable Bagels special — Brisbane's most relatable bagel names, from Magic Round to Translink Delay.",
  openGraph: {
    title: "Unbearable Bagel Name Generator",
    description: "Brisbane's most relatable bagel names, generated fresh.",
    type: "website",
    locale: "en_AU",
  },
};

export default function BagelGeneratorPage() {
  return <BagelGeneratorClient />;
}
