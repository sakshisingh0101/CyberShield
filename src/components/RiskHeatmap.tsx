import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Layers, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/store/hooks";

interface RiskHeatmapProps {
  fullscreen?: boolean;
}

const RiskHeatmap = ({ fullscreen = false }: RiskHeatmapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const { hotspots } = useAppSelector((state) => state.prediction);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "critical": return "#ef4444";
      case "high": return "#f59e0b";
      case "medium": return "#eab308";
      case "low": return "#22c55e";
      default: return "#3b82f6";
    }
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    // Clear existing map if it exists
    if (map.current) {
      map.current.remove();
      map.current = null;
    }

    // Initialize map
    map.current = L.map(mapContainer.current, {
      center: [20.5937, 78.9629],
      zoom: 5,
    });

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map.current);

    // Add hotspot markers from Redux if available
    if (hotspots.length > 0) {
      const bounds: [number, number][] = [];
      
      hotspots.forEach((hotspot) => {
        const radius = hotspot.cluster_score > 80 ? 20000 : hotspot.cluster_score > 50 ? 15000 : 10000;
        const color = hotspot.cluster_score > 80 ? "#ef4444" : hotspot.cluster_score > 50 ? "#f59e0b" : "#eab308";
        
        const circle = L.circle([hotspot.coordinates[0], hotspot.coordinates[1]], {
          color: color,
          fillColor: color,
          fillOpacity: 0.4,
          radius: radius,
          weight: 2,
        }).addTo(map.current!);

        circle.bindPopup(`
          <div class="text-sm">
            <h3 class="font-semibold">Risk Hotspot</h3>
            <p class="text-xs">Score: ${hotspot.cluster_score}</p>
            <p class="text-xs">ATMs: ${hotspot.atm_count}</p>
          </div>
        `);

        bounds.push([hotspot.coordinates[0], hotspot.coordinates[1]]);
      });

      // Fit bounds to show all markers
      if (bounds.length > 0) {
        map.current.fitBounds(bounds, { padding: [50, 50] });
      }
    }

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [hotspots]);

  return (
    <Card className={fullscreen ? "h-[calc(100vh-12rem)]" : "h-full"}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Geospatial Risk Heatmap
            </CardTitle>
            <CardDescription className="text-xs mt-1">
              Predictive fraud zones based on ML analytics
            </CardDescription>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Layers className="w-4 h-4" />
            Layers
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {hotspots.length === 0 ? (
          <div className={cn(
            "relative rounded-lg border border-border bg-card/50 flex items-center justify-center",
            fullscreen ? "h-[calc(100vh-16rem)]" : "h-[450px]"
          )}>
            <div className="text-center space-y-4 p-8">
              <AlertCircle className="w-12 h-12 text-muted-foreground mx-auto" />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-foreground">No Predictions Yet</h3>
                <p className="text-sm text-muted-foreground max-w-md">
                  Run prediction from the Analytics section to visualize risk zones on the map.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className={cn(
            "relative rounded-lg overflow-hidden border border-border",
            fullscreen ? "h-[calc(100vh-16rem)]" : "h-[450px]"
          )}>
            <div ref={mapContainer} className="h-full w-full" />
            
            {/* Legend */}
            <div className="absolute bottom-4 left-4 z-[1000] inline-flex gap-4 bg-card/90 backdrop-blur-sm p-4 rounded-lg border border-border shadow-lg">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-destructive rounded"></div>
                <span className="text-xs text-foreground">Critical Risk (&gt;80)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-warning rounded"></div>
                <span className="text-xs text-foreground">High Risk (50-80)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-xs text-foreground">Medium Risk (&lt;50)</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RiskHeatmap;
