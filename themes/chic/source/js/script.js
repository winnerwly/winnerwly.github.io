(function () {
  const root = document.documentElement;
  const themeToggle = document.getElementById('theme-toggle');
  const menuToggle = document.getElementById('menu-toggle');
  const navigation = document.getElementById('site-navigation');
  const compactNavigation = window.matchMedia('(max-width: 780px)');

  function updateThemeLabel() {
    themeToggle.textContent = root.dataset.theme === 'light' ? '深色模式' : '浅色模式';
  }

  updateThemeLabel();
  themeToggle.hidden = false;
  themeToggle.addEventListener('click', function () {
    const theme = root.dataset.theme === 'light' ? 'dark' : 'light';
    root.dataset.theme = theme;
    updateThemeLabel();
    try {
      localStorage.setItem('theme-preference', theme);
    } catch (error) {
      // The current page still uses the selected palette.
    }
  });

  function closeMenu() {
    navigation.hidden = compactNavigation.matches;
    menuToggle.hidden = !compactNavigation.matches;
    menuToggle.setAttribute('aria-expanded', 'false');
  }

  closeMenu();
  compactNavigation.addEventListener('change', closeMenu);
  menuToggle.addEventListener('click', function () {
    if (!navigation.hidden) {
      closeMenu();
      return;
    }
    navigation.hidden = false;
    menuToggle.setAttribute('aria-expanded', 'true');
    navigation.querySelector('a').focus();
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuToggle.focus();
    }
  });

  const contents = document.getElementById('article-toc');
  if (!contents) return;

  const wideArticle = window.matchMedia('(min-width: 1180px)');
  function setContentsOpen() {
    contents.open = wideArticle.matches;
  }
  setContentsOpen();
  wideArticle.addEventListener('change', setContentsOpen);

  document.addEventListener('DOMContentLoaded', function () {
    if (!window.tocbot) return;

    const expand = document.getElementById('toc-expand');
    const list = contents.querySelector('.tocbot-list');
    const hasNestedHeadings = Boolean(list.querySelector('ol ol, ul ul'));

    function renderContents(expanded) {
      window.tocbot.init({
        tocSelector: '.tocbot-list',
        contentSelector: '.article-content',
        headingSelector: 'h1, h2, h3, h4, h5, h6',
        collapseDepth: expanded ? 6 : 1,
        orderedList: false,
        scrollSmooth: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        scrollSmoothOffset: -24,
        headingsOffset: 28
      });
      expand.setAttribute('aria-expanded', String(expanded));
      expand.textContent = expanded ? '收起层级' : '展开全部';
    }

    renderContents(false);
    expand.hidden = !hasNestedHeadings;
    expand.addEventListener('click', function () {
      renderContents(expand.getAttribute('aria-expanded') === 'false');
    });
  });
})();
