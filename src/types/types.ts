export interface Employee {
  id: number;
  nome: string;
  pin: string;
  rol: string;
  limpezas?: Limpeza[];
  createdAt: Date;
}

export interface Limpeza {
  id: number;
  empregado?: Employee;
  gerente?: Employee;
  suit: Suit;
  controles?: Controle;
  comeco: Date;
  fim?: Date;
  faxina: boolean;
  data?: Date;
  score?: number;
  esquecido: boolean;
  endedBy?: Employee
}
export interface Suit {
  id: number;
  nome: string;
  limpezas?: Limpeza[];
}

export interface SuitInfo {
  id: number;
  nome: string;
  cleansQuantity: number;
  lastClean?: Limpeza;
}

export interface Controle {
  id: number;
  limpeza?: Limpeza;
  aspectos?: Aspect[];
  data: Date;
}

export interface Aspect {
  id: number;
  controleType: string;
  score: number;
  comment?: string;
  image?: string;
}

export interface Notification {
  id: number;
  controle: Controle;
  seen: boolean;
}

export interface Falta {
  id: number;
  empregado: Employee;
  gerente: Employee;
  data: Date;
  comentario: string;
}
