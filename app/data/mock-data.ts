// Mock financial data for institutional banker dashboard

export interface Portfolio {
  totalAUM: number;
  holdings: { assetClass: string; value: number; allocation: number }[];
  performance: { period: string; value: number; change: number }[];
}

export interface Transaction {
  id: string;
  client: string;
  type: 'buy' | 'sell' | 'transfer';
  amount: number;
  status: 'pending' | 'completed' | 'flagged';
  timestamp: Date;
  isCrossBorder: boolean;
}

export interface ComplianceAlert {
  id: string;
  client: string;
  type: 'kyc' | 'aml' | 'regulatory';
  severity: 'critical' | 'warning' | 'info';
  message: string;
  dueDate?: Date;
}

export interface RiskMetric {
  sector: string;
  exposure: number;
  limit: number;
  var: number;
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

export interface MarketDataPoint {
  date: string;
  value: number;
  volume: number;
}

// Portfolio data
export const portfolioData: Portfolio = {
  totalAUM: 4200000000, // $4.2B
  holdings: [
    { assetClass: 'Equities', value: 2604000000, allocation: 62 },
    { assetClass: 'Fixed Income', value: 1176000000, allocation: 28 },
    { assetClass: 'Alternatives', value: 420000000, allocation: 10 },
  ],
  performance: [
    { period: 'YTD', value: 8.4, change: 0.8 },
    { period: 'MTD', value: 2.1, change: 0.3 },
    { period: 'QTD', value: 5.2, change: 0.5 },
  ],
};

// Transaction data
export const transactions: Transaction[] = [
  {
    id: 'TXN-001',
    client: 'ACME Corporation',
    type: 'buy',
    amount: 125000,
    status: 'completed',
    timestamp: new Date('2026-02-02T10:15:00'),
    isCrossBorder: false,
  },
  {
    id: 'TXN-002',
    client: 'Widget Industries',
    type: 'sell',
    amount: 45000,
    status: 'flagged',
    timestamp: new Date('2026-02-02T09:30:00'),
    isCrossBorder: true,
  },
  {
    id: 'TXN-003',
    client: 'Global Finance LLC',
    type: 'transfer',
    amount: 250000,
    status: 'pending',
    timestamp: new Date('2026-02-02T08:45:00'),
    isCrossBorder: false,
  },
  {
    id: 'TXN-004',
    client: 'Tech Ventures Inc',
    type: 'buy',
    amount: 87500,
    status: 'completed',
    timestamp: new Date('2026-02-01T16:20:00'),
    isCrossBorder: false,
  },
  {
    id: 'TXN-005',
    client: 'Emerging Markets Fund',
    type: 'sell',
    amount: 150000,
    status: 'completed',
    timestamp: new Date('2026-02-01T14:10:00'),
    isCrossBorder: true,
  },
  {
    id: 'TXN-006',
    client: 'ACME Corporation',
    type: 'buy',
    amount: 12500,
    status: 'completed',
    timestamp: new Date('2026-02-01T11:30:00'),
    isCrossBorder: false,
  },
];

// Compliance alerts
export const complianceAlerts: ComplianceAlert[] = [
  {
    id: 'ALERT-001',
    client: 'ACME Corporation',
    type: 'kyc',
    severity: 'critical',
    message: 'KYC documentation expiring in 7 days',
    dueDate: new Date('2026-02-09'),
  },
  {
    id: 'ALERT-002',
    client: 'Widget Industries',
    type: 'aml',
    severity: 'warning',
    message: 'Large cross-border transaction requires review',
  },
  {
    id: 'ALERT-003',
    client: 'Global Finance LLC',
    type: 'regulatory',
    severity: 'info',
    message: 'All SAR filings completed on time',
  },
  {
    id: 'ALERT-004',
    client: 'Tech Ventures Inc',
    type: 'kyc',
    severity: 'warning',
    message: 'Beneficial ownership update required',
    dueDate: new Date('2026-02-15'),
  },
];

// Risk metrics
export const riskMetrics: RiskMetric[] = [
  { sector: 'Technology', exposure: 78, limit: 100, var: 12400000 },
  { sector: 'Finance', exposure: 65, limit: 100, var: 9800000 },
  { sector: 'Healthcare', exposure: 45, limit: 100, var: 7200000 },
  { sector: 'Energy', exposure: 32, limit: 100, var: 5100000 },
  { sector: 'Consumer', exposure: 28, limit: 100, var: 4200000 },
];

// Market indices
export const marketIndices: MarketIndex[] = [
  { name: 'S&P 500', value: 4927.11, change: 40.2, changePercent: 0.82 },
  { name: 'NASDAQ', value: 15628.04, change: -18.7, changePercent: -0.12 },
  { name: 'DOW', value: 38450.23, change: 125.4, changePercent: 0.33 },
  { name: 'VIX', value: 13.45, change: -0.8, changePercent: -5.62 },
  { name: '10Y Treasury', value: 4.12, change: 0.03, changePercent: 0.73 },
];

// Market chart data (S&P 500 last 30 days)
export const marketChartData: MarketDataPoint[] = [
  { date: '2026-01-03', value: 4850.2, volume: 3200000000 },
  { date: '2026-01-04', value: 4865.8, volume: 3100000000 },
  { date: '2026-01-05', value: 4872.1, volume: 3300000000 },
  { date: '2026-01-06', value: 4880.5, volume: 3400000000 },
  { date: '2026-01-07', value: 4875.3, volume: 2900000000 },
  { date: '2026-01-10', value: 4890.7, volume: 3500000000 },
  { date: '2026-01-11', value: 4885.2, volume: 3200000000 },
  { date: '2026-01-12', value: 4895.6, volume: 3600000000 },
  { date: '2026-01-13', value: 4900.1, volume: 3100000000 },
  { date: '2026-01-14', value: 4898.4, volume: 2800000000 },
  { date: '2026-01-17', value: 4905.3, volume: 3300000000 },
  { date: '2026-01-18', value: 4910.8, volume: 3400000000 },
  { date: '2026-01-19', value: 4908.2, volume: 3200000000 },
  { date: '2026-01-20', value: 4915.7, volume: 3500000000 },
  { date: '2026-01-21', value: 4912.4, volume: 2900000000 },
  { date: '2026-01-24', value: 4920.1, volume: 3600000000 },
  { date: '2026-01-25', value: 4918.5, volume: 3100000000 },
  { date: '2026-01-26', value: 4922.3, volume: 3400000000 },
  { date: '2026-01-27', value: 4925.8, volume: 3300000000 },
  { date: '2026-01-28', value: 4923.1, volume: 2800000000 },
  { date: '2026-01-31', value: 4926.4, volume: 3500000000 },
  { date: '2026-02-01', value: 4924.8, volume: 3200000000 },
  { date: '2026-02-02', value: 4927.11, volume: 3400000000 },
];
