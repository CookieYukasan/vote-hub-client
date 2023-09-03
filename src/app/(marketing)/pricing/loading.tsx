import { CardSkeleton } from "@/components/card-skeleton";

export default function Loading() {
  return (
    <section className="container flex flex-col  gap-6 py-8 md:max-w-[64rem] md:py-12 lg:py-24">
      <CardSkeleton />
    </section>
  );
}
