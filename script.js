/*
  Coloca tus fotos en la misma carpeta que index.html,
  nombradas como i1.jpg, i2.jpg, i3.jpg, ... (o cambia la extensión
  aquí abajo si usas .png).

  También coloca tu imagen de fondo con el nombre: fondoaron.jpg
*/

function buildOrbit(orbitEl, count, startIndex, photoSizePercent, counterAnim, duration) {
  const radius = 50; // radio en % respecto al centro del círculo
  for (let i = 0; i < count; i++) {
    const angleDeg = i * (360 / count);
    const angleRad = angleDeg * Math.PI / 180;

    const x = 50 + radius * Math.sin(angleRad) - photoSizePercent / 2;
    const y = 50 - radius * Math.cos(angleRad) - photoSizePercent / 2;

    const wrapper = document.createElement('div');
    wrapper.className = 'photo';
    wrapper.style.width = photoSizePercent + '%';
    wrapper.style.height = photoSizePercent + '%';
    wrapper.style.left = x + '%';
    wrapper.style.top = y + '%';
    // Contra-rotación para que la foto siempre se vea "de pie"
    wrapper.style.animation = `${counterAnim} ${duration}s linear infinite`;

    const img = document.createElement('img');
    const src = `i${startIndex + i}.jpg`;
    img.src = src;
    img.alt = `Foto ${startIndex + i}`;
    img.onerror = function () {
      this.remove(); // si no existe la foto, deja el fondo degradado
    };

    wrapper.appendChild(img);
    orbitEl.appendChild(wrapper);

    // Al hacer click, se abre el modal con esta foto (los anillos siguen girando)
    wrapper.addEventListener('click', () => openModal(src));
  }
}

// Círculo grande: 8 fotos, usa i1 a i8
buildOrbit(document.getElementById('orbit-large'), 8, 1, 20, 'spin-reverse', 45);

// Círculo mediano: 6 fotos, usa i9 a i14
buildOrbit(document.getElementById('orbit-medium'), 6, 9, 24, 'spin', 30);

// Círculo chico: 4 fotos, usa i15 a i18
buildOrbit(document.getElementById('orbit-small'), 4, 15, 30, 'spin-reverse', 18);

// --- Lógica del modal ---
const modalOverlay = document.getElementById('modal-overlay');
const modalImg = document.getElementById('modal-img');
const modalClose = document.getElementById('modal-close');

function openModal(src) {
  modalImg.src = src;
  modalOverlay.classList.add('active');
}

function closeModal() {
  modalOverlay.classList.remove('active');
}

modalClose.addEventListener('click', closeModal);

// Cerrar si se hace click fuera de la foto (en el fondo oscuro)
modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// Cerrar con la tecla Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});