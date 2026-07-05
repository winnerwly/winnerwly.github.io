// Minimal DOM-ready helper for the theme.
(function () {
  var ready = function (callback) {
    if (document.readyState !== 'loading') {
      callback();
      return;
    }
    document.addEventListener('DOMContentLoaded', callback);
  };

  ready(function () {
    var storageKey = 'theme-preference';
    var root = document.documentElement;
    var body = document.body;
    var toggleButtons = [
      document.getElementById('theme-toggle'),
      document.getElementById('mobile-toggle-theme')
    ];

    var getTheme = function () {
      try {
        return localStorage.getItem(storageKey) || 'dark';
      } catch (e) {
        return 'dark';
      }
    };

    var applyTheme = function (theme) {
      var activeTheme = theme === 'light' ? 'light' : 'dark';
      root.classList.remove('light-theme', 'dark-theme');
      root.classList.add(activeTheme + '-theme');
      root.setAttribute('data-theme', activeTheme);

      if (body) {
        body.classList.remove('light-theme', 'dark-theme');
        body.classList.add(activeTheme + '-theme');
      }

      toggleButtons.forEach(function (button) {
        if (!button) return;
        var label = activeTheme === 'dark' ? '切换到浅色主题' : '切换到深色主题';
        button.setAttribute('aria-label', label);
        button.setAttribute('title', label);
        button.setAttribute('data-theme-mode', activeTheme);
      });
    };

    var setTheme = function (theme) {
      try {
        localStorage.setItem(storageKey, theme);
      } catch (e) {}
      applyTheme(theme);
    };

    var currentTheme = getTheme();
    applyTheme(currentTheme);

    toggleButtons.forEach(function (button) {
      if (!button) return;
      button.addEventListener('click', function () {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(currentTheme);
      });
    });
  });
})();
