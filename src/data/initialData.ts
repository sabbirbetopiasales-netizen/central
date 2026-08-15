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
    target: 1200000,
    actual: 980000,
    color: '#3b82f6', // blue
    iconName: 'Code2',
    dealCount: 28,
    leadRep: 'Karen C.'
  },
  {
    id: 'dept-ai',
    name: 'AI Development',
    shortName: 'AI Dev',
    target: 1100000,
    actual: 920000,
    color: '#8b5cf6', // purple
    iconName: 'Cpu',
    dealCount: 22,
    leadRep: 'Mark T.'
  },
  {
    id: 'dept-marketing',
    name: 'Digital Marketing',
    shortName: 'Digital Mkt',
    target: 950000,
    actual: 840000,
    color: '#ec4899', // pink
    iconName: 'Megaphone',
    dealCount: 35,
    leadRep: 'Sarah P.'
  },
  {
    id: 'dept-cms',
    name: 'CMS',
    shortName: 'CMS Solutions',
    target: 800000,
    actual: 690000,
    color: '#06b6d4', // cyan
    iconName: 'LayoutTemplate',
    dealCount: 31,
    leadRep: 'Emily W.'
  },
  {
    id: 'dept-arch',
    name: '2D & 3D Architech',
    shortName: '2D/3D Arch',
    target: 750000,
    actual: 620000,
    color: '#f59e0b', // amber
    iconName: 'Box',
    dealCount: 19,
    leadRep: 'Karen Castillo'
  },
  {
    id: 'dept-vc',
    name: 'V&C',
    shortName: 'V&C Studio',
    target: 650000,
    actual: 510000,
    color: '#10b981', // emerald
    iconName: 'Video',
    dealCount: 16,
    leadRep: 'Jack R.'
  },
  {
    id: 'dept-tshirt',
    name: 'T-shirt Design',
    shortName: 'T-Shirt Design',
    target: 450000,
    actual: 390000,
    color: '#f97316', // orange
    iconName: 'Shirt',
    dealCount: 42,
    leadRep: 'Kyle Daniels'
  }
];

export const INITIAL_REPS: SalesRep[] = [
  {
    id: 'rep-1',
    name: 'Karen C.',
    displayName: 'Karen C.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 650000,
    demosCount: 14,
    badges: ['trophy', 'star'],
    role: 'Principal Solutions AE',
    department: 'Full Stack Development',
    region: 'USA',
    targetAmount: 600000,
    winRate: 84,
    email: 'karen.c@company.com',
    phone: '+1 (555) 234-5678',
    recentDeals: [
      { id: 'd-101', client: 'Apex Global Logistics', amount: 280000, date: '2026-08-14', type: 'Inbound', repId: 'rep-1', repName: 'Karen C.', department: 'Full Stack Development', region: 'USA' },
      { id: 'd-102', client: 'Starlight Media Corp', amount: 195000, date: '2026-08-11', type: 'Upgrade', repId: 'rep-1', repName: 'Karen C.', department: 'Full Stack Development', region: 'USA' },
      { id: 'd-103', client: 'Hyperion BioTech', amount: 175000, date: '2026-08-04', type: 'Inbound', repId: 'rep-1', repName: 'Karen C.', department: 'Full Stack Development', region: 'USA' },
    ]
  },
  {
    id: 'rep-2',
    name: 'Karen Castillo',
    displayName: 'Karen Castillo',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 623089,
    demosCount: 16,
    badges: ['silver-medal', 'star'],
    role: 'Lead Architect Executive',
    department: '2D & 3D Architech',
    region: 'USA',
    targetAmount: 550000,
    winRate: 81,
    email: 'karen.castillo@company.com',
    phone: '+1 (555) 345-6789',
    recentDeals: [
      { id: 'd-801', client: 'Horizon Digital Network', amount: 410000, date: '2026-08-13', type: 'Inbound', repId: 'rep-2', repName: 'Karen Castillo', department: '2D & 3D Architech', region: 'USA' },
      { id: 'd-802', client: 'Solstice Renewable Systems', amount: 213089, date: '2026-08-06', type: 'Inbound', repId: 'rep-2', repName: 'Karen Castillo', department: '2D & 3D Architech', region: 'USA' }
    ]
  },
  {
    id: 'rep-3',
    name: 'Mark T.',
    displayName: 'Mark T.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 600000,
    demosCount: 12,
    badges: ['bronze-medal', 'star'],
    role: 'Enterprise AI Director',
    department: 'AI Development',
    region: 'UK',
    targetAmount: 550000,
    winRate: 78,
    email: 'mark.t@company.com',
    phone: '+44 20 7946 0912',
    recentDeals: [
      { id: 'd-201', client: 'Vanguard Capital Partners', amount: 320000, date: '2026-08-13', type: 'Outbound', repId: 'rep-3', repName: 'Mark T.', department: 'AI Development', region: 'UK' },
      { id: 'd-202', client: 'Nordic CleanEnergy Ltd', amount: 280000, date: '2026-08-08', type: 'Inbound', repId: 'rep-3', repName: 'Mark T.', department: 'AI Development', region: 'UK' },
    ]
  },
  {
    id: 'rep-4',
    name: 'Sarah P.',
    displayName: 'Sarah P.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 590000,
    demosCount: 15,
    badges: ['star'],
    role: 'Strategic Growth Lead',
    department: 'Digital Marketing',
    region: 'Sweden',
    targetAmount: 500000,
    winRate: 75,
    email: 'sarah.p@company.com',
    phone: '+46 8 123 4567',
    recentDeals: [
      { id: 'd-301', client: 'Atlas Robotics Sweden', amount: 340000, date: '2026-08-12', type: 'Inbound', repId: 'rep-4', repName: 'Sarah P.', department: 'Digital Marketing', region: 'Sweden' },
      { id: 'd-302', client: 'Aether Cloud Infrastructure', amount: 250000, date: '2026-08-05', type: 'Upgrade', repId: 'rep-4', repName: 'Sarah P.', department: 'Digital Marketing', region: 'Sweden' },
    ]
  },
  {
    id: 'rep-5',
    name: 'Jennifer Mata',
    displayName: 'Jennifer Mata',
    avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 580669,
    demosCount: 7,
    badges: ['star'],
    role: 'Global Account Director',
    department: 'Full Stack Development',
    region: 'USA',
    targetAmount: 500000,
    winRate: 74,
    email: 'jennifer.m@company.com',
    recentDeals: [
      { id: 'd-701', client: 'Pacific Crest Holdings', amount: 350000, date: '2026-08-14', type: 'Inbound', repId: 'rep-5', repName: 'Jennifer Mata', department: 'Full Stack Development', region: 'USA' },
      { id: 'd-702', client: 'Matrix Cloud Services', amount: 230669, date: '2026-08-07', type: 'Upgrade', repId: 'rep-5', repName: 'Jennifer Mata', department: 'Full Stack Development', region: 'USA' }
    ]
  },
  {
    id: 'rep-6',
    name: 'Kyle Daniels',
    displayName: 'Kyle Daniels',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 576973,
    demosCount: 9,
    badges: ['star'],
    role: 'Creative Apparel Consultant',
    department: 'T-shirt Design',
    region: 'Kenya',
    targetAmount: 500000,
    winRate: 72,
    email: 'kyle.daniels@company.com',
    recentDeals: [
      { id: 'd-901', client: 'Nairobi Fashion House', amount: 310000, date: '2026-08-12', type: 'Outbound', repId: 'rep-6', repName: 'Kyle Daniels', department: 'T-shirt Design', region: 'Kenya' },
      { id: 'd-902', client: 'Savanna Merchandise', amount: 266973, date: '2026-08-04', type: 'Inbound', repId: 'rep-6', repName: 'Kyle Daniels', department: 'T-shirt Design', region: 'Kenya' }
    ]
  },
  {
    id: 'rep-7',
    name: 'Mike Novak',
    displayName: 'Mike Novak',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 526534,
    demosCount: 9,
    badges: [],
    role: 'Enterprise AI Specialist',
    department: 'AI Development',
    region: 'UK',
    targetAmount: 480000,
    winRate: 66,
    email: 'mike.novak@company.com',
    recentDeals: [
      { id: 'd-1001', client: 'London AI Hub', amount: 320000, date: '2026-08-11', type: 'Inbound', repId: 'rep-7', repName: 'Mike Novak', department: 'AI Development', region: 'UK' },
      { id: 'd-1002', client: 'Highland Intelligent Systems', amount: 206534, date: '2026-08-03', type: 'Outbound', repId: 'rep-7', repName: 'Mike Novak', department: 'AI Development', region: 'UK' }
    ]
  },
  {
    id: 'rep-8',
    name: 'Chloe B.',
    displayName: 'Chloe B.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 442077,
    demosCount: 7,
    badges: ['star'],
    role: 'Brand Campaign Strategist',
    department: 'Digital Marketing',
    region: 'Sweden',
    targetAmount: 400000,
    winRate: 70,
    email: 'chloe.b@company.com',
    recentDeals: [
      { id: 'd-601', client: 'Polestar Media Group', amount: 260000, date: '2026-08-11', type: 'Inbound', repId: 'rep-8', repName: 'Chloe B.', department: 'Digital Marketing', region: 'Sweden' },
      { id: 'd-602', client: 'Stockholm Growth Agency', amount: 182077, date: '2026-08-03', type: 'Outbound', repId: 'rep-8', repName: 'Chloe B.', department: 'Digital Marketing', region: 'Sweden' }
    ]
  },
  {
    id: 'rep-9',
    name: 'Jack R.',
    displayName: 'Jack R.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 387082,
    demosCount: '4-12',
    badges: [],
    role: 'Video & Creative Producer',
    department: 'V&C',
    region: 'UK',
    targetAmount: 350000,
    winRate: 64,
    email: 'jack.r@company.com',
    recentDeals: [
      { id: 'd-501', client: 'Titan Broadcast Studios', amount: 240000, date: '2026-08-09', type: 'Inbound', repId: 'rep-9', repName: 'Jack R.', department: 'V&C', region: 'UK' },
      { id: 'd-502', client: 'Silverstone Motion Media', amount: 147082, date: '2026-08-01', type: 'Upgrade', repId: 'rep-9', repName: 'Jack R.', department: 'V&C', region: 'UK' }
    ]
  },
  {
    id: 'rep-10',
    name: 'Emily W.',
    displayName: 'Emily W.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 350898,
    demosCount: 8,
    badges: [],
    role: 'Head of CMS Implementations',
    department: 'CMS',
    region: 'USA',
    targetAmount: 320000,
    winRate: 68,
    email: 'emily.w@company.com',
    recentDeals: [
      { id: 'd-401', client: 'Krypton Web Portal', amount: 210000, date: '2026-08-10', type: 'Inbound', repId: 'rep-10', repName: 'Emily W.', department: 'CMS', region: 'USA' },
      { id: 'd-402', client: 'Beacon Commerce Engine', amount: 140898, date: '2026-08-02', type: 'Outbound', repId: 'rep-10', repName: 'Emily W.', department: 'CMS', region: 'USA' }
    ]
  },
  {
    id: 'rep-11',
    name: 'Elena Rostova',
    displayName: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1573496799652-408c2ac9fe98?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 339200,
    demosCount: 11,
    badges: [],
    role: '3D Spatial Architect AE',
    department: '2D & 3D Architech',
    region: 'Sweden',
    targetAmount: 320000,
    winRate: 71,
    email: 'elena.r@company.com',
    recentDeals: [
      { id: 'd-1101', client: 'Nordic BIM Modeling', amount: 189200, date: '2026-08-09', type: 'Inbound', repId: 'rep-11', repName: 'Elena Rostova', department: '2D & 3D Architech', region: 'Sweden' },
      { id: 'd-1102', client: 'Vasa VR Visuals', amount: 150000, date: '2026-08-02', type: 'Upgrade', repId: 'rep-11', repName: 'Elena Rostova', department: '2D & 3D Architech', region: 'Sweden' }
    ]
  },
  {
    id: 'rep-12',
    name: 'David Chen',
    displayName: 'David Chen',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 315110,
    demosCount: 6,
    badges: [],
    role: 'WordPress & CMS Specialist',
    department: 'CMS',
    region: 'USA',
    targetAmount: 300000,
    winRate: 67,
    email: 'david.chen@company.com',
    recentDeals: [
      { id: 'd-1201', client: 'Silicon Valley CMS Labs', amount: 185110, date: '2026-08-08', type: 'Outbound', repId: 'rep-12', repName: 'David Chen', department: 'CMS', region: 'USA' },
      { id: 'd-1202', client: 'Pacific Edge Portals', amount: 130000, date: '2026-08-01', type: 'Inbound', repId: 'rep-12', repName: 'David Chen', department: 'CMS', region: 'USA' }
    ]
  },
  {
    id: 'rep-13',
    name: 'Marcus Vance',
    displayName: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 284000,
    demosCount: 5,
    badges: [],
    role: 'Audio & Video Communications AE',
    department: 'V&C',
    region: 'USA',
    targetAmount: 280000,
    winRate: 63,
    email: 'marcus.v@company.com',
    recentDeals: [
      { id: 'd-1301', client: 'Skyline Podcast Network', amount: 160000, date: '2026-08-07', type: 'Inbound', repId: 'rep-13', repName: 'Marcus Vance', department: 'V&C', region: 'USA' },
      { id: 'd-1302', client: 'Echo Chamber Media', amount: 124000, date: '2026-08-02', type: 'Upgrade', repId: 'rep-13', repName: 'Marcus Vance', department: 'V&C', region: 'USA' }
    ]
  },
  {
    id: 'rep-14',
    name: 'Aisha Omar',
    displayName: 'Aisha Omar',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 265000,
    demosCount: 8,
    badges: [],
    role: 'Apparel Merchandising Rep',
    department: 'T-shirt Design',
    region: 'Kenya',
    targetAmount: 250000,
    winRate: 70,
    email: 'aisha.o@company.com',
    recentDeals: [
      { id: 'd-1401', client: 'Safari Athletics Kenya', amount: 145000, date: '2026-08-09', type: 'Inbound', repId: 'rep-14', repName: 'Aisha Omar', department: 'T-shirt Design', region: 'Kenya' },
      { id: 'd-1402', client: 'Urban Threadz Co', amount: 120000, date: '2026-08-03', type: 'Outbound', repId: 'rep-14', repName: 'Aisha Omar', department: 'T-shirt Design', region: 'Kenya' }
    ]
  }
];

export const INITIAL_SUMMARY: CompanyTargetSummary = {
  monthlyTarget: 6000000,
  currentAchievement: 5410000,
  inboundPercent: 62,
  outboundPercent: 35,
  upgradePercent: 12,
  newCustomers: 185,
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
