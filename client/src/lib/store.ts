import { create } from 'zustand';

// Types mimicking a database schema
export interface Project {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface Client {
  id: string;
  name: string;
  description: string;
  designation: string;
  imageUrl: string;
}

export interface ContactSubmission {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  city: string;
  submittedAt: string;
}

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
}

interface AppState {
  projects: Project[];
  clients: Client[];
  contacts: ContactSubmission[];
  subscribers: Subscriber[];
  
  // Actions
  addProject: (project: Omit<Project, 'id'>) => void;
  deleteProject: (id: string) => void;
  
  addClient: (client: Omit<Client, 'id'>) => void;
  deleteClient: (id: string) => void;
  
  addContact: (contact: Omit<ContactSubmission, 'id' | 'submittedAt'>) => void;
  
  addSubscriber: (email: string) => void;
}

// Initial Mock Data
const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    name: 'Skyline Tower',
    description: 'A modern 50-story residential complex in the heart of the city, featuring sustainable architecture and luxury amenities.',
    imageUrl: '/attached_assets/stock_images/modern_architectural_2dfc1842.jpg'
  },
  {
    id: '2',
    name: 'Eco Office Park',
    description: 'State-of-the-art office spaces designed for the future of work, incorporating green spaces and energy-efficient systems.',
    imageUrl: '/attached_assets/stock_images/modern_architectural_1f4a1336.jpg'
  },
  {
    id: '3',
    name: 'Urban Innovation Hub',
    description: 'A collaborative workspace and research center bringing together tech startups and established enterprises.',
    imageUrl: '/attached_assets/stock_images/modern_office_interi_ea21eb39.jpg'
  }
];

const INITIAL_CLIENTS: Client[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    designation: 'CEO, TechFlow',
    description: 'The team delivered beyond our expectations. Their attention to detail and commitment to quality is unmatched.',
    imageUrl: '/attached_assets/stock_images/professional_happy_c_80b5828b.jpg'
  },
  {
    id: '2',
    name: 'Michael Chen',
    designation: 'Director, GreenBuild',
    description: 'Professional, timely, and innovative. They transformed our vision into a reality that stands out in the market.',
    imageUrl: '/attached_assets/stock_images/professional_happy_c_93945319.jpg'
  }
];

export const useAppStore = create<AppState>((set) => ({
  projects: INITIAL_PROJECTS,
  clients: INITIAL_CLIENTS,
  contacts: [],
  subscribers: [],

  addProject: (project) => set((state) => ({
    projects: [...state.projects, { ...project, id: Math.random().toString(36).substr(2, 9) }]
  })),

  deleteProject: (id) => set((state) => ({
    projects: state.projects.filter((p) => p.id !== id)
  })),

  addClient: (client) => set((state) => ({
    clients: [...state.clients, { ...client, id: Math.random().toString(36).substr(2, 9) }]
  })),

  deleteClient: (id) => set((state) => ({
    clients: state.clients.filter((c) => c.id !== id)
  })),

  addContact: (contact) => set((state) => ({
    contacts: [...state.contacts, { 
      ...contact, 
      id: Math.random().toString(36).substr(2, 9),
      submittedAt: new Date().toISOString()
    }]
  })),

  addSubscriber: (email) => set((state) => ({
    subscribers: [...state.subscribers, {
      id: Math.random().toString(36).substr(2, 9),
      email,
      subscribedAt: new Date().toISOString()
    }]
  })),
}));
