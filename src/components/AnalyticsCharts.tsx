import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Calendar, Play, AlertTriangle, MapPin } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPredictionData, setLoading, setError } from "@/store/predictionSlice";
import { fetchPredictions } from "@/services/predictionService";
import { toast } from "sonner";

interface AnalyticsChartsProps {
  detailed?: boolean;
}

const AnalyticsCharts = ({ detailed = false }: AnalyticsChartsProps) => {
  const dispatch = useAppDispatch();
  const { hotspots, alerts, isLoading } = useAppSelector((state) => state.prediction);
  
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    region: "",
    riskThreshold: 50,
  });

  const handleRunPrediction = async () => {
    if (!filters.startDate || !filters.endDate) {
      toast.error("Please select both start and end dates");
      return;
    }

    dispatch(setLoading(true));
    
    try {
      const response = await fetchPredictions({
        startDate: filters.startDate,
        endDate: filters.endDate,
        region: filters.region,
        riskThreshold: filters.riskThreshold,
      });
      
      dispatch(setPredictionData(response));
      toast.success("Predictions generated successfully");
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : "Failed to fetch predictions"));
      toast.error("Failed to run predictions");
    }
  };

  return (
    <div className="space-y-6">
      {/* Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Prediction Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="region">Region</Label>
              <Select value={filters.region} onValueChange={(value) => setFilters({ ...filters, region: value })}>
                <SelectTrigger id="region">
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="north">North</SelectItem>
                  <SelectItem value="south">South</SelectItem>
                  <SelectItem value="east">East</SelectItem>
                  <SelectItem value="west">West</SelectItem>
                  <SelectItem value="central">Central</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="riskThreshold">
                Risk Threshold: {filters.riskThreshold}
              </Label>
              <Slider
                id="riskThreshold"
                min={0}
                max={100}
                step={5}
                value={[filters.riskThreshold]}
                onValueChange={(value) => setFilters({ ...filters, riskThreshold: value[0] })}
                className="mt-2"
              />
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              onClick={handleRunPrediction}
              disabled={isLoading}
              className="gap-2"
            >
              <Play className="w-4 h-4" />
              {isLoading ? "Running..." : "Run Prediction"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      {(hotspots.length > 0 || alerts.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Hotspot List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <MapPin className="w-5 h-5 text-destructive" />
                Risk Hotspots
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {hotspots.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No hotspots detected</p>
                ) : (
                  hotspots.map((hotspot, index) => (
                    <div 
                      key={index}
                      className="p-3 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <p className="text-sm font-medium">
                            Cluster Score: <span className="text-destructive">{hotspot.cluster_score}</span>
                          </p>
                          <p className="text-xs text-muted-foreground">
                            ATMs: {hotspot.atm_count}
                          </p>
                          <p className="text-xs text-muted-foreground font-mono">
                            [{hotspot.coordinates[0].toFixed(4)}, {hotspot.coordinates[1].toFixed(4)}]
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Alert List */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Generated Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {alerts.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No alerts generated</p>
                ) : (
                  alerts.map((alert, index) => (
                    <div 
                      key={index}
                      className="p-3 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium">
                          ATM ID: <span className="font-mono">{alert.atm_id}</span>
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Action: {alert.action}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AnalyticsCharts;
