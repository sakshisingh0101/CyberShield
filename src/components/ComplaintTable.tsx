import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download } from "lucide-react";
import { useState } from "react";

interface Complaint {
  id: string;
  timestamp: string;
  category: string;
  amount: string;
  location: string;
  status: "pending" | "investigating" | "resolved";
  riskLevel: "high" | "medium" | "low";
}

const mockComplaints: Complaint[] = [];

const ComplaintTable = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusVariant = (status: Complaint["status"]) => {
    switch (status) {
      case "resolved":
        return "default";
      case "investigating":
        return "secondary";
      default:
        return "outline";
    }
  };

  const getRiskVariant = (risk: Complaint["riskLevel"]) => {
    switch (risk) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-semibold">Complaint Database</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">Real-time complaint tracking and management</p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by ID, category, or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead>Complaint ID</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Risk Level</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockComplaints.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-64">
                    <div className="flex flex-col items-center justify-center text-center">
                      <Search className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">No Complaints Found</h3>
                      <p className="text-sm text-muted-foreground">
                        No complaint records are currently available. New complaints will appear here automatically.
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                mockComplaints.map((complaint) => (
                  <TableRow key={complaint.id} className="hover:bg-muted/30">
                    <TableCell className="font-mono text-xs">{complaint.id}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{complaint.timestamp}</TableCell>
                    <TableCell className="text-sm">{complaint.category}</TableCell>
                    <TableCell className="font-semibold">{complaint.amount}</TableCell>
                    <TableCell className="text-sm">{complaint.location}</TableCell>
                    <TableCell>
                      <Badge variant={getRiskVariant(complaint.riskLevel)} className="text-xs">
                        {complaint.riskLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(complaint.status)} className="text-xs">
                        {complaint.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ComplaintTable;
