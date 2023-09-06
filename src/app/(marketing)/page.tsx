import Link from "next/link";

import { AnimatedHeroPattern } from "@/components/animated-hero-pattern";
import { InitializeAOS } from "@/components/initialize-aos";
import { buttonVariants } from "@/components/ui/button";
import { marketingConfig } from "@/config/marketing";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";

const Globe = dynamic(() => import("@/components/Globe"), {
  ssr: false,
});

async function Home() {
  return (
    <>
      <InitializeAOS />

      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32 relative">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <Link
            href={siteConfig.links.linkedin}
            data-aos="zoom-in"
            className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
            target="_blank"
          >
            Follow me on Linkedin
          </Link>
          <h1
            data-aos="zoom-in"
            data-aos-delay="100"
            className="font-heading text-3xl bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-orange-400 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Unlocking Digital Democracy with VoteHub
          </h1>
          <p
            data-aos="zoom-in"
            data-aos-delay="200"
            className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8"
          >
            Your platform for shaping decisions digitally. Easily create, share,
            and manage online polls. Empower engagement and informed choices.
          </p>
          <div data-aos="zoom-in" data-aos-delay="300" className="space-x-4">
            <Link
              href="/dashboard"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              View Dashboard
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              GitHub
            </Link>
          </div>
          <AnimatedHeroPattern className="absolute h-full w-2/3 -z-10 top-6" />
        </div>
      </section>
      <section
        id="features"
        className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2
            data-aos="zoom-in"
            className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl"
          >
            Why VoteHub?
          </h2>
          <p
            data-aos="zoom-in"
            className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7"
          >
            Discover why VoteHub is the best choice for your online polls.
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {marketingConfig.whyChooseUsItems.map((item, index) => (
            <div
              data-aos="fade-down"
              data-aos-delay={50 * (index + 1)}
              key={item.title}
              className="relative overflow-hidden rounded-lg border bg-background p-2"
            >
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                {item.icon}
                <div className="space-y-2">
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section id="votes-world" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Votes from around the world
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Share your opinion and see how others voted in real-time.
          </p>
          <Globe />
        </div>
      </section>
      <section id="open-source" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            Proudly Open Source
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            {siteConfig.name} is open source and available on{" "}
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              GitHub
            </Link>
            . <br />
            Feel free to contribute, report bugs, or suggest new features.
          </p>
        </div>
      </section>
    </>
  );
}

export default Home;
