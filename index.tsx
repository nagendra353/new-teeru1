import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CalendarCheck, Crown, MapPin, Search, ShieldCheck, Sparkles, Star, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoBadge, Reveal, SectionHead } from "@/components/site/Reveal";
import { SalonCard } from "@/components/site/SalonCard";
import { CATEGORIES, images, LOCALITIES, SALONS, TESTIMONIALS } from "@/data/teeru";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TEERU — Your look. Your salon. Your time." },
      { name: "description", content: "Discover Hyderabad salons by locality, compare prices and ratings, book online, preview hairstyles and earn Teeru Privé rewards." },
      { property: "og:title", content: "TEERU — Your look. Your salon. Your time." },
      { property: "og:description", content: "Hyderabad's premium salon discovery and booking experience." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -60]);
  const y2 = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -120]);
  const y3 = useTransform(scrollY, [0, 600], [0, reduce ? 0 : -30]);
  const fade = (d: number) => ({ initial: reduce ? false : { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: d, ease: [0.22, 1, 0.36, 1] as const } });

  return (
    <section className="bg-hero relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-12 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
        <div>
          <motion.p {...fade(0)} className="eyebrow">Hyderabad · Salon discovery & booking</motion.p>
          <motion.h1 {...fade(0.1)} className="mt-5 text-[3.2rem] font-medium leading-[0.95] sm:text-7xl lg:text-[5.6rem]">
            Your look.<br /><em className="text-gold not-italic font-display italic">Your salon.</em><br />Your time.
          </motion.h1>
          <motion.p {...fade(0.2)} className="mt-6 max-w-md text-lg text-muted-foreground">
            Compare salons near you, book in seconds, and see a new style on yourself before the first snip.
          </motion.p>
          <motion.div {...fade(0.3)} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="gold" size="xl"><Link to="/salons">Explore salons <ArrowRight /></Link></Button>
            <Button asChild variant="line" size="xl"><Link to="/ai-preview"><Sparkles /> Try AI hairstyle</Link></Button>
          </motion.div>
          <motion.div {...fade(0.4)} className="mt-10 flex flex-wrap gap-2">
            {LOCALITIES.slice(0, 5).map((l) => (
              <Link key={l} to="/salons" search={{ locality: l }} className="chip"><MapPin className="size-3" />{l}</Link>
            ))}
          </motion.div>
        </div>

        <div className="relative h-[460px] sm:h-[560px]" aria-hidden>
          <motion.div style={{ y: y3 }} className="absolute right-0 top-0 h-[78%] w-[66%] overflow-hidden rounded-[2rem] border border-border shadow-soft">
            <img src={images.salon1} alt="" width={1280} height={960} className="size-full object-cover" />
          </motion.div>
          <motion.div style={{ y: y1 }} initial={reduce ? false : { opacity: 0, rotate: -6, x: -30 }} animate={{ opacity: 1, rotate: -4, x: 0 }} transition={{ duration: 1, delay: 0.3 }} className="absolute bottom-6 left-0 h-[58%] w-[44%] overflow-hidden rounded-[1.6rem] border border-primary/30 shadow-soft">
            <img src={images.woman} alt="" width={896} height={1152} className="size-full object-cover" />
          </motion.div>
          <motion.div style={{ y: y2 }} initial={reduce ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} className="surface absolute bottom-0 right-6 w-56 p-4">
            <div className="flex items-center gap-3">
              <img src={images.man} alt="" width={896} height={1152} className="size-12 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold">Skin fade · 4:30 PM</p>
                <p className="text-xs text-muted-foreground">The Gentry · Kondapur</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs"><span className="text-primary">+65 Privé points</span><span className="text-muted-foreground">Sample</span></div>
          </motion.div>
          <motion.div style={{ y: y1 }} className="surface absolute left-[30%] top-6 flex items-center gap-2 rounded-full px-4 py-2 text-sm">
            <Star className="size-4 fill-primary text-primary" /> 4.9 · Maison Noir
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Home() {
  const featured = SALONS.slice(0, 3);
  return (
    <>
      <Hero />

      <section className="border-y border-border bg-espresso/60">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-8 md:grid-cols-4 md:px-8">
          {[
            [MapPin, "8 localities", "Across West Hyderabad"],
            [Search, "Compare honestly", "Prices, ratings & hours"],
            [CalendarCheck, "Book in 60s", "Pick a slot that suits you"],
            [Crown, "Earn on repeat", "Teeru Privé rewards"],
          ].map(([Icon, t, s]) => {
            const I = Icon as typeof MapPin;
            return (
              <div key={t as string} className="flex items-start gap-3">
                <I className="mt-0.5 size-5 shrink-0 text-primary" />
                <div><p className="text-sm font-semibold">{t as string}</p><p className="text-xs text-muted-foreground">{s as string}</p></div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <SectionHead eyebrow="Popular localities" title={<>Salons, <em className="text-gold">close to home.</em></>} />
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {LOCALITIES.map((l, i) => {
            const n = SALONS.filter((s) => s.locality === l).length;
            return (
              <Reveal key={l} delay={i * 0.04}>
                <Link to="/salons" search={{ locality: l }} className="surface group flex h-28 flex-col justify-between p-5 transition-colors hover:border-primary/60">
                  <span className="font-display text-xl">{l}</span>
                  <span className="flex items-center justify-between text-xs text-muted-foreground">{n} sample salon{n === 1 ? "" : "s"} <ArrowRight className="size-4 text-primary transition-transform group-hover:translate-x-1" /></span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead eyebrow="Featured salons" title="Handpicked for this week" />
          <DemoBadge>Sample listings</DemoBadge>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((s, i) => <Reveal key={s.id} delay={i * 0.08}><SalonCard salon={s} /></Reveal>)}
        </div>
        <div className="mt-10 text-center"><Button asChild variant="line" size="xl"><Link to="/salons">See all salons <ArrowRight /></Link></Button></div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <SectionHead eyebrow="Services" title="What are you in for?" />
        <div className="mt-8 flex flex-wrap gap-3">
          {CATEGORIES.map((c) => (
            <Link key={c} to="/salons" search={{ category: c }} className="chip px-5 py-2.5 text-sm">{c}</Link>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-espresso/60">
        <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
          <SectionHead center eyebrow="How it works" title="Three steps to a better appointment" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              ["01", "Discover", "Browse salons by locality, service, price and rating."],
              ["02", "Preview", "Try a hairstyle on your own photo before you go."],
              ["03", "Book & earn", "Choose a stylist and slot, then collect Privé points."],
            ].map(([n, t, d], i) => (
              <Reveal key={n} delay={i * 0.1} className="surface p-8">
                <p className="font-display text-5xl text-gold">{n}</p>
                <h3 className="mt-6 text-2xl">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:px-8 lg:grid-cols-2">
        <Reveal className="relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-3xl border border-border"><img src={images.man} alt="Sample: before — your photo" loading="lazy" width={896} height={1152} className="aspect-[3/4] w-full object-cover grayscale-[40%]" /></div>
            <div className="mt-10 overflow-hidden rounded-3xl border border-primary/40 shadow-gold"><img src={images.man} alt="Sample: after — styled preview" loading="lazy" width={896} height={1152} className="aspect-[3/4] w-full object-cover saturate-125" /></div>
          </div>
          <span className="absolute left-3 top-3"><DemoBadge>Demo preview</DemoBadge></span>
        </Reveal>
        <div>
          <SectionHead eyebrow="AI hairstyle preview" title={<>See it <em className="text-gold">before</em> you book it.</>} sub="Upload a photo, pick from curated styles for men, women and kids, and compare before and after. Currently a demo preview — real AI rendering is on the way." />
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex gap-3"><Wand2 className="size-4 text-primary" /> Curated styles: fades, crops, layers, bobs, kids' cuts</li>
            <li className="flex gap-3"><ShieldCheck className="size-4 text-primary" /> Your photo stays on your device — never uploaded or stored</li>
          </ul>
          <Button asChild variant="gold" size="xl" className="mt-8"><Link to="/ai-preview"><Sparkles /> Try it now</Link></Button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="relative overflow-hidden rounded-[2rem] border border-primary/30 bg-plum p-8 md:p-14">
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-primary/10 blur-3xl" aria-hidden />
          <div className="relative grid items-center gap-10 md:grid-cols-2">
            <div>
              <p className="eyebrow">Loyalty programme</p>
              <h2 className="mt-3 text-4xl md:text-5xl">Teeru <em className="text-gold">Privé</em></h2>
              <p className="mt-4 max-w-md text-muted-foreground">Earn points on every visit, climb from Silver to Gold to Black, and unlock treats at partner salons.</p>
              <Button asChild variant="gold" size="xl" className="mt-8"><Link to="/prive">Explore Privé <ArrowRight /></Link></Button>
            </div>
            <PriveCardVisual />
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHead eyebrow="Kind words" title="Early impressions" />
          <DemoBadge>Sample testimonials</DemoBadge>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08} className="surface p-7">
              <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="size-4 fill-primary text-primary" />)}</div>
              <p className="mt-5 font-display text-xl leading-snug">“{t.text}”</p>
              <p className="mt-5 text-sm text-muted-foreground">{t.name}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}

export function PriveCardVisual({ name = "Your Name", tier = "Gold", points = 1940 }: { name?: string; tier?: string; points?: number }) {
  return (
    <motion.div whileHover={{ rotateX: 6, rotateY: -8 }} style={{ transformPerspective: 900 }} className="bg-gradient-gold relative mx-auto aspect-[1.6/1] w-full max-w-sm rounded-2xl p-6 text-primary-foreground shadow-gold">
      <div className="flex items-start justify-between">
        <span className="font-display text-2xl font-semibold tracking-[0.3em]">TEERU</span>
        <span className="text-xs font-bold uppercase tracking-[0.2em]">{tier}</span>
      </div>
      <p className="mt-1 font-display text-lg italic">Privé</p>
      <div className="absolute inset-x-6 bottom-6 flex items-end justify-between">
        <div><p className="text-[0.65rem] uppercase tracking-widest opacity-70">Member</p><p className="font-semibold">{name}</p></div>
        <div className="text-right"><p className="text-[0.65rem] uppercase tracking-widest opacity-70">Points</p><p className="font-display text-2xl font-semibold">{points.toLocaleString("en-IN")}</p></div>
      </div>
    </motion.div>
  );
}
