import { EmptyPlaceholder } from "@/components/empty-placeholder";
import { DashboardHeader } from "@/components/header";
import { PollCreateButton } from "@/components/poll-create-button";
import { DashboardShell } from "@/components/shell";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Polls" text="Create and manage polls.">
        <PollCreateButton />
      </DashboardHeader>
      <div>
        {false ? (
          // <div className="divide-y divide-border rounded-md border">
          //   {poll.map((poll) => (
          //     <PollItem key={poll.id} poll={poll} />
          //   ))}
          // </div>
          <div>
            <h1>Hello World</h1>
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="poll" />
            <EmptyPlaceholder.Title>No polls created</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              You don&apos;t have any polls yet. Start creating one now.
            </EmptyPlaceholder.Description>
            <PollCreateButton variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  );
}
