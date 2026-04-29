// TIPOS DEL JUEGO - GOLES HISTORICOS RPG 8-BIT

export type TipoFase = 'intro' | 'decision' | 'gol' | 'fallo';

export interface Opcion {
  id: string;
  texto: string;
  correcta: boolean;
  resultado: 'sigue' | 'pierde' | 'gol';
  descripcionExito?: string;
  descripcionFallo?: string;
  dialogo?: string;
}

export interface PrimerPlano {
  personaje: string;
  dialogo: string;
  spriteCloseUp: string;
}

export interface Fase {
  id: string;
  tipo: TipoFase;
  titulo: string;
  descripcion: string;
  narrativa: string;
  tiempoLimite?: number;
  timingWindow?: { inicio: number; fin: number };
  opciones: Opcion[];
  rival?: {
    nombre: string;
    sprite: string;
  };
  primerPlano?: PrimerPlano;
}

export interface Gol {
  id: string;
  tiempoGlobalMaximo: number;
  titulo: string;
  subtitulo: string;
  partido: string;
  torneo: string;
  fecha: string;
  autor: {
    nombre: string;
    apodo: string;
    sprite: string;
  };
  asistente?: {
    nombre: string;
    apodo: string;
  };
  duracion: number;
  distancia: string;
  fases: Fase[];
  escenario: {
    estadio: string;
    ciudad: string;
    spriteFondo: string;
  };
}

export interface Seleccion {
  id: string;
  nombre: string;
  nombreCompleto: string;
  colores: {
    camiseta: string;
    pantalon: string;
    medias: string;
  };
  sprites: {
    jugador: string;
    arquero: string;
  };
}

export interface Partido {
  id: string;
  torneo: string;
  fase: string;
  fecha: string;
  local: Seleccion;
  visitante: Seleccion;
  estadio: string;
  ciudad: string;
  goles: Gol[];
}

export interface EstadoJuego {
  faseActual: number;
  vidas: number;
  puntaje: number;
  tiempoRestante: number;
  estado: 'menu' | 'jugando' | 'pausa' | 'victoria' | 'derrota';
  golActual: Gol | null;
}
