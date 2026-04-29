import type { Gol, Seleccion, Partido } from '../types';

export const seleccionArgentina: Seleccion = {
  id: 'argentina',
  nombre: 'Argentina',
  nombreCompleto: 'Selección Argentina de Fútbol',
  colores: { camiseta: '#6CACE4', pantalon: '#000000', medias: '#6CACE4' },
  sprites: { jugador: 'argentina_jugador', arquero: 'argentina_arquero' }
};

export const seleccionInglaterra: Seleccion = {
  id: 'inglaterra',
  nombre: 'Inglaterra',
  nombreCompleto: 'Selección de Inglaterra',
  colores: { camiseta: '#FFFFFF', pantalon: '#000000', medias: '#FFFFFF' },
  sprites: { jugador: 'inglaterra_jugador', arquero: 'inglaterra_arquero' }
};

export const golDelSiglo: Gol = {
  id: 'gol_del_siglo_1986',
  tiempoGlobalMaximo: 12000,
  titulo: 'EL GOL DEL SIGLO',
  subtitulo: 'La jugada perfecta',
  partido: 'Argentina vs Inglaterra',
  torneo: 'Mundial México 86',
  fecha: '22 de Junio, 1986',
  autor: { nombre: 'Diego Maradona', apodo: 'El Diego', sprite: 'maradona' },
  asistente: { nombre: 'Héctor Enrique', apodo: 'El Negro' },
  duracion: 11,
  distancia: '60 metros',
  escenario: { estadio: 'Estadio Azteca', ciudad: 'Ciudad de México', spriteFondo: 'azteca_estadio' },
  fases: [
    // FASE 0: INTRO AUTOMÁTICA (sin opciones)
    {
      id: 'fase_0_start',
      tipo: 'intro',                    // clave: tipo intro
      titulo: 'LA RECUPERACIÓN',
      descripcion: 'Cuciuffo recupera y pasa a Enrique',
      narrativa: 'Recuperación de José Luis Cuciuffo tras un error de Peter Beardsley. Se la pasa al Negro Enrique.',
      tiempoLimite: 3000,
      timingWindow: { inicio: 0, fin: 100 },
      opciones: []                      // sin opciones, avanza automática
    },
    // ... el resto de las fases igual que antes
    {
      id: 'fase_1_pase',
      tipo: 'decision',
      titulo: 'EL PASE',
      descripcion: 'Enrique pasa a Maradona',
      narrativa: 'Enrique da un pase sencillo, casi horizontal, hacia la derecha...',
      tiempoLimite: 4000,
      timingWindow: { inicio: 25, fin: 75 },
      primerPlano: { personaje: 'Héctor Enrique', dialogo: 'Le daré un pase de gol al Diego', spriteCloseUp: '/sprites/enrique_closeup.png' },
      opciones: [
        { id: 'opcion_recibir', texto: 'Pasar a Maradona', correcta: true, resultado: 'sigue', descripcionExito: 'Maradona controla la pelota con la derecha.' },
        { id: 'opcion_retrasar', texto: 'Retener y esperar', correcta: false, resultado: 'pierde', descripcionFallo: 'La defensa inglesa lo presiona y pierde el balón.' },
        { id: 'opcion_lateral', texto: 'Abrir a la banda derecha', correcta: false, resultado: 'pierde', descripcionFallo: 'El pase es interceptado.' },
        { id: 'opcion_devolver', texto: 'Devolver a Cuciuffo', correcta: false, resultado: 'pierde', descripcionFallo: 'La jugada se enfría.' }
      ]
    },
    // Fase 2, 3, 4, 5, 6 igual que los tenías (con 4 opciones y primer plano)
    // ... (copiá las fases 2 a 6 del archivo que te di antes, exactamente igual)
  ]
};

export const partidoArgentinaInglaterra1986: Partido = {
  id: 'argentina_inglaterra_1986',
  torneo: 'Mundial México 86',
  fase: 'Cuartos de Final',
  fecha: '22 de Junio, 1986',
  local: seleccionArgentina,
  visitante: seleccionInglaterra,
  estadio: 'Estadio Azteca',
  ciudad: 'Ciudad de México',
  goles: [golDelSiglo]
};
