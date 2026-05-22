"use client";

import { useState, useCallback } from "react";

type Bagel = {
  name: string;
  tagline: string;
  fillings: string;
};

const bagels: Bagel[] = [
  {
    name: "THE EKKA",
    tagline:
      "Show week. School's out. Brisbane's in. Dagwood dog regret imminent.",
    fillings:
      "deep-fried hash brown, show-bag pink fairy floss cream cheese, pickled jalapeño, hot sauce, sesame bagel",
  },
  {
    name: "DAYLIGHT SAVING",
    tagline:
      "Queensland doesn't do it. Your Melbourne friends never forgive you.",
    fillings:
      "smoked salmon, cream cheese, capers, thinly sliced red onion, dill, sunflower rye bagel",
  },
  {
    name: "CROSS RIVER RAIL",
    tagline: "Coming soon. Has been for a decade. Still a bus replacement.",
    fillings:
      "pulled pork, smoky BBQ, shredded iceberg, pickled red onion, poppy seed bagel",
  },
  {
    name: "THE BRUCE",
    tagline: "Sunshine Coast long weekend. Three hours. Normally one.",
    fillings:
      "beef patty, caramelised onion, cheddar, road-rage sriracha, dill pickles, sesame bagel",
  },
  {
    name: "BIN CHICKEN",
    tagline: "He was already at your table when you got back from the counter.",
    fillings:
      "stracciatella, grilled zucchini, pickled cabbage, lemon & herb oil, everything bagel",
  },
  {
    name: "SCHOOLIES",
    tagline: "It's not just the Gold Coast anymore. It's everywhere now.",
    fillings:
      "crispy chicken, coleslaw, hot honey, sweet & sour pickles, sesame bagel",
  },
  {
    name: "RIVERFIRE",
    tagline:
      "Incredible fireworks. Terrible getting home. Went again this year.",
    fillings:
      "chorizo, roasted capsicum, smoked paprika aioli, rocket, everything bagel",
  },
  {
    name: "NEW FARM PARKING",
    tagline: "You drove past the same spot four times. Someone else got it.",
    fillings:
      "avocado, crispy prosciutto, poached egg, chilli oil, sourdough bagel",
  },
  {
    name: "VALLEY FRIDAY",
    tagline: "11pm. Someone's glitter is now your problem.",
    fillings:
      "scrambled egg, streaky bacon, hot sauce, hash brown, cream cheese, sesame bagel",
  },
  {
    name: "SOUTH BANK SUNDAY",
    tagline: "Free public beach. Eighty thousand of your closest strangers.",
    fillings:
      "coconut labneh, avocado, chilli flakes, cucumber, sumac, everything bagel",
  },
  {
    name: "TRANSLINK DELAY",
    tagline: "The app said three minutes. That was twenty-two minutes ago.",
    fillings:
      "salmon gravlax, cream cheese, capers, dill, sunflower rye bagel",
  },
  {
    name: "2032",
    tagline:
      "There's a crane outside. There'll be a crane outside until 2037.",
    fillings:
      "grilled chicken, rocket, sundried tomato, provolone, garlic aioli, garlic bagel",
  },
  {
    name: "GABBA DEMO",
    tagline: "Demolishing a beloved stadium for the Olympics. Nobody asked.",
    fillings:
      "beef patty, grilled onion, cheddar, BBQ sauce, dill pickles, sesame bagel",
  },
  {
    name: "ALDI 8AM",
    tagline: "Middle aisle. Leaf blower. Kayak. Mystery meat. Go.",
    fillings:
      "hash brown, egg, cheese, mystery aioli, hot sauce, everything bagel",
  },
  {
    name: "WET SEASON",
    tagline:
      "November through April. Perpetually damp. Mould on the bathroom ceiling again.",
    fillings:
      "smoked chicken, stracciatella, rocket, lemon dressing, poppy seed bagel",
  },
  {
    name: "NOISY MINER",
    tagline: "Small bird. Big agenda. Has chosen you specifically.",
    fillings:
      "crispy tofu, avocado, pickles, sriracha, shredded kale, sesame bagel",
  },
  {
    name: "HOT STEERING WHEEL",
    tagline:
      "February, 3pm. The car's been in full sun. You have no gloves. You have no choice.",
    fillings:
      "spicy chorizo, roasted red pepper, chipotle aioli, cheddar, everything bagel",
  },
  {
    name: "HAIL WARNING",
    tagline: "BoM sent the alert. You left the car outside again.",
    fillings:
      "battered cauliflower, ranch, pickled jalapeño, iceberg, poppy seed bagel",
  },
  {
    name: "FLOOD WATCH",
    tagline: "Sandbag shortage. Woolworths out of bread. The creek is over.",
    fillings:
      "kimchi, hash brown, cream cheese, bacon jam, sesame bagel",
  },
  {
    name: "STORY BRIDGE PEAK",
    tagline: "One bridge. Three suburbs. Zero alternatives.",
    fillings:
      "slow-cooked beef, caramelised onion, swiss cheese, gherkins, grain mustard, poppy seed bagel",
  },
  {
    name: "IKEA LOGAN",
    tagline: "You came for a shelf. You left three hours later with a new life.",
    fillings:
      "Swedish meatball, lingonberry aioli, iceberg, pickled cucumber, sesame bagel",
  },
  {
    name: "CITYCAT CANCELLED",
    tagline: "Flooding. No river access. No replacement bus. Go around.",
    fillings:
      "hot smoked salmon, dill cream cheese, capers, red onion, sunflower rye bagel",
  },
  {
    name: "SCHOOL DROP-OFF",
    tagline:
      "There is a zone. Nobody understands the zone. The zone is chaos.",
    fillings:
      "avocado, spinach, tomato, haloumi, pesto, fried egg, everything bagel",
  },
  {
    name: "QUEEN ST BUSKER",
    tagline: "Untuned guitar. Eye contact. Nowhere to look.",
    fillings:
      "avocado, smoked coconut labneh, sumac, kraut, burnt lemon, sesame bagel",
  },
  {
    name: "COUNCIL RATES",
    tagline: "Due February. Every February. More than last February.",
    fillings:
      "crispy bacon, egg, cheddar, hash brown, BBQ sauce, everything bagel",
  },
  {
    name: "WESTFIELD CARINDALE",
    tagline: "Christmas parking. Just Christmas parking.",
    fillings:
      "smoked turkey, cranberry aioli, swiss, rocket, grain mustard, poppy seed bagel",
  },
  {
    name: "POWERLINK WORKS",
    tagline: "Summer storm. Power out by 4pm. No air conditioning.",
    fillings:
      "grilled mushroom, vegan russian dressing, pickled cabbage, provolone, poppy seed bagel",
  },
  {
    name: "NO LEFT TURN",
    tagline:
      "You've been on this block for four circuits. The arrow is never green.",
    fillings:
      "beef patty, American cheese, pickles, mustard, special sauce, sesame bagel",
  },
  {
    name: "HERITAGE LISTING",
    tagline:
      "A developer wants to knock it down. There's a Facebook group about it.",
    fillings:
      "smoked salmon, capers, cream cheese, cucumber, dill, everything bagel",
  },
  {
    name: "EXPO HANGOVER",
    tagline: "Two days in. One more to go. Your feet gave up this morning.",
    fillings:
      "pulled pork, slaw, pickles, hot sauce, aioli, sesame bagel",
  },
];

function BagelCard({ bagel, index }: { bagel: Bagel; index: number }) {
  return (
    <div className="min-h-0 flex flex-col gap-6">
      <div>
        <p className="font-display italic text-gold text-sm sm:text-base mb-3">
          No. {String(index + 1).padStart(2, "0")}
        </p>
        <h1 className="font-display tracking-tightest text-[2.75rem] leading-[0.9] sm:text-6xl md:text-7xl lg:text-8xl text-cream">
          {bagel.name}
        </h1>
      </div>
      <p className="font-display italic text-cream/60 text-lg sm:text-xl md:text-2xl leading-snug max-w-xl">
        {bagel.tagline}
      </p>
      <div className="deco-rule text-cream/20 my-1" aria-hidden="true">
        <span className="font-display italic text-xs text-cream/30 whitespace-nowrap">
          suggested filling
        </span>
      </div>
      <p className="text-cream/50 text-sm sm:text-base leading-relaxed max-w-lg">
        {bagel.fillings}
      </p>
    </div>
  );
}

export default function BagelGeneratorClient() {
  const [index, setIndex] = useState(
    () => Math.floor(Math.random() * bagels.length)
  );
  const [animKey, setAnimKey] = useState(0);
  const [copied, setCopied] = useState(false);

  const next = useCallback(() => {
    setIndex((prev) => {
      let next = Math.floor(Math.random() * bagels.length);
      while (next === prev && bagels.length > 1) {
        next = Math.floor(Math.random() * bagels.length);
      }
      return next;
    });
    setAnimKey((k) => k + 1);
  }, []);

  const copyName = useCallback(() => {
    navigator.clipboard.writeText(bagels[index].name).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  }, [index]);

  return (
    <div className="min-h-screen bg-ink text-cream flex flex-col">
      {/* Header */}
      <header className="border-b border-cream/10 px-5 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-lg sm:text-xl tracking-tightest text-cream">
            Unbearable
          </span>
          <span className="font-display italic text-sm sm:text-base text-cream/50">
            Bagels
          </span>
        </div>
        <span className="font-display italic text-cream/30 text-xs sm:text-sm">
          Name Generator
        </span>
      </header>

      {/* Main */}
      <main className="flex-1 flex flex-col justify-center px-5 sm:px-8 py-12 sm:py-20">
        <div className="mx-auto w-full max-w-3xl">
          {/* Label */}
          <p className="section-label text-gold text-xs sm:text-sm mb-8 sm:mb-12">
            Today&apos;s Special
          </p>

          {/* Animated bagel card */}
          <div
            key={animKey}
            className="rise rise-1"
          >
            <BagelCard bagel={bagels[index]} index={index} />
          </div>

          {/* Actions */}
          <div className="mt-10 sm:mt-14 flex flex-wrap items-center gap-4">
            <button
              onClick={next}
              className="btn-press inline-flex items-center gap-3 rounded-full bg-cream text-ink font-semibold px-7 py-4 text-sm sm:text-base hover:bg-bone shadow-lg shadow-black/30 transition-colors"
            >
              Next unbearable bagel
              <ArrowRightIcon />
            </button>
            <button
              onClick={copyName}
              className="btn-press inline-flex items-center gap-2 rounded-full border border-cream/20 text-cream/60 font-medium px-5 py-4 text-sm hover:border-cream/40 hover:text-cream/80 transition-colors"
            >
              {copied ? (
                <>
                  <CheckIcon />
                  Copied
                </>
              ) : (
                <>
                  <CopyIcon />
                  Copy name
                </>
              )}
            </button>
          </div>

          {/* Counter */}
          <p className="mt-8 font-display italic text-cream/25 text-sm">
            {index + 1} of {bagels.length} specials
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-cream/10 px-5 sm:px-8 py-5">
        <p className="text-cream/25 text-xs font-body text-center">
          Unofficially inspired by{" "}
          <a
            href="https://www.unbearablebagels.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-cream/50 transition-colors"
          >
            Unbearable Bagels
          </a>
          . All names are equally unbearable.
        </p>
      </footer>
    </div>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
