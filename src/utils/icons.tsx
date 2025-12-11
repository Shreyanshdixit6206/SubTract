/**
 * Optimized icon utilities
 * Use specific icon imports instead of importing whole components
 * This reduces bundle size significantly
 */

import {
  Home,
  CreditCard,
  PieChart,
  Trophy,
  Settings,
  Plus,
  Bell,
  User,
  HelpCircle,
  Wallet,
  Sun,
  Moon,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  Phone,
  Check,
  Trash2,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Flame,
  Building2,
  Smartphone,
  X,
  Shield,
  CheckCircle2,
  Gift,
  ChevronDown,
  MessageCircle,
  Send,
  Search,
  BookOpen,
  Video,
  FileText,
  CreditCard as CardIcon,
} from 'lucide-react';

export const Icons = {
  // Navigation
  Home,
  CreditCard,
  PieChart,
  Trophy,
  Settings,
  Wallet,
  User,
  HelpCircle,
  Bell,
  Plus,
  Moon,
  Sun,

  // Form/Auth
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  ArrowRight,
  Check,

  // Actions
  Trash2,
  X,
  ChevronDown,
  Send,
  Search,

  // Status/Indicators
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Shield,
  Gift,

  // Dashboard
  BarChart3,
  Flame,

  // Payment/Cards
  Building2,
  Smartphone,
  CardIcon,

  // Help/Documentation
  BookOpen,
  Video,
  FileText,
  MessageCircle,
} as const;

// Type-safe icon name
export type IconName = keyof typeof Icons;

// Icon component wrapper for consistent sizing
export function Icon({ name, size = 24, className = '' }: { name: IconName; size?: number; className?: string }) {
  const IconComponent = Icons[name];
  return <IconComponent size={size} className={className} />;
}
