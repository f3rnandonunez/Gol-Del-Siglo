// TIPOS DEL JUEGO - GOLES HISTORICOS RPG 8-BIT

export type TipoFase = 'intro' | 'decision' | 'gol' | 'fallo';

export interface PrimerPlano {
  personaje: string;
  dialogo: string;
  spriteCloseUp: string;
}

export interface Opcion {
  id: string;
  texto: string;
  correcta: boolean;
  resultado: 'sigue' | 'pierde' | 'gol';
  descripcionExito?: string;
  descripcionFallo?: string;
  dialogo?: string;
  primerPlanoFallo?: PrimerPlano;   // NUEVO: primer plano para fallos
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
  primerPlano?: PrimerPlano;   // para aciertos
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

// ... el resto de interfaces (Seleccion, Partido, EstadoJuego) se mantienen igual
