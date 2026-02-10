"use client";
// Centralized Lucide icon components for charts
// Professional, consistent iconography across all visualizations

import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  Target,
  Shield,
  ShieldCheck,
  Zap,
  DollarSign,
  Users,
  User,
  FileText,
  Folder,
  Link,
  Clock,
  Calendar,
  Tag,
  Trophy,
  ClipboardList,
  Activity,
  BarChart3,
  LineChart,
  PieChart,
  Rocket,
  Lightbulb,
  Wrench,
  Settings,
  Lock,
  Unlock,
  Database,
  Server,
  GitBranch,
  Play,
  Pause,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  AlertCircle,
  Info,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Circle,
  Square,
  Minus,
  Plus,
  Search,
  Eye,
  CreditCard,
  Gift,
  Heart,
  Megaphone,
  Smartphone,
  Image,
  Mail,
  Tent,
  MapPin,
  Globe,
  Cpu,
  HardDrive,
  Disc,
  Network,
  FlaskConical,
  Building2,
  Siren,
  Hand,
  Key,
  Gem,
  MessageSquare,
  Volume2,
  Banknote,
  Package,
  Briefcase,
  Radio,
  Github,
  Box,
  Split,
  Microscope,
  Hospital,
  Flag,
  Layers,
  Monitor,
  Workflow,
  Binary,
  Brain,
  Sparkles,
  Timer,
  Gauge,
  Scale,
  Pill,
  Mailbox,
  Store,
  Bot,
  ShoppingCart,
  Webhook,
  Bell,
  RotateCcw,
  LayoutGrid,
  Receipt,
  Hash,
} from 'lucide-react';

// Icon size presets
export const iconSizes = {
  xs: 12,
  sm: 14,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
};

// Default icon props
interface IconProps {
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

const defaultProps: IconProps = {
  size: 16,
  color: '#333',
  strokeWidth: 2,
};

// Icon wrapper component for consistent styling
export const ChartIcon: React.FC<{
  icon: React.ElementType;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}> = ({ icon: Icon, size = 16, color = '#333', strokeWidth = 2, className }) => (
  <Icon size={size} color={color} strokeWidth={strokeWidth} className={className} />
);

// Pre-configured icon components for common chart use cases
export const Icons = {
  // Trends & Analytics
  trendUp: (props: IconProps = {}) => <TrendingUp {...defaultProps} {...props} />,
  trendDown: (props: IconProps = {}) => <TrendingDown {...defaultProps} {...props} />,
  barChart: (props: IconProps = {}) => <BarChart3 {...defaultProps} {...props} />,
  lineChart: (props: IconProps = {}) => <LineChart {...defaultProps} {...props} />,
  pieChart: (props: IconProps = {}) => <PieChart {...defaultProps} {...props} />,
  activity: (props: IconProps = {}) => <Activity {...defaultProps} {...props} />,
  gauge: (props: IconProps = {}) => <Gauge {...defaultProps} {...props} />,
  
  // Status
  checkCircle: (props: IconProps = {}) => <CheckCircle {...defaultProps} {...props} />,
  xCircle: (props: IconProps = {}) => <XCircle {...defaultProps} {...props} />,
  alertTriangle: (props: IconProps = {}) => <AlertTriangle {...defaultProps} {...props} />,
  alertCircle: (props: IconProps = {}) => <AlertCircle {...defaultProps} {...props} />,
  info: (props: IconProps = {}) => <Info {...defaultProps} {...props} />,
  
  // Actions
  target: (props: IconProps = {}) => <Target {...defaultProps} {...props} />,
  rocket: (props: IconProps = {}) => <Rocket {...defaultProps} {...props} />,
  lightbulb: (props: IconProps = {}) => <Lightbulb {...defaultProps} {...props} />,
  zap: (props: IconProps = {}) => <Zap {...defaultProps} {...props} />,
  sparkles: (props: IconProps = {}) => <Sparkles {...defaultProps} {...props} />,
  
  // Security & Protection
  shield: (props: IconProps = {}) => <Shield {...defaultProps} {...props} />,
  shieldCheck: (props: IconProps = {}) => <ShieldCheck {...defaultProps} {...props} />,
  lock: (props: IconProps = {}) => <Lock {...defaultProps} {...props} />,
  unlock: (props: IconProps = {}) => <Unlock {...defaultProps} {...props} />,
  key: (props: IconProps = {}) => <Key {...defaultProps} {...props} />,
  
  // Finance
  dollar: (props: IconProps = {}) => <DollarSign {...defaultProps} {...props} />,
  banknote: (props: IconProps = {}) => <Banknote {...defaultProps} {...props} />,
  creditCard: (props: IconProps = {}) => <CreditCard {...defaultProps} {...props} />,
  receipt: (props: IconProps = {}) => <Receipt {...defaultProps} {...props} />,
  
  // People
  users: (props: IconProps = {}) => <Users {...defaultProps} {...props} />,
  user: (props: IconProps = {}) => <User {...defaultProps} {...props} />,
  
  // Files & Data
  fileText: (props: IconProps = {}) => <FileText {...defaultProps} {...props} />,
  folder: (props: IconProps = {}) => <Folder {...defaultProps} {...props} />,
  clipboard: (props: IconProps = {}) => <ClipboardList {...defaultProps} {...props} />,
  database: (props: IconProps = {}) => <Database {...defaultProps} {...props} />,
  layers: (props: IconProps = {}) => <Layers {...defaultProps} {...props} />,
  
  // Infrastructure
  server: (props: IconProps = {}) => <Server {...defaultProps} {...props} />,
  cpu: (props: IconProps = {}) => <Cpu {...defaultProps} {...props} />,
  hardDrive: (props: IconProps = {}) => <HardDrive {...defaultProps} {...props} />,
  disc: (props: IconProps = {}) => <Disc {...defaultProps} {...props} />,
  network: (props: IconProps = {}) => <Network {...defaultProps} {...props} />,
  globe: (props: IconProps = {}) => <Globe {...defaultProps} {...props} />,
  monitor: (props: IconProps = {}) => <Monitor {...defaultProps} {...props} />,
  
  // Development
  gitBranch: (props: IconProps = {}) => <GitBranch {...defaultProps} {...props} />,
  settings: (props: IconProps = {}) => <Settings {...defaultProps} {...props} />,
  wrench: (props: IconProps = {}) => <Wrench {...defaultProps} {...props} />,
  workflow: (props: IconProps = {}) => <Workflow {...defaultProps} {...props} />,
  binary: (props: IconProps = {}) => <Binary {...defaultProps} {...props} />,
  webhook: (props: IconProps = {}) => <Webhook {...defaultProps} {...props} />,
  
  // Time
  clock: (props: IconProps = {}) => <Clock {...defaultProps} {...props} />,
  calendar: (props: IconProps = {}) => <Calendar {...defaultProps} {...props} />,
  timer: (props: IconProps = {}) => <Timer {...defaultProps} {...props} />,
  
  // Navigation
  link: (props: IconProps = {}) => <Link {...defaultProps} {...props} />,
  search: (props: IconProps = {}) => <Search {...defaultProps} {...props} />,
  eye: (props: IconProps = {}) => <Eye {...defaultProps} {...props} />,
  
  // Misc
  tag: (props: IconProps = {}) => <Tag {...defaultProps} {...props} />,
  trophy: (props: IconProps = {}) => <Trophy {...defaultProps} {...props} />,
  gift: (props: IconProps = {}) => <Gift {...defaultProps} {...props} />,
  heart: (props: IconProps = {}) => <Heart {...defaultProps} {...props} />,
  megaphone: (props: IconProps = {}) => <Megaphone {...defaultProps} {...props} />,
  bell: (props: IconProps = {}) => <Bell {...defaultProps} {...props} />,
  
  // Devices
  smartphone: (props: IconProps = {}) => <Smartphone {...defaultProps} {...props} />,
  
  // Media
  image: (props: IconProps = {}) => <Image {...defaultProps} {...props} />,
  
  // Communication
  mail: (props: IconProps = {}) => <Mail {...defaultProps} {...props} />,
  messageSquare: (props: IconProps = {}) => <MessageSquare {...defaultProps} {...props} />,
  volume: (props: IconProps = {}) => <Volume2 {...defaultProps} {...props} />,
  
  // Business
  briefcase: (props: IconProps = {}) => <Briefcase {...defaultProps} {...props} />,
  building: (props: IconProps = {}) => <Building2 {...defaultProps} {...props} />,
  store: (props: IconProps = {}) => <Store {...defaultProps} {...props} />,
  shoppingCart: (props: IconProps = {}) => <ShoppingCart {...defaultProps} {...props} />,
  
  // Science & Healthcare
  flask: (props: IconProps = {}) => <FlaskConical {...defaultProps} {...props} />,
  microscope: (props: IconProps = {}) => <Microscope {...defaultProps} {...props} />,
  hospital: (props: IconProps = {}) => <Hospital {...defaultProps} {...props} />,
  pill: (props: IconProps = {}) => <Pill {...defaultProps} {...props} />,
  brain: (props: IconProps = {}) => <Brain {...defaultProps} {...props} />,
  bot: (props: IconProps = {}) => <Bot {...defaultProps} {...props} />,
  
  // Alerts & Events
  siren: (props: IconProps = {}) => <Siren {...defaultProps} {...props} />,
  
  // Misc Objects
  package: (props: IconProps = {}) => <Package {...defaultProps} {...props} />,
  box: (props: IconProps = {}) => <Box {...defaultProps} {...props} />,
  gem: (props: IconProps = {}) => <Gem {...defaultProps} {...props} />,
  mapPin: (props: IconProps = {}) => <MapPin {...defaultProps} {...props} />,
  radio: (props: IconProps = {}) => <Radio {...defaultProps} {...props} />,
  mailbox: (props: IconProps = {}) => <Mailbox {...defaultProps} {...props} />,
  flag: (props: IconProps = {}) => <Flag {...defaultProps} {...props} />,
  hash: (props: IconProps = {}) => <Hash {...defaultProps} {...props} />,
  layoutGrid: (props: IconProps = {}) => <LayoutGrid {...defaultProps} {...props} />,
  split: (props: IconProps = {}) => <Split {...defaultProps} {...props} />,
  scale: (props: IconProps = {}) => <Scale {...defaultProps} {...props} />,
  hand: (props: IconProps = {}) => <Hand {...defaultProps} {...props} />,
  tent: (props: IconProps = {}) => <Tent {...defaultProps} {...props} />,
  rotateCcw: (props: IconProps = {}) => <RotateCcw {...defaultProps} {...props} />,
  
  // Arrows
  arrowUp: (props: IconProps = {}) => <ArrowUp {...defaultProps} {...props} />,
  arrowDown: (props: IconProps = {}) => <ArrowDown {...defaultProps} {...props} />,
  arrowRight: (props: IconProps = {}) => <ArrowRight {...defaultProps} {...props} />,
  chevronUp: (props: IconProps = {}) => <ChevronUp {...defaultProps} {...props} />,
  chevronDown: (props: IconProps = {}) => <ChevronDown {...defaultProps} {...props} />,
  chevronRight: (props: IconProps = {}) => <ChevronRight {...defaultProps} {...props} />,
  
  // Shapes & Controls
  circle: (props: IconProps = {}) => <Circle {...defaultProps} {...props} />,
  square: (props: IconProps = {}) => <Square {...defaultProps} {...props} />,
  minus: (props: IconProps = {}) => <Minus {...defaultProps} {...props} />,
  plus: (props: IconProps = {}) => <Plus {...defaultProps} {...props} />,
  play: (props: IconProps = {}) => <Play {...defaultProps} {...props} />,
  pause: (props: IconProps = {}) => <Pause {...defaultProps} {...props} />,
  refresh: (props: IconProps = {}) => <RefreshCw {...defaultProps} {...props} />,
};

// Direct exports for convenience
export {
  TrendingUp,
  TrendingDown,
  Target,
  Shield,
  ShieldCheck,
  Zap,
  DollarSign,
  Users,
  User,
  FileText,
  Folder,
  Link,
  Clock,
  Calendar,
  Tag,
  Trophy,
  ClipboardList,
  Activity,
  BarChart3,
  LineChart,
  PieChart,
  Rocket,
  Lightbulb,
  Wrench,
  Settings,
  Lock,
  Unlock,
  Database,
  Server,
  GitBranch,
  Play,
  Pause,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  AlertCircle,
  Info,
  ChevronUp,
  ChevronDown,
  ChevronRight,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Circle,
  Square,
  Minus,
  Plus,
  Search,
  Eye,
  CreditCard,
  Gift,
  Heart,
  Megaphone,
  Smartphone,
  Image,
  Mail,
  Tent,
  MapPin,
  Globe,
  Cpu,
  HardDrive,
  Disc,
  Network,
  FlaskConical,
  Building2,
  Siren,
  Hand,
  Key,
  Gem,
  MessageSquare,
  Volume2,
  Banknote,
  Package,
  Briefcase,
  Radio,
  Github,
  Box,
  Split,
  Microscope,
  Hospital,
  Flag,
  Layers,
  Monitor,
  Workflow,
  Binary,
  Brain,
  Sparkles,
  Timer,
  Gauge,
  Scale,
  Pill,
  Mailbox,
  Store,
  Bot,
  ShoppingCart,
  Webhook,
  Bell,
  RotateCcw,
  LayoutGrid,
  Receipt,
  Hash,
};

export default Icons;
