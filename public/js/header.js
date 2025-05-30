// Script para la funcionalidad de scroll en el header

// Cambio de estilo del header al hacer scroll
let lastScrollY = 0;

function updateHeaderOnScroll() {
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
        if (href === `#${sectionId}`) {
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

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  // Inicializar la funcionalidad del menú móvil
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      console.log('Mobile menu button clicked'); // Para depuración
      
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
  
  // Observar el scroll
  window.addEventListener('scroll', updateHeaderOnScroll);
  window.addEventListener('scroll', highlightNavLink);
  
  // Inicializar estado del header
  updateHeaderOnScroll();
  highlightNavLink();
});
