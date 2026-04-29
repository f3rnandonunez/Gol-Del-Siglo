// TIPOS DEL JUEGO - GOLES HISTORICOS RPG 8-BIT

export type TipoFase = 'intro' | 'decision' | 'gol' | 'fallo';

export interface Opcion {
  id: string;
  texto: string;
  correcta: boolean;
  resultado: 'sigue' | 'pierde' | 'gol';
  dialogo?: string;
  descripcionExito?: string;
  descripcionFallo?: string;
}

export interface Fase {
  id: string;
  tipo: TipoFase;
  titulo: string;
  descripcion: string;
  narrativa: string;
  tiempoLimite: number; // en milisegundos
  timingWindow: { inicio: number; fin: number }; // porcentaje 0-100
  opciones: Opcion[];
  rival?: {
    nombre: string;
    sprite: string;
  };
}

export interface Gol {
  id: string;
  tiempoGlobalMaximo: number; // milisegundos para todo el juego
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
  duracion: number; // segundos reales
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

// Estado del juego
export interface EstadoJuego {
  faseActual: number;
  vidas: number;
  puntaje: number;
  tiempoRestante: number;
  estado: 'menu' | 'jugando' | 'pausa' | 'victoria' | 'derrota';
  golActual: Gol | null;
}
