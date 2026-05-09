/* Integrated behavior:
   - Theme toggle (dark/light) persisted in localStorage
   - Language switch (en-US, pt-BR, es-ES) persisted in localStorage
   - Simple i18n using data-i18n attributes
   - Save, list, delete and clear series persisted in localStorage (demo)
*/

(() => {
  const LS_THEME = 'dio_theme';
  const LS_LANG = 'dio_lang';
  const LS_SERIES = 'dio_series';

  const translations = {
    "en-US": {
      appName: "DIO Series",
      demo: "Demo",
      selectLanguage: "Select language",
      toggleTheme: "Toggle theme",
      welcome: "Welcome to DIO Series",
      intro: "A minimal front-end demo for your back-end project. Toggle theme and change language.",
      listTitle: "Series List",
      listDesc: "This area would show series fetched from the API.",
      fetch: "Fetch",
      clear: "Clear",
      addTitle: "Add Series",
      genre: "Genre",
      title: "Title",
      year: "Year",
      description: "Description",
      save: "Save",
      reset: "Reset",
      madeBy: "Made by",
      modeInfo: "Theme and language preferences are saved locally.",
      delete: "Delete",
      confirmClear: "Clear all saved series?",
      savedAlert: "Saved",
      requiredTitle: "Title is required."
    },
    "pt-BR": {
      appName: "DIO Series",
      demo: "Demonstração",
      selectLanguage: "Selecionar idioma",
      toggleTheme: "Alternar tema",
      welcome: "Bem-vindo ao DIO Series",
      intro: "Um front-end mínimo para demonstrar seu back-end. Alterne tema e idioma.",
      listTitle: "Lista de Séries",
      listDesc: "Esta área exibiria séries buscadas na API.",
      fetch: "Buscar",
      clear: "Limpar",
      addTitle: "Adicionar Série",
      genre: "Gênero",
      title: "Título",
      year: "Ano",
      description: "Descrição",
      save: "Salvar",
      reset: "Redefinir",
      madeBy: "Feito por",
      modeInfo: "Preferências de tema e idioma são salvas localmente.",
      delete: "Excluir",
      confirmClear: "Limpar todas as séries salvas?",
      savedAlert: "Salvo",
      requiredTitle: "Título é obrigatório."
    },
    "es-ES": {
      appName: "DIO Series",
      demo: "Demostración",
      selectLanguage: "Seleccionar idioma",
      toggleTheme: "Cambiar tema",
      welcome: "Bienvenido a DIO Series",
      intro: "Un front-end mínimo para demostrar tu back-end. Cambia tema e idioma.",
      listTitle: "Lista de Series",
      listDesc: "Esta área mostraría series obtenidas desde la API.",
      fetch: "Obtener",
      clear: "Limpiar",
      addTitle: "Agregar Serie",
      genre: "Género",
      title: "Título",
      year: "Año",
      description: "Descripción",
      save: "Guardar",
      reset: "Restablecer",
      madeBy: "Hecho por",
      modeInfo: "Preferencias de tema e idioma se guardan localmente.",
      delete: "Eliminar",
      confirmClear: "¿Borrar todas las series guardadas?",
      savedAlert: "Guardado",
      requiredTitle: "El título es obligatorio."
    }
  };

  // Elements
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const langSelect = document.getElementById('lang');
  const i18nNodes = document.querySelectorAll('[data-i18n]');
  const demoForm = document.getElementById('demoForm');
  const seriesListEl = document.getElementById('seriesList');
  const btnFetch = document.getElementById('btnFetch');
  const btnClear = document.getElementById('btnClear');

  // Helpers
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeIcon.textContent = '🌙';
      themeToggle.setAttribute('aria-pressed', 'true');
    } else {
      document.documentElement.removeAttribute('data-theme');
      themeIcon.textContent = '☀️';
      themeToggle.setAttribute('aria-pressed', 'false');
    }
    localStorage.setItem(LS_THEME, theme);
  }

  function detectInitialTheme() {
    const saved = localStorage.getItem(LS_THEME);
    if (saved) return saved;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  function applyLanguage(lang) {
    const dict = translations[lang] || translations['en-US'];
    i18nNodes.forEach(node => {
      const key = node.getAttribute('data-i18n');
      if (!key) return;
      const text = dict[key];
      if (text === undefined) return;
      if (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') {
        node.placeholder = text;
      } else if (node.tagName === 'OPTION') {
        node.textContent = text;
      } else {
        node.textContent = text;
      }
    });
    // update dynamic button labels that are created later
    langSelect.value = lang;
    localStorage.setItem(LS_LANG, lang);
  }

  function detectInitialLang() {
    const saved = localStorage.getItem(LS_LANG);
    if (saved) return saved;
    const nav = navigator.language || navigator.userLanguage || 'en-US';
    if (nav.startsWith('pt')) return 'pt-BR';
    if (nav.startsWith('es')) return 'es-ES';
    return 'en-US';
  }

  // Storage helpers
  function loadSeries() {
    try {
      const raw = localStorage.getItem(LS_SERIES);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error('Failed to parse series from storage', e);
      return [];
    }
  }

  function saveSeriesArray(arr) {
    localStorage.setItem(LS_SERIES, JSON.stringify(arr));
  }

  // UI render
  function renderList() {
    const arr = loadSeries();
    seriesListEl.innerHTML = '';
    if (arr.length === 0) {
      const empty = document.createElement('li');
      empty.textContent = getText('listDesc') || 'No series saved.';
      empty.className = 'series-item';
      seriesListEl.appendChild(empty);
      return;
    }

    arr.forEach(item => {
      const li = document.createElement('li');
      li.className = 'series-item';
      li.setAttribute('data-id', item.id);

      const left = document.createElement('div');
      left.style.maxWidth = '78%';
      left.innerHTML = `<div class="title">${escapeHtml(item.title)}</div>
                        <div class="meta">${escapeHtml(item.genre)} • ${escapeHtml(item.year || '')}</div>
                        <div class="meta">${escapeHtml(item.description || '')}</div>`;

      const right = document.createElement('div');
      right.style.display = 'flex';
      right.style.gap = '8px';
      right.style.alignItems = 'center';

      const delBtn = document.createElement('button');
      delBtn.className = 'small btn';
      delBtn.textContent = getText('delete') || 'Delete';
      delBtn.addEventListener('click', () => {
        deleteSeries(item.id);
      });

      right.appendChild(delBtn);
      li.appendChild(left);
      li.appendChild(right);
      seriesListEl.appendChild(li);
    });
  }

  // CRUD demo
  function addSeries(series) {
    const arr = loadSeries();
    arr.push(series);
    saveSeriesArray(arr);
    renderList();
  }

  function deleteSeries(id) {
    let arr = loadSeries();
    arr = arr.filter(s => s.id !== id);
    saveSeriesArray(arr);
    renderList();
  }

  function clearAllSeries() {
    localStorage.removeItem(LS_SERIES);
    renderList();
  }

  // Form handling
  demoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value.trim();
    const genre = document.getElementById('genre').value;
    const year = document.getElementById('year').value;
    const description = document.getElementById('description').value.trim();

    if (!title) {
      alert(getText('requiredTitle') || 'Title is required.');
      return;
    }

    const saved = {
      id: Date.now().toString(),
      title, genre, year, description
    };

    addSeries(saved);
    alert((getText('savedAlert') || 'Saved') + ' — ' + title);
    demoForm.reset();
  });

  // Buttons
  btnFetch.addEventListener('click', () => renderList());
  btnClear.addEventListener('click', () => {
    if (confirm(getText('confirmClear') || 'Clear all saved series?')) clearAllSeries();
  });

  // Theme & language events
  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  langSelect.addEventListener('change', (e) => {
    applyLanguage(e.target.value);
    // re-render to update dynamic labels
    renderList();
  });

  // Utilities
  function getText(key) {
    const lang = localStorage.getItem(LS_LANG) || detectInitialLang();
    return (translations[lang] && translations[lang][key]) || translations['en-US'][key];
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Init
  (function init() {
    applyTheme(detectInitialTheme());
    applyLanguage(detectInitialLang());
    renderList();
  })();

})();
