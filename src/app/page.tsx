import { categories } from "@/lib/products";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <main className="min-h-screen bg-cream text-ink">
      {/* ===== Sticky Header ===== */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-cream/80 border-b border-ink/10">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 py-4 flex items-center justify-between">
          <a href="#top" className="flex items-baseline gap-2 group">
            <span className="font-display text-xl sm:text-2xl tracking-tightest text-burgundy">
              Cardwell
            </span>
            <span className="font-display italic text-sm sm:text-base text-ink/70 group-hover:text-burgundy transition-colors">
              Butchery
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            <a href="#about" className="hover:text-burgundy transition-colors">
              The shop
            </a>
            <a href="#menu" className="hover:text-burgundy transition-colors">
              The board
            </a>
            <a href="#contact" className="hover:text-burgundy transition-colors">
              Find us
            </a>
          </nav>
          <a
            href={site.phone.href}
            className="btn-press inline-flex items-center gap-2 rounded-full bg-burgundy px-4 py-2 text-cream text-sm font-semibold hover:bg-burgundy-dark"
          >
            <PhoneIcon />
            <span className="hidden sm:inline">{site.phone.display}</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section id="top" className="relative overflow-hidden paper-grain">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 pt-12 pb-16 sm:pt-20 sm:pb-28 grid md:grid-cols-12 gap-10 md:gap-8 items-center">
          <div className="md:col-span-7 relative z-10">
            <p className="rise rise-1 section-label text-burgundy mb-5 text-sm sm:text-base">
              Cardwell · Far North Queensland · est. on Victoria Street
            </p>
            <h1 className="rise rise-2 font-display tracking-tightest text-[3.25rem] leading-[0.95] sm:text-7xl md:text-[5.5rem] text-ink">
              Local fresh meat.
              <br />
              <span className="italic text-burgundy">
                Cut by hand,
              </span>
              <br />
              every morning.
            </h1>
            <p className="rise rise-3 mt-6 max-w-xl text-base sm:text-lg text-ink/80 leading-relaxed">
              Beef, lamb, pork, chicken, and the house-made specialties
              that keep the locals coming back. Pop in, give us a call,
              or have it ready before the boat goes out.
            </p>
            <div className="rise rise-4 mt-8 flex flex-wrap gap-3">
              <a
                href={site.phone.href}
                className="btn-press inline-flex items-center gap-2 rounded-full bg-burgundy px-6 py-3.5 text-cream font-semibold hover:bg-burgundy-dark shadow-lg shadow-burgundy/20"
              >
                <PhoneIcon /> Call the shop
              </a>
              <a
                href="#menu"
                className="btn-press inline-flex items-center gap-2 rounded-full border border-ink/20 bg-cream/60 px-6 py-3.5 font-semibold text-ink hover:border-ink/40"
              >
                See the board →
              </a>
            </div>
          </div>

          <div className="md:col-span-5 relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-2xl shadow-burgundy/15 rise rise-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?auto=format&fit=crop&w=900&q=85"
                alt="Butcher at work, slicing fresh meat on a wooden block"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-dark/40 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-6 -left-6 sm:-left-10 hidden sm:block bg-bone border border-ink/10 px-5 py-4 rounded-sm shadow-xl rise rise-4">
              <p className="font-display italic text-burgundy text-sm">Family-run since</p>
              <p className="font-display text-3xl text-ink leading-none mt-1">decades</p>
            </div>
          </div>
        </div>

        {/* Decorative bottom rule */}
        <div className="border-t border-ink/10" />
      </section>

      {/* ===== About / The Shop ===== */}
      <section id="about" className="py-20 sm:py-28">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <p className="section-label text-burgundy mb-3 text-sm">01 — The shop</p>
          <h2 className="font-display tracking-tightest text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] max-w-3xl">
            We&apos;ve been Cardwell&apos;s butcher long enough to know what you want
            <span className="italic text-sage"> before you ask.</span>
          </h2>
          <div className="mt-10 grid md:grid-cols-3 gap-10 md:gap-14 text-ink/80 text-base sm:text-lg leading-relaxed">
            <p>
              The meat case changes with the season and what&apos;s good. The
              specials are made out the back, by hand, that morning. Nothing
              hides behind a label here.
            </p>
            <p>
              Locals know to call ahead for whole roasts and the Beef
              Wellingtons. Tourists rolling through on the way to the reef
              know to grab a bag of the BBQ rissoles for the cabin.
            </p>
            <p>
              If you can&apos;t see what you&apos;re after — ask. We&apos;ll cut it for you,
              wrap it for you, and tell you exactly how to cook it.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Menu / The Board ===== */}
      <section id="menu" className="py-20 sm:py-28 bg-bone paper-grain border-y border-ink/10">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-3">
            <p className="section-label text-burgundy text-sm">02 — The board</p>
            <p className="text-xs sm:text-sm text-ink/60 italic">
              Prices indicative — confirm in store
            </p>
          </div>
          <h2 className="font-display tracking-tightest text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] max-w-3xl mb-12 sm:mb-16">
            Today&apos;s <span className="italic text-burgundy">selection.</span>
          </h2>

          <div className="space-y-20 sm:space-y-28">
            {categories.map((cat, i) => (
              <article key={cat.id} id={cat.id} className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
                <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-2" : ""}`}>
                  <div className="sticky top-28">
                    <div className="aspect-[4/5] overflow-hidden rounded-sm shadow-xl shadow-burgundy/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cat.image}
                        alt={cat.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="mt-4 font-display italic text-burgundy text-sm">
                      No. {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="font-display tracking-tightest text-4xl sm:text-5xl text-ink mt-1">
                      {cat.title}
                    </h3>
                    <p className="mt-3 text-ink/70 max-w-sm">{cat.blurb}</p>
                  </div>
                </div>

                <div className={`md:col-span-7 ${i % 2 === 1 ? "md:order-1" : ""}`}>
                  <ul className="divide-y divide-ink/15 border-y border-ink/15">
                    {cat.items.map((item) => (
                      <li
                        key={item.name}
                        className="py-5 grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 items-baseline"
                      >
                        <h4 className="font-display text-xl sm:text-2xl text-ink leading-tight">
                          {item.name}
                        </h4>
                        <span className="font-body font-semibold text-burgundy whitespace-nowrap text-sm sm:text-base">
                          {item.price}
                        </span>
                        <p className="col-span-2 text-ink/65 text-sm sm:text-base mt-0.5">
                          {item.description}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20 sm:mt-24 text-center">
            <p className="font-display italic text-burgundy text-lg">
              Don&apos;t see what you&apos;re after?
            </p>
            <p className="mt-2 text-ink/70 max-w-md mx-auto">
              Special orders, whole or half carcasses, party platters and
              custom cuts — give us a ring.
            </p>
            <a
              href={site.phone.href}
              className="btn-press mt-5 inline-flex items-center gap-2 rounded-full bg-burgundy px-6 py-3.5 text-cream font-semibold hover:bg-burgundy-dark shadow-lg shadow-burgundy/20"
            >
              <PhoneIcon /> {site.phone.display}
            </a>
          </div>
        </div>
      </section>

      {/* ===== Contact / Find Us ===== */}
      <section id="contact" className="py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <p className="section-label text-burgundy mb-3 text-sm">03 — Find us</p>
          <h2 className="font-display tracking-tightest text-4xl sm:text-5xl md:text-6xl text-ink leading-[1.05] max-w-3xl mb-12 sm:mb-16">
            Pop in. <span className="italic text-sage">We&apos;ll put the kettle on.</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-10 md:gap-16">
            <div className="space-y-8">
              <div>
                <p className="font-display italic text-burgundy text-sm mb-2">Address</p>
                <p className="font-display text-2xl sm:text-3xl text-ink leading-snug">
                  {site.address.line1}
                  <br />
                  {site.address.line2}
                </p>
                <a
                  href={site.address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-sage hover:text-sage-dark font-medium text-sm group"
                >
                  Open in Google Maps
                  <span className="transition-transform group-hover:translate-x-0.5">→</span>
                </a>
              </div>

              <div>
                <p className="font-display italic text-burgundy text-sm mb-2">Phone</p>
                <a
                  href={site.phone.href}
                  className="font-display text-2xl sm:text-3xl text-ink hover:text-burgundy transition-colors"
                >
                  {site.phone.display}
                </a>
              </div>

              <div>
                <p className="font-display italic text-burgundy text-sm mb-2">Email</p>
                <a
                  href={site.email.href}
                  className="font-display text-xl sm:text-2xl text-ink hover:text-burgundy transition-colors break-all"
                >
                  {site.email.display}
                </a>
              </div>

              {site.social.facebook && (
                <div>
                  <p className="font-display italic text-burgundy text-sm mb-2">Follow</p>
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-xl text-ink hover:text-burgundy transition-colors"
                  >
                    Facebook ↗
                  </a>
                </div>
              )}
            </div>

            <div className="bg-bone border border-ink/10 rounded-sm p-7 sm:p-9 paper-grain">
              <p className="font-display italic text-burgundy text-sm mb-4">Opening hours</p>
              <ul className="divide-y divide-ink/15">
                {site.hours.map((h) => (
                  <li
                    key={h.day}
                    className="py-3 flex items-baseline justify-between gap-4"
                  >
                    <span className="font-display text-lg sm:text-xl text-ink">
                      {h.day}
                    </span>
                    <span className="font-body text-ink/80 text-sm sm:text-base text-right">
                      {h.time}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-xs text-ink/55 italic">
                Hours subject to change on public holidays. Confirm by phone if unsure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-burgundy-dark text-cream/80 py-10">
        <div className="mx-auto max-w-6xl px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="font-display italic">
            <span className="text-cream">Cardwell Butchery</span> — Local Fresh Meat Specialist
          </p>
          <p className="text-cream/60">
            © {new Date().getFullYear()} Cardwell Butchery. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

function PhoneIcon() {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
