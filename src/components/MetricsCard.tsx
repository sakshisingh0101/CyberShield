import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface MetricsCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: "up" | "down";
  className?: string;
}

const MetricsCard = ({ title, value, change, icon: Icon, trend, className }: MetricsCardProps) => {
  return (
    <Card className={cn("border-l-4 hover:shadow-lg transition-all animate-fade-in", className)}>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            <p className={cn(
              "text-xs font-medium flex items-center gap-1",
              trend === "up" ? "text-success" : "text-destructive"
            )}>
              <span>{change}</span>
              <span className="text-muted-foreground">vs yesterday</span>
            </p>
          </div>
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsCard;
