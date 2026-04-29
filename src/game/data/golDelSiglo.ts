import type { Gol, Seleccion, Partido } from '../types';

// SELECCIONES
export const seleccionArgentina: Seleccion = {
  id: 'argentina',
  nombre: 'Argentina',
  nombreCompleto: 'Selección Argentina de Fútbol',
  colores: {
    camiseta: '#6CACE4',
    pantalon: '#000000',
    medias: '#6CACE4'
  },
  sprites: {
    jugador: 'argentina_jugador',
    arquero: 'argentina_arquero'
  }
};

export const seleccionInglaterra: Seleccion = {
  id: 'inglaterra',
  nombre: 'Inglaterra',
  nombreCompleto: 'Selección de Inglaterra',
  colores: {
    camiseta: '#FFFFFF',
    pantalon: '#000000',
    medias: '#FFFFFF'
  },
  sprites: {
    jugador: 'inglaterra_jugador',
    arquero: 'inglaterra_arquero'
  }
};

// EL GOL DEL SIGLO - ARGENTINA VS INGLATERRA 1986
// Estructura basada en diagrama de flujo
export const golDelSiglo: Gol = {
  id: 'gol_del_siglo_1986',
  tiempoGlobalMaximo: 12000,
  titulo: 'EL GOL DEL SIGLO',
  subtitulo: 'La jugada perfecta',
  partido: 'Argentina vs Inglaterra',
  torneo: 'Mundial México 86',
  fecha: '22 de Junio, 1986',
  autor: {
    nombre: 'Diego Maradona',
    apodo: 'El Diego',
    sprite: 'maradona'
  },
  asistente: {
    nombre: 'Héctor Enrique',
    apodo: 'El Negro'
  },
  duracion: 11,
  distancia: '60 metros',
  escenario: {
    estadio: 'Estadio Azteca',
    ciudad: 'Ciudad de México',
    spriteFondo: 'azteca_estadio'
  },
  fases: [
    {
      id: 'fase_0_start',
      tipo: 'intro',
      titulo: 'LA RECUPERACIÓN',
      descripcion: 'Cuciuffo recupera y pasa a Enrique',
      narrativa: 'José Luis Cuciuffo recupera la pelota tras un error inglés y se la entrega al Negro Enrique, que levanta la cabeza para decidir.',
      tiempoLimite: 3000,
      timingWindow: { inicio: 0, fin: 100 },
      opciones: [
        {
          id: 'opcion_pasar_maradona',
          texto: 'Pasar a Maradona',
          correcta: true,
          resultado: 'sigue',
          dialogo: 'Se la doy al Diego',
          descripcionExito: 'Enrique da un pase sencillo, casi horizontal, hacia la derecha...'
        },
        {
          id: 'opcion_devolver_cuciuffo',
          texto: 'Devolver a Cuciuffo',
          correcta: false,
          resultado: 'pierde',
          descripcionFallo: 'La jugada se enfría.'
        },
        {
          id: 'opcion_despejar',
          texto: 'Despejar',
          correcta: false,
          resultado: 'pierde',
          descripcionFallo: 'Argentina pierde la posesión.'
        }
      ]
    },
    {
      id: 'fase_1_pase',
      tipo: 'decision',
      titulo: 'EL PASE',
      descripcion: 'Enrique pasa a Maradona',
      narrativa: 'Enrique da un pase sencillo, casi horizontal, hacia la derecha, donde está Diego Maradona, unos 8-10 metros dentro del propio campo argentino (aproximadamente a 60 metros del arco inglés).',
      tiempoLimite: 4000,
      timingWindow: { inicio: 25, fin: 75 },
      opciones: [
        {
          id: 'opcion_recibir',
          texto: 'Recibir el pase',
          correcta: true,
          resultado: 'sigue',
          descripcionExito: 'Maradona controla la pelota con la derecha.'
        },
        {
          id: 'opcion_perder',
          texto: 'Dejar pasar',
          correcta: false,
          resultado: 'pierde',
          descripcionFallo: 'La pelota se va de largo. La defensa inglesa recupera.'
        }
      ]
    },
    {
      id: 'fase_2_stevens',
      tipo: 'decision',
      titulo: 'EL PRIMER ESCOLLO',
      descripcion: 'Gary Stevens presiona',
      narrativa: 'Maradona controla la pelota con la derecha. Inmediatamente, Gary Stevens se le viene encima para presionarlo.',
      tiempoLimite: 3500,
      timingWindow: { inicio: 30, fin: 70 },
      rival: {
        nombre: 'Gary Stevens',
        sprite: 'stevens'
      },
      opciones: [
        {
          id: 'opcion_giro',
          texto: 'Giro rápido (ruleta)',
          correcta: true,
          resultado: 'sigue',
          descripcionExito: 'Diego hace un giro rápido (una especie de ruleta o pirueta con el pie) y se escapa del primer marcador, dejando a Stevens atrás.'
        },
        {
          id: 'opcion_fallo',
          texto: 'Intentar correr',
          correcta: false,
          resultado: 'pierde',
          descripcionFallo: 'Stevens le roba la pelota. La jugada termina aquí.'
        }
      ]
    },
    {
      id: 'fase_3_reid',
      tipo: 'decision',
      titulo: 'EL SEGUNDO RIVAL',
      descripcion: 'Peter Reid cierra el paso',
      narrativa: 'Sin perder velocidad, Maradona avanza unos metros y Peter Reid sale a cerrarle el paso.',
      tiempoLimite: 3000,
      timingWindow: { inicio: 35, fin: 65 },
      rival: {
        nombre: 'Peter Reid',
        sprite: 'reid'
      },
      opciones: [
        {
          id: 'opcion_quiebre',
          texto: 'Quiebre sutil',
          correcta: true,
          resultado: 'sigue',
          descripcionExito: 'Maradona hace un quiebre sutil, pasa la pelota de la derecha a la zurda y deja clavado a Reid, que corre unos pasos al lado pero no puede seguirle el ritmo.'
        },
        {
          id: 'opcion_fallo',
          texto: 'Regate largo',
          correcta: false,
          resultado: 'pierde',
          descripcionFallo: 'Reid intercepta el regate. La defensa recupera.'
        }
      ]
    },
    {
      id: 'fase_4_butcher',
      tipo: 'decision',
      titulo: 'LA ENTRADA BRUTAL',
      descripcion: 'Terry Butcher intenta frenarlo',
      narrativa: 'Ahora Diego ya está lanzado hacia adelante por el sector derecho. Terry Butcher (un defensor fuerte) intenta frenarlo con una entrada.',
      tiempoLimite: 2800,
      timingWindow: { inicio: 30, fin: 60 },
      rival: {
        nombre: 'Terry Butcher',
        sprite: 'butcher'
      },
      opciones: [
        {
          id: 'opcion_cambio',
          texto: 'Cambio de dirección y velocidad',
          correcta: true,
          resultado: 'sigue',
          descripcionExito: 'Maradona lo elude con un cambio de dirección y velocidad; Butcher queda atrás y hasta le roza la pierna sin poder derribarlo.'
        },
        {
          id: 'opcion_fallo',
          texto: 'Frenar',
          correcta: false,
          resultado: 'pierde',
          descripcionFallo: 'Butcher lo derriba. Tiro libre para Argentina pero la jugada se pierde.'
        }
      ]
    },
    {
      id: 'fase_5_fenwick',
      tipo: 'decision',
      titulo: 'EL ÚLTIMO DEFENSOR',
      descripcion: 'Terry Fenwick intercepta',
      narrativa: 'Sigue corriendo. Terry Fenwick (otro central) intenta interceptarlo, pero Diego lo supera con un amague y sigue imparable.',
      tiempoLimite: 2500,
      timingWindow: { inicio: 35, fin: 65 },
      rival: {
        nombre: 'Terry Fenwick',
        sprite: 'fenwick'
      },
      opciones: [
        {
          id: 'opcion_amague',
          texto: 'Amague',
          correcta: true,
          resultado: 'sigue',
          descripcionExito: 'Diego lo supera con un amague y sigue imparable. (Algunos relatos mencionan que Butcher vuelve a intentarlo en la misma jugada, pero Diego ya lo había dejado).'
        },
        {
          id: 'opcion_fallo',
          texto: 'Disparar desde afuera',
          correcta: false,
          resultado: 'pierde',
          descripcionFallo: 'El disparo se va desviado. Saque de arco.'
        }
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
      rival: {
        nombre: 'Peter Shilton',
        sprite: 'shilton'
      },
      opciones: [
        {
          id: 'opcion_driblar',
          texto: 'Driblar con toque sutil',
          correcta: true,
          resultado: 'sigue',
          descripcionExito: 'Diego lo dribla con un toque sutil de zurda, dejándolo desparramado en el suelo.'
        },
        {
          id: 'opcion_fallo',
          texto: 'Definir fuerte',
          correcta: false,
          resultado: 'pierde',
          descripcionFallo: 'Shilton ataja el disparo. Gran atajada.'
        }
      ]
    },
    {
      id: 'fase_7_gol',
      tipo: 'gol',
      titulo: '¡GOOOOL DEL SIGLO!',
      descripcion: 'El gol más famoso de la historia',
      narrativa: 'Con el arco vacío y sin más rivales, Maradona empuja la pelota suavemente con la zurda al fondo de la red. La jugada completa duró unos 10-11 segundos, Diego tocó la pelota 11-12 veces, recorrió unos 50-60 metros y gambeteó a 5 jugadores ingleses.',
      tiempoLimite: 5000,
      timingWindow: { inicio: 0, fin: 100 },
      opciones: [
        {
          id: 'opcion_celebrar',
          texto: '¡CELEBRAR!',
          correcta: true,
          resultado: 'gol',
          descripcionExito: '¡ARGENTINA 2 - INGLATERRA 0! ¡EL GOL DEL SIGLO!'
        }
      ]
    }
  ]
};

// Partido completo
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
