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
    // FASE 0: INTRO AUTOMÁTICA (sin primer plano por ahora)
    {
      id: 'fase_0_start',
      tipo: 'intro',
      titulo: 'LA RECUPERACIÓN',
      descripcion: 'Cuciuffo recupera y pasa a Enrique',
      narrativa: 'Recuperación de José Luis Cuciuffo tras un error de Peter Beardsley. Se la pasa al Negro Enrique.',
      opciones: []
    },
    // FASE 1: PASE DE ENRIQUE (con primer plano en acierto)
    {
      id: 'fase_1_pase',
      tipo: 'decision',
      titulo: 'EL PASE',
      descripcion: 'Enrique pasa a Maradona',
      narrativa: 'Enrique da un pase sencillo, casi horizontal, hacia la derecha...',
      primerPlano: {
        personaje: 'Héctor Enrique',
        dialogo: 'Le daré un pase de gol al Diego',
        spriteCloseUp: '/sprites/maradona_izq.png'   // placeholder
      },
      opciones: [
        { id: 'opcion_recibir', texto: 'Pasar a Maradona', correcta: true, resultado: 'sigue', descripcionExito: 'Maradona controla la pelota.' },
        { id: 'opcion_retrasar', texto: 'Retener y esperar', correcta: false, resultado: 'pierde', descripcionFallo: 'Pierde el balón.' },
        { id: 'opcion_lateral', texto: 'Abrir a la banda derecha', correcta: false, resultado: 'pierde', descripcionFallo: 'Pase interceptado.' },
        { id: 'opcion_devolver', texto: 'Devolver a Cuciuffo', correcta: false, resultado: 'pierde', descripcionFallo: 'La jugada se enfría.' }
      ]
    },
    // FASE 2: STEVENS
    {
      id: 'fase_2_stevens',
      tipo: 'decision',
      titulo: 'EL PRIMER ESCOLLO',
      descripcion: 'Gary Stevens presiona',
      narrativa: 'Maradona controla. Gary Stevens se le viene encima.',
      rival: { nombre: 'Gary Stevens', sprite: 'stevens' },
      primerPlano: {
        personaje: 'Gary Stevens',
        dialogo: 'Intenté cerrarle el paso, pero ya era tarde',
        spriteCloseUp: '/sprites/maradona_izq.png'
      },
      opciones: [
        { id: 'opcion_giro', texto: 'Giro rápido', correcta: true, resultado: 'sigue', descripcionExito: 'Se escapa.' },
        { id: 'opcion_freno', texto: 'Frenar', correcta: false, resultado: 'pierde', descripcionFallo: 'Le roba el balón.' },
        { id: 'opcion_pase_atras', texto: 'Pase atrás', correcta: false, resultado: 'pierde', descripcionFallo: 'Pase cortado.' },
        { id: 'opcion_tiro_lejano', texto: 'Disparar desde lejos', correcta: false, resultado: 'pierde', descripcionFallo: 'Bloqueado.' }
      ]
    },
    // FASE 3: REID
    {
      id: 'fase_3_reid',
      tipo: 'decision',
      titulo: 'EL SEGUNDO RIVAL',
      descripcion: 'Peter Reid cierra el paso',
      narrativa: 'Maradona avanza y Reid sale a cerrarle.',
      rival: { nombre: 'Peter Reid', sprite: 'reid' },
      primerPlano: {
        personaje: 'Peter Reid',
        dialogo: 'No pude seguirle el ritmo',
        spriteCloseUp: '/sprites/maradona_izq.png'
      },
      opciones: [
        { id: 'opcion_quiebre', texto: 'Quiebre sutil', correcta: true, resultado: 'sigue', descripcionExito: 'Lo deja clavado.' },
        { id: 'opcion_velocidad', texto: 'Ganar por velocidad', correcta: false, resultado: 'pierde', descripcionFallo: 'Lo bloquea.' },
        { id: 'opcion_cambio_pierna', texto: 'Cambiar de pierna', correcta: false, resultado: 'pierde', descripcionFallo: 'Reid anticipa.' },
        { id: 'opcion_centro', texto: 'Centrar al área', correcta: false, resultado: 'pierde', descripcionFallo: 'Despejado.' }
      ]
    },
    // FASE 4: BUTCHER
    {
      id: 'fase_4_butcher',
      tipo: 'decision',
      titulo: 'LA ENTRADA BRUTAL',
      descripcion: 'Terry Butcher intenta frenarlo',
      narrativa: 'Butcher sale con una entrada violenta.',
      rival: { nombre: 'Terry Butcher', sprite: 'butcher' },
      primerPlano: {
        personaje: 'Terry Butcher',
        dialogo: 'Imposible derribarlo',
        spriteCloseUp: '/sprites/maradona_izq.png'
      },
      opciones: [
        { id: 'opcion_cambio', texto: 'Cambio de dirección', correcta: true, resultado: 'sigue', descripcionExito: 'Lo esquiva.' },
        { id: 'opcion_proteger', texto: 'Proteger la pelota', correcta: false, resultado: 'pierde', descripcionFallo: 'Lo derriban.' },
        { id: 'opcion_pared', texto: 'Pared', correcta: false, resultado: 'pierde', descripcionFallo: 'Sin nadie cerca.' },
        { id: 'opcion_tacada', texto: 'Taquito', correcta: false, resultado: 'pierde', descripcionFallo: 'Sale mal.' }
      ]
    },
    // FASE 5: FENWICK
    {
      id: 'fase_5_fenwick',
      tipo: 'decision',
      titulo: 'EL ÚLTIMO DEFENSOR',
      descripcion: 'Terry Fenwick intercepta',
      narrativa: 'Fenwick viene de frente.',
      rival: { nombre: 'Terry Fenwick', sprite: 'fenwick' },
      primerPlano: {
        personaje: 'Terry Fenwick',
        dialogo: 'Me dejó en el camino',
        spriteCloseUp: '/sprites/maradona_izq.png'
      },
      opciones: [
        { id: 'opcion_amague', texto: 'Amague', correcta: true, resultado: 'sigue', descripcionExito: 'Lo pasa.' },
        { id: 'opcion_pique', texto: 'Pique al espacio', correcta: false, resultado: 'pierde', descripcionFallo: 'Corta el pase.' },
        { id: 'opcion_potencia', texto: 'Acelerar', correcta: false, resultado: 'pierde', descripcionFallo: 'Encierran.' },
        { id: 'opcion_tiro_angulo', texto: 'Disparar al ángulo', correcta: false, resultado: 'pierde', descripcionFallo: 'Desviado.' }
      ]
    },
    // FASE 6: SHILTON (GOL)
    {
      id: 'fase_6_shilton',
      tipo: 'decision',
      titulo: 'FRENTE AL ARQUERO',
      descripcion: 'Peter Shilton achica',
      narrativa: 'Maradona entra al área. Shilton sale a achicar.',
      rival: { nombre: 'Peter Shilton', sprite: 'shilton' },
      primerPlano: {
        personaje: 'Diego Maradona',
        dialogo: '¡Gol del siglo!',
        spriteCloseUp: '/sprites/maradona_izq.png'
      },
      opciones: [
        { id: 'opcion_driblar', texto: 'Driblar al arquero', correcta: true, resultado: 'gol', descripcionExito: '¡GOOOOL!' },
        { id: 'opcion_vaselina', texto: 'Vaselina', correcta: false, resultado: 'pierde', descripcionFallo: 'Se va alta.' },
        { id: 'opcion_potencia', texto: 'Disparo fuerte', correcta: false, resultado: 'pierde', descripcionFallo: 'Ataja.' },
        { id: 'opcion_pase_gol', texto: 'Pase', correcta: false, resultado: 'pierde', descripcionFallo: 'Interceptado.' }
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
