import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { UserSettingsForm } from "@/components/user-settings-form";
import { user } from "@/config/auth";

export const metadata = {
  title: "Settings",
  description: "Manage account settings.",
};

export default async function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Manage account settings." />
      <div className="grid gap-10">
        <UserSettingsForm
          user={{ _id: user._id, userName: user.userName || "" }}
        />
      </div>
    </DashboardShell>
  );
}
