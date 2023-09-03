import { DashboardHeader } from "@/components/header";
import { PollCreateButton } from "@/components/poll-create-button";
import { PollItem } from "@/components/poll-item";
import { DashboardShell } from "@/components/shell";

export default function DashboardLoading() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Polls" text="Create and manage polls.">
        <PollCreateButton />
      </DashboardHeader>
      <div className="divide-border-200 divide-y rounded-md border">
        <PollItem.Skeleton />
        <PollItem.Skeleton />
        <PollItem.Skeleton />
        <PollItem.Skeleton />
        <PollItem.Skeleton />
      </div>
    </DashboardShell>
  );
}
