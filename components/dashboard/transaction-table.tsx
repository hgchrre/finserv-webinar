"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { transactions } from "@/app/data/mock-data";
import { Globe, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

interface TransactionTableProps {
  className?: string;
}

export function TransactionTable({ className }: TransactionTableProps) {
  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  const getStatusBadge = (status: string, amount: number) => {
    if (status === "flagged" || amount >= 10000) {
      return (
        <Badge variant="destructive" className="font-mono text-xs">
          <AlertTriangle className="h-3 w-3 mr-1" strokeWidth={2} aria-hidden="true" />
          CTR
        </Badge>
      );
    }
    if (status === "completed") {
      return (
        <Badge variant="default" className="font-mono text-xs bg-gain text-white border-gain">
          ✓
        </Badge>
      );
    }
    return (
      <Badge variant="secondary" className="font-mono text-xs">
        Pending
      </Badge>
    );
  };

  const recentTransactions = transactions.slice(0, 5);

  return (
    <Card className={cn("h-full flex flex-col min-h-0 panel-border rounded-none", className)}>
      <CardHeader>
        <CardTitle className="text-xs font-sans tracking-[0.1em] uppercase text-muted-foreground">
          TRANSACTIONS
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <div className="h-full overflow-auto scrollbar-hide">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-sans text-xs text-muted-foreground h-10 py-2.5 uppercase tracking-wider">
                  Client
                </TableHead>
                <TableHead className="font-sans text-xs text-muted-foreground h-10 py-2.5 uppercase tracking-wider">
                  Type
                </TableHead>
                <TableHead className="font-sans text-xs text-muted-foreground text-right h-10 py-2.5 uppercase tracking-wider">
                  Amount
                </TableHead>
                <TableHead className="font-sans text-xs text-muted-foreground h-10 py-2.5 uppercase tracking-wider">
                  Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((txn, idx) => (
                <TableRow 
                  key={txn.id} 
                  className="h-11 hover:bg-muted/30 transition-colors group focus-visible:bg-muted/20"
                  tabIndex={0}
                  role="row"
                >
                  <TableCell className="font-mono text-xs py-2.5 tabular-nums">
                    {txn.client}
                  </TableCell>
                  <TableCell className="py-2.5">
                    <div className="flex items-center gap-2">
                      <span className="font-sans text-xs uppercase tracking-wider text-muted-foreground">
                        {txn.type}
                      </span>
                      {txn.isCrossBorder && (
                        <Globe className="h-3.5 w-3.5 text-muted-foreground/60 group-hover:text-primary transition-colors" strokeWidth={2} aria-label="Cross-border transaction" aria-hidden="true" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs text-right py-2.5 tabular-nums">
                    {formatCurrency(txn.amount)}
                  </TableCell>
                  <TableCell className="py-2.5">
                    {getStatusBadge(txn.status, txn.amount)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
