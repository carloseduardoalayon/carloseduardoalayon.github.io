document.addEventListener('DOMContentLoaded', () => {
    // 1. Detectar el idioma preferido
    const savedLang = localStorage.getItem('language');
    const browserLang = navigator.language.split('-')[0]; // 'es-ES' -> 'es'
    
    // Prioridad: Idioma guardado > Idioma del navegador > 'es' por defecto
    let defaultLang = 'es'; // Idioma por defecto si nada coincide
    if (savedLang && translations[savedLang]) {
        defaultLang = savedLang;
    } else if (browserLang === 'pt' && translations['pt-BR']) {
        defaultLang = 'pt-BR';
    } else if (translations[browserLang]) {
        defaultLang = browserLang;
    }

    // 2. Aplicar el idioma detectado
    setLanguage(defaultLang, false); // No guardar en localStorage de nuevo
});

/**
 * Cambia el idioma de la página y opcionalmente guarda la preferencia.
 * @param {string} lang - El código del idioma (ej. 'es', 'en', 'pt-BR').
 * @param {boolean} savePreference - Si es true, guarda el idioma en localStorage.
 */
function setLanguage(lang, savePreference = true) {
    if (savePreference) {
        localStorage.setItem('language', lang);
    }

    // Obtener el diccionario de traducciones para el idioma seleccionado
    const langTranslations = translations[lang];
    if (!langTranslations) {
        console.error(`Traducciones para el idioma '${lang}' no encontradas.`);
        return;
    }

    // Actualizar el título de la página
    document.title = langTranslations.pageTitle;

    // Actualizar todos los elementos con el atributo data-key
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (langTranslations[key]) {
            element.innerHTML = langTranslations[key];
        }
    });
}
