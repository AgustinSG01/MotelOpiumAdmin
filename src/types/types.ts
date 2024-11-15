export interface Employee {
  id: number;
  nome: string;
  pin: number;
  rol: string;
  limpezas?: Limpeza[];
  createdAt: Date;
}

export interface Limpeza {
  id: number;
  empregado?: Employee;
  gerente?: Employee;
  suit: Suit;
  // controles: Controle[]
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
  lastClean?: Date;
}

export interface Controle {
  id: number;
  limpeza?: Limpeza;
  aspects?: string[];
  data: Date;
}
