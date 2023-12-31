import {
  AlertTriangle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  FileText,
  Image,
  Loader2,
  LucideProps,
  MoreVertical,
  Plus,
  Settings,
  Trash,
  User,
  LayoutDashboard,
  FileBarChart,
  KeyRound,
  Siren,
  Search,
  Users,
  type Icon as LucideIcon,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  user: User,
  arrowRight: ArrowRight,
  dashboard: LayoutDashboard,
  analytics: FileBarChart,
  key: KeyRound,
  siren: Siren,
  search: Search,
  complaint: Users,
  case: FileText,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  media: Image,
  settings: Settings,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
};
