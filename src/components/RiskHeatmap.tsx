import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MapPin, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";

interface RiskHeatmapProps {
  fullscreen?: boolean;
}

// Sample risk zones data
const riskZones = [
  { lat: 28.6139, lng: 77.2090, risk: "critical", name: "Delhi NCR", incidents: 45 },
  { lat: 19.0760, lng: 72.8777, risk: "high", name: "Mumbai", incidents: 32 },
  { lat: 12.9716, lng: 77.5946, risk: "high", name: "Bangalore", incidents: 28 },
  { lat: 13.0827, lng: 80.2707, risk: "medium", name: "Chennai", incidents: 18 },
  { lat: 22.5726, lng: 88.3639, risk: "critical", name: "Kolkata", incidents: 38 },
  { lat: 17.3850, lng: 78.4867, risk: "medium", name: "Hyderabad", incidents: 22 },
  { lat: 23.0225, lng: 72.5714, risk: "low", name: "Ahmedabad", incidents: 12 },
  { lat: 26.9124, lng: 75.7873, risk: "medium", name: "Jaipur", incidents: 15 },
];

const RiskHeatmap = ({ fullscreen = false }: RiskHeatmapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);

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
    if (!mapContainer.current || map.current) return;

    // Initialize map
    map.current = L.map(mapContainer.current, {
      center: [20.5937, 78.9629],
      zoom: 5,
    });

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map.current);

    // Add risk zone markers
    const bounds: [number, number][] = [];
    
    riskZones.forEach((zone) => {
      const radius = zone.risk === "critical" ? 20000 : zone.risk === "high" ? 15000 : 10000;
      
      const circle = L.circle([zone.lat, zone.lng], {
        color: getRiskColor(zone.risk),
        fillColor: getRiskColor(zone.risk),
        fillOpacity: 0.4,
        radius: radius,
        weight: 2,
      }).addTo(map.current!);

      circle.bindPopup(`
        <div class="text-sm">
          <h3 class="font-semibold">${zone.name}</h3>
          <p class="text-xs capitalize">Risk: ${zone.risk}</p>
          <p class="text-xs">Incidents: ${zone.incidents}</p>
        </div>
      `);

      bounds.push([zone.lat, zone.lng]);
    });

    // Fit bounds to show all markers
    if (bounds.length > 0) {
      map.current.fitBounds(bounds, { padding: [50, 50] });
    }

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

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
        <div className={cn(
          "relative rounded-lg overflow-hidden border border-border",
          fullscreen ? "h-[calc(100vh-16rem)]" : "h-[450px]"
        )}>
          <div ref={mapContainer} className="h-full w-full" />
          
          {/* Legend */}
          <div className="absolute bottom-4 left-4 z-[1000] inline-flex gap-4 bg-card/90 backdrop-blur-sm p-4 rounded-lg border border-border shadow-lg">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-destructive rounded"></div>
              <span className="text-xs text-foreground">Critical Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-warning rounded"></div>
              <span className="text-xs text-foreground">High Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-success rounded"></div>
              <span className="text-xs text-foreground">Low Risk</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RiskHeatmap;
