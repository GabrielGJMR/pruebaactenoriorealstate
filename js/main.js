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
  },

  "finca-rural": {
    id: "finca-rural",
    titulo: "Finca rural",
    resumen: "Ideal para descanso o proyecto agrícola.",
    descripcion:
      "Finca rural perfecta para descanso, producción agrícola o proyecto turístico en la zona del Tenorio.",
    imagenes: ["img/prueba 2.jpg", "img/prueba 2.jpg"],
    video: "",
  },

  "terreno-plano": {
    id: "terreno-plano",
    titulo: "Terreno plano",
    resumen: "Perfecto para construir o invertir.",
    descripcion:
      "Terreno plano con excelente ubicación para desarrollar tu proyecto de vivienda o inversión.",
    imagenes: ["img/prueba 3.jpg", "img/prueba 3.jpg"],
    video: "",
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
  const galeriaEl = document.getElementById("galeria-imagenes");
  const videoEl = document.getElementById("video-contenedor");
  const btnWhatsApp = document.getElementById("btn-whatsapp-prop");
  const btnEmail = document.getElementById("btn-email-prop");

  // Si no existe la propiedad
  if (!prop) {
    if (tituloEl) tituloEl.textContent = "Propiedad no encontrada";
    if (resumenEl)
      resumenEl.textContent =
        "La propiedad que buscas no existe o fue removida.";
    if (galeriaEl) galeriaEl.innerHTML = "";
    if (descEl) descEl.textContent = "";
    return;
  }

  // Colocar textos
  if (tituloEl) tituloEl.textContent = prop.titulo;
  if (resumenEl) resumenEl.textContent = prop.resumen;
  if (descEl) descEl.textContent = prop.descripcion;

  // ---- Galería de imágenes (para lightbox) ----
  if (galeriaEl) {
    galeriaEl.innerHTML = "";
    prop.imagenes.forEach((src) => {
      const card = document.createElement("article");
      card.className = "card-propiedad";

      const imgWrap = document.createElement("div");
      imgWrap.className = "prop-img";

      const img = document.createElement("img");
      img.src = src;
      img.alt = prop.titulo;

      imgWrap.appendChild(img);
      card.appendChild(imgWrap);
      galeriaEl.appendChild(card);
    });
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

  // ---- Botones de contacto personalizados ----
  const telefono = "50687331224";
  const email = "g.murillo200906@gmail.com";

  const mensajeWhatsApp = `Hola, me gustaría obtener información sobre la propiedad "${prop.titulo}" que vi en la página AC Tenorio Real State.`;
  const urlWhatsApp =
    "https://wa.me/" +
    telefono +
    "?text=" +
    encodeURIComponent(mensajeWhatsApp);

  const asuntoEmail = "Consulta sobre propiedad: " + prop.titulo;
  const cuerpoEmail = `Hola,\n\nMe gustaría obtener más información sobre la propiedad "${prop.titulo}" que vi en la página AC Tenorio Real State.\n\nGracias.`;

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

  // ---- Botón "Volver" según origen ----
  const btnVolver = document.querySelector(".btn-link-volver");
  const origen = sessionStorage.getItem("origen-propiedad");

  if (btnVolver && origen) {
    if (origen.includes("index.html")) {
      btnVolver.href = "index.html";
      btnVolver.textContent = "← Volver al inicio";
    } else if (origen.includes("propiedades.html")) {
      btnVolver.href = "propiedades.html";
      btnVolver.textContent = "← Volver al listado de propiedades";
    }
  }

  // Activar lightbox para esta propiedad
  activarGaleria(prop);
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

// Eventos del lightbox (solo si existen en esta página)
if (btnClose) btnClose.addEventListener("click", cerrarLightbox);
if (btnNext) btnNext.addEventListener("click", siguienteImagen);
if (btnPrev) btnPrev.addEventListener("click", anteriorImagen);

// Cuando se genera la galería en cargarPropiedadDesdeURL(), agregamos eventos
function activarGaleria(prop) {
  const galeriaEl = document.getElementById("galeria-imagenes");
  if (!galeriaEl || !prop || !prop.imagenes) return;

  const imgs = galeriaEl.querySelectorAll("img");

  imgs.forEach((img, index) => {
    img.addEventListener("click", () => {
      abrirLightbox(index, prop.imagenes);
    });
  });
}

/* =====================================================
   BOTÓN "VOLVER" EN DETALLE DE PROPIEDAD
   ===================================================== */
const btnVolver = document.getElementById("btn-volver");

if (btnVolver) {
  btnVolver.addEventListener("click", (e) => {
    e.preventDefault();

    // Si hay historial, volvemos atrás (con scroll incluido)
    if (window.history.length > 1) {
      window.history.back();
    } else {
      // Si por alguna razón no hay historial, como respaldo:
      window.location.href = "propiedades.html";
    }
  });
}
