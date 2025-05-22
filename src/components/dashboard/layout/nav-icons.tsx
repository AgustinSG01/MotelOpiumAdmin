import { Broom, Dresser, SprayBottle } from '@phosphor-icons/react';
import type { Icon } from '@phosphor-icons/react/dist/lib/types';
import { Graph, SealWarning } from '@phosphor-icons/react/dist/ssr';
import { Bell } from '@phosphor-icons/react/dist/ssr/Bell';
import { ChartPie as ChartPieIcon } from '@phosphor-icons/react/dist/ssr/ChartPie';
import { GearSix as GearSixIcon } from '@phosphor-icons/react/dist/ssr/GearSix';
import { Users as UsersIcon } from '@phosphor-icons/react/dist/ssr/Users';

export const navIcons = {
  'chart-pie': ChartPieIcon,
  'gear-six': GearSixIcon,
  dresser: Dresser,
  bell: Bell,
  broom: Broom,
  users: UsersIcon,
  spray: SprayBottle,
  faltas: SealWarning,
  relatorio: Graph,
} as Record<string, Icon>;
