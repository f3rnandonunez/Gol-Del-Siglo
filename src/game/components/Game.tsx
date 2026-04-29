// ... imports iguales

export function Game({ onBackToMenu }: GameProps) {
  // ... todos los useState iguales (incluyendo mostrarPrimerPlano, infoPrimerPlano)

  const handleOptionSelect = useCallback((opcion: Opcion) => {
    if (!timingActivo) return;

    setOpcionSeleccionada(opcion);
    setEstado('resultado');
    setMensajeDialogo(opcion.dialogo || '');

    if (opcion.correcta) {
      setAnimacionExito(true);
      setMensajeResultado(opcion.descripcionExito || '¡Excelente decisión!');

      // Verificar si la fase actual tiene primerPlano
      if (fase.primerPlano) {
        // Pausar el timer (deteniendo el intervalo, pero ya timingActivo se vuelve false)
        setMostrarPrimerPlano(true);
        setInfoPrimerPlano({
          personaje: fase.primerPlano.personaje,
          dialogo: fase.primerPlano.dialogo,
          spriteCloseUp: fase.primerPlano.spriteCloseUp
        });
        // ⚠️ No programar ningún setTimeout para avanzar automáticamente.
        // El jugador debe hacer click en el botón "CONTINUAR".
      } else {
        // Sin primer plano: avanzar después del tiempo estándar
        setTimeout(() => {
          setAnimacionExito(false);
          if (opcion.resultado === 'gol') {
            setEstado('victoria');
          } else {
            setFaseActual((prev) => prev + 1);
            setOpcionSeleccionada(null);
          }
        }, RESULT_DISPLAY_DURATION);
      }
    } else {
      // ... igual que antes (fallo)
    }
  }, [timingActivo, fase.primerPlano]);

  // Función para cerrar el primer plano y luego avanzar
  const cerrarPrimerPlanoYAvanzar = useCallback(() => {
    if (!opcionSeleccionada) return;
    setMostrarPrimerPlano(false);
    setInfoPrimerPlano(null);
    setAnimacionExito(false);
    if (opcionSeleccionada.resultado === 'gol') {
      setEstado('victoria');
    } else {
      setFaseActual((prev) => prev + 1);
      setOpcionSeleccionada(null);
    }
  }, [opcionSeleccionada]);

  // El resto del return, donde el botón CONTINUAR debe llamar a cerrarPrimerPlanoYAvanzar
  // Adentro del modal:

  {mostrarPrimerPlano && infoPrimerPlano && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
      <div className="bg-black border-4 border-yellow-500 rounded-lg p-6 text-center max-w-md w-full">
        {infoPrimerPlano.spriteCloseUp && (
          <img
            src={infoPrimerPlano.spriteCloseUp}
            alt={infoPrimerPlano.personaje}
            className="w-48 h-48 mx-auto object-contain mb-4"
            onError={(e) => {
              // Si no existe el close-up, usar un placeholder
              e.currentTarget.src = "/sprites/maradona_izq.png";
            }}
          />
        )}
        <p className="text-yellow-300 text-lg mb-2" style={{ fontFamily: '"Press Start 2P", monospace' }}>
          {infoPrimerPlano.personaje}
        </p>
        <p className="text-white text-sm italic" style={{ fontFamily: '"Press Start 2P", monospace', lineHeight: '1.5' }}>
          “{infoPrimerPlano.dialogo}”
        </p>
        <button
          onClick={cerrarPrimerPlanoYAvanzar}
          className="mt-4 px-4 py-2 bg-yellow-600 text-black rounded text-xs hover:bg-yellow-500 transition-colors"
          style={{ fontFamily: '"Press Start 2P", monospace' }}
        >
          CONTINUAR
        </button>
      </div>
    </div>
  )}
