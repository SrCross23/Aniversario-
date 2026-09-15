// =====================================
// ICONOS DEL REPRODUCTOR
// =====================================

const ICONO_PLAY =
    '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M8 5v14l12-7z" fill="currentColor"/></svg>';

const ICONO_PAUSA =
    '<svg viewBox="0 0 24 24" width="18" height="18"><path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor"/></svg>';

// =====================================
// CONTADOR DE TIEMPO JUNTOS
// =====================================

// 12 de octubre de 2025 - 18:30
const fechaInicio = new Date("2025-10-12T18:30:00");

function actualizarContador() {

    const ahora = new Date();

    let diferencia = ahora - fechaInicio;

    if (diferencia < 0) {
        diferencia = 0;
    }

    const segundosTotales =
        Math.floor(diferencia / 1000);

    const minutosTotales =
        Math.floor(segundosTotales / 60);

    const horasTotales =
        Math.floor(minutosTotales / 60);

    const dias =
        Math.floor(horasTotales / 24);

    const horas =
        horasTotales % 24;

    const minutos =
        minutosTotales % 60;

    const segundos =
        segundosTotales % 60;


    const elementoDias =
        document.getElementById("dias");

    const elementoHoras =
        document.getElementById("horas");

    const elementoMinutos =
        document.getElementById("minutos");

    const elementoSegundos =
        document.getElementById("segundos");


    if (elementoDias)
        elementoDias.textContent = dias;

    if (elementoHoras)
        elementoHoras.textContent =
            horas.toString().padStart(2, "0");

    if (elementoMinutos)
        elementoMinutos.textContent =
            minutos.toString().padStart(2, "0");

    if (elementoSegundos)
        elementoSegundos.textContent =
            segundos.toString().padStart(2, "0");
}


// Actualizar inmediatamente
actualizarContador();

// Actualizar cada segundo
setInterval(
    actualizarContador,
    1000
);

// =====================================
// NUESTRA BANDA SONORA
// =====================================

const canciones = [

    {
        titulo: "Amo",
        artista: "Axel",
        archivo: "musica/Axel-Amo.mp3",
        portada: "musica/portadas/amo.jpg"
    },

    {
        titulo: "Solamente Tú",
        artista: "Pablo Alborán",
        archivo: "musica/PabloAlborán-SolamenteTu.mp3",
        portada: "musica/portadas/solamente.jpg"
    },

    {
        titulo: "Te Queda Bonito",
        artista: "On Music",
        archivo: "musica/OnMusic-TeQuedaBonito.mp3",
        portada: "musica/portadas/bonito.jpg"
    },

    {
        titulo: "Hoy",
        artista: "Valentino Merlo & The La Planta",
        archivo: "musica/ValentinoMerloXThelaplanta-Hoy.mp3",
        portada: "musica/portadas/hoy.jpg"
    },

    {
        titulo: "Darte un Beso",
        artista: "Prince Royce",
        archivo: "musica/PrinceRoyce-DarteunBeso.mp3",
        portada: "musica/portadas/beso.jpg"
    },

    {
        titulo: "ADMV",
        artista: "Maluma",
        archivo: "musica/MalumaADMV.mp3",
        portada: "musica/portadas/2.jpg"
    },
  
    {
        titulo: "Yo no me doy por vencido",
        artista: "Luis Fonsi",
        archivo: "musica/LuisFonsi-NoMeDoyPorVencido.mp3",
        portada: "musica/portadas/1.jpg"
    }
];


let cancionActual = 0;


// =====================================
// ELEMENTOS DEL REPRODUCTOR
// =====================================

const audio =
    document.getElementById("audio");

const botonPlay =
    document.getElementById("play");

const botonAnterior =
    document.getElementById("anterior");

const botonSiguiente =
    document.getElementById("siguiente");

const tituloCancion =
    document.getElementById("titulo-cancion");

const artistaCancion =
    document.getElementById("artista-cancion");

const barraProgreso =
    document.getElementById("barra-progreso");

const tiempoActual =
    document.getElementById("tiempo-actual");

const duracion =
    document.getElementById("duracion");

const listaCanciones =
    document.getElementById("lista-canciones");



// =====================================
// CARGAR CANCIÓN
// =====================================

function cargarCancion(indice) {

    const cancion =
        canciones[indice];

    // Archivo de audio
    audio.src =
        cancion.archivo;


    // Título
    tituloCancion.textContent =
        cancion.titulo;


    // Artista
    artistaCancion.textContent =
        cancion.artista;


    // Portada
    const portada =
        document.querySelector(
            ".portada-musica"
        );

    if (portada) {

        portada.style.backgroundImage =
            `url("${cancion.portada}")`;

        portada.style.backgroundSize =
            "cover";

        portada.style.backgroundPosition =
            "center";

        portada.textContent = "";

    }


    // Reiniciar barra
    barraProgreso.value = 0;
    barraProgreso.style.setProperty("--progreso", "0%");

    tiempoActual.textContent =
        "0:00";


    // Actualizar lista
    crearLista();

}

// =====================================
// PLAY / PAUSA
// =====================================

function reproducir() {

    audio.play();

    botonPlay.innerHTML = ICONO_PAUSA;

    const disco = document.getElementById("discoVinilo");
    if (disco) disco.classList.add("girando");

}


function pausar() {

    audio.pause();

    botonPlay.innerHTML = ICONO_PLAY;

    const disco = document.getElementById("discoVinilo");
    if (disco) disco.classList.remove("girando");

}


botonPlay.addEventListener(
    "click",
    () => {

        if (audio.paused) {

            reproducir();

        } else {

            pausar();

        }

    }
);

// =====================================
// SIGUIENTE CANCIÓN
// =====================================

botonSiguiente.addEventListener(
    "click",
    () => {

        cancionActual++;

        if (
            cancionActual >=
            canciones.length
        ) {

            cancionActual = 0;

        }

        cargarCancion(
            cancionActual
        );

        reproducir();

    }
);

// =====================================
// CANCIÓN ANTERIOR
// =====================================

botonAnterior.addEventListener(
    "click",
    () => {

        cancionActual--;

        if (cancionActual < 0) {

            cancionActual =
                canciones.length - 1;

        }

        cargarCancion(
            cancionActual
        );

        reproducir();

    }
);

// =====================================
// SIGUIENTE AUTOMÁTICO
// =====================================

audio.addEventListener(
    "ended",
    () => {

        cancionActual++;

        if (
            cancionActual >=
            canciones.length
        ) {

            cancionActual = 0;

        }

        cargarCancion(
            cancionActual
        );

        reproducir();

    }
);

// =====================================
// BARRA DE PROGRESO
// =====================================

audio.addEventListener(
    "timeupdate",
    () => {

        if (!audio.duration)
            return;


        const progreso =
            (audio.currentTime /
            audio.duration) * 100;


        barraProgreso.value =
            progreso;

        barraProgreso.style.setProperty(
            "--progreso",
            progreso + "%"
        );


        tiempoActual.textContent =
            convertirTiempo(
                audio.currentTime
            );

    }
);

// =====================================
// DURACIÓN DE LA CANCIÓN
// =====================================

audio.addEventListener(
    "loadedmetadata",
    () => {

        duracion.textContent =
            convertirTiempo(
                audio.duration
            );

    }
);

// =====================================
// MOVERSE POR LA CANCIÓN
// =====================================

barraProgreso.addEventListener(
    "input",
    () => {

        if (!audio.duration)
            return;


        audio.currentTime =
            (barraProgreso.value / 100)
            * audio.duration;

        barraProgreso.style.setProperty(
            "--progreso",
            barraProgreso.value + "%"
        );

    }
);

// =====================================
// CONVERTIR SEGUNDOS A MINUTOS
// =====================================

function convertirTiempo(
    segundos
) {

    const minutos =
        Math.floor(
            segundos / 60
        );


    const segundosRestantes =
        Math.floor(
            segundos % 60
        );


    return minutos +
        ":" +
        segundosRestantes
            .toString()
            .padStart(2, "0");

}

// =====================================
// CREAR LISTA DE CANCIONES
// =====================================

function crearLista() {

    if (!listaCanciones)
        return;


    listaCanciones.innerHTML =
        "";


    canciones.forEach(
        (cancion, indice) => {

            const elemento =
                document.createElement(
                    "button"
                );


            const esActiva =
                indice === cancionActual;

            elemento.className =
                "cancion-lista" + (esActiva ? " activa" : "");


            const marcador = esActiva
                ? `<span class="ecualizador"><span></span><span></span><span></span></span>`
                : `<span>${indice + 1}</span>`;

            elemento.innerHTML =

                `${marcador}

                <div>

                    <strong>
                        ${cancion.titulo}
                    </strong>

                    <small>
                        ${cancion.artista}
                    </small>

                </div>`;


            elemento.addEventListener(
                "click",
                () => {

                    cancionActual =
                        indice;


                    cargarCancion(
                        cancionActual
                    );


                    reproducir();

                }
            );


            listaCanciones.appendChild(
                elemento
            );

        }
    );

}

// =====================================
// INICIAR PRIMERA CANCIÓN
// =====================================

cargarCancion(
    cancionActual
);


function abrirCarta() {

    const sobre = document.querySelector(".sobre");
    const carta = document.getElementById("cartaTexto");

    if (!sobre || !carta) {
        console.log("No se encontró el sobre o la carta");
        return;
    }

    // Evitar abrir dos veces
    if (sobre.classList.contains("abierto")) {
        return;
    }

    // Sonido real de papel al abrir
    const sonidoPapel = document.getElementById("sonidoPapel");
    if (sonidoPapel) {
        sonidoPapel.currentTime = 0;
        sonidoPapel.play().catch(() => {});
    }

    // Abrir sobre
    sobre.classList.add("abierto");

    // El sello se "rompe" justo cuando empieza a separarse visualmente
    const sonidoSello = document.getElementById("sonidoSello");
    if (sonidoSello) {
        setTimeout(function () {
            sonidoSello.currentTime = 0;
            sonidoSello.play().catch(() => {});
        }, 150);
    }

    // Esperar a que termine la coreografía del sobre (solapa + sello + hoja)
    setTimeout(function () {

        carta.style.display = "block";

        // Pequeña pausa para activar correctamente la animación
        setTimeout(function () {

            carta.classList.add("visible");

        }, 50);

    }, 1500);
}


function cerrarCarta(event) {

    // Evita que el clic vuelva a activar el sobre
    event.stopPropagation();

    const sobre = document.querySelector(".sobre");
    const carta = document.getElementById("cartaTexto");

    if (!sobre || !carta) {
        return;
    }

    // Ocultar carta lentamente
    carta.classList.remove("visible");

    // Esperar a que termine la animación
    setTimeout(function () {

        carta.style.display = "none";

        // Cerrar sobre
        sobre.classList.remove("abierto");

    }, 950);

}
// =====================================
// SONIDO DELICADO EN TODOS LOS BOTONES
// =====================================

(function () {

    const sonidoClick = document.getElementById("sonidoClick");

    if (!sonidoClick) return;

    document.querySelectorAll("button").forEach(function (boton) {

        boton.addEventListener("click", function () {
            sonidoClick.currentTime = 0;
            sonidoClick.play().catch(() => {});
        });

    });

})();

// =====================================
// BARRA DE PROGRESO DE SCROLL
// =====================================

(function () {

    const barra = document.getElementById("progresoBarra");

    if (!barra) return;

    function actualizarProgreso() {

        const alturaTotal =
            document.documentElement.scrollHeight - window.innerHeight;

        const avance = alturaTotal > 0
            ? (window.scrollY / alturaTotal) * 100
            : 0;

        barra.style.width = avance + "%";

    }

    window.addEventListener("scroll", actualizarProgreso, { passive: true });
    window.addEventListener("resize", actualizarProgreso);
    actualizarProgreso();

})();

// =====================================
// LIGHTBOX DE FOTOS
// =====================================

(function () {

    const fotos = Array.from(document.querySelectorAll(".foto-lightbox"));

    if (fotos.length === 0) return;

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const btnCerrar = document.getElementById("lightboxCerrar");
    const btnAnterior = document.getElementById("lightboxAnterior");
    const btnSiguiente = document.getElementById("lightboxSiguiente");

    let indiceActual = 0;

    function mostrarFoto(indice) {

        indiceActual = (indice + fotos.length) % fotos.length;

        const foto = fotos[indiceActual];

        lightboxImg.src = foto.src;
        lightboxImg.alt = foto.alt || "";
        lightboxCaption.textContent = foto.dataset.caption || "";

    }

    function abrirLightbox(indice) {
        mostrarFoto(indice);
        lightbox.classList.add("abierto");
        document.body.style.overflow = "hidden";
    }

    function cerrarLightbox() {
        lightbox.classList.remove("abierto");
        document.body.style.overflow = "";
    }

    fotos.forEach(function (foto, indice) {
        foto.addEventListener("click", function () {
            abrirLightbox(indice);
        });
    });

    btnCerrar.addEventListener("click", cerrarLightbox);
    btnAnterior.addEventListener("click", function () { mostrarFoto(indiceActual - 1); });
    btnSiguiente.addEventListener("click", function () { mostrarFoto(indiceActual + 1); });

    lightbox.addEventListener("click", function (evento) {
        if (evento.target === lightbox) cerrarLightbox();
    });

    document.addEventListener("keydown", function (evento) {

        if (!lightbox.classList.contains("abierto")) return;

        if (evento.key === "Escape") cerrarLightbox();
        if (evento.key === "ArrowLeft") mostrarFoto(indiceActual - 1);
        if (evento.key === "ArrowRight") mostrarFoto(indiceActual + 1);

    });

})();

// =====================================
// EFECTO SORPRESA PREMIUM (SECCIÓN FINAL)
// =====================================

(function () {

    const canvas = document.getElementById("canvasSorpresa");
    const seccionFinal = document.querySelector(".final");

    if (!canvas || !seccionFinal) return;

    const ctx = canvas.getContext("2d");
    let particulas = [];
    let animando = false;
    let animacionId = null;

    function redimensionar() {
        canvas.width = seccionFinal.clientWidth;
        canvas.height = seccionFinal.clientHeight;
    }

    function crearParticula() {

        const esOro = Math.random() > 0.45;

        return {
            x: Math.random() * canvas.width,
            y: -20 - Math.random() * canvas.height * 0.5,
            radio: 2 + Math.random() * 3.5,
            velocidadY: 0.4 + Math.random() * 0.9,
            velocidadX: (Math.random() - 0.5) * 0.6,
            oscilacion: Math.random() * Math.PI * 2,
            velocidadOscilacion: 0.01 + Math.random() * 0.02,
            opacidad: 0.25 + Math.random() * 0.45,
            color: esOro ? "201, 161, 106" : "156, 58, 82"
        };

    }

    function inicializarParticulas() {
        particulas = [];
        const cantidad = Math.round((canvas.width * canvas.height) / 42000);
        for (let i = 0; i < cantidad; i++) {
            const p = crearParticula();
            p.y = Math.random() * canvas.height;
            particulas.push(p);
        }
    }

    function dibujar() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particulas.forEach(function (p) {

            p.oscilacion += p.velocidadOscilacion;
            p.y += p.velocidadY;
            p.x += p.velocidadX + Math.sin(p.oscilacion) * 0.4;

            if (p.y > canvas.height + 20) {
                Object.assign(p, crearParticula());
                p.y = -20;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radio, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${p.color}, ${p.opacidad})`;
            ctx.shadowColor = `rgba(${p.color}, ${p.opacidad})`;
            ctx.shadowBlur = 6;
            ctx.fill();

        });

        animacionId = requestAnimationFrame(dibujar);

    }

    function iniciarEfecto() {

        if (animando) return;
        animando = true;

        redimensionar();
        inicializarParticulas();
        dibujar();

    }

    function detenerEfecto() {

        animando = false;
        if (animacionId) cancelAnimationFrame(animacionId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

    }

    window.addEventListener("resize", function () {
        if (animando) redimensionar();
    });

    if ("IntersectionObserver" in window) {

        const observador = new IntersectionObserver(function (entradas) {

            entradas.forEach(function (entrada) {
                if (entrada.isIntersecting) {
                    iniciarEfecto();
                } else {
                    detenerEfecto();
                }
            });

        }, { threshold: 0.35 });

        observador.observe(seccionFinal);

    } else {
        iniciarEfecto();
    }

})();

// =====================================
// REVEAL PROGRESIVO DE TEXTO
// =====================================

(function () {

    // Partir cada bloque .texto en párrafos individuales para poder
    // revelarlos uno por uno a medida que se hace scroll
    document.querySelectorAll(".texto").forEach(function (bloque) {

        const partes = bloque.textContent
            .split(/\n\s*\n/)
            .map(function (s) { return s.trim(); })
            .filter(Boolean);

        if (partes.length === 0) return;

        bloque.innerHTML = "";
        bloque.classList.add("texto-armado");

        partes.forEach(function (parte) {
            const p = document.createElement("p");
            p.className = "texto-parrafo";
            p.textContent = parte;
            bloque.appendChild(p);
        });

    });

    // Elementos que se revelan como bloque simple al entrar en pantalla
    const selectoresReveal = [
        ".numero",
        ".seccion h2",
        ".foto-item",
        ".musica h2",
        ".reproductor",
        ".contador-superior",
        ".contador-seccion h2",
        ".contador-intro",
        ".contador",
        ".contador-final",
        ".carta h2",
        ".final h2",
        ".final p",
        ".corazon",
        ".final small"
    ];

    document.querySelectorAll(selectoresReveal.join(",")).forEach(function (el) {
        el.classList.add("reveal");
    });

    const elementosAnimados = document.querySelectorAll(".reveal, .texto-parrafo");

    if (!("IntersectionObserver" in window) || elementosAnimados.length === 0) {
        elementosAnimados.forEach(function (el) { el.classList.add("visible"); });
        return;
    }

    // Pequeño desfase (stagger) entre párrafos de un mismo bloque de texto
    document.querySelectorAll(".texto-armado").forEach(function (bloque) {
        Array.from(bloque.children).forEach(function (p, indice) {
            p.style.transitionDelay = Math.min(indice * 90, 360) + "ms";
        });
    });

    const observadorReveal = new IntersectionObserver(function (entradas) {

        entradas.forEach(function (entrada) {
            if (entrada.isIntersecting) {
                entrada.target.classList.add("visible");
                observadorReveal.unobserve(entrada.target);
            }
        });

    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    elementosAnimados.forEach(function (el) {
        observadorReveal.observe(el);
    });

})();

// =====================================
// PARALLAX SUAVE EN LAS FOTOS
// =====================================

(function () {

    const fotos = Array.from(document.querySelectorAll(".foto-lightbox"));

    if (fotos.length === 0) return;

    const prefiereMenosMovimiento =
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefiereMenosMovimiento) return;

    let ticking = false;

    function actualizarParallax() {

        const centroViewport = window.innerHeight / 2;

        fotos.forEach(function (foto) {

            const rect = foto.getBoundingClientRect();
            const centroFoto = rect.top + rect.height / 2;
            const distancia = centroFoto - centroViewport;

            let desplazamiento = distancia * -0.06;
            desplazamiento = Math.max(-22, Math.min(22, desplazamiento));

            foto.style.setProperty("--parallax", desplazamiento.toFixed(1) + "px");

        });

        ticking = false;

    }

    function solicitarActualizacion() {
        if (!ticking) {
            requestAnimationFrame(actualizarParallax);
            ticking = true;
        }
    }

    window.addEventListener("scroll", solicitarActualizacion, { passive: true });
    window.addEventListener("resize", solicitarActualizacion);
    actualizarParallax();

})();

// =====================================
// VISUALIZADOR DE AUDIO
// =====================================

(function () {

    const audio = document.getElementById("audio");
    const canvas = document.getElementById("visualizador");

    if (!audio || !canvas) return;

    const ctx = canvas.getContext("2d");

    let audioCtx = null;
    let analyser = null;
    let fuente = null;
    let datos = null;
    let idAnimacion = null;

    function redimensionarCanvas() {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = canvas.clientWidth * dpr;
        canvas.height = canvas.clientHeight * dpr;
    }

    function configurarAudioContext() {

        if (audioCtx) return;

        const AudioContextClase = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClase) return;

        audioCtx = new AudioContextClase();
        fuente = audioCtx.createMediaElementSource(audio);
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 64;
        analyser.smoothingTimeConstant = 0.75;

        datos = new Uint8Array(analyser.frequencyBinCount);

        fuente.connect(analyser);
        analyser.connect(audioCtx.destination);

    }

    function dibujarBarrasIdle() {

        redimensionarCanvas();

        const ancho = canvas.width;
        const alto = canvas.height;
        const cantidadBarras = 26;
        const anchoBarra = ancho / cantidadBarras;

        ctx.clearRect(0, 0, ancho, alto);

        for (let i = 0; i < cantidadBarras; i++) {
            const alturaBarra = alto * 0.08;
            ctx.fillStyle = "rgba(201, 161, 106, 0.25)";
            ctx.fillRect(
                i * anchoBarra + 1,
                alto - alturaBarra,
                anchoBarra - 2,
                alturaBarra
            );
        }

    }

    function dibujar() {

        if (!analyser) return;

        analyser.getByteFrequencyData(datos);

        const ancho = canvas.width;
        const alto = canvas.height;

        ctx.clearRect(0, 0, ancho, alto);

        const cantidadBarras = datos.length;
        const anchoBarra = ancho / cantidadBarras;

        for (let i = 0; i < cantidadBarras; i++) {

            const valor = datos[i] / 255;
            const alturaBarra = Math.max(alto * 0.06, valor * alto * 0.95);

            const gradiente = ctx.createLinearGradient(0, alto - alturaBarra, 0, alto);
            gradiente.addColorStop(0, "rgba(201, 161, 106, 0.95)");
            gradiente.addColorStop(1, "rgba(156, 58, 82, 0.55)");

            ctx.fillStyle = gradiente;
            ctx.fillRect(
                i * anchoBarra + 1,
                alto - alturaBarra,
                anchoBarra - 2,
                alturaBarra
            );

        }

        idAnimacion = requestAnimationFrame(dibujar);

    }

    dibujarBarrasIdle();

    audio.addEventListener("play", function () {

        configurarAudioContext();

        if (!audioCtx) return;

        if (audioCtx.state === "suspended") {
            audioCtx.resume();
        }

        redimensionarCanvas();
        cancelAnimationFrame(idAnimacion);
        dibujar();

    });

    audio.addEventListener("pause", function () {
        cancelAnimationFrame(idAnimacion);
    });

    audio.addEventListener("ended", function () {
        cancelAnimationFrame(idAnimacion);
    });

    window.addEventListener("resize", function () {
        if (!audio.paused) {
            redimensionarCanvas();
        } else {
            dibujarBarrasIdle();
        }
    });

})();

// =====================================
// MINI REPRODUCTOR FLOTANTE
// =====================================

(function () {

    const seccionMusica = document.querySelector(".musica");
    const miniReproductor = document.getElementById("miniReproductor");

    if (!seccionMusica || !miniReproductor || !audio) return;

    const miniPortada = document.getElementById("miniPortada");
    const miniTitulo = document.getElementById("miniTitulo");
    const miniArtista = document.getElementById("miniArtista");
    const miniPlay = document.getElementById("miniPlay");
    const miniAnterior = document.getElementById("miniAnterior");
    const miniSiguiente = document.getElementById("miniSiguiente");
    const miniCerrar = document.getElementById("miniCerrar");

    let seccionVisible = true;
    let cerradaManualmente = false;

    function sincronizarInfo() {

        const cancion = canciones[cancionActual];
        if (!cancion) return;

        miniTitulo.textContent = cancion.titulo;
        miniArtista.textContent = cancion.artista;

        miniPortada.style.backgroundImage = `url("${cancion.portada}")`;
        miniPortada.style.backgroundSize = "cover";
        miniPortada.style.backgroundPosition = "center";
        miniPortada.textContent = "";

    }

    function sincronizarBotonPlay() {
        miniPlay.textContent = audio.paused ? "▶" : "⏸";
    }

    function actualizarVisibilidad() {

        const debeMostrarse =
            !seccionVisible && !audio.paused && !cerradaManualmente;

        miniReproductor.classList.toggle("visible", debeMostrarse);

    }

    if ("IntersectionObserver" in window) {

        const observadorMusica = new IntersectionObserver(function (entradas) {

            entradas.forEach(function (entrada) {
                seccionVisible = entrada.isIntersecting;
                if (seccionVisible) cerradaManualmente = false;
            });

            actualizarVisibilidad();

        }, { threshold: 0.25 });

        observadorMusica.observe(seccionMusica);

    }

    audio.addEventListener("play", function () {
        sincronizarInfo();
        sincronizarBotonPlay();
        actualizarVisibilidad();
    });

    audio.addEventListener("pause", function () {
        sincronizarBotonPlay();
        actualizarVisibilidad();
    });

    audio.addEventListener("ended", actualizarVisibilidad);

    miniPlay.addEventListener("click", function () {
        if (audio.paused) {
            reproducir();
        } else {
            pausar();
        }
    });

    miniAnterior.addEventListener("click", function () {
        botonAnterior.click();
    });

    miniSiguiente.addEventListener("click", function () {
        botonSiguiente.click();
    });

    miniCerrar.addEventListener("click", function () {
        cerradaManualmente = true;
        actualizarVisibilidad();
    });

    miniPortada.addEventListener("click", function () {
        seccionMusica.scrollIntoView({ behavior: "smooth", block: "center" });
    });

})();
