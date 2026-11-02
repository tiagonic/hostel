
document.addEventListener('DOMContentLoaded', () => {

  const lightbox = document.getElementById('lightbox');

  if (!lightbox) return;

  const lightboxImg = lightbox.querySelector('.lightbox__img');
  const closeBtn = lightbox.querySelector('.lightbox__close');

  // Abre imagens dos dormitórios e da galeria.
  // Delegação de eventos permite imagens dinâmicas.
  document.addEventListener('click', event => {

    const img = event.target.closest(
      '#camas .card__img img, #galeria .carousel-slide img'
    );

    if (!img) return;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  // Fecha ao clicar no botão ×
  closeBtn.addEventListener('click', closeLightbox);

  // Fecha ao clicar na imagem ampliada (lupa −)
  lightboxImg.addEventListener('click', closeLightbox);

  // Fecha ao clicar fora da imagem
  lightbox.addEventListener('click', event => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  // Fecha com ESC
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeLightbox();
    }
  });

});
