// ================== AÑO DEL FOOTER ==================
const yearSpan = document.getElementById("year");
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

// ================== MENÚ MÓVIL ==================
const navToggle = document.getElementById("navToggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("show");
  });
}

// =====================================================
// ===========   ORIGEN AL IR A UNA PROPIEDAD   =========
// =====================================================
document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;

  // Si el enlace va a propiedad.html?id=...
  if (link.href.includes("propiedad.html?id=")) {
    sessionStorage.setItem("origen-propiedad", window.location.pathname);
  }
});

// =====================================================
// ===============   DATOS DE PROPIEDADES   ============
// =====================================================
const PROPIEDADES = {
  "casa-bijagua": {
    id: "casa-bijagua",
    titulo: "Casa en Bijagua",
    resumen: "Lote amplio con vista al Volcán Tenorio.",
    descripcion:
      "Esta casa en Bijagua cuenta con un lote amplio, vistas al Volcán Tenorio y un entorno ideal para vivir o invertir.",
    imagenes: ["img/prueba 1.jpg", "img/prueba 1.jpg"],
    video: "",

    // 🔹 Datos de ubicación
    ubicacionTexto: "Bijagua de Upala, zona del Volcán Tenorio.",
    mapsEmbed:
      "https://www.google.com/maps?q=10.4326687,-85.0948129&hl=es&z=16&output=embed",
    mapsLink: "https://www.google.com/maps?q=10.4326687,-85.0948129",
  },

  "finca-rural": {
    id: "finca-rural",
    titulo: "Finca rural",
    resumen: "Ideal para descanso o proyecto agrícola.",
    descripcion:
      "Finca rural perfecta para descanso, producción agrícola o proyecto turístico en la zona del Tenorio.",
    imagenes: ["img/prueba 2.jpg", "img/prueba 2.jpg"],
    video: "",

    // 🔹 Ejemplo (luego cambias coordenadas reales)
    ubicacionTexto: "Zona rural cercana al Volcán Tenorio (ejemplo).",
    mapsEmbed:
      "https://www.google.com/maps?q=10.400000,-85.000000&hl=es&z=16&output=embed",
    mapsLink: "https://www.google.com/maps?q=10.400000,-85.000000",
  },

  "terreno-plano": {
    id: "terreno-plano",
    titulo: "Terreno plano",
    resumen: "Perfecto para construir o invertir.",
    descripcion:
      "Terreno plano con excelente ubicación para desarrollar tu proyecto de vivienda o inversión.",
    imagenes: ["img/prueba 3.jpg", "img/prueba 3.jpg"],
    video: "",

    ubicacionTexto: "Terreno ubicado en zona estratégica cerca del Tenorio.",
    mapsEmbed:
      "https://www.google.com/maps?q=10.420000,-85.050000&hl=es&z=16&output=embed",
    mapsLink: "https://www.google.com/maps?q=10.420000,-85.050000",
  },
};

// =====================================================
// ===========   FUNCIÓN PARA CARGAR DETALLE   =========
// =====================================================
function cargarPropiedadDesdeURL() {
  // Solo ejecutar si estamos en propiedad.html
  if (!window.location.pathname.endsWith("propiedad.html")) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const prop = PROPIEDADES[id];

  // Elementos del DOM que vamos a modificar
  const tituloEl = document.getElementById("prop-titulo");
  const resumenEl = document.getElementById("prop-resumen");
  const descEl = document.getElementById("prop-descripcion");
  const galeriaViewport = document.getElementById("galeria-imagen");
  const thumbsEl = document.getElementById("galeria-thumbs");
  const videoEl = document.getElementById("video-contenedor");
  const btnWhatsApp = document.getElementById("btn-whatsapp-prop");
  const btnEmail = document.getElementById("btn-email-prop");

  // 🔹 Elementos del bloque de ubicación
  const mapaIframe = document.getElementById("mapa-propiedad");
  const ubicacionTextoEl = document.getElementById("prop-ubicacion-text");
  const btnMaps = document.getElementById("btn-maps");

  // Si no existe la propiedad
  if (!prop) {
    if (tituloEl) tituloEl.textContent = "Propiedad no encontrada";
    if (resumenEl)
      resumenEl.textContent =
        "La propiedad que buscas no existe o fue removida.";
    if (descEl) descEl.textContent = "";
    if (galeriaViewport) galeriaViewport.src = "";
    if (thumbsEl) thumbsEl.innerHTML = "";
    if (videoEl) videoEl.innerHTML = "";
    if (ubicacionTextoEl) ubicacionTextoEl.textContent = "";
    if (mapaIframe) mapaIframe.src = "";
    if (btnMaps) btnMaps.removeAttribute("href");
    return;
  }

  // Colocar textos principales
  if (tituloEl) tituloEl.textContent = prop.titulo;
  if (resumenEl) resumenEl.textContent = prop.resumen;
  if (descEl) descEl.textContent = prop.descripcion;

  // ---- Carrusel simple (imagen principal + thumbnails) ----
  let indiceActual = 0;

  function mostrarImagen(index) {
    if (!galeriaViewport || !prop.imagenes.length) return;
    indiceActual = index;
    galeriaViewport.src = prop.imagenes[indiceActual];

    // marcar thumbnail activa
    const thumbs = thumbsEl ? thumbsEl.querySelectorAll(".galeria-thumb") : [];
    thumbs.forEach((th, i) => {
      th.classList.toggle("thumb-activa", i === indiceActual);
    });
  }

  if (thumbsEl) {
    thumbsEl.innerHTML = "";
    prop.imagenes.forEach((src, i) => {
      const btn = document.createElement("button");
      btn.className = "galeria-thumb";
      const img = document.createElement("img");
      img.src = src;
      img.alt = prop.titulo + " miniatura " + (i + 1);
      btn.appendChild(img);
      btn.addEventListener("click", () => mostrarImagen(i));
      thumbsEl.appendChild(btn);
    });
  }

  if (galeriaViewport && prop.imagenes.length) {
    mostrarImagen(0);
  }

  // Botones siguiente / anterior del carrusel
  const btnPrevCarrusel = document.getElementById("galeria-prev");
  const btnNextCarrusel = document.getElementById("galeria-next");

  if (btnPrevCarrusel && btnNextCarrusel && prop.imagenes.length > 1) {
    btnPrevCarrusel.onclick = () => {
      const nuevo =
        (indiceActual - 1 + prop.imagenes.length) % prop.imagenes.length;
      mostrarImagen(nuevo);
    };
    btnNextCarrusel.onclick = () => {
      const nuevo = (indiceActual + 1) % prop.imagenes.length;
      mostrarImagen(nuevo);
    };
  }

  // ---- Video (opcional) ----
  if (videoEl) {
    videoEl.innerHTML = "";
    if (prop.video) {
      const iframe = document.createElement("iframe");
      iframe.width = "100%";
      iframe.height = "400";
      iframe.src = prop.video;
      iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      iframe.allowFullscreen = true;
      videoEl.appendChild(iframe);
    }
  }

  // 🔹 Ubicación: texto + mapa + botón
  if (ubicacionTextoEl && prop.ubicacionTexto) {
    ubicacionTextoEl.textContent = prop.ubicacionTexto;
  }

  if (mapaIframe && prop.mapsEmbed) {
    mapaIframe.src = prop.mapsEmbed;
  }

  if (btnMaps && prop.mapsLink) {
    btnMaps.href = prop.mapsLink;
    btnMaps.target = "_blank";
    btnMaps.rel = "noopener noreferrer";
  }

  // ---- Botones de contacto personalizados ----
  const telefono = "50687331224";
  const email = "g.murillo200906@gmail.com";

  const mensajeWhatsApp = `Hola, me gustaría obtener información sobre la propiedad "${prop.titulo}" que vi en la página AC Tenorio Real Estate.`;
  const urlWhatsApp =
    "https://wa.me/" +
    telefono +
    "?text=" +
    encodeURIComponent(mensajeWhatsApp);

  const asuntoEmail = "Consulta sobre propiedad: " + prop.titulo;
  const cuerpoEmail = `Hola,\n\nMe gustaría obtener más información sobre la propiedad "${prop.titulo}" que vi en la página AC Tenorio Real Estate.\n\nGracias.`;

  const urlEmail =
    "https://mail.google.com/mail/?view=cm&fs=1" +
    "&to=" +
    encodeURIComponent(email) +
    "&su=" +
    encodeURIComponent(asuntoEmail) +
    "&body=" +
    encodeURIComponent(cuerpoEmail);

  if (btnWhatsApp) {
    btnWhatsApp.href = urlWhatsApp;
    btnWhatsApp.target = "_blank";
    btnWhatsApp.rel = "noopener noreferrer";
  }

  if (btnEmail) {
    btnEmail.href = urlEmail;
    btnEmail.target = "_blank";
    btnEmail.rel = "noopener noreferrer";
  }

  // ---- Botón "Volver" según origen (index / propiedades) ----
  const btnVolverTexto = document.querySelector(".btn-link-volver");
  const origen = sessionStorage.getItem("origen-propiedad");

  if (btnVolverTexto && origen) {
    if (origen.includes("index.html")) {
      btnVolverTexto.textContent = "← Volver al inicio";
    } else if (origen.includes("propiedades.html")) {
      btnVolverTexto.textContent = "← Volver al listado de propiedades";
    }
  }
}

// Ejecutar al cargar la página
cargarPropiedadDesdeURL();

// =====================================================
// ===============   LIGHTBOX DE IMÁGENES   =============
// =====================================================
let lightboxIndex = 0;
let lightboxImagenes = [];

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const btnClose = document.getElementById("lightbox-close");
const btnPrev = document.getElementById("lightbox-prev");
const btnNext = document.getElementById("lightbox-next");

function abrirLightbox(index, imagenes) {
  if (!lightbox || !lightboxImg) return;
  lightboxImagenes = imagenes;
  lightboxIndex = index;
  lightboxImg.src = lightboxImagenes[lightboxIndex];
  lightbox.classList.remove("hidden");
}

function cerrarLightbox() {
  if (!lightbox) return;
  lightbox.classList.add("hidden");
}

function siguienteImagen() {
  if (!lightboxImagenes.length || !lightboxImg) return;
  lightboxIndex = (lightboxIndex + 1) % lightboxImagenes.length;
  lightboxImg.src = lightboxImagenes[lightboxIndex];
}

function anteriorImagen() {
  if (!lightboxImagenes.length || !lightboxImg) return;
  lightboxIndex =
    (lightboxIndex - 1 + lightboxImagenes.length) % lightboxImagenes.length;
  lightboxImg.src = lightboxImagenes[lightboxIndex];
}

if (btnClose) btnClose.addEventListener("click", cerrarLightbox);
if (btnNext) btnNext.addEventListener("click", siguienteImagen);
if (btnPrev) btnPrev.addEventListener("click", anteriorImagen);

// Activar lightbox al hacer clic en la imagen grande del carrusel
const galeriaViewportImg = document.getElementById("galeria-imagen");
if (galeriaViewportImg) {
  galeriaViewportImg.addEventListener("click", () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const prop = PROPIEDADES[id];
    if (!prop || !prop.imagenes) return;
    abrirLightbox(lightboxIndex, prop.imagenes);
  });
}

/* =====================================================
   BOTÓN "VOLVER" QUE USA window.history.back()
   ===================================================== */
const btnVolver = document.getElementById("btn-volver");

if (btnVolver) {
  btnVolver.addEventListener("click", (e) => {
    e.preventDefault();
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "propiedades.html";
    }
  });
}
