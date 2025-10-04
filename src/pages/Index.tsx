import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Shield, TrendingUp, MapPin, AlertCircle, Database, Lock } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: TrendingUp,
      title: "Predictive Analytics",
      description: "AI/ML-powered fraud prediction with 94% accuracy"
    },
    {
      icon: MapPin,
      title: "GIS Risk Mapping",
      description: "Real-time geospatial heatmaps of cybercrime hotspots"
    },
    {
      icon: AlertCircle,
      title: "Smart Alerts",
      description: "Automated notifications to LEAs, banks, and I4C officers"
    },
    {
      icon: Database,
      title: "Big Data Integration",
      description: "Process 50,000+ daily complaints seamlessly"
    },
    {
      icon: Lock,
      title: "Enterprise Security",
      description: "AES-256 encryption with role-based access control"
    },
    {
      icon: Shield,
      title: "Intelligence Reports",
      description: "Comprehensive investigation support for law enforcement"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">NCPIRF</h1>
                <p className="text-xs text-muted-foreground">Ministry of Home Affairs</p>
              </div>
            </div>
            <Button onClick={() => navigate("/login")} className="gap-2">
              <Lock className="w-4 h-4" />
              LEA Login
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary font-medium">
            <Shield className="w-4 h-4" />
            Government of India Initiative
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight">
            National Cybercrime
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Proactive Intelligence
            </span>
            <br />
            & Response Framework
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering law enforcement with AI-driven predictive analytics, real-time intelligence, 
            and geospatial risk mapping to combat financial cybercrime across India.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              onClick={() => navigate("/login")}
              className="gap-2 px-8 shadow-lg hover:shadow-primary/50 transition-all"
            >
              <Shield className="w-5 h-5" />
              Access LEA Portal
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/dashboard")}
              className="gap-2 px-8"
            >
              View Dashboard
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { value: "50,000+", label: "Daily Complaints Processed" },
            { value: "94.2%", label: "Prediction Accuracy" },
            { value: "18", label: "Active Risk Zones" },
            { value: "24/7", label: "Real-time Monitoring" }
          ].map((stat, index) => (
            <div key={index} className="text-center p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-colors">
              <p className="text-4xl font-bold text-primary mb-2">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Advanced Cybercrime Intelligence Platform
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Comprehensive tools and technologies for proactive cybercrime prevention and rapid response
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-6 bg-card border border-border rounded-lg hover:border-primary/50 transition-all hover:shadow-lg animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary" />
              <span className="text-sm text-muted-foreground">
                © 2025 NCPIRF - Ministry of Home Affairs, Government of India
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3 h-3" />
              <span>Secured by AES-256 Encryption</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
