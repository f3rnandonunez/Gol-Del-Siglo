// Dentro de fases: reemplazar la fase_1_pase por esta versión
{
  id: 'fase_1_pase',
  tipo: 'decision',
  titulo: 'EL PASE',
  descripcion: 'Enrique pasa a Maradona',
  narrativa: 'Enrique da un pase sencillo, casi horizontal, hacia la derecha, donde está Diego Maradona...',
  tiempoLimite: 4000,          // ya no se usa, pero se deja por compatibilidad
  timingWindow: { inicio: 25, fin: 75 },
  // NUEVO: primer plano
  primerPlano: {
    personaje: 'Héctor Enrique',
    dialogo: 'Le daré un pase de gol al Diego',
    spriteCloseUp: '/sprites/enrique_closeup.png'   // ruta del sprite de primer plano (puede ser el mismo que el de campo)
  },
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
}
