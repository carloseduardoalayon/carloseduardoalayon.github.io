document.addEventListener('DOMContentLoaded', () => {
    // 1. Detectar el idioma preferido
    const savedLang = localStorage.getItem('language');
    let browserLang = navigator.language || navigator.userLanguage; // 'es-ES', 'en-US', 'pt-BR'
    
    // Prioridad: Idioma guardado > Idioma del navegador > 'es' por defecto
    let defaultLang = 'es'; // Idioma por defecto si nada coincide
    if (savedLang && translations[savedLang]) {
        defaultLang = savedLang;
    } else if (browserLang.startsWith('pt') && translations['pt-BR']) {
        defaultLang = 'pt-BR';
    } else if (browserLang.startsWith('en') && translations['en']) {
        defaultLang = 'en';
    } else if (browserLang.startsWith('es') && translations['es']) {
        defaultLang = 'es';
    }

    // 2. Aplicar el idioma detectado
    setLanguage(null, defaultLang, false); // null para el evento, no guardar preferencia
});

/**
 * Cambia el idioma de la página y opcionalmente guarda la preferencia.
 * @param {Event|null} event - El evento de clic, o null si se llama programáticamente.
 * @param {string} lang - El código del idioma (ej. 'es', 'en', 'pt-BR').
 * @param {boolean} savePreference - Si es true, guarda el idioma en localStorage.
 */
function setLanguage(event, lang, savePreference = true) {
    // Prevenir que el enlace '#' mueva la página al principio
    if (event) {
        event.preventDefault();
    }

    // 1. Guardar la posición actual del scroll
    const scrollPosition = window.scrollY;

    if (savePreference) {
        localStorage.setItem('language', lang);
    }

    // Obtener el diccionario de traducciones para el idioma seleccionado
    const langTranslations = translations[lang];
    
    // Si no hay traducciones para ese idioma, no hacer nada más.
    if (!langTranslations) {
        console.error(`Traducciones para el idioma '${lang}' no encontradas.`);
        // Aún así, restauramos el scroll por si acaso.
        window.scrollTo(0, scrollPosition);
        return;
    }

    // Actualizar el título de la página
    document.title = langTranslations.pageTitle || document.title;

    // Actualizar todos los elementos con el atributo data-key
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (langTranslations[key]) {
            element.innerHTML = langTranslations[key];
        }
    });

    // 2. Restaurar la posición del scroll
    window.scrollTo(0, scrollPosition);
}
