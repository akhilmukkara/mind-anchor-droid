import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Shield } from "lucide-react";
import { toast } from "sonner";

interface BlockedApp {
  id: string;
  name: string;
  packageName: string;
}

export const AppBlocker = () => {
  const [blockedApps, setBlockedApps] = useState<BlockedApp[]>([
    { id: "1", name: "Instagram", packageName: "com.instagram.android" },
    { id: "2", name: "TikTok", packageName: "com.zhiliaoapp.musically" },
    { id: "3", name: "Twitter", packageName: "com.twitter.android" },
    { id: "4", name: "Facebook", packageName: "com.facebook.katana" },
    { id: "5", name: "YouTube", packageName: "com.google.android.youtube" },
  ]);
  const [newAppName, setNewAppName] = useState("");

  const addApp = () => {
    if (newAppName.trim()) {
      setBlockedApps([
        ...blockedApps,
        {
          id: Date.now().toString(),
          name: newAppName,
          packageName: newAppName.toLowerCase().replace(/\s+/g, "."),
        },
      ]);
      setNewAppName("");
      toast.success("App added to block list");
    }
  };

  const removeApp = (id: string) => {
    setBlockedApps(blockedApps.filter((app) => app.id !== id));
    toast.info("App removed from block list");
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-2 pt-8">
          <div className="inline-flex p-4 bg-gradient-accent rounded-full mb-4">
            <Shield className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">App Blocker</h1>
          <p className="text-muted-foreground">
            {blockedApps.length} apps ready to block
          </p>
        </div>

        <Card className="p-6 bg-card shadow-soft">
          <div className="flex gap-2 mb-6">
            <Input
              placeholder="Add app to block..."
              value={newAppName}
              onChange={(e) => setNewAppName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addApp()}
              className="flex-1"
            />
            <Button onClick={addApp} className="bg-gradient-accent">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-3">
            {blockedApps.map((app) => (
              <Card
                key={app.id}
                className="p-4 bg-card hover:shadow-soft transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{app.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {app.packageName}
                    </p>
                  </div>
                  <Badge variant="secondary" className="bg-locked/10 text-locked">
                    Blocked
                  </Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeApp(app.id)}
                    className="hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-gradient-accent/10 border-accent">
          <div className="text-center space-y-2">
            <Shield className="w-8 h-8 text-accent mx-auto" />
            <h3 className="font-semibold text-foreground">
              Monk Mode Integration
            </h3>
            <p className="text-sm text-muted-foreground">
              When Monk Mode is activated, all apps in this list will be
              automatically blocked until you deactivate it.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};
