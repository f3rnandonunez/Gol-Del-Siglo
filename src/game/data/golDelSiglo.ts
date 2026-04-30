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
    // FASE 0: Cuciuffo recupera (ahora con decisión)
{
  id: 'fase_0_cuciuffo',
  tipo: 'decision',
  titulo: 'RECUPERACIÓN',
  descripcion: 'Cuciuffo recupera el balón',
  narrativa: 'Recuperación de José Luis Cuciuffo tras un error de Peter Beardsley.',
  primerPlano: {
    personaje: 'José Luis Cuciuffo',
    dialogo: '¡Recuperé! La jugada sigue.',
    spriteCloseUp: '/sprites/maradona_izq.png' // placeholder
  },
  opciones: [
    {
      id: 'opcion_continuar',
      texto: 'Pasar a Enrique',
      correcta: true,
      resultado: 'sigue',
      descripcionExito: 'Enrique recibe el balón en la mitad.',
      primerPlanoFallo: undefined
    },
    {
      id: 'opcion_retener',
      texto: 'Retener y esperar',
      correcta: false,
      resultado: 'pierde',
      descripcionFallo: 'La defensa lo presiona y pierde el balón.',
      primerPlanoFallo: {
        personaje: 'Defensa inglesa',
        dialogo: '¡Te comiste el tiempo!',
        spriteCloseUp: '/sprites/maradona_izq.png'
      }
    },
    {
      id: 'opcion_rechazar',
      texto: 'Rechazar al fondo',
      correcta: false,
      resultado: 'pierde',
      descripcionFallo: 'El despeje es corto y lo recupera Inglaterra.',
      primerPlanoFallo: {
        personaje: 'Peter Beardsley',
        dialogo: 'Mal despeje.',
        spriteCloseUp: '/sprites/maradona_izq.png'
      }
    },
    {
      id: 'opcion_perder_tiempo',
      texto: 'Perder tiempo',
      correcta: false,
      resultado: 'pierde',
      descripcionFallo: 'La indecisión permite que lo roben.',
      primerPlanoFallo: {
        personaje: 'Gary Stevens',
        dialogo: '¡Rápido, presión!',
        spriteCloseUp: '/sprites/maradona_izq.png'
      }
    }
  ]
},
// FASE 1: Pase de Enrique (ya tenía opciones, pero vamos a estandarizar y agregar primeros planos de fallo)
{
  id: 'fase_1_pase',
  tipo: 'decision',
  titulo: 'EL PASE',
  descripcion: 'Enrique pasa a Maradona',
  narrativa: 'Enrique da un pase sencillo, casi horizontal, hacia la derecha, donde está Diego Maradona...',
  primerPlano: {
    personaje: 'Héctor Enrique',
    dialogo: 'Le daré un pase de gol al Diego',
    spriteCloseUp: '/sprites/maradona_izq.png'
  },
  opciones: [
    {
      id: 'opcion_recibir',
      texto: 'Pasar a Maradona',
      correcta: true,
      resultado: 'sigue',
      descripcionExito: 'Maradona controla la pelota.',
      primerPlanoFallo: undefined
    },
    {
      id: 'opcion_retrasar',
      texto: 'Retener y esperar',
      correcta: false,
      resultado: 'pierde',
      descripcionFallo: 'Pierde el balón.',
      primerPlanoFallo: {
        personaje: 'Defensa inglesa',
        dialogo: '¡No esperes!',
        spriteCloseUp: '/sprites/maradona_izq.png'
      }
    },
    {
      id: 'opcion_lateral',
      texto: 'Abrir a la banda derecha',
      correcta: false,
      resultado: 'pierde',
      descripcionFallo: 'Pase interceptado.',
      primerPlanoFallo: {
        personaje: 'Terry Butcher',
        dialogo: 'Pase fácil.',
        spriteCloseUp: '/sprites/maradona_izq.png'
      }
    },
    {
      id: 'opcion_devolver',
      texto: 'Devolver a Cuciuffo',
      correcta: false,
      resultado: 'pierde',
      descripcionFallo: 'La jugada se enfría.',
      primerPlanoFallo: {
        personaje: 'Cuciuffo',
        dialogo: 'No debiste devolver',
        spriteCloseUp: '/sprites/maradona_izq.png'
      }
    }
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
        { id: 'opcion_giro', texto: 'Giro rápido (ruleta)', correcta: true, resultado: 'sigue', descripcionExito: 'Diego hace un giro y se escapa.' },
        { 
          id: 'opcion_freno', texto: 'Frenar y proteger', correcta: false, resultado: 'pierde', descripcionFallo: 'Stevens le roba el balón.',
          primerPlanoFallo: { personaje: 'Gary Stevens', dialogo: 'Te quedaste quieto.', spriteCloseUp: '/sprites/maradona_izq.png' }
        },
        { 
          id: 'opcion_pase_atras', texto: 'Pase atrás', correcta: false, resultado: 'pierde', descripcionFallo: 'La jugada se vuelve predecible.',
          primerPlanoFallo: { personaje: 'Terry Butcher', dialogo: 'Ahí te esperábamos.', spriteCloseUp: '/sprites/maradona_izq.png' }
        },
        { 
          id: 'opcion_tiro_lejano', texto: 'Disparar desde lejos', correcta: false, resultado: 'pierde', descripcionFallo: 'El tiro es bloqueado.',
          primerPlanoFallo: { personaje: 'Peter Shilton', dialogo: 'Muy lejos para tirar.', spriteCloseUp: '/sprites/maradona_izq.png' }
        }
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
      primerPlano: {
        personaje: 'Peter Reid',
        dialogo: 'No pude seguirle el ritmo',
        spriteCloseUp: '/sprites/maradona_izq.png'
      },
      opciones: [
        { id: 'opcion_quiebre', texto: 'Quiebre sutil', correcta: true, resultado: 'sigue', descripcionExito: 'Maradona hace un quiebre y deja clavado a Reid.' },
        { 
          id: 'opcion_velocidad', texto: 'Ganar por velocidad', correcta: false, resultado: 'pierde', descripcionFallo: 'Reid usa el cuerpo y lo bloquea.',
          primerPlanoFallo: { personaje: 'Peter Reid', dialogo: 'No pasas por aquí.', spriteCloseUp: '/sprites/maradona_izq.png' }
        },
        { 
          id: 'opcion_cambio_pierna', texto: 'Cambiar de pierna', correcta: false, resultado: 'pierde', descripcionFallo: 'Reid anticipa y recupera.',
          primerPlanoFallo: { personaje: 'Peter Reid', dialogo: 'Te leí el cambio.', spriteCloseUp: '/sprites/maradona_izq.png' }
        },
        { 
          id: 'opcion_centro', texto: 'Centrar al área', correcta: false, resultado: 'pierde', descripcionFallo: 'El centro es despejado.',
          primerPlanoFallo: { personaje: 'Terry Butcher', dialogo: 'Centro fácil.', spriteCloseUp: '/sprites/maradona_izq.png' }
        }
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
      primerPlano: {
        personaje: 'Terry Butcher',
        dialogo: 'Intenté derribarlo, pero fue imposible',
        spriteCloseUp: '/sprites/maradona_izq.png'
      },
      opciones: [
        { id: 'opcion_cambio', texto: 'Cambio de dirección', correcta: true, resultado: 'sigue', descripcionExito: 'Maradona lo esquiva con un cambio de ritmo.' },
        { 
          id: 'opcion_proteger', texto: 'Proteger la pelota', correcta: false, resultado: 'pierde', descripcionFallo: 'Butcher lo derriba en falta.',
          primerPlanoFallo: { personaje: 'Terry Butcher', dialogo: '¡Te encontré!', spriteCloseUp: '/sprites/maradona_izq.png' }
        },
        { 
          id: 'opcion_pared', texto: 'Pared', correcta: false, resultado: 'pierde', descripcionFallo: 'No hay nadie cerca, la pared falla.',
          primerPlanoFallo: { personaje: 'Héctor Enrique', dialogo: 'No llegué a tiempo.', spriteCloseUp: '/sprites/maradona_izq.png' }
        },
        { 
          id: 'opcion_tacada', texto: 'Taquito', correcta: false, resultado: 'pierde', descripcionFallo: 'El taquito sale mal.',
          primerPlanoFallo: { personaje: 'Terry Butcher', dialogo: 'Demasiado lujoso.', spriteCloseUp: '/sprites/maradona_izq.png' }
        }
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
      primerPlano: {
        personaje: 'Terry Fenwick',
        dialogo: 'Me dejó en el camino con un amague',
        spriteCloseUp: '/sprites/maradona_izq.png'
      },
      opciones: [
        { id: 'opcion_amague', texto: 'Amague', correcta: true, resultado: 'sigue', descripcionExito: 'Maradona lo pasa con un amague de cuerpo.' },
        { 
          id: 'opcion_pique', texto: 'Pique al espacio', correcta: false, resultado: 'pierde', descripcionFallo: 'Fenwick lee la jugada y corta el pase.',
          primerPlanoFallo: { personaje: 'Terry Fenwick', dialogo: 'No te voy a dejar pasar.', spriteCloseUp: '/sprites/maradona_izq.png' }
        },
        { 
          id: 'opcion_potencia', texto: 'Acelerar a fondo', correcta: false, resultado: 'pierde', descripcionFallo: 'La defensa lo encierra entre dos.',
          primerPlanoFallo: { personaje: 'Gary Stevens', dialogo: '¡Lo tenemos!', spriteCloseUp: '/sprites/maradona_izq.png' }
        },
        { 
          id: 'opcion_tiro_angulo', texto: 'Disparar al ángulo', correcta: false, resultado: 'pierde', descripcionFallo: 'El disparo se va desviado.',
          primerPlanoFallo: { personaje: 'Peter Shilton', dialogo: 'Desviado, saque de arco.', spriteCloseUp: '/sprites/maradona_izq.png' }
        }
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
      primerPlano: {
        personaje: 'Diego Maradona',
        dialogo: '¡Gol del siglo!',
        spriteCloseUp: '/sprites/maradona_izq.png'
      },
      opciones: [
        { id: 'opcion_driblar', texto: 'Driblar al arquero', correcta: true, resultado: 'gol', descripcionExito: '¡GOOOOL! Diego lo deja en el suelo y empuja la pelota.' },
        { 
          id: 'opcion_vaselina', texto: 'Vaselina', correcta: false, resultado: 'pierde', descripcionFallo: 'La vaselina se va alta.',
          primerPlanoFallo: { personaje: 'Peter Shilton', dialogo: 'Te pasó la pelota.', spriteCloseUp: '/sprites/maradona_izq.png' }
        },
        { 
          id: 'opcion_potencia', texto: 'Disparo fuerte', correcta: false, resultado: 'pierde', descripcionFallo: 'Shilton ataja con el pecho.',
          primerPlanoFallo: { personaje: 'Peter Shilton', dialogo: '¡Atajé!', spriteCloseUp: '/sprites/maradona_izq.png' }
        },
        { 
          id: 'opcion_pase_gol', texto: 'Pase', correcta: false, resultado: 'pierde', descripcionFallo: 'El pase es interceptado.',
          primerPlanoFallo: { personaje: 'Terry Butcher', dialogo: 'Lo vi venir.', spriteCloseUp: '/sprites/maradona_izq.png' }
        }
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
