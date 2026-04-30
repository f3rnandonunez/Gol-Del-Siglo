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
    // FASE 0: INTRO AUTOMÁTICA
    {
      id: 'fase_0_start',
      tipo: 'intro',
      titulo: 'LA RECUPERACIÓN',
      descripcion: 'Cuciuffo recupera y pasa a Enrique',
      narrativa: 'Recuperación de José Luis Cuciuffo tras un error de Peter Beardsley. Se la pasa al Negro Enrique.',
      opciones: []
    },
    // FASE 1: PASE DE ENRIQUE
    {
      id: 'fase_1_pase',
      tipo: 'decision',
      titulo: 'EL PASE',
      descripcion: 'Enrique pasa a Maradona',
      narrativa: 'Enrique da un pase sencillo, casi horizontal, hacia la derecha, donde está Diego Maradona...',
      opciones: [
        { id: 'opcion_recibir', texto: 'Pasar a Maradona', correcta: true, resultado: 'sigue', descripcionExito: 'Maradona controla la pelota con la derecha.' },
        { id: 'opcion_retrasar', texto: 'Retener y esperar', correcta: false, resultado: 'pierde', descripcionFallo: 'La defensa inglesa lo presiona y pierde el balón.' },
        { id: 'opcion_lateral', texto: 'Abrir a la banda derecha', correcta: false, resultado: 'pierde', descripcionFallo: 'El pase es interceptado.' },
        { id: 'opcion_devolver', texto: 'Devolver a Cuciuffo', correcta: false, resultado: 'pierde', descripcionFallo: 'La jugada se enfría.' }
      ]
    },
    // FASE 2: STEVENS
    {
      id: 'fase_2_stevens',
      tipo: 'decision',
      titulo: 'EL PRIMER ESCOLLO',
      descripcion: 'Gary Stevens presiona',
      narrativa: 'Maradona controla la pelota con la derecha. Inmediatamente, Gary Stevens se le viene encima.',
      rival: { nombre: 'Gary Stevens', sprite: 'stevens' },
      opciones: [
        { id: 'opcion_giro', texto: 'Giro rápido (ruleta)', correcta: true, resultado: 'sigue', descripcionExito: 'Diego hace un giro y se escapa.' },
        { id: 'opcion_freno', texto: 'Frenar y proteger la pelota', correcta: false, resultado: 'pierde', descripcionFallo: 'Stevens le roba el balón.' },
        { id: 'opcion_pase_atras', texto: 'Pase atrás al mediocampo', correcta: false, resultado: 'pierde', descripcionFallo: 'La jugada se vuelve predecible.' },
        { id: 'opcion_tiro_lejano', texto: 'Disparar desde lejos', correcta: false, resultado: 'pierde', descripcionFallo: 'El tiro es bloqueado.' }
      ]
    },
    // FASE 3: REID
    {
      id: 'fase_3_reid',
      tipo: 'decision',
      titulo: 'EL SEGUNDO RIVAL',
      descripcion: 'Peter Reid cierra el paso',
      narrativa: 'Sin perder velocidad, Maradona avanza y Peter Reid sale a cerrarle el paso.',
      rival: { nombre: 'Peter Reid', sprite: 'reid' },
      opciones: [
        { id: 'opcion_quiebre', texto: 'Quiebre sutil', correcta: true, resultado: 'sigue', descripcionExito: 'Maradona hace un quiebre y deja clavado a Reid.' },
        { id: 'opcion_velocidad', texto: 'Intentar ganar por velocidad', correcta: false, resultado: 'pierde', descripcionFallo: 'Reid usa el cuerpo y lo bloquea.' },
        { id: 'opcion_cambio_pierna', texto: 'Cambiar de pierna y frenar', correcta: false, resultado: 'pierde', descripcionFallo: 'Reid anticipa y recupera.' },
        { id: 'opcion_centro', texto: 'Centrar al área', correcta: false, resultado: 'pierde', descripcionFallo: 'El centro es despejado.' }
      ]
    },
    // FASE 4: BUTCHER
    {
      id: 'fase_4_butcher',
      tipo: 'decision',
      titulo: 'LA ENTRADA BRUTAL',
      descripcion: 'Terry Butcher intenta frenarlo',
      narrativa: 'Terry Butcher sale con una entrada violenta.',
      rival: { nombre: 'Terry Butcher', sprite: 'butcher' },
      opciones: [
        { id: 'opcion_cambio', texto: 'Cambio de dirección y velocidad', correcta: true, resultado: 'sigue', descripcionExito: 'Maradona lo esquiva con un cambio de ritmo.' },
        { id: 'opcion_proteger', texto: 'Proteger la pelota con el cuerpo', correcta: false, resultado: 'pierde', descripcionFallo: 'Butcher lo derriba en falta.' },
        { id: 'opcion_pared', texto: 'Pared con un compañero', correcta: false, resultado: 'pierde', descripcionFallo: 'No hay nadie cerca, la pared falla.' },
        { id: 'opcion_tacada', texto: 'Intentar una taquito', correcta: false, resultado: 'pierde', descripcionFallo: 'El taquito sale mal.' }
      ]
    },
    // FASE 5: FENWICK
    {
      id: 'fase_5_fenwick',
      tipo: 'decision',
      titulo: 'EL ÚLTIMO DEFENSOR',
      descripcion: 'Terry Fenwick intercepta',
      narrativa: 'Terry Fenwick viene de frente.',
      rival: { nombre: 'Terry Fenwick', sprite: 'fenwick' },
      opciones: [
        { id: 'opcion_amague', texto: 'Amague', correcta: true, resultado: 'sigue', descripcionExito: 'Maradona lo pasa con un amague de cuerpo.' },
        { id: 'opcion_pique', texto: 'Pique al espacio', correcta: false, resultado: 'pierde', descripcionFallo: 'Fenwick lee la jugada y corta el pase.' },
        { id: 'opcion_potencia', texto: 'Acelerar a fondo', correcta: false, resultado: 'pierde', descripcionFallo: 'La defensa lo encierra entre dos.' },
        { id: 'opcion_tiro_angulo', texto: 'Disparar al ángulo desde afuera', correcta: false, resultado: 'pierde', descripcionFallo: 'El disparo se va desviado.' }
      ]
    },
    // FASE 6: SHILTON (GOL)
    {
      id: 'fase_6_shilton',
      tipo: 'decision',
      titulo: 'FRENTE AL ARQUERO',
      descripcion: 'Peter Shilton achica',
      narrativa: 'Maradona entra al área grande. El arquero Peter Shilton sale a achicar.',
      rival: { nombre: 'Peter Shilton', sprite: 'shilton' },
      opciones: [
        { id: 'opcion_driblar', texto: 'Driblar al arquero', correcta: true, resultado: 'gol', descripcionExito: '¡GOOOOL! Diego lo deja en el suelo y empuja la pelota.' },
        { id: 'opcion_vaselina', texto: 'Vaselina', correcta: false, resultado: 'pierde', descripcionFallo: 'La vaselina se va alta.' },
        { id: 'opcion_potencia', texto: 'Disparo fuerte al cuerpo', correcta: false, resultado: 'pierde', descripcionFallo: 'Shilton ataja con el pecho.' },
        { id: 'opcion_pase_gol', texto: 'Pase a compañero solo', correcta: false, resultado: 'pierde', descripcionFallo: 'El pase es interceptado.' }
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
