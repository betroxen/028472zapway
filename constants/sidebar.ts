
import React from 'react';
import { Icons } from '../components/icons';

// 1. Define types for better clarity and safety
export interface SidebarItem {
  title: string;
  href: string;
  icon: React.ElementType;
  badge?: string;        // Optional: visual marker like "NEW" or "BETA"
  tooltip?: string;      // Optional: hover or long-press info
}

export interface SidebarGroup {
  id: string;
  label: string;
  icon: React.ElementType;
  collapsible?: boolean;
  items: SidebarItem[];
}

// 2. Define reusable document links
const docItems: SidebarItem[] = [
  { title: 'Terms of Service', href: '#', icon: Icons.FileCheck },
  { title: 'Privacy Policy', href: '#', icon: Icons.Shield },
  { title: 'Cookies Policy', href: '#', icon: Icons.Cookie },
  { title: 'Responsible Gaming', href: '#', icon: Icons.Shield },
  { title: 'AML & CTF Policy', href: '#', icon: Icons.FileCheck },
  { title: 'Commercial Disclosure', href: '#', icon: Icons.BookOpen },
  { title: 'Copyright Notice', href: '#', icon: Icons.FileCheck },
];

// 3. Main sidebar groups arranged by User Intent
export const sidebarNavItems: SidebarGroup[] = [
  {
    id: 'play',
    label: 'Play',
    icon: Icons.Zap, 
    collapsible: true,
    items: [
      { title: 'Mines Game', href: '#', icon: Icons.Mine, tooltip: 'Strategic minefield navigation' },
      { title: 'Plinko Game', href: '#', icon: Icons.Gem, tooltip: 'High-variance ball drop' },
      { title: 'Casino Directory', href: '#', icon: Icons.Database, tooltip: 'Vetted operator database' },
      { title: 'Live RTP Tracker', href: '#', icon: Icons.percent, tooltip: 'Real-time return metrics' },
    ],
  },
  {
    id: 'analyze',
    label: 'Analyze',
    icon: Icons.Activity,
    collapsible: true,
    items: [
      { title: 'Dashboard', href: '#', icon: Icons.Home, tooltip: 'Main command center' },
      { title: 'Analytics', href: '#', icon: Icons.BarChart, tooltip: 'Performance metrics' },
      { title: 'Bonus Calculator', href: '#', icon: Icons.Calculator, tooltip: 'Wager analysis tool', badge: 'NEW' },
    ],
  },
  {
    id: 'earn',
    label: 'Earn',
    icon: Icons.dollarSign,
    collapsible: true,
    items: [
      { title: 'Rewards', href: '#', icon: Icons.Gift, tooltip: 'Claim your loot' },
      { title: 'Affiliate Program', href: '#', icon: Icons.Users, tooltip: 'Partner earnings' },
      { title: 'Bonus Offers', href: '#', icon: Icons.Star, badge: 'NEW', tooltip: 'Active bounties' },
    ],
  },
  {
    id: 'trust',
    label: 'Trust',
    icon: Icons.Shield,
    collapsible: true,
    items: [
      { title: 'Certified Platforms', href: '#', icon: Icons.Verified, tooltip: 'Safe zones' },
      { title: 'Provably Fair', href: '#', icon: Icons.Lock, tooltip: 'Verify the math' },
      { title: 'Protocol Deep Dive', href: '#', icon: Icons.Cpu, tooltip: 'System architecture' },
      { title: 'Review Methodology', href: '#', icon: Icons.FileText, tooltip: 'How we rate' },
    ],
  },
  {
    id: 'command',
    label: 'Command',
    icon: Icons.Terminal,
    collapsible: true,
    items: [
        { title: 'Profile', href: '#', icon: Icons.User, tooltip: 'Operative Dossier' },
        { title: 'Messages', href: '#', icon: Icons.Mail, badge: '3', tooltip: 'Secure Comms' },
        { title: 'Settings', href: '#', icon: Icons.Settings, tooltip: 'System Config' },
    ]
  },
  {
    id: 'support',
    label: 'Support',
    icon: Icons.HelpCircle,
    collapsible: true,
    items: [
      { title: 'About Us', href: '#', icon: Icons.BookOpen },
      { title: 'Tactical Guides', href: '#', icon: Icons.BookOpen, badge: 'HOT' },
      { title: 'FAQ', href: '#', icon: Icons.MessageSquare },
      { title: 'Support', href: '#', icon: Icons.MessageSquare },
      ...docItems
    ],
  },
];
