export type DepartmentType = string;

export interface Deal {
  id: string;
  client: string;
  amount: number;
  date: string;
  type: 'Inbound' | 'Outbound' | 'Upgrade';
  repId: string;
  repName: string;
  department: string;
  region: string;
}

export interface SalesRep {
  id: string;
  employeeId?: string;
  name: string;
  displayName: string;
  avatar: string;
  wonDealsAmount: number;
  demosCount: string | number;
  badges: ('trophy' | 'silver-medal' | 'bronze-medal' | 'star')[];
  role: string;
  department: string;
  region: string;
  targetAmount: number;
  winRate: number;
  phone?: string;
  email?: string;
  recentDeals?: Deal[];
}

export interface DepartmentData {
  id: string;
  name: string;
  shortName: string;
  target: number;
  actual: number;
  color: string;
  iconName: string;
  dealCount: number;
  leadRep: string;
}

export interface CompanyTargetSummary {
  monthlyTarget: number;
  currentAchievement: number;
  inboundPercent: number;
  outboundPercent: number;
  upgradePercent: number;
  newCustomers: number;
}

export interface KpiMetrics {
  inboundRevenuePercent: number;
  outboundRevenuePercent: number;
  upgradeRevenuePercent: number;
  newCustomers: number;
  totalRevenue?: number;
  averageDealSize?: number;
}

export interface RegionRevenueData {
  id: string;
  name: string;
  countryCode: string;
  flagEmoji: string;
  target: number;
  targetLabel: string;
  actual: number;
  actualLabel?: string;
}

export type TimeRange = 'month' | 'quarter' | 'year';

export interface PeriodData {
  reps: SalesRep[];
  departments: DepartmentData[];
  summary: CompanyTargetSummary;
  regions: RegionRevenueData[];
}

export type UserRole = 'admin' | 'editor';

export interface AppUser {
  id: string;
  username: string;
  name: string;
  email?: string;
  role: UserRole;
  password: string;
  createdAt: string;
}
