// import { useState ,useEffect} from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Slider } from "@/components/ui/slider";
// import { Calendar, Play, AlertTriangle, MapPin } from "lucide-react";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";
// import { setPredictionData, setLoading, setError } from "@/store/predictionSlice";
// import { fetchPredictions } from "@/services/predictionService";
// import { toast } from "sonner";
// import axios from 'axios';

// interface AnalyticsChartsProps {
//   detailed?: boolean;
// }

// const AnalyticsCharts = ({ detailed = false }: AnalyticsChartsProps) => {
//   const dispatch = useAppDispatch();
//   const { hotspots, alerts, isLoading } = useAppSelector((state) => state.prediction);
//   const [regions, setRegions] = useState<string[]>([]);
// const [loadingRegions, setLoadingRegions] = useState(false);
// useEffect(() => {
//   const fetchRegions = async () => {
//     setLoadingRegions(true);
//     try {
//       const { data } = await axios.get("/api/v1/regions/getregions");
//       // assuming API returns { statusCode: 200, data: ["north", "south", ...] }
//       setRegions(data.data || []);
//     } catch (err) {
//       console.error("Failed to fetch regions", err);
//     } finally {
//       setLoadingRegions(false);
//     }
//   };
  
//   fetchRegions();
// }, []);
//   const [filters, setFilters] = useState({
//     startDate: "",
//     endDate: "",
//     region: "",
//     riskThreshold: 50,
//   });

//   const handleRunPrediction = async () => {
//     if (!filters.startDate || !filters.endDate) {
//       toast.error("Please select both start and end dates");
//       return;
//     }

//     dispatch(setLoading(true));
    
//     try {
//       const response = await fetchPredictions({
//         startDate: filters.startDate,
//         endDate: filters.endDate,
//         region: filters.region,
//         riskThreshold: filters.riskThreshold,
//       });
      
//       dispatch(setPredictionData(response));
//       toast.success("Predictions generated successfully");
//     } catch (error) {
//       dispatch(setError(error instanceof Error ? error.message : "Failed to fetch predictions"));
//       toast.error("Failed to run predictions");
//     }
//   };

//   return (
//     <div className="space-y-6">
//       {/* Filter Section */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-lg font-semibold flex items-center gap-2">
//             <Calendar className="w-5 h-5 text-primary" />
//             Prediction Filters
//           </CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div className="space-y-2">
//               <Label htmlFor="startDate">Start Date</Label>
//               <Input
//                 id="startDate"
//                 type="date"
//                 value={filters.startDate}
//                 onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
//               />
//             </div>
            
//             <div className="space-y-2">
//               <Label htmlFor="endDate">End Date</Label>
//               <Input
//                 id="endDate"
//                 type="date"
//                 value={filters.endDate}
//                 onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
//               />
//             </div>
            
//             <div className="space-y-2">
//               <Label htmlFor="region">Region</Label>
//               {/* <Select value={filters.region} onValueChange={(value) => setFilters({ ...filters, region: value })}>
//                 <SelectTrigger id="region">
//                   <SelectValue placeholder="Select region" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="north">North</SelectItem>
//                   <SelectItem value="south">South</SelectItem>
//                   <SelectItem value="east">East</SelectItem>
//                   <SelectItem value="west">West</SelectItem>
//                   <SelectItem value="central">Central</SelectItem>
//                 </SelectContent>
//               </Select> */}
//               <Select 
//   value={filters.region} 
//   onValueChange={(value) => setFilters({ ...filters, region: value })}
// >
//   <SelectTrigger id="region" disabled={loadingRegions}>
//     <SelectValue placeholder={loadingRegions ? "Loading..." : "Select region"} />
//   </SelectTrigger>
//   <SelectContent>
//     {regions.map((region) => (
//       <SelectItem key={region} value={region}>
//         {region.charAt(0).toUpperCase() + region.slice(1)}
//       </SelectItem>
//     ))}
//   </SelectContent>
// </Select>

//             </div>
            
//             <div className="space-y-2">
//               <Label htmlFor="riskThreshold">
//                 Risk Threshold: {filters.riskThreshold}
//               </Label>
//               <Slider
//                 id="riskThreshold"
//                 min={0}
//                 max={100}
//                 step={5}
//                 value={[filters.riskThreshold]}
//                 onValueChange={(value) => setFilters({ ...filters, riskThreshold: value[0] })}
//                 className="mt-2"
//               />
//             </div>
//           </div>
          
//           <div className="mt-6">
//             <Button 
//               onClick={handleRunPrediction}
//               disabled={isLoading}
//               className="gap-2"
//             >
//               <Play className="w-4 h-4" />
//               {isLoading ? "Running..." : "Run Prediction"}
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Results Section */}
//       {(hotspots.length > 0 || alerts.length > 0) && (
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
//           {/* Hotspot List */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-lg font-semibold flex items-center gap-2">
//                 <MapPin className="w-5 h-5 text-destructive" />
//                 Risk Hotspots
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3 max-h-[400px] overflow-y-auto">
//                 {hotspots.length === 0 ? (
//                   <p className="text-sm text-muted-foreground">No hotspots detected</p>
//                 ) : (
//                   hotspots.map((hotspot, index) => (
//                     <div 
//                       key={index}
//                       className="p-3 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
//                     >
//                       <div className="flex items-start justify-between">
//                         <div className="space-y-1">
//                           <p className="text-sm font-medium">
//                             Cluster Score: <span className="text-destructive">{hotspot.cluster_score}</span>
//                           </p>
//                           <p className="text-xs text-muted-foreground">
//                             ATMs: {hotspot.atm_count}
//                           </p>
//                           <p className="text-xs text-muted-foreground font-mono">
//                             [{hotspot.coordinates[0].toFixed(4)}, {hotspot.coordinates[1].toFixed(4)}]
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Alert List */}
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-lg font-semibold flex items-center gap-2">
//                 <AlertTriangle className="w-5 h-5 text-warning" />
//                 Generated Alerts
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-3 max-h-[400px] overflow-y-auto">
//                 {alerts.length === 0 ? (
//                   <p className="text-sm text-muted-foreground">No alerts generated</p>
//                 ) : (
//                   alerts.map((alert, index) => (
//                     <div 
//                       key={index}
//                       className="p-3 rounded-lg border border-border bg-card/50 hover:bg-card transition-colors"
//                     >
//                       <div className="space-y-1">
//                         <p className="text-sm font-medium">
//                           ATM ID: <span className="font-mono">{alert.atm_id}</span>
//                         </p>
//                         <p className="text-xs text-muted-foreground">
//                           Action: {alert.action}
//                         </p>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AnalyticsCharts;




import { useState, useEffect } from "react";
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
import axios from "axios";
// Example using fetch
const apiUrl = import.meta.env.VITE_API_URL;



const AnalyticsCharts = () => {
  const dispatch = useAppDispatch();
  const { hotspots, alerts, isLoading } = useAppSelector((state) => state.prediction);

  const [regions, setRegions] = useState<string[]>([]);
  const [loadingRegions, setLoadingRegions] = useState(false);

  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    region: "",
    riskThreshold: 1,
  });

  useEffect(() => {
    const fetchRegions = async () => {
      setLoadingRegions(true);
      try {
        const { data } = await axios.get(`${apiUrl}/api/v1/regions/getregions`);
        console.log("regions fetched successfully: ", data.data)

        setRegions(data.data || []);
      } catch (err) {
        console.error("Failed to fetch regions", err);
      } finally {
        setLoadingRegions(false);
      }
    };
    fetchRegions();
  }, []);

  const handleRunPrediction = async () => {
    if (!filters.startDate || !filters.endDate) {
      toast.error("Please select both start and end dates");
      return;
    }

    dispatch(setLoading(true));
    try {
      const response = await fetchPredictions(filters);
      console.log("resoponse in analutics page",response)
      dispatch(setPredictionData(response.data));
      toast.success("Predictions generated successfully");
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : "Failed to fetch predictions"));
      toast.error("Failed to run predictions");
    }finally {
    dispatch(setLoading(false)); // <--- reset loading here
  }
  };

  return (
    <div className="space-y-6">
      {/* Filter Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" /> Prediction Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Start Date</Label>
              <Input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>End Date</Label>
              <Input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              />
            </div>

            {/* <div className="space-y-2">
              <Label>Region</Label>
              <Select
                value={filters.region}
                onValueChange={(value) => setFilters({ ...filters, region: value })}
              >
                <SelectTrigger disabled={loadingRegions}>
                  <SelectValue placeholder={loadingRegions ? "Loading..." : "Select region"} />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region.charAt(0).toUpperCase() + region.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
            </div> */}
            <div className="space-y-2">
  <Label>Region</Label>
  <Input
    type="text"
    placeholder="Enter region"
    value={filters.region}
    onChange={(e) => setFilters({ ...filters, region: e.target.value })}
  />
</div>


            <div className="space-y-2">
              <Label>Risk Threshold: {filters.riskThreshold}</Label>
              <Slider
                  min={0}
                  max={0.5}
                  step={0.01}          
                value={[filters.riskThreshold]}
                onValueChange={(value) => setFilters({ ...filters, riskThreshold: value[0] })}
              />
            </div>
          </div>

          <div className="mt-4">
            <Button onClick={handleRunPrediction} disabled={isLoading}>
              <Play className="w-4 h-4 mr-2" /> {isLoading ? "Running..." : "Run Prediction"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Hotspots */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-destructive" /> Hotspots
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[400px] overflow-y-auto">
            {hotspots.length === 0 ? (
              <p>No hotspots detected</p>
            ) : (
              hotspots.map((h, i) => (
                <div key={i} className="p-2 border rounded bg-card/50">
                  {/* <p>Cluster Score: {h.cluster_score}</p>
                  <p>ATMs: {h.atm_count}</p>
                  <p>Coordinates: [{h.coordinates[0].toFixed(4)}, {h.coordinates[1].toFixed(4)}]</p> */}
                  <p>Cluster Score: {h.cluster_score}</p>
<p>ATMs: {h.atm_count}</p>
<p>Coordinates: [{h.coordinates[0].toFixed(4)}, {h.coordinates[1].toFixed(4)}]</p>

                </div>
              ))
            )}
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" /> Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-[400px] overflow-y-auto">
            {alerts.length === 0 ? (
              <p>No alerts generated</p>
            ) : (
              alerts.map((a, i) => (
                <div key={i} className="p-2 border rounded bg-card/50">
                  <p>ATM ID: {a.atm_id}</p>
                  <p>Action: {a.action}</p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
