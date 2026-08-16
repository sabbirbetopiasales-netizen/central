import { SalesRep, DepartmentData, CompanyTargetSummary, RegionRevenueData, AppUser } from '../types';

export const INITIAL_USERS: AppUser[] = [
  {
    id: '11684',
    username: '11684',
    name: 'Executive Administrator',
    email: 'admin@betopiagroup.com',
    role: 'admin',
    password: '51643600',
    createdAt: '2026-01-01'
  },
  {
    id: 'user-editor-1',
    username: 'editor',
    name: 'Sales Operations Editor',
    email: 'editor@betopiagroup.com',
    role: 'editor',
    password: 'editor',
    createdAt: '2026-01-15'
  }
];

export const INITIAL_DEPARTMENTS: DepartmentData[] = [
  {
    id: 'dept-fullstack',
    name: 'Full Stack Development',
    shortName: 'Full Stack',
    target: 0,
    actual: 0,
    color: '#3b82f6', // blue
    iconName: 'Code2',
    dealCount: 0,
    leadRep: 'Karen C.'
  },
  {
    id: 'dept-ai',
    name: 'AI Development',
    shortName: 'AI Dev',
    target: 0,
    actual: 0,
    color: '#8b5cf6', // purple
    iconName: 'Cpu',
    dealCount: 0,
    leadRep: 'Mark T.'
  },
  {
    id: 'dept-marketing',
    name: 'Digital Marketing',
    shortName: 'Digital Mkt',
    target: 0,
    actual: 0,
    color: '#ec4899', // pink
    iconName: 'Megaphone',
    dealCount: 0,
    leadRep: 'Sarah P.'
  },
  {
    id: 'dept-cms',
    name: 'CMS',
    shortName: 'CMS Solutions',
    target: 0,
    actual: 0,
    color: '#06b6d4', // cyan
    iconName: 'LayoutTemplate',
    dealCount: 0,
    leadRep: 'Emily W.'
  },
  {
    id: 'dept-arch',
    name: '2D & 3D Architech',
    shortName: '2D/3D Arch',
    target: 0,
    actual: 0,
    color: '#f59e0b', // amber
    iconName: 'Box',
    dealCount: 0,
    leadRep: 'Karen Castillo'
  },
  {
    id: 'dept-vc',
    name: 'V&C',
    shortName: 'V&C Studio',
    target: 0,
    actual: 0,
    color: '#10b981', // emerald
    iconName: 'Video',
    dealCount: 0,
    leadRep: 'Marcus Vance'
  },
  {
    id: 'dept-tshirt',
    name: 'T-shirt Design',
    shortName: 'T-Shirt Design',
    target: 0,
    actual: 0,
    color: '#f97316', // orange
    iconName: 'Shirt',
    dealCount: 0,
    leadRep: 'Kyle Daniels'
  }
];

export const INITIAL_REPS: SalesRep[] = [
  {
    id: 'rep-13',
    name: 'Marcus Vance',
    displayName: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 0,
    demosCount: 0,
    badges: [],
    role: 'Audio & Video Communications AE',
    department: 'V&C',
    region: 'USA',
    targetAmount: 0,
    winRate: 0,
    email: 'marcus.v@company.com',
    phone: '+1 (555) 567-8901',
    recentDeals: []
  },
  {
    id: 'rep-10',
    name: 'Emily W.',
    displayName: 'Emily W.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 0,
    demosCount: 0,
    badges: [],
    role: 'Head of CMS Implementations',
    department: 'CMS',
    region: 'USA',
    targetAmount: 0,
    winRate: 0,
    email: 'emily.w@company.com',
    recentDeals: []
  },
  {
    id: 'rep-12',
    name: 'David Chen',
    displayName: 'David Chen',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 0,
    demosCount: 0,
    badges: [],
    role: 'WordPress & CMS Specialist',
    department: 'CMS',
    region: 'USA',
    targetAmount: 0,
    winRate: 0,
    email: 'david.chen@company.com',
    recentDeals: []
  },
  {
    id: 'rep-1',
    name: 'Karen C.',
    displayName: 'Karen C.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 0,
    demosCount: 0,
    badges: [],
    role: 'Principal Solutions AE',
    department: 'Full Stack Development',
    region: 'USA',
    targetAmount: 0,
    winRate: 0,
    email: 'karen.c@company.com',
    phone: '+1 (555) 234-5678',
    recentDeals: []
  },
  {
    id: 'rep-2',
    name: 'Karen Castillo',
    displayName: 'Karen Castillo',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 0,
    demosCount: 0,
    badges: [],
    role: 'Lead Architect Executive',
    department: '2D & 3D Architech',
    region: 'USA',
    targetAmount: 0,
    winRate: 0,
    email: 'karen.castillo@company.com',
    phone: '+1 (555) 345-6789',
    recentDeals: []
  },
  {
    id: 'rep-3',
    name: 'Mark T.',
    displayName: 'Mark T.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 0,
    demosCount: 0,
    badges: [],
    role: 'Enterprise AI Director',
    department: 'AI Development',
    region: 'UK',
    targetAmount: 0,
    winRate: 0,
    email: 'mark.t@company.com',
    phone: '+44 20 7946 0912',
    recentDeals: []
  },
  {
    id: 'rep-4',
    name: 'Sarah P.',
    displayName: 'Sarah P.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 0,
    demosCount: 0,
    badges: [],
    role: 'Strategic Growth Lead',
    department: 'Digital Marketing',
    region: 'Sweden',
    targetAmount: 0,
    winRate: 0,
    email: 'sarah.p@company.com',
    phone: '+46 8 123 4567',
    recentDeals: []
  },
  {
    id: 'rep-5',
    name: 'Jennifer Mata',
    displayName: 'Jennifer Mata',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 0,
    demosCount: 0,
    badges: [],
    role: 'Global Account Director',
    department: 'Full Stack Development',
    region: 'USA',
    targetAmount: 0,
    winRate: 0,
    email: 'jennifer.m@company.com',
    recentDeals: []
  },
  {
    id: 'rep-6',
    name: 'Kyle Daniels',
    displayName: 'Kyle Daniels',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 0,
    demosCount: 0,
    badges: [],
    role: 'Creative Apparel Consultant',
    department: 'T-shirt Design',
    region: 'Kenya',
    targetAmount: 0,
    winRate: 0,
    email: 'kyle.daniels@company.com',
    recentDeals: []
  },
  {
    id: 'rep-7',
    name: 'Mike Novak',
    displayName: 'Mike Novak',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 0,
    demosCount: 0,
    badges: [],
    role: 'Enterprise AI Specialist',
    department: 'AI Development',
    region: 'UK',
    targetAmount: 0,
    winRate: 0,
    email: 'mike.novak@company.com',
    recentDeals: []
  }
];

export const INITIAL_SUMMARY: CompanyTargetSummary = {
  monthlyTarget: 0,
  currentAchievement: 0,
  inboundPercent: 0,
  outboundPercent: 0,
  upgradePercent: 0,
  newCustomers: 0,
};

export const INITIAL_REGIONS: RegionRevenueData[] = [
  {
    id: 'reg-us',
    name: 'USA',
    countryCode: 'US',
    flagEmoji: '🇺🇸',
    target: 0,
    targetLabel: '$0',
    actual: 0,
    actualLabel: '$0'
  },
  {
    id: 'reg-uk',
    name: 'United Kingdom',
    countryCode: 'GB',
    flagEmoji: '🇬🇧',
    target: 0,
    targetLabel: '$0',
    actual: 0,
    actualLabel: '$0'
  },
  {
    id: 'reg-se',
    name: 'Sweden',
    countryCode: 'SE',
    flagEmoji: '🇸🇪',
    target: 0,
    targetLabel: '$0',
    actual: 0,
    actualLabel: '$0'
  },
  {
    id: 'reg-ke',
    name: 'Kenya',
    countryCode: 'KE',
    flagEmoji: '🇰🇪',
    target: 0,
    targetLabel: '$0',
    actual: 0,
    actualLabel: '$0'
  }
];

export const INITIAL_PERIOD_DATA: Record<string, {
  reps: SalesRep[];
  departments: DepartmentData[];
  summary: CompanyTargetSummary;
  regions: RegionRevenueData[];
}> = {
  month: {
    reps: INITIAL_REPS,
    departments: INITIAL_DEPARTMENTS,
    summary: INITIAL_SUMMARY,
    regions: INITIAL_REGIONS,
  },
  quarter: {
    reps: INITIAL_REPS,
    departments: INITIAL_DEPARTMENTS,
    summary: { ...INITIAL_SUMMARY },
    regions: INITIAL_REGIONS,
  },
  year: {
    reps: INITIAL_REPS,
    departments: INITIAL_DEPARTMENTS,
    summary: { ...INITIAL_SUMMARY },
    regions: INITIAL_REGIONS,
  }
};
