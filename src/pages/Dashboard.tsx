import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Shield, Bell, Activity, TrendingUp, AlertCircle, MapPin, LogOut, ArrowLeft } from "lucide-react";
import { useAuth } from "@/integrations/supabase/auth";
import { Button } from "@/components/ui/button";
import MetricsCard from "@/components/MetricsCard";
import AlertFeed from "@/components/AlertFeed";
import RiskHeatmap from "@/components/RiskHeatmap";
import AnalyticsCharts from "@/components/AnalyticsCharts";
import ComplaintTable from "@/components/ComplaintTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [metrics, setMetrics] = useState({
  activeAlerts: 1,
  complaintsToday: 21,
  riskZones: 3,
  predictionAccuracy: 97, // in percent
});

// Optionally, simulate updates for demo
// useEffect(() => {
//   const interval = setInterval(() => {
//     setMetrics((prev) => ({
//       activeAlerts: Math.floor(Math.random() * 10), // 0-9
//       complaintsToday: Math.floor(Math.random() * 20), // 0-19
//       riskZones: Math.floor(Math.random() * 5), // 0-4
//       predictionAccuracy: Math.floor(70 + Math.random() * 30), // 70-99%
//     }));
//   }, 5000); // every 5s

//   return () => clearInterval(interval);
// }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-12 h-12 text-primary mx-auto animate-pulse mb-4" />
          <p className="text-muted-foreground">Verifying credentials...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">NCPIRF Dashboard</h1>
                <p className="text-xs text-muted-foreground">Intelligence & Response Command Center</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Home
              </Button>
              
              <div className="relative">
                <Bell className="w-5 h-5 text-muted-foreground hover:text-primary cursor-pointer transition-colors" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full animate-pulse"></span>
              </div>
              
              <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-md border border-primary/20">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-foreground">
                  {user?.email?.split('@')[0] || 'Officer'}
                </span>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* <MetricsCard
            title="Active Alerts"
            value="0"
            change="0%"
            icon={AlertCircle}
            trend="up"
            className="border-destructive/20"
          />
          <MetricsCard
            title="Complaints Today"
            value="0"
            change="0%"
            icon={Activity}
            trend="up"
          />
          <MetricsCard
            title="Risk Zones"
            value="0"
            change="0%"
            icon={MapPin}
            trend="down"
            className="border-warning/20"
          />
          <MetricsCard
            title="Prediction Accuracy"
            value="0%"
            change="0%"
            icon={TrendingUp}
            trend="up"
            className="border-success/20" */}
          {/* /> */}
          <MetricsCard
  title="Active Alerts"
  value={metrics.activeAlerts.toString()}
  change="0%" // optional: you can calculate delta if you want
  icon={AlertCircle}
  trend="up"
  className="border-destructive/20"
/>
<MetricsCard
  title="Complaints Today"
  value={metrics.complaintsToday.toString()}
  change="0%"
  icon={Activity}
  trend="up"
/>
<MetricsCard
  title="Risk Zones"
  value={metrics.riskZones.toString()}
  change="0%"
  icon={MapPin}
  trend="down"
  className="border-warning/20"
/>
<MetricsCard
  title="Prediction Accuracy"
  value={`${metrics.predictionAccuracy}%`}
  change="0%"
  icon={TrendingUp}
  trend="up"
  className="border-success/20"
/>

        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="bg-card border border-border">
            <TabsTrigger value="overview" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Overview
            </TabsTrigger>
            <TabsTrigger value="map" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Risk Heatmap
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="complaints" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Complaints
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <RiskHeatmap />
              </div>
              <div>
                <AlertFeed />
              </div>
            </div>
            <AnalyticsCharts />
          </TabsContent>

          <TabsContent value="map">
            <RiskHeatmap fullscreen />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsCharts  />
          </TabsContent>

          <TabsContent value="complaints">
            <ComplaintTable />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
