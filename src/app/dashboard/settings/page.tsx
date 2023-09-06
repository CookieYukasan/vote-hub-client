import { DashboardHeader } from "@/components/header";
import { DashboardShell } from "@/components/shell";
import { Card, CardContent } from "@/components/ui/card";
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
      <Card>
        <CardContent className="mt-4">
          <UserSettingsForm
            user={{ _id: user._id, userName: user.userName || "" }}
          />
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
