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
    {
      id: 'fase_0_start',
      tipo: 'intro',
      titulo: 'LA RECUPERACIÓN',
      descripcion: 'Cuciuffo recupera y pasa a Enrique',
      narrativa: 'Recuperación de José Luis Cuciuffo tras un error de Peter Beardsley. Se la pasa al Negro Enrique.',
      tiempoLimite: 3000,
      timingWindow: { inicio: 0, fin: 100 },
      opciones: [{ id: 'opcion_continuar', texto: 'Continuar', correcta: true, resultado: 'sigue', descripcionExito: "«Se la doy al Diego». Enrique da un pase sencillo..." }]
    },
    {
      id: 'fase_1_pase',
      tipo: 'decision',
      titulo: 'EL PASE',
      descripcion: 'Enrique pasa a Maradona',
      narrativa: 'Enrique da un pase sencillo, casi horizontal, hacia la derecha, donde está Diego Maradona...',
      tiempoLimite: 4000,
      timingWindow: { inicio: 25, fin: 75 },
      primerPlano: { personaje: 'Héctor Enrique', dialogo: 'Le daré un pase de gol al Diego', spriteCloseUp: '/sprites/enrique_closeup.png' },
      opciones: [
        { id: 'opcion_recibir', texto: 'Recibir el pase', correcta: true, resultado: 'sigue', descripcionExito: 'Maradona controla la pelota con la derecha.' },
        { id: 'opcion_perder', texto: 'Dejar pasar', correcta: false, resultado: 'pierde', descripcionFallo: 'La pelota se va de largo. La defensa inglesa recupera.' }
      ]
    },
    {
      id: 'fase_2_stevens',
      tipo: 'decision',
      titulo: 'EL PRIMER ESCOLLO',
      descripcion: 'Gary Stevens presiona',
      narrativa: 'Maradona controla la pelota con la derecha. Inmediatamente, Gary Stevens se le viene encima.',
      tiempoLimite: 3500,
      timingWindow: { inicio: 30, fin: 70 },
      rival: { nombre: 'Gary Stevens', sprite: 'stevens' },
      primerPlano: { personaje: 'Gary Stevens', dialogo: 'Intenté cerrarle el paso, pero ya era tarde', spriteCloseUp: '/sprites/stevens_closeup.png' },
      opciones: [
        { id: 'opcion_giro', texto: 'Giro rápido (ruleta)', correcta: true, resultado: 'sigue', descripcionExito: 'Diego hace un giro y se escapa.' },
        { id: 'opcion_fallo', texto: 'Intentar correr', correcta: false, resultado: 'pierde', descripcionFallo: 'Stevens le roba la pelota.' }
      ]
    },
    {
      id: 'fase_3_reid',
      tipo: 'decision',
      titulo: 'EL SEGUNDO RIVAL',
      descripcion: 'Peter Reid cierra el paso',
      narrativa: 'Sin perder velocidad, Maradona avanza y Peter Reid sale a cerrarle el paso.',
      tiempoLimite: 3000,
      timingWindow: { inicio: 35, fin: 65 },
      rival: { nombre: 'Peter Reid', sprite: 'reid' },
      primerPlano: { personaje: 'Peter Reid', dialogo: 'No pude seguirle el ritmo', spriteCloseUp: '/sprites/reid_closeup.png' },
      opciones: [
        { id: 'opcion_quiebre', texto: 'Quiebre sutil', correcta: true, resultado: 'sigue', descripcionExito: 'Maradona hace un quiebre y deja clavado a Reid.' },
        { id: 'opcion_fallo', texto: 'Regate largo', correcta: false, resultado: 'pierde', descripcionFallo: 'Reid intercepta.' }
      ]
    },
    {
      id: 'fase_4_butcher',
      tipo: 'decision',
      titulo: 'LA ENTRADA BRUTAL',
      descripcion: 'Terry Butcher intenta frenarlo',
      narrativa: 'Terry Butcher intenta frenarlo con una entrada.',
      tiempoLimite: 2800,
      timingWindow: { inicio: 30, fin: 60 },
      rival: { nombre: 'Terry Butcher', sprite: 'butcher' },
      primerPlano: { personaje: 'Terry Butcher', dialogo: 'Intenté derribarlo, pero fue imposible', spriteCloseUp: '/sprites/butcher_closeup.png' },
      opciones: [
        { id: 'opcion_cambio', texto: 'Cambio de dirección y velocidad', correcta: true, resultado: 'sigue', descripcionExito: 'Maradona lo elude con un cambio de dirección.' },
        { id: 'opcion_fallo', texto: 'Frenar', correcta: false, resultado: 'pierde', descripcionFallo: 'Butcher lo derriba.' }
      ]
    },
    {
      id: 'fase_5_fenwick',
      tipo: 'decision',
      titulo: 'EL ÚLTIMO DEFENSOR',
      descripcion: 'Terry Fenwick intercepta',
      narrativa: 'Terry Fenwick intenta interceptarlo, pero Diego lo supera con un amague.',
      tiempoLimite: 2500,
      timingWindow: { inicio: 35, fin: 65 },
      rival: { nombre: 'Terry Fenwick', sprite: 'fenwick' },
      primerPlano: { personaje: 'Terry Fenwick', dialogo: 'Me dejó en el camino con un amague', spriteCloseUp: '/sprites/fenwick_closeup.png' },
      opciones: [
        { id: 'opcion_amague', texto: 'Amague', correcta: true, resultado: 'sigue', descripcionExito: 'Diego lo supera con un amague y sigue imparable.' },
        { id: 'opcion_fallo', texto: 'Disparar desde afuera', correcta: false, resultado: 'pierde', descripcionFallo: 'El disparo se va desviado.' }
      ]
    },
    {
      id: 'fase_6_shilton',
      tipo: 'decision',
      titulo: 'FRENTE AL ARQUERO',
      descripcion: 'Peter Shilton achica',
      narrativa: 'Maradona entra al área grande. El arquero Peter Shilton sale a achicar.',
      tiempoLimite: 2200,
      timingWindow: { inicio: 35, fin: 65 },
      rival: { nombre: 'Peter Shilton', sprite: 'shilton' },
      primerPlano: { personaje: 'Peter Shilton', dialogo: 'Salió a achicar, pero fue imposible', spriteCloseUp: '/sprites/shilton_closeup.png' },
      opciones: [
        { id: 'opcion_driblar', texto: 'Driblar con toque sutil', correcta: true, resultado: 'gol', descripcionExito: '¡GOOOOL! Diego lo dribla y la empuja al fondo de la red.' },
        { id: 'opcion_fallo', texto: 'Definir fuerte', correcta: false, resultado: 'pierde', descripcionFallo: 'Shilton ataja el disparo.' }
      ]
    }
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
