import { Poll } from "@/@types";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
// import { PollOperations } from "@/components/poll-operations"

interface PollItemProps {
  poll: Pick<Poll, "_id" | "title" | "createdAt">;
}

export function PollItem({ poll }: PollItemProps) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${poll._id}`}
          className="font-semibold hover:underline"
        >
          {poll.title}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(poll.createdAt?.toDateString())}
          </p>
        </div>
      </div>
      {/* <PollOperations poll={{ _id: poll._id, title: poll.title }} /> */}
    </div>
  );
}

PollItem.Skeleton = function PollItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="h-5 w-2/5" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  );
};
