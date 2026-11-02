
document.addEventListener('DOMContentLoaded', () => {

  const container = document.querySelector('.carousel-container');

  if (!container) return;

  const track = container.querySelector('.carousel-track');
  const dotsNav = container.querySelector('.carousel-dots');
  const nextBtn = container.querySelector('.carousel-btn--next');
  const prevBtn = container.querySelector('.carousel-btn--prev');

  const images = window.GALLERY_IMAGES;

  if (!Array.isArray(images) || images.length === 0) {
    console.error('Manifesto da galeria não encontrado.');
    container.hidden = true;
    return;
  }

  let currentIndex = 0;
  let startX = 0;

  // Constrói os slides dinamicamente.
  images.forEach((filename, index) => {

    const slide = document.createElement('div');
    slide.className = 'carousel-slide';

    const img = document.createElement('img');

    img.src = `img/galeria/${encodeURIComponent(filename)}`;
    img.alt = `Vila Dourada Hostel - Fotografia ${index + 1}`;
    img.loading = index === 0 ? 'eager' : 'lazy';
    img.decoding = 'async';

    slide.appendChild(img);
    track.appendChild(slide);

    // Indicadores.
    const dot = document.createElement('button');

    dot.type = 'button';
    dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Ir para a foto ${index + 1}`);

    if (index === 0) {
      dot.classList.add('active');
      dot.setAttribute('aria-current', 'true');
    }

    dotsNav.appendChild(dot);

  });

  const slides = Array.from(track.children);
  const dots = Array.from(dotsNav.children);

  function updateCarousel(index) {

    currentIndex = (index + slides.length) % slides.length;

    track.style.transform =
      `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, i) => {

      dot.classList.toggle('active', i === currentIndex);

      if (i === currentIndex) {
        dot.setAttribute('aria-current', 'true');
      } else {
        dot.removeAttribute('aria-current');
      }

    });

  }

  // Navegação.
  nextBtn.addEventListener('click', () => {
    updateCarousel(currentIndex + 1);
  });

  prevBtn.addEventListener('click', () => {
    updateCarousel(currentIndex - 1);
  });

  // Indicadores.
  dotsNav.addEventListener('click', event => {

    const dot = event.target.closest('.carousel-dot');

    if (!dot) return;

    updateCarousel(dots.indexOf(dot));

  });

  // Teclado.
  container.addEventListener('keydown', event => {

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      updateCarousel(currentIndex + 1);
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      updateCarousel(currentIndex - 1);
    }

  });

  // Touch.
  container.addEventListener('touchstart', event => {

    startX = event.changedTouches[0].clientX;

  }, { passive: true });

  container.addEventListener('touchend', event => {

    const endX = event.changedTouches[0].clientX;
    const difference = endX - startX;

    if (Math.abs(difference) < 50) return;

    updateCarousel(
      currentIndex + (difference < 0 ? 1 : -1)
    );

  }, { passive: true });

  // Controles desnecessários quando existe apenas uma imagem.
  if (slides.length <= 1) {
    nextBtn.hidden = true;
    prevBtn.hidden = true;
    dotsNav.hidden = true;
  }

});
