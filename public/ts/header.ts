/**
 * Header Animation Script - TypeScript
 * 
 * Script para manejar todas las animaciones y funcionalidades del header,
 * incluyendo efectos de scroll, menú móvil y navegación.
 */

// Variable para seguimiento del scroll
let lastScrollY: number = 0;

/**
 * Actualiza el estilo del header basado en la posición de scroll
 */
function updateHeaderOnScroll(): void {
  const header = document.getElementById('header');
  if (!header) return;
  
  const scrollY = window.scrollY || document.documentElement.scrollTop;
  
  if (scrollY > 50) {
    // Cuando hacemos scroll, agregamos un fondo y reducimos el padding
    header.classList.add('bg-gradient-to-r', 'from-emerald-800/90', 'to-teal-800/90', 'backdrop-blur-lg', 'shadow-lg');
    header.classList.add('py-2');
    header.classList.remove('py-1');
  } else {
    // En la parte superior, volvemos al estado inicial
    header.classList.remove('bg-gradient-to-r', 'from-emerald-800/90', 'to-teal-800/90', 'backdrop-blur-lg', 'shadow-lg');
    header.classList.add('py-1');
    header.classList.remove('py-2');
  }
  
  // Ocultar/mostrar header al hacer scroll hacia abajo/arriba
  if (scrollY > 300 && scrollY > lastScrollY) {
    header.classList.add('-translate-y-full');
  } else {
    header.classList.remove('-translate-y-full');
  }
  
  lastScrollY = scrollY;
}

// Agregar efecto de resaltado en el enlace activo
function highlightNavLink() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  // Solo continuar si hay secciones
  if (sections.length === 0) return;
  
  const scrollPosition = window.scrollY + 100 || document.documentElement.scrollTop + 100;
  
  sections.forEach(section => {
    // Verificar que los métodos existan en la sección
    if (!(section instanceof HTMLElement)) return;
    
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    // Verificar que sectionId no sea null antes de usarlo
    if (!sectionId) return;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        // Solo ejecutar si link es un elemento HTML
        if (!(link instanceof HTMLElement)) return;
        
        const href = link.getAttribute('href');
        // Ahora considera también las rutas completas como /about#section
        if (href === `#${sectionId}` || href?.endsWith(`#${sectionId}`)) {
          link.classList.add('text-green-300');
          link.classList.remove('text-white');
        } else {
          link.classList.remove('text-green-300');
          link.classList.add('text-white');
        }
      });
    }
  });
}

/**
 * Inicializa la funcionalidad del menú móvil
 */
function initMobileMenu(): void {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    // Primero, eliminamos cualquier event listener existente para evitar duplicación
    mobileMenuButton.replaceWith(mobileMenuButton.cloneNode(true));
    
    // Obtenemos la referencia actualizada después de reemplazar
    const newMobileMenuButton = document.getElementById('mobile-menu-button');
    
    if (newMobileMenuButton) {
      newMobileMenuButton.addEventListener('click', () => {
        console.log('Mobile menu button clicked');
        
        mobileMenu.classList.toggle('hidden');
        
        // Agregamos una pequeña animación
        if (!mobileMenu.classList.contains('hidden')) {
          setTimeout(() => {
            mobileMenu.classList.remove('scale-y-0', 'opacity-0');
            mobileMenu.classList.add('scale-y-100', 'opacity-100');
          }, 10);
        } else {
          mobileMenu.classList.remove('scale-y-100', 'opacity-100');
          mobileMenu.classList.add('scale-y-0', 'opacity-0');
        }
      });
    }
  }
}

/**
 * Función principal para inicializar todos los componentes del header
 */
function initHeader(): void {
  console.log('Header initialized or re-initialized');
  
  // Inicializar menú móvil
  initMobileMenu();
  
  // Limpiar y configurar los event listeners para evitar duplicaciones
  window.removeEventListener('scroll', updateHeaderOnScroll);
  window.removeEventListener('scroll', highlightNavLink);
  window.addEventListener('scroll', updateHeaderOnScroll);
  window.addEventListener('scroll', highlightNavLink);
  
  // Aplicar estado inicial basado en la posición actual
  updateHeaderOnScroll();
  highlightNavLink();
  
  // Añadir clase para indicar que el header está inicializado
  const header = document.getElementById('header');
  if (header) header.classList.add('js-initialized');
}

// Hacer disponible la función globalmente para que pueda ser llamada desde HeaderScript.astro
(window as any).initHeader = initHeader;

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded - Inicializando header');
  initHeader();
});

// Reinicializar después de la navegación con Astro View Transitions
document.addEventListener('astro:page-load', () => {
  console.log('astro:page-load - Reinicializando header');
  initHeader();
});
