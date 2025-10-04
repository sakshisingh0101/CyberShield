import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  location: string;
  time: string;
  description: string;
}

const mockAlerts: Alert[] = [];

const AlertFeed = () => {
  const getSeverityColor = (severity: Alert["severity"]) => {
    switch (severity) {
      case "critical":
        return "destructive" as const;
      case "high":
        return "secondary" as const;
      case "medium":
        return "secondary" as const;
      default:
        return "outline" as const;
    }
  };

  const getSeverityIcon = (severity: Alert["severity"]) => {
    switch (severity) {
      case "critical":
        return AlertTriangle;
      case "high":
        return AlertCircle;
      default:
        return Info;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Real-time Alerts</CardTitle>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
            <span className="text-xs text-muted-foreground">Live</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px] px-6 pb-4">
          {mockAlerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <Info className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Active Alerts</h3>
              <p className="text-sm text-muted-foreground">
                All systems operating normally. New alerts will appear here in real-time.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {mockAlerts.map((alert) => {
              const Icon = getSeverityIcon(alert.severity);
              return (
                <div
                  key={alert.id}
                  className={cn(
                    "p-3 rounded-lg border bg-card/50 hover:bg-card transition-colors cursor-pointer animate-fade-in",
                    alert.severity === "critical" && "border-l-4 border-l-destructive"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                      alert.severity === "critical" && "bg-destructive/10",
                      alert.severity === "high" && "bg-warning/10",
                      alert.severity === "medium" && "bg-secondary",
                      alert.severity === "low" && "bg-muted"
                    )}>
                      <Icon className={cn(
                        "w-4 h-4",
                        alert.severity === "critical" && "text-destructive",
                        alert.severity === "high" && "text-warning",
                        alert.severity === "medium" && "text-foreground",
                        alert.severity === "low" && "text-muted-foreground"
                      )} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-sm font-semibold text-foreground">{alert.title}</h4>
                        <Badge variant={getSeverityColor(alert.severity)} className="text-xs">
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{alert.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{alert.location}</span>
                        <span>•</span>
                        <span>{alert.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default AlertFeed;
