export const DEPARTMENTS = [
  'Harvesting',
  'Dairy',
  'Irrigation',
  'Poultry',
  'Logistics'
];

export const GENDERS = ['Male', 'Female', 'Other'];

export const DEPARTMENT_CONFIG = {
  Harvesting: {
    color: 'amber',
    bgLight: 'bg-amber-50',
    border: 'border-amber-200',
    text: 'text-amber-800',
    badge: 'bg-amber-100 text-amber-800 border-amber-300',
    accent: '#d97706',
    icon: 'Wheat'
  },
  Dairy: {
    color: 'blue',
    bgLight: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-800',
    badge: 'bg-blue-100 text-blue-800 border-blue-300',
    accent: '#2563eb',
    icon: 'Milk'
  },
  Irrigation: {
    color: 'cyan',
    bgLight: 'bg-cyan-50',
    border: 'border-cyan-200',
    text: 'text-cyan-800',
    badge: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    accent: '#0891b2',
    icon: 'Droplets'
  },
  Poultry: {
    color: 'emerald',
    bgLight: 'bg-emerald-50',
    border: 'border-emerald-200',
    text: 'text-emerald-800',
    badge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    accent: '#059669',
    icon: 'Egg'
  },
  Logistics: {
    color: 'purple',
    bgLight: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-800',
    badge: 'bg-purple-100 text-purple-800 border-purple-300',
    accent: '#7c3aed',
    icon: 'Truck'
  }
};

export const INITIAL_MOCK_EMPLOYEES = [
  {
    id: 'EMP-101',
    name: 'Elena Rostova',
    department: 'Harvesting',
    gender: 'Female',
    phone: '+1 (555) 234-8901',
    localAddress: 'Bunkhouse 3, Sector A, AgriValley Farm, Greenfield',
    permanentAddress: '422 Sunflower Ave, Boise, ID 83702',
    role: 'Lead Combine Harvester'
  },
  {
    id: 'EMP-102',
    name: 'Marcus Vance',
    department: 'Dairy',
    gender: 'Male',
    phone: '+1 (555) 345-6789',
    localAddress: 'Staff Cottage 12, Dairy Barn Lane, Greenfield',
    permanentAddress: '18 Meadowview Road, Madison, WI 53703',
    role: 'Herd Health Specialist'
  },
  {
    id: 'EMP-103',
    name: 'Amina Al-Mansoor',
    department: 'Irrigation',
    gender: 'Female',
    phone: '+1 (555) 456-7890',
    localAddress: 'Pumping Station Lodge 2, Canal Road, Greenfield',
    permanentAddress: '88 Ocotillo Ridge, Tucson, AZ 85701',
    role: 'Drip Grid Automation Tech'
  },
  {
    id: 'EMP-104',
    name: 'Rajesh Sharma',
    department: 'Poultry',
    gender: 'Male',
    phone: '+1 (555) 567-8901',
    localAddress: 'East Hatchery Suites, Unit 5, Greenfield',
    permanentAddress: '601 Heritage Crest, Fresno, CA 93720',
    role: 'Hatchery Supervisor'
  },
  {
    id: 'EMP-105',
    name: 'Chloe Dubois',
    department: 'Logistics',
    gender: 'Female',
    phone: '+1 (555) 678-9012',
    localAddress: 'Fleet Depot Quarters 101, Silo Way, Greenfield',
    permanentAddress: '15 Saint-Charles Blvd, New Orleans, LA 70115',
    role: 'Cold-Chain Fleet Dispatcher'
  },
  {
    id: 'EMP-106',
    name: 'Caleb Thorne',
    department: 'Harvesting',
    gender: 'Male',
    phone: '+1 (555) 789-0123',
    localAddress: 'Grain Elevator Cabin 4, Field 9, Greenfield',
    permanentAddress: '230 Prairie Grass Court, Omaha, NE 68104',
    role: 'Grain Silo Operations Lead'
  },
  {
    id: 'EMP-107',
    name: 'Morgan Blake',
    department: 'Irrigation',
    gender: 'Other',
    phone: '+1 (555) 890-1234',
    localAddress: 'Reservoir Control House, Dam Sector, Greenfield',
    permanentAddress: '900 Cascade Peak Trail, Bend, OR 97701',
    role: 'Aquifer Sensor Specialist'
  },
  {
    id: 'EMP-108',
    name: 'Sunita Patel',
    department: 'Dairy',
    gender: 'Female',
    phone: '+1 (555) 901-2345',
    localAddress: 'Milking Parlor Dorm 7, South Pasture, Greenfield',
    permanentAddress: '104 Whispering Pines, Burlington, VT 05401',
    role: 'Quality & Pasteurization Tech'
  }
];
