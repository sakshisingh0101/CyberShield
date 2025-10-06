// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Search, Download } from "lucide-react";
// import { useState } from "react";

// interface Complaint {
//   id: string;
//   timestamp: string;
//   category: string;
//   amount: string;
//   location: string;
//   status: "pending" | "investigating" | "resolved";
//   riskLevel: "high" | "medium" | "low";
// }

// const mockComplaints: Complaint[] = [];

// const ComplaintTable = () => {
//   const [searchQuery, setSearchQuery] = useState("");

//   const getStatusVariant = (status: Complaint["status"]) => {
//     switch (status) {
//       case "resolved":
//         return "default";
//       case "investigating":
//         return "secondary";
//       default:
//         return "outline";
//     }
//   };

//   const getRiskVariant = (risk: Complaint["riskLevel"]) => {
//     switch (risk) {
//       case "high":
//         return "destructive";
//       case "medium":
//         return "secondary";
//       default:
//         return "outline";
//     }
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <div className="flex items-center justify-between gap-4">
//           <div>
//             <CardTitle className="text-lg font-semibold">Complaint Database</CardTitle>
//             <p className="text-xs text-muted-foreground mt-1">Real-time complaint tracking and management</p>
//           </div>
//           <Button variant="outline" size="sm" className="gap-2">
//             <Download className="w-4 h-4" />
//             Export
//           </Button>
//         </div>
//         <div className="relative mt-4">
//           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
//           <Input
//             placeholder="Search by ID, category, or location..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="pl-10"
//           />
//         </div>
//       </CardHeader>
//       <CardContent>
//         <div className="rounded-md border">
//           <Table>
//             <TableHeader>
//               <TableRow className="bg-muted/50">
//                 <TableHead>Complaint ID</TableHead>
//                 <TableHead>Timestamp</TableHead>
//                 <TableHead>Category</TableHead>
//                 <TableHead>Amount</TableHead>
//                 <TableHead>Location</TableHead>
//                 <TableHead>Risk Level</TableHead>
//                 <TableHead>Status</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {mockComplaints.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={7} className="h-64">
//                     <div className="flex flex-col items-center justify-center text-center">
//                       <Search className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
//                       <h3 className="text-lg font-semibold text-foreground mb-2">No Complaints Found</h3>
//                       <p className="text-sm text-muted-foreground">
//                         No complaint records are currently available. New complaints will appear here automatically.
//                       </p>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 mockComplaints.map((complaint) => (
//                   <TableRow key={complaint.id} className="hover:bg-muted/30">
//                     <TableCell className="font-mono text-xs">{complaint.id}</TableCell>
//                     <TableCell className="text-xs text-muted-foreground">{complaint.timestamp}</TableCell>
//                     <TableCell className="text-sm">{complaint.category}</TableCell>
//                     <TableCell className="font-semibold">{complaint.amount}</TableCell>
//                     <TableCell className="text-sm">{complaint.location}</TableCell>
//                     <TableCell>
//                       <Badge variant={getRiskVariant(complaint.riskLevel)} className="text-xs">
//                         {complaint.riskLevel}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <Badge variant={getStatusVariant(complaint.status)} className="text-xs">
//                         {complaint.status}
//                       </Badge>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default ComplaintTable;


import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download } from "lucide-react";
import { useEffect, useState } from "react";

interface Complaint {
  id: string;
  timestamp: string;
  category: string;
  amount: string;
  location: string;
  riskLevel: "high" | "medium" | "low";
  status: "pending" | "investigating" | "resolved";
}

const ComplaintTable = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [complaints, setComplaints] = useState<Complaint[]>([
    {
      id: "TXN1001",
      timestamp: "2025-10-07 09:45",
      category: "Online Transfer",
      amount: "₹5,000",
      location: "Delhi",
      riskLevel: "high",
      status: "investigating",
    },
    {
      id: "TXN1002",
      timestamp: "2025-10-07 11:20",
      category: "ATM Withdrawal",
      amount: "₹2,500",
      location: "Mumbai",
      riskLevel: "medium",
      status: "pending",
    },
    {
      id: "TXN1003",
      timestamp: "2025-10-07 14:05",
      category: "UPI Payment",
      amount: "₹750",
      location: "Jaipur",
      riskLevel: "low",
      status: "resolved",
    },
    {
      id: "TXN1004",
      timestamp: "2025-10-06 21:12",
      category: "POS Purchase",
      amount: "₹9,300",
      location: "Chennai",
      riskLevel: "high",
      status: "investigating",
    },
    {
      id: "TXN1005",
      timestamp: "2025-10-06 20:50",
      category: "Credit Card Payment",
      amount: "₹15,000",
      location: "Kolkata",
      riskLevel: "medium",
      status: "pending",
    },
    {
      id: "TXN1006",
      timestamp: "2025-10-05 18:32",
      category: "NEFT Transfer",
      amount: "₹25,000",
      location: "Pune",
      riskLevel: "high",
      status: "investigating",
    },
    {
      id: "TXN1007",
      timestamp: "2025-10-05 17:15",
      category: "UPI Transfer",
      amount: "₹1,200",
      location: "Ahmedabad",
      riskLevel: "low",
      status: "resolved",
    },
    {
      id: "TXN1008",
      timestamp: "2025-10-05 16:00",
      category: "ATM Withdrawal",
      amount: "₹3,000",
      location: "Lucknow",
      riskLevel: "medium",
      status: "pending",
    },
    {
      id: "TXN1009",
      timestamp: "2025-10-04 22:55",
      category: "Online Shopping",
      amount: "₹6,999",
      location: "Hyderabad",
      riskLevel: "high",
      status: "investigating",
    },
    {
      id: "TXN1010",
      timestamp: "2025-10-04 19:10",
      category: "UPI Transfer",
      amount: "₹980",
      location: "Indore",
      riskLevel: "low",
      status: "resolved",
    },
    {
      id: "TXN1011",
      timestamp: "2025-10-03 17:50",
      category: "POS Purchase",
      amount: "₹4,250",
      location: "Surat",
      riskLevel: "medium",
      status: "pending",
    },
    {
      id: "TXN1012",
      timestamp: "2025-10-03 15:45",
      category: "Online Transfer",
      amount: "₹18,000",
      location: "Bangalore",
      riskLevel: "high",
      status: "investigating",
    },
    {
      id: "TXN1013",
      timestamp: "2025-10-02 12:10",
      category: "Credit Card Payment",
      amount: "₹8,200",
      location: "Delhi",
      riskLevel: "medium",
      status: "resolved",
    },
    {
      id: "TXN1014",
      timestamp: "2025-10-02 10:30",
      category: "ATM Withdrawal",
      amount: "₹4,000",
      location: "Noida",
      riskLevel: "low",
      status: "pending",
    },
    {
      id: "TXN1015",
      timestamp: "2025-10-01 23:59",
      category: "UPI Payment",
      amount: "₹2,300",
      location: "Bhopal",
      riskLevel: "low",
      status: "resolved",
    },
    {
      id: "TXN1016",
      timestamp: "2025-10-01 21:20",
      category: "NEFT Transfer",
      amount: "₹30,000",
      location: "Kochi",
      riskLevel: "high",
      status: "investigating",
    },
    {
      id: "TXN1017",
      timestamp: "2025-09-30 20:45",
      category: "Online Transfer",
      amount: "₹7,500",
      location: "Chandigarh",
      riskLevel: "medium",
      status: "pending",
    },
    {
      id: "TXN1018",
      timestamp: "2025-09-29 18:50",
      category: "POS Purchase",
      amount: "₹9,900",
      location: "Nagpur",
      riskLevel: "high",
      status: "investigating",
    },
    {
      id: "TXN1019",
      timestamp: "2025-09-29 13:10",
      category: "UPI Transfer",
      amount: "₹1,500",
      location: "Patna",
      riskLevel: "low",
      status: "resolved",
    },
    {
      id: "TXN1020",
      timestamp: "2025-09-28 09:35",
      category: "Credit Card Payment",
      amount: "₹6,000",
      location: "Guwahati",
      riskLevel: "medium",
      status: "pending",
    },
  ]);

  // Filter logic
  const filtered = complaints.filter((c) =>
    Object.values(c).some((val) =>
      val.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const exportToCSV = (data: Complaint[]) => {
  const headers = ["Complaint ID", "Timestamp", "Category", "Amount", "Location", "Risk Level", "Status"];
  
  const rows = data.map(c =>
    [c.id, c.timestamp, c.category, c.amount, c.location, c.riskLevel, c.status].join(",")
  );

  const csvContent = [headers.join(","), ...rows].join("\n");

  // Create a blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "complaints.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-4">
          <div>
            <CardTitle className="text-lg font-semibold">Complaint Database</CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Real-time complaint tracking and management
            </p>
          </div>
          {/* <Button variant="outline" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button> */}
          <Button variant="outline" size="sm" className="gap-2" onClick={() => exportToCSV(filtered)}>
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
        <div className="rounded-md border max-h-[400px] overflow-y-auto">
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
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="h-64 text-center">
                    No Complaints Found
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.id}</TableCell>
                    <TableCell>{c.timestamp}</TableCell>
                    <TableCell>{c.category}</TableCell>
                    <TableCell>{c.amount}</TableCell>
                    <TableCell>{c.location}</TableCell>
                    <TableCell>
                      <Badge
                        className={`text-xs capitalize ${
                          c.riskLevel === "high"
                            ? "bg-red-600 text-white"
                            : c.riskLevel === "medium"
                            ? "bg-yellow-500 text-white"
                            : "bg-green-600 text-white"
                        }`}
                      >
                        {c.riskLevel}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`text-xs capitalize ${
                          c.status === "resolved"
                            ? "bg-green-600 text-white"
                            : c.status === "investigating"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-400 text-white"
                        }`}
                      >
                        {c.status}
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
