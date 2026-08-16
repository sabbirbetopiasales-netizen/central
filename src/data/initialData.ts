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
    target: 10000,
    actual: 0,
    color: '#3b82f6', // blue
    iconName: 'Code2',
    dealCount: 28,
    leadRep: 'Karen C.'
  },
  {
    id: 'dept-ai',
    name: 'AI Development',
    shortName: 'AI Dev',
    target: 10000,
    actual: 0,
    color: '#8b5cf6', // purple
    iconName: 'Cpu',
    dealCount: 22,
    leadRep: 'Mark T.'
  },
  {
    id: 'dept-marketing',
    name: 'Digital Marketing',
    shortName: 'Digital Mkt',
    target: 10000,
    actual: 0,
    color: '#ec4899', // pink
    iconName: 'Megaphone',
    dealCount: 35,
    leadRep: 'Sarah P.'
  },
  {
    id: 'dept-cms',
    name: 'CMS',
    shortName: 'CMS Solutions',
    target: 10000,
    actual: 1315,
    color: '#06b6d4', // cyan
    iconName: 'LayoutTemplate',
    dealCount: 31,
    leadRep: 'Emily W.'
  },
  {
    id: 'dept-arch',
    name: '2D & 3D Architech',
    shortName: '2D/3D Arch',
    target: 10000,
    actual: 0,
    color: '#f59e0b', // amber
    iconName: 'Box',
    dealCount: 19,
    leadRep: 'Karen Castillo'
  },
  {
    id: 'dept-vc',
    name: 'V&C',
    shortName: 'V&C Studio',
    target: 10000,
    actual: 15000,
    color: '#10b981', // emerald
    iconName: 'Video',
    dealCount: 16,
    leadRep: 'Marcus Vance'
  },
  {
    id: 'dept-tshirt',
    name: 'T-shirt Design',
    shortName: 'T-Shirt Design',
    target: 10000,
    actual: 0,
    color: '#f97316', // orange
    iconName: 'Shirt',
    dealCount: 42,
    leadRep: 'Kyle Daniels'
  }
];

export const INITIAL_REPS: SalesRep[] = [
  {
    id: 'rep-13',
    name: 'Marcus Vance',
    displayName: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 15000,
    demosCount: 6,
    badges: ['trophy', 'star'],
    role: 'Audio & Video Communications AE',
    department: 'V&C',
    region: 'USA',
    targetAmount: 5000,
    winRate: 85,
    email: 'marcus.v@company.com',
    phone: '+1 (555) 567-8901',
    recentDeals: [
      { id: 'd-1301', client: 'Skyline Podcast Network', amount: 15000, date: '2026-08-07', type: 'Inbound', repId: 'rep-13', repName: 'Marcus Vance', department: 'V&C', region: 'USA' }
    ]
  },
  {
    id: 'rep-10',
    name: 'Emily W.',
    displayName: 'Emily W.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 815,
    demosCount: 8,
    badges: ['silver-medal'],
    role: 'Head of CMS Implementations',
    department: 'CMS',
    region: 'USA',
    targetAmount: 5000,
    winRate: 68,
    email: 'emily.w@company.com',
    recentDeals: [
      { id: 'd-401', client: 'Krypton Web Portal', amount: 815, date: '2026-08-10', type: 'Inbound', repId: 'rep-10', repName: 'Emily W.', department: 'CMS', region: 'USA' }
    ]
  },
  {
    id: 'rep-12',
    name: 'David Chen',
    displayName: 'David Chen',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 500,
    demosCount: 5,
    badges: ['bronze-medal'],
    role: 'WordPress & CMS Specialist',
    department: 'CMS',
    region: 'USA',
    targetAmount: 5000,
    winRate: 67,
    email: 'david.chen@company.com',
    recentDeals: [
      { id: 'd-1201', client: 'Silicon Valley CMS Labs', amount: 500, date: '2026-08-08', type: 'Outbound', repId: 'rep-12', repName: 'David Chen', department: 'CMS', region: 'USA' }
    ]
  },
  {
    id: 'rep-1',
    name: 'Karen C.',
    displayName: 'Karen C.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 0,
    demosCount: 14,
    badges: [],
    role: 'Principal Solutions AE',
    department: 'Full Stack Development',
    region: 'USA',
    targetAmount: 5000,
    winRate: 84,
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
    demosCount: 16,
    badges: [],
    role: 'Lead Architect Executive',
    department: '2D & 3D Architech',
    region: 'USA',
    targetAmount: 5000,
    winRate: 81,
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
    demosCount: 12,
    badges: [],
    role: 'Enterprise AI Director',
    department: 'AI Development',
    region: 'UK',
    targetAmount: 5000,
    winRate: 78,
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
    demosCount: 15,
    badges: [],
    role: 'Strategic Growth Lead',
    department: 'Digital Marketing',
    region: 'Sweden',
    targetAmount: 5000,
    winRate: 75,
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
    demosCount: 7,
    badges: [],
    role: 'Global Account Director',
    department: 'Full Stack Development',
    region: 'USA',
    targetAmount: 5000,
    winRate: 74,
    email: 'jennifer.m@company.com',
    recentDeals: []
  },
  {
    id: 'rep-6',
    name: 'Kyle Daniels',
    displayName: 'Kyle Daniels',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 0,
    demosCount: 9,
    badges: [],
    role: 'Creative Apparel Consultant',
    department: 'T-shirt Design',
    region: 'Kenya',
    targetAmount: 5000,
    winRate: 72,
    email: 'kyle.daniels@company.com',
    recentDeals: []
  },
  {
    id: 'rep-7',
    name: 'Mike Novak',
    displayName: 'Mike Novak',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 0,
    demosCount: 9,
    badges: [],
    role: 'Enterprise AI Specialist',
    department: 'AI Development',
    region: 'UK',
    targetAmount: 5000,
    winRate: 66,
    email: 'mike.novak@company.com',
    recentDeals: []
  }
];

export const INITIAL_SUMMARY: CompanyTargetSummary = {
  monthlyTarget: 60000,
  currentAchievement: 16315,
  inboundPercent: 63,
  outboundPercent: 35,
  upgradePercent: 12,
  newCustomers: 186,
};

export const INITIAL_REGIONS: RegionRevenueData[] = [
  {
    id: 'reg-us',
    name: 'USA',
    countryCode: 'US',
    flagEmoji: '🇺🇸',
    target: 2030000,
    targetLabel: '$2.03M',
    actual: 1380000,
    actualLabel: '$1.38M'
  },
  {
    id: 'reg-uk',
    name: 'United Kingdom',
    countryCode: 'GB',
    flagEmoji: '🇬🇧',
    target: 2030000,
    targetLabel: '$2.03M',
    actual: 1250000,
    actualLabel: '$1.25M'
  },
  {
    id: 'reg-se',
    name: 'Sweden',
    countryCode: 'SE',
    flagEmoji: '🇸🇪',
    target: 2020000,
    targetLabel: '$2.02M',
    actual: 1080000,
    actualLabel: '$1.08M'
  },
  {
    id: 'reg-ke',
    name: 'Kenya',
    countryCode: 'KE',
    flagEmoji: '🇰🇪',
    target: 1720000,
    targetLabel: '$1.72M',
    actual: 680000,
    actualLabel: '$680k'
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
    reps: INITIAL_REPS.map(r => ({
      ...r,
      wonDealsAmount: Math.round(r.wonDealsAmount * 2.85),
      targetAmount: Math.round(r.targetAmount * 3),
      demosCount: typeof r.demosCount === 'number' ? r.demosCount * 3 : r.demosCount
    })),
    departments: INITIAL_DEPARTMENTS.map(d => ({
      ...d,
      target: d.target * 3,
      actual: Math.round(d.actual * 2.88),
      dealCount: d.dealCount * 3
    })),
    summary: {
      monthlyTarget: 18000000,
      currentAchievement: 15580000,
      inboundPercent: 64,
      outboundPercent: 33,
      upgradePercent: 15,
      newCustomers: 530,
    },
    regions: INITIAL_REGIONS.map(reg => ({
      ...reg,
      target: reg.target * 3,
      targetLabel: `$${((reg.target * 3) / 1000000).toFixed(2)}M`,
      actual: Math.round(reg.actual * 2.9),
      actualLabel: `$${((reg.actual * 2.9) / 1000000).toFixed(2)}M`
    }))
  },
  year: {
    reps: INITIAL_REPS.map(r => ({
      ...r,
      wonDealsAmount: Math.round(r.wonDealsAmount * 11.2),
      targetAmount: Math.round(r.targetAmount * 12),
      demosCount: typeof r.demosCount === 'number' ? r.demosCount * 11 : r.demosCount
    })),
    departments: INITIAL_DEPARTMENTS.map(d => ({
      ...d,
      target: d.target * 12,
      actual: Math.round(d.actual * 11.1),
      dealCount: d.dealCount * 11
    })),
    summary: {
      monthlyTarget: 72000000,
      currentAchievement: 60592000,
      inboundPercent: 61,
      outboundPercent: 36,
      upgradePercent: 14,
      newCustomers: 2180,
    },
    regions: INITIAL_REGIONS.map(reg => ({
      ...reg,
      target: reg.target * 12,
      targetLabel: `$${((reg.target * 12) / 1000000).toFixed(2)}M`,
      actual: Math.round(reg.actual * 11.1),
      actualLabel: `$${((reg.actual * 11.1) / 1000000).toFixed(2)}M`
    }))
  }
};
