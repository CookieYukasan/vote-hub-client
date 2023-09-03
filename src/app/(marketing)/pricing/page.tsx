import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import {
  PREMIUM_PRICE,
  calculatePriceByPromoCode,
  discountPercentage,
} from "@/config/pricing";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

interface PricingPageProps {
  searchParams: {
    promoCode: string;
  };
}

export function generateMetadata({
  searchParams: { promoCode },
}: PricingPageProps): Metadata {
  const _promoCode = promoCode.toLowerCase();
  const hasPromoCode =
    _promoCode && typeof discountPercentage[_promoCode] === "number";

  const defaultMetadata = {
    title: "Pricing",
    description: "Upgrade your account to unlock premium features.",
  };

  if (!hasPromoCode) return defaultMetadata;

  switch (_promoCode) {
    case "free4u":
      return {
        ...defaultMetadata,
        description: `Unlock premium features for free!`,
      };
    default:
      return {
        ...defaultMetadata,
        description: `Unlock premium features for ${discountPercentage[_promoCode]}% off!`,
      };
  }
}

function renderTitle(promoCode: string) {
  const hasPromoCode =
    promoCode && typeof discountPercentage[promoCode] === "number";

  if (!hasPromoCode) {
    return "VoteHub Premium";
  }

  return `Enjoy your ${discountPercentage[promoCode]}% discount`;
}

function renderDescription(promoCode: string) {
  const hasPromoCode =
    promoCode && typeof discountPercentage[promoCode] === "number";
  if (!hasPromoCode) {
    return "Upgrade your account to unlock premium features.";
  }

  switch (promoCode) {
    case "free4u":
      return `OMG! You are so lucky! This is free for you!`;
    default:
      return `Upgrade your account to unlock premium features with ${discountPercentage[promoCode]}% your discount.`;
  }
}

export default function PricingPage({ searchParams }: PricingPageProps) {
  const promoCode = searchParams.promoCode.toLowerCase();
  const hasPromoCode =
    searchParams.promoCode && typeof discountPercentage[promoCode] === "number";
  const price = hasPromoCode
    ? calculatePriceByPromoCode(PREMIUM_PRICE, promoCode)
    : PREMIUM_PRICE;

  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <div className="mx-auto flex w-full flex-col gap-4 md:max-w-[58rem]">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          {renderTitle(promoCode)}
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          {renderDescription(promoCode)}
        </p>
      </div>
      <div className="grid w-full items-start gap-10 rounded-lg border p-10 md:grid-cols-[1fr_200px]">
        <div className="grid gap-6">
          <h3 className="text-xl font-bold sm:text-2xl">
            What&apos;s included in the premium plan
          </h3>
          <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Unlimited Polls
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Advanced Options
            </li>

            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Custom domain
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Dashboard Analytics
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Access to Discord
            </li>
            <li className="flex items-center">
              <Icons.check className="mr-2 h-4 w-4" /> Premium Support
            </li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 text-center">
          <div>
            <h4 className="text-7xl font-bold">${price}</h4>
            <p className="text-sm font-medium text-muted-foreground">
              Billed Monthly
            </p>
          </div>
          <Link href="/login" className={cn(buttonVariants({ size: "lg" }))}>
            Get Started
          </Link>
        </div>
      </div>
      <div className="mx-auto flex w-full max-w-[58rem] flex-col gap-4">
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:leading-7">
          {siteConfig.name} is a demo app.{" "}
          <strong>You can test the upgrade and won&apos;t be charged.</strong>
        </p>
      </div>
    </section>
  );
}
