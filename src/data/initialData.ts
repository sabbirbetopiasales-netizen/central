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
    leadRep: 'Mehrab Ahmed'
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
    leadRep: 'Zihadul Islam'
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
    leadRep: 'Umma Sumaiya Masroor'
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
    leadRep: 'Md Habibullah Hamim'
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
    leadRep: 'Masrikul Alam Anon'
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
    leadRep: 'MD Arif Sikder'
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
    leadRep: 'Md Hridoy Ahmed'
  }
];

export const INITIAL_REPS: SalesRep[] = [
  {
    id: 'rep-1034',
    employeeId: '1034',
    name: 'Mehrab Ahmed',
    displayName: 'Mehrab Ahmed',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 0,
    demosCount: 0,
    badges: [],
    role: 'Principal Solutions AE',
    department: 'Full Stack Development',
    region: 'USA',
    targetAmount: 0,
    winRate: 0,
    email: 'mehrab.ahmed@company.com',
    recentDeals: []
  },
  {
    id: 'rep-1036',
    employeeId: '1036',
    name: 'Umma Sumaiya Masroor',
    displayName: 'Umma Sumaiya Masroor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 0,
    demosCount: 0,
    badges: [],
    role: 'Growth Marketing AE',
    department: 'Digital Marketing',
    region: 'USA',
    targetAmount: 0,
    winRate: 0,
    email: 'masroor.umma@company.com',
    recentDeals: []
  },
  {
    id: 'rep-1037',
    employeeId: '1037',
    name: 'Zihadul Islam',
    displayName: 'Zihadul Islam',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 0,
    demosCount: 0,
    badges: [],
    role: 'AI Solutions Executive',
    department: 'AI Development',
    region: 'UK',
    targetAmount: 0,
    winRate: 0,
    email: 'zihadul.islam@company.com',
    recentDeals: []
  },
  {
    id: 'rep-1039',
    employeeId: '1039',
    name: 'Md Habibullah Hamim',
    displayName: 'Md Habibullah Hamim',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 0,
    demosCount: 0,
    badges: [],
    role: 'CMS Implementations Lead',
    department: 'CMS',
    region: 'USA',
    targetAmount: 0,
    winRate: 0,
    email: 'habibullah.hamim@company.com',
    recentDeals: []
  },
  {
    id: 'rep-1040',
    employeeId: '1040',
    name: 'Masrikul Alam Anon',
    displayName: 'Masrikul Alam Anon',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 0,
    demosCount: 0,
    badges: [],
    role: '3D Architect Consultant',
    department: '2D & 3D Architech',
    region: 'USA',
    targetAmount: 0,
    winRate: 0,
    email: 'masrikul.alam@company.com',
    recentDeals: []
  },
  {
    id: 'rep-1044',
    employeeId: '1044',
    name: 'Md Hridoy Ahmed',
    displayName: 'Md Hridoy Ahmed',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 0,
    demosCount: 0,
    badges: [],
    role: 'Design & Apparel AE',
    department: 'T-shirt Design',
    region: 'Kenya',
    targetAmount: 0,
    winRate: 0,
    email: 'hridoy.ahmed@company.com',
    recentDeals: []
  },
  {
    id: 'rep-1045',
    employeeId: '1045',
    name: 'Md. Fazle Rabbi Pavel',
    displayName: 'Md. Fazle Rabbi Pavel',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 0,
    demosCount: 0,
    badges: [],
    role: 'Enterprise Web AE',
    department: 'Full Stack Development',
    region: 'Sweden',
    targetAmount: 0,
    winRate: 0,
    email: 'fazle.rabbi@company.com',
    recentDeals: []
  },
  {
    id: 'rep-1047',
    employeeId: '1047',
    name: 'Mofidul Moktar Mofid',
    displayName: 'Mofidul Moktar Mofid',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 0,
    demosCount: 0,
    badges: [],
    role: 'Enterprise Solutions Consultant',
    department: 'CMS',
    region: 'USA',
    targetAmount: 0,
    winRate: 0,
    email: 'mofidul.moktar@company.com',
    recentDeals: []
  },
  {
    id: 'rep-1049',
    employeeId: '1049',
    name: 'MD Juhayer Mahtab',
    displayName: 'MD Juhayer Mahtab',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 0,
    demosCount: 0,
    badges: [],
    role: 'AI Innovation AE',
    department: 'AI Development',
    region: 'UK',
    targetAmount: 0,
    winRate: 0,
    email: 'juhayer.mahtab@company.com',
    recentDeals: []
  },
  {
    id: 'rep-1050',
    employeeId: '1050',
    name: 'MD. Rahul Uddin Robin',
    displayName: 'MD. Rahul Uddin Robin',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 0,
    demosCount: 0,
    badges: [],
    role: 'Creative Media AE',
    department: 'V&C',
    region: 'USA',
    targetAmount: 0,
    winRate: 0,
    email: 'rahul.robin@company.com',
    recentDeals: []
  },
  {
    id: 'rep-1051',
    employeeId: '1051',
    name: 'MD Arif Sikder',
    displayName: 'MD Arif Sikder',
    avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 0,
    demosCount: 0,
    badges: [],
    role: 'Video & Media Director',
    department: 'V&C',
    region: 'USA',
    targetAmount: 0,
    winRate: 0,
    email: 'arif.sikder@company.com',
    recentDeals: []
  },
  {
    id: 'rep-1052',
    employeeId: '1052',
    name: 'Ishtiaque Ahmed',
    displayName: 'Ishtiaque Ahmed',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400',
    wonDealsAmount: 0,
    demosCount: 0,
    badges: [],
    role: '3D Spatial Executive',
    department: '2D & 3D Architech',
    region: 'Sweden',
    targetAmount: 0,
    winRate: 0,
    email: 'ishtiaque.ahmed@company.com',
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
