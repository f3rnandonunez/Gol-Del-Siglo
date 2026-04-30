// Dentro de fase_1_pase, las opciones incorrectas tienen primerPlanoFallo:
{
  id: 'fase_1_pase',
  tipo: 'decision',
  // ... otros campos
  opciones: [
    { 
      id: 'opcion_recibir', texto: 'Pasar a Maradona', correcta: true, 
      resultado: 'sigue', descripcionExito: 'Maradona controla.' 
    },
    { 
      id: 'opcion_retrasar', texto: 'Retener y esperar', correcta: false, 
      resultado: 'pierde', descripcionFallo: 'Pierde el balón.',
      primerPlanoFallo: {   // ← nuevo
        personaje: 'Defensa inglesa',
        dialogo: '¡Interceptado! No puedes perder tiempo.',
        spriteCloseUp: '/sprites/maradona_izq.png'   // placeholder
      }
    },
    { 
      id: 'opcion_lateral', texto: 'Abrir a la banda derecha', correcta: false, 
      resultado: 'pierde', descripcionFallo: 'Pase interceptado.',
      primerPlanoFallo: {
        personaje: 'Terry Butcher',
        dialogo: 'El pase es fácil de leer.',
        spriteCloseUp: '/sprites/maradona_izq.png'
      }
    },
    { 
      id: 'opcion_devolver', texto: 'Devolver a Cuciuffo', correcta: false, 
      resultado: 'pierde', descripcionFallo: 'La jugada se enfría.',
      primerPlanoFallo: {
        personaje: 'Cuciuffo',
        dialogo: 'No debiste devolver, ahora nos presionan.',
        spriteCloseUp: '/sprites/maradona_izq.png'
      }
    }
  ]
}
