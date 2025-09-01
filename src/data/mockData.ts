export interface Report {
  id: string;
  title: string;
  description: string;
  category: 'garbage' | 'sewage' | 'burning' | 'construction' | 'pollution' | 'other';
  status: 'pending' | 'verified' | 'resolved';
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  photos: string[];
  createdAt: string;
  updatedAt: string;
  reportedBy: string;
  endorsements: number;
  hasUserEndorsed: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  reportsSubmitted: number;
  endorsementsGiven: number;
  endorsementsReceived: number;
  badges: string[];
  joinedAt: string;
}

export const mockUser: User = {
  id: 'user-1',
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@email.com',
  avatar: '/api/placeholder/150/150',
  reportsSubmitted: 23,
  endorsementsGiven: 45,
  endorsementsReceived: 67,
  badges: ['Community Champion', 'Eagle Eye', 'Problem Solver'],
  joinedAt: '2024-01-15'
};

export const mockReports: Report[] = [
  {
    id: 'report-1',
    title: 'Overflowing Garbage Bin',
    description: 'Large garbage bin overflowing near bus stop, causing hygiene issues',
    category: 'garbage',
    status: 'verified',
    location: {
      lat: 12.9716,
      lng: 77.5946,
      address: 'MG Road, Bengaluru, Karnataka'
    },
    photos: ['/api/placeholder/400/300'],
    createdAt: '2024-02-15T10:30:00Z',
    updatedAt: '2024-02-15T14:20:00Z',
    reportedBy: 'Priya Sharma',
    endorsements: 8,
    hasUserEndorsed: false
  },
  {
    id: 'report-2',
    title: 'Sewage Water Overflow',
    description: 'Sewage water overflowing on the street, creating unsanitary conditions',
    category: 'sewage',
    status: 'pending',
    location: {
      lat: 12.9584,
      lng: 77.6134,
      address: 'Koramangala, Bengaluru, Karnataka'
    },
    photos: ['/api/placeholder/400/300'],
    createdAt: '2024-02-16T08:15:00Z',
    updatedAt: '2024-02-16T08:15:00Z',
    reportedBy: 'Amit Patel',
    endorsements: 3,
    hasUserEndorsed: true
  },
  {
    id: 'report-3',
    title: 'Plastic Burning',
    description: 'People burning plastic waste in open area, causing air pollution',
    category: 'burning',
    status: 'resolved',
    location: {
      lat: 12.9352,
      lng: 77.6245,
      address: 'BTM Layout, Bengaluru, Karnataka'
    },
    photos: ['/api/placeholder/400/300'],
    createdAt: '2024-02-10T16:45:00Z',
    updatedAt: '2024-02-14T09:30:00Z',
    reportedBy: 'Suresh Reddy',
    endorsements: 12,
    hasUserEndorsed: false
  },
  {
    id: 'report-4',
    title: 'Construction Debris',
    description: 'Construction waste dumped on public road blocking traffic',
    category: 'construction',
    status: 'verified',
    location: {
      lat: 12.9698,
      lng: 77.7500,
      address: 'Whitefield, Bengaluru, Karnataka'
    },
    photos: ['/api/placeholder/400/300'],
    createdAt: '2024-02-17T12:00:00Z',
    updatedAt: '2024-02-17T15:30:00Z',
    reportedBy: 'Meera Singh',
    endorsements: 5,
    hasUserEndorsed: true
  },
  {
    id: 'report-5',
    title: 'Air Pollution',
    description: 'Heavy smoke from nearby factory affecting residential area',
    category: 'pollution',
    status: 'pending',
    location: {
      lat: 12.9141,
      lng: 77.6103,
      address: 'Jayanagar, Bengaluru, Karnataka'
    },
    photos: ['/api/placeholder/400/300'],
    createdAt: '2024-02-18T07:20:00Z',
    updatedAt: '2024-02-18T07:20:00Z',
    reportedBy: 'Vikram Joshi',
    endorsements: 1,
    hasUserEndorsed: false
  }
];

export const categoryColors = {
  garbage: 'bg-orange-100 text-orange-800 border-orange-200',
  sewage: 'bg-blue-100 text-blue-800 border-blue-200',
  burning: 'bg-red-100 text-red-800 border-red-200',
  construction: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  pollution: 'bg-purple-100 text-purple-800 border-purple-200',
  other: 'bg-gray-100 text-gray-800 border-gray-200'
};

export const statusColors = {
  pending: 'bg-warning text-warning-foreground',
  verified: 'bg-accent text-accent-foreground',
  resolved: 'bg-primary text-primary-foreground'
};