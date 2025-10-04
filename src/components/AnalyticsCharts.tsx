import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface AnalyticsChartsProps {
  detailed?: boolean;
}

const fraudTrendData = [
  { month: "Jan", incidents: 0, predicted: 0 },
  { month: "Feb", incidents: 0, predicted: 0 },
  { month: "Mar", incidents: 0, predicted: 0 },
  { month: "Apr", incidents: 0, predicted: 0 },
  { month: "May", incidents: 0, predicted: 0 },
  { month: "Jun", incidents: 0, predicted: 0 },
];

const categoryData = [
  { category: "UPI Fraud", count: 0 },
  { category: "Card Fraud", count: 0 },
  { category: "OTP Scam", count: 0 },
  { category: "Investment", count: 0 },
  { category: "Other", count: 0 },
];

const AnalyticsCharts = ({ detailed = false }: AnalyticsChartsProps) => {
  return (
    <div className={cn("grid gap-4", detailed ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2")}>
      {/* Fraud Trend Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Fraud Trend Analysis</CardTitle>
          <p className="text-xs text-muted-foreground">Actual vs ML Predictions</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={fraudTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="month" 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="incidents" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={2}
                name="Actual Incidents"
              />
              <Line 
                type="monotone" 
                dataKey="predicted" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="ML Prediction"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Fraud Category Distribution */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Fraud Category Distribution</CardTitle>
          <p className="text-xs text-muted-foreground">Top 5 categories this month</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="category" 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '11px' }}
                angle={-15}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                  color: 'hsl(var(--foreground))'
                }}
              />
              <Bar 
                dataKey="count" 
                fill="hsl(var(--primary))" 
                radius={[8, 8, 0, 0]}
                name="Complaints"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

import { cn } from "@/lib/utils";

export default AnalyticsCharts;
