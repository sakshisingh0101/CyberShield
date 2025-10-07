// import { AlertTriangle, AlertCircle, Info } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";

// interface Alert {
//   id: string;
//   severity: "critical" | "high" | "medium" | "low";
//   title: string;
//   location: string;
//   time: string;
//   description: string;
// }

// const mockAlerts: Alert[] = [];

// const AlertFeed = () => {
//   const getSeverityColor = (severity: Alert["severity"]) => {
//     switch (severity) {
//       case "critical":
//         return "destructive" as const;
//       case "high":
//         return "secondary" as const;
//       case "medium":
//         return "secondary" as const;
//       default:
//         return "outline" as const;
//     }
//   };

//   const getSeverityIcon = (severity: Alert["severity"]) => {
//     switch (severity) {
//       case "critical":
//         return AlertTriangle;
//       case "high":
//         return AlertCircle;
//       default:
//         return Info;
//     }
//   };

//   return (
//     <Card className="h-full">
//       <CardHeader className="pb-3">
//         <div className="flex items-center justify-between">
//           <CardTitle className="text-lg font-semibold">Real-time Alerts</CardTitle>
//           <div className="flex items-center gap-2">
//             <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
//             <span className="text-xs text-muted-foreground">Live</span>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent className="p-0">
//         <ScrollArea className="h-[500px] px-6 pb-4">
//           {mockAlerts.length === 0 ? (
//             <div className="flex flex-col items-center justify-center h-full text-center p-8">
//               <Info className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
//               <h3 className="text-lg font-semibold text-foreground mb-2">No Active Alerts</h3>
//               <p className="text-sm text-muted-foreground">
//                 All systems operating normally. New alerts will appear here in real-time.
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {mockAlerts.map((alert) => {
//               const Icon = getSeverityIcon(alert.severity);
//               return (
//                 <div
//                   key={alert.id}
//                   className={cn(
//                     "p-3 rounded-lg border bg-card/50 hover:bg-card transition-colors cursor-pointer animate-fade-in",
//                     alert.severity === "critical" && "border-l-4 border-l-destructive"
//                   )}
//                 >
//                   <div className="flex items-start gap-3">
//                     <div className={cn(
//                       "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
//                       alert.severity === "critical" && "bg-destructive/10",
//                       alert.severity === "high" && "bg-warning/10",
//                       alert.severity === "medium" && "bg-secondary",
//                       alert.severity === "low" && "bg-muted"
//                     )}>
//                       <Icon className={cn(
//                         "w-4 h-4",
//                         alert.severity === "critical" && "text-destructive",
//                         alert.severity === "high" && "text-warning",
//                         alert.severity === "medium" && "text-foreground",
//                         alert.severity === "low" && "text-muted-foreground"
//                       )} />
//                     </div>
//                     <div className="flex-1 space-y-1">
//                       <div className="flex items-center justify-between gap-2">
//                         <h4 className="text-sm font-semibold text-foreground">{alert.title}</h4>
//                         <Badge variant={getSeverityColor(alert.severity)} className="text-xs">
//                           {alert.severity}
//                         </Badge>
//                       </div>
//                       <p className="text-xs text-muted-foreground">{alert.description}</p>
//                       <div className="flex items-center gap-2 text-xs text-muted-foreground">
//                         <span>{alert.location}</span>
//                         <span>•</span>
//                         <span>{alert.time}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//             </div>
//           )}
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   );
// };

// export default AlertFeed;





// import { useAppSelector } from "@/store/hooks";
// import { AlertTriangle, AlertCircle, Info } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";

// interface Alert {
//   atm_id: string;
//   action: string;
//   description?: string;
//   location?: string;
// }

// interface AlertFeedProps {
//   maxHeight?: string;
//   alerts?: Alert[]; // make optional
// }

// const AlertFeed = ({ maxHeight = "500px", alerts }: AlertFeedProps) => {
//   // use Redux alerts if props.alerts not provided
//   const reduxAlerts = useAppSelector((state) => state.prediction.alerts);
//   const displayAlerts: Alert[] = alerts ?? reduxAlerts ?? [];

//   const getSeverityColor = (action: string) => {
//     switch (action.toLowerCase()) {
//       case "critical":
//         return "destructive";
//       case "high":
//       case "medium":
//         return "secondary";
//       default:
//         return "outline";
//     }
//   };

//   const getSeverityIcon = (action: string) => {
//     switch (action.toLowerCase()) {
//       case "critical":
//         return AlertTriangle;
//       case "high":
//         return AlertCircle;
//       default:
//         return Info;
//     }
//   };

//   return (
//     <Card className="h-full">
//       <CardHeader className="pb-3">
//         <div className="flex items-center justify-between">
//           <CardTitle className="text-lg font-semibold">Real-time Alerts</CardTitle>
//           <div className="flex items-center gap-2">
//             <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
//             <span className="text-xs text-muted-foreground">Live</span>
//           </div>
//         </div>
//       </CardHeader>
//       <CardContent className="p-0">
//         <ScrollArea style={{ height: maxHeight }} className="px-6 pb-4">
//           {displayAlerts.length === 0 ? (
//             <div className="flex flex-col items-center justify-center h-full text-center p-8">
//               <Info className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
//               <h3 className="text-lg font-semibold text-foreground mb-2">No Active Alerts</h3>
//               <p className="text-sm text-muted-foreground">
//                 All systems operating normally. New alerts will appear here in real-time.
//               </p>
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {displayAlerts.map((a, i) => {
//                 const Icon = getSeverityIcon(a.action);
//                 return (
//                   <div
//                     key={i}
//                     className={cn(
//                       "p-3 rounded-lg border bg-card/50 hover:bg-card transition-colors cursor-pointer",
//                       a.action.toLowerCase() === "critical" && "border-l-4 border-l-destructive"
//                     )}
//                   >
//                     <div className="flex items-start gap-3">
//                       <div
//                         className={cn(
//                           "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
//                           a.action.toLowerCase() === "critical" && "bg-destructive/10",
//                           a.action.toLowerCase() === "high" && "bg-warning/10",
//                           a.action.toLowerCase() === "medium" && "bg-secondary",
//                           a.action.toLowerCase() === "low" && "bg-muted"
//                         )}
//                       >
//                         <Icon
//                           className={cn(
//                             "w-4 h-4",
//                             a.action.toLowerCase() === "critical" && "text-destructive",
//                             a.action.toLowerCase() === "high" && "text-warning",
//                             a.action.toLowerCase() === "medium" && "text-foreground",
//                             a.action.toLowerCase() === "low" && "text-muted-foreground"
//                           )}
//                         />
//                       </div>
//                       <div className="flex-1 space-y-1">
//                         <div className="flex items-center justify-between gap-2">
//                           <h4 className="text-sm font-semibold text-foreground">{a.atm_id}</h4>
//                           <Badge variant={getSeverityColor(a.action)} className="text-xs">
//                             {a.action}
//                           </Badge>
//                         </div>
//                         {a.description && <p className="text-xs text-muted-foreground">{a.description}</p>}
//                         {a.location && <p className="text-xs text-muted-foreground">{a.location}</p>}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}
//         </ScrollArea>
//       </CardContent>
//     </Card>
//   );
// };

// export default AlertFeed;


import { useAppSelector } from "@/store/hooks";
import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Alert {
  atm_id: string;
  action: string;       // usually "Send Alert"
  risk_score: number;
  cluster_id: number;
  severity: "LOW" | "HIGH";
  reason: string;
}

interface AlertFeedProps {
  maxHeight?: string;
  alerts?: Alert[];
}

const AlertFeed = ({ maxHeight = "500px", alerts }: AlertFeedProps) => {
  const reduxAlerts = useAppSelector((state) => state.prediction.alerts);
  const displayAlerts: Alert[] = alerts ?? reduxAlerts ?? [];

  const getSeverityColor = (severity: string) => {
    switch (severity.toUpperCase()) {
      case "HIGH":
        return "destructive";
      case "LOW":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity.toUpperCase()) {
      case "HIGH":
        return AlertTriangle;
      case "LOW":
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
        <ScrollArea style={{ height: maxHeight }} className="px-6 pb-4">
          {displayAlerts.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <Info className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Active Alerts</h3>
              <p className="text-sm text-muted-foreground">
                All systems operating normally. New alerts will appear here in real-time.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {displayAlerts.map((a, i) => {
                const Icon = getSeverityIcon(a.severity);
                return (
                  <div
                    key={i}
                    className={cn(
                      "p-3 rounded-lg border bg-card/50 hover:bg-card transition-colors cursor-pointer",
                      a.severity === "HIGH" && "border-l-4 border-l-destructive"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                          a.severity === "HIGH" && "bg-destructive/10",
                          a.severity === "LOW" && "bg-secondary/10"
                        )}
                      >
                        <Icon
                          className={cn(
                            "w-4 h-4",
                            a.severity === "HIGH" && "text-destructive",
                            a.severity === "LOW" && "text-warning"
                          )}
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-semibold text-foreground">{a.atm_id}</h4>
                          <Badge variant={getSeverityColor(a.severity)} className="text-xs">
                            {a.severity}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Risk Score: {(a.risk_score * 100).toFixed(2)}%
                        </p>
                        <p className="text-xs text-muted-foreground">Reason: {a.reason}</p>
                        <p className="text-xs text-muted-foreground">Cluster: {a.cluster_id}</p>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
  <button
    className="px-2 py-1 text-xs rounded bg-destructive text-white hover:bg-red-700 transition"
    // onClick={() => handleSendAlert(a)}
  >
    Send Alert
  </button>
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
