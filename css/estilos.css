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

  if (link.href.includes("propiedad.html?id=")) {
    sessionStorage.setItem("origen-propiedad", window.location.pathname);
  }
});

// =====================================================
// ===============   DATOS DE PROPIEDADES   ============
// =====================================================
const PROPIEDADES = {
  "los-angeles-nandayure": {
    id: "los-angeles-nandayure",
    titulo: "Los Ángeles de Nandayure",
    resumen: "4 lotes de 1200 m² con árboles frutales y maderables.",
    descripcion:
      "Propiedad compuesta por 4 lotes de 1200 m². Cuenta con palos de naranja, limones y árboles maderables de pochote. Ideal para inversión, desarrollo o proyecto en zona tranquila.",
    media: [
      {
        tipo: "imagen",
        src: "properties/Los Angeles de Nandayure/IMG-20251228-WA0000.jpg",
      },
      {
        tipo: "imagen",
        src: "properties/Los Angeles de Nandayure/IMG-20251228-WA0001.jpg",
      },
      {
        tipo: "imagen",
        src: "properties/Los Angeles de Nandayure/IMG-20251228-WA0002.jpg",
      },
      {
        tipo: "imagen",
        src: "properties/Los Angeles de Nandayure/IMG-20251228-WA0003.jpg",
      },
      {
        tipo: "imagen",
        src: "properties/Los Angeles de Nandayure/IMG-20251228-WA0004.jpg",
      },
      {
        tipo: "imagen",
        src: "properties/Los Angeles de Nandayure/IMG-20251228-WA0006.jpg",
      },
      {
        tipo: "imagen",
        src: "properties/Los Angeles de Nandayure/IMG-20251228-WA0007.jpg",
      },
      {
        tipo: "video",
        src: "properties/Los Angeles de Nandayure/VID-20251228-WA0014.mp4",
      },
    ],
    ubicacionTexto: "Nandayure, Guanacaste, Costa Rica.",
    mapsLink: "https://maps.app.goo.gl/9VbbQP9o3MWVyHui7",
    mapsEmbed:
      "https://www.google.com/maps?q=9.7818,-85.2294&hl=es&z=14&output=embed",
  },

  "la-rancha-nandayure": {
    id: "la-rancha-nandayure",
    titulo: "La Rancha de Nandayure",
    resumen: "2.5 hectáreas con naciente, 3 cabañas, salón y piscina.",
    descripcion:
      "Finca de 2 hectáreas y media con naciente. Incluye 3 cabañas, salón y piscina. Excelente opción para proyecto turístico, recreación familiar o inversión.",
    media: [
      {
        tipo: "imagen",
        src: "properties/La Rancha de Nandayure/59270ba059324c83b787ae1d33195428.jpg",
      },
      {
        tipo: "imagen",
        src: "properties/La Rancha de Nandayure/fbc040a9fea3470a871e4c43280421ae.jpg",
      },
      {
        tipo: "imagen",
        src: "properties/La Rancha de Nandayure/fdb1bed6940a4feba70860fcfa7f622d.jpg",
      },
      {
        tipo: "imagen",
        src: "properties/La Rancha de Nandayure/IMG-20251228-WA0012.jpg",
      },
      {
        tipo: "imagen",
        src: "properties/La Rancha de Nandayure/IMG-20251228-WA0013.jpg",
      },
      {
        tipo: "imagen",
        src: "properties/La Rancha de Nandayure/IMG-20251228-WA0017.jpg",
      },
      {
        tipo: "imagen",
        src: "properties/La Rancha de Nandayure/IMG-20251228-WA0018.jpg",
      },
    ],
    ubicacionTexto: "Nandayure, Guanacaste, Costa Rica.",
    mapsLink: "https://maps.app.goo.gl/vg4KpG4CRc2yQyav5",
    mapsEmbed:
      "https://www.google.com/maps?q=9.8159,-85.2374&hl=es&z=14&output=embed",
  },
};

// ================== LIGHTBOX ELEMENTOS ==================
const lightbox = document.getElementById("lightbox");
const lightboxClose = document.getElementById("lightbox-close");
const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");

// =====================================================
// ===========   FUNCIÓN PARA CARGAR DETALLE   =========
// =====================================================
function cargarPropiedadDesdeURL() {
  if (!window.location.pathname.endsWith("propiedad.html")) return;

  const id = new URLSearchParams(window.location.search).get("id");
  const prop = PROPIEDADES[id];
  if (!prop) return;

  const tituloEl = document.getElementById("prop-titulo");
  const resumenEl = document.getElementById("prop-resumen");
  const descEl = document.getElementById("prop-descripcion");
  const thumbsEl = document.getElementById("galeria-thumbs");
  const viewport = document.querySelector(".galeria-viewport");
  const ubicacionTextoEl = document.getElementById("prop-ubicacion-text");
  const mapaIframe = document.getElementById("mapa-propiedad");
  const btnMaps = document.getElementById("btn-maps");

  tituloEl.textContent = prop.titulo;
  resumenEl.textContent = prop.resumen;
  descEl.textContent = prop.descripcion;
  ubicacionTextoEl.textContent = prop.ubicacionTexto;

  // ================== BOTONES WHATSAPP Y EMAIL ==================
  const btnWhatsApp = document.getElementById("btn-whatsapp-prop");
  const btnEmail = document.getElementById("btn-email-prop");

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

  if (mapaIframe && prop.mapsEmbed) mapaIframe.src = prop.mapsEmbed;
  if (btnMaps && prop.mapsLink) btnMaps.href = prop.mapsLink;

  let indiceActual = 0;
  let lightboxIndex = 0;
  const lightboxMedia = prop.media;

  function renderLightbox() {
    const old = lightbox.querySelector(".lightbox-media");
    if (old) old.remove();

    const item = lightboxMedia[lightboxIndex];

    if (item.tipo === "imagen") {
      const img = document.createElement("img");
      img.src = item.src;
      img.className = "lightbox-img lightbox-media";
      lightbox.appendChild(img);
    }

    if (item.tipo === "video") {
      const video = document.createElement("video");
      video.src = item.src;
      video.controls = true;
      video.autoplay = true;
      video.className = "lightbox-img lightbox-media";
      lightbox.appendChild(video);
    }
  }

  function abrirLightbox(index) {
    lightboxIndex = index;
    renderLightbox();
    lightbox.classList.remove("hidden");
  }

  lightboxPrev.onclick = (e) => {
    e.stopPropagation();
    lightboxIndex =
      (lightboxIndex - 1 + lightboxMedia.length) % lightboxMedia.length;
    renderLightbox();
  };

  lightboxNext.onclick = (e) => {
    e.stopPropagation();
    lightboxIndex = (lightboxIndex + 1) % lightboxMedia.length;
    renderLightbox();
  };

  lightboxClose.onclick = () => {
    lightbox.classList.add("hidden");
    const old = lightbox.querySelector(".lightbox-media");
    if (old) old.remove();
  };

  lightbox.onclick = (e) => {
    if (e.target === lightbox) lightboxClose.click();
  };

  function mostrarMedia(index) {
    indiceActual = index;
    viewport.innerHTML = "";
    const item = prop.media[index];

    if (item.tipo === "imagen") {
      const img = document.createElement("img");
      img.src = item.src;
      img.id = "galeria-imagen";
      img.style.cursor = "zoom-in";
      img.onclick = () => abrirLightbox(index);
      viewport.appendChild(img);
    }

    if (item.tipo === "video") {
      const video = document.createElement("video");
      video.src = item.src;
      video.controls = true;
      viewport.appendChild(video);
    }

    document
      .querySelectorAll(".galeria-thumb")
      .forEach((th, i) =>
        th.classList.toggle("thumb-activa", i === indiceActual)
      );
  }

  thumbsEl.innerHTML = "";
  prop.media.forEach((item, i) => {
    const btn = document.createElement("button");
    btn.className = "galeria-thumb";

    if (item.tipo === "imagen") {
      const img = document.createElement("img");
      img.src = item.src;
      btn.appendChild(img);
    } else {
      const play = document.createElement("div");
      play.className = "video-thumb";
      play.textContent = "▶";
      btn.appendChild(play);
    }

    btn.onclick = () => mostrarMedia(i);
    thumbsEl.appendChild(btn);
  });

  mostrarMedia(0);

  document.getElementById("galeria-prev").onclick = () =>
    mostrarMedia((indiceActual - 1 + prop.media.length) % prop.media.length);

  document.getElementById("galeria-next").onclick = () =>
    mostrarMedia((indiceActual + 1) % prop.media.length);
}

cargarPropiedadDesdeURL();

// ================== TECLADO LIGHTBOX ==================
document.addEventListener("keydown", (e) => {
  if (lightbox.classList.contains("hidden")) return;

  if (e.key === "ArrowLeft") lightboxPrev.click();
  if (e.key === "ArrowRight") lightboxNext.click();
  if (e.key === "Escape") lightboxClose.click();
});

// ================== BOTÓN VOLVER ==================
const btnVolver = document.getElementById("btn-volver");
if (btnVolver) {
  btnVolver.onclick = (e) => {
    e.preventDefault();
    window.history.length > 1
      ? history.back()
      : (window.location.href = "propiedades.html");
  };
}
