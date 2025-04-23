import type { NavItemConfig } from '@/types/nav';
import { paths } from '@/paths';

export const navItems = [
  { key: 'overview', title: 'Overview', href: paths.dashboard.overview, icon: 'chart-pie' },
  { key: 'empregados', title: 'Funcionários', href: paths.dashboard.employees, icon: 'users' },
  { key: 'suits', title: 'Suítes', href: paths.dashboard.suits, icon: 'dresser' },
  // { key: 'settings', title: 'Settings', href: paths.dashboard.settings, icon: 'gear-six' },
  { key: 'limpezas', title: 'Limpezas', href: paths.dashboard.account, icon: 'broom' },
  { key: 'faxinas', title: 'Faxinas', href: paths.dashboard.faxina, icon: 'spray' },
  { key: 'faltas', title: 'Faltas', href: paths.dashboard.falta, icon: 'faltas' },
  // { key: 'notifications', title: 'Notificações', href: paths.errors.notFound, icon: 'bell' },
] satisfies NavItemConfig[];
