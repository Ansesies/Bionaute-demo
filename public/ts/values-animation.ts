

// Variables globales para controlar la animación
let valuesObserver = null;

// Función para detener observaciones previas si existen
function stopPreviousObservations() {
  if (valuesObserver) {
    valuesObserver.disconnect();
    valuesObserver = null;
  }
}

// Función para inicializar la animación de las tarjetas de valores
function initValuesAnimation() {
  console.log('Values animation initialized');
  
  // Detener observaciones previas
  stopPreviousObservations();
  
  // Seleccionar todas las tarjetas de valores
  const valueCards = document.querySelectorAll('.value-card');
  
  // Si no hay tarjetas de valores en esta página, no hacemos nada
  if (valueCards.length === 0) {
    console.log('No se encontraron tarjetas de valores');
    return;
  }
  
  console.log(`Encontradas ${valueCards.length} tarjetas de valores`);
  
  // Preparar las tarjetas para su animación - no manipulamos la opacidad aquí
  // para permitir que las transiciones CSS se encarguen
  valueCards.forEach((card) => {
    card.classList.remove('animate-card');
  });
  
  // Configurar el nuevo IntersectionObserver
  valuesObserver = new IntersectionObserver((entries) => {
    if (entries.some(entry => entry.isIntersecting)) {
      console.log('Sección de valores visible, iniciando animación secuencial');
      
      // Si la sección es visible, animar todas las tarjetas
      // La secuencia está controlada por los delays en CSS
      valueCards.forEach(card => {
        requestAnimationFrame(() => {
          card.classList.add('animate-card');
        });
      });
      
      // Una vez iniciada la animación, dejamos de observar
      stopPreviousObservations();
    }
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
  });
  
  // Observar la sección de valores completa para activar todas las animaciones en secuencia
  const valuesSection = document.getElementById('values');
  if (valuesSection) {
    valuesObserver.observe(valuesSection);
  } else {
    // Si no podemos encontrar la sección, observamos la primera tarjeta
    if (valueCards.length > 0) {
      valuesObserver.observe(valueCards[0]);
    }
  }
}

// Función para manejar la recarga de animaciones después de navegación
function handlePageTransition() {
  console.log('Transición de página detectada');
  
  // Eliminar observaciones previas
  stopPreviousObservations();
  
  // Pequeño retraso para asegurar que el DOM está completamente cargado
  setTimeout(() => {
    initValuesAnimation();
  }, 100);
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initValuesAnimation);

// Manejar transiciones de página con Astro View Transitions
document.addEventListener('astro:page-load', handlePageTransition);
document.addEventListener('astro:after-swap', handlePageTransition);
