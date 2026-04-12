// declaraction of document.ready() function.
(function () {
  var ie = !!(window.attachEvent && !window.opera);
  var wk = /webkit\/(\d+)/i.test(navigator.userAgent) && (RegExp.$1 < 525);
  var fn = [];
  var run = function () {
    for (var i = 0; i < fn.length; i++) fn[i]();
  };
  var d = document;
  d.ready = function (f) {
    if (!ie && !wk && d.addEventListener)
      return d.addEventListener('DOMContentLoaded', f, false);
    if (fn.push(f) > 1) return;
    if (ie)
      (function () {
        try {
          d.documentElement.doScroll('left');
          run();
        } catch (err) {
          setTimeout(arguments.callee, 0);
        }
      })();
    else if (wk)
      var t = setInterval(function () {
        if (/^(loaded|complete)$/.test(d.readyState))
          clearInterval(t), run();
      }, 0);
  };
})();

document.ready(function () {
  var storageKey = 'theme-preference';
  var root = document.documentElement;
  var body = document.body;
  var toggleButtons = [
    document.getElementById('theme-toggle'),
    document.getElementById('mobile-toggle-theme')
  ];

  var applyTheme = function (theme) {
    var isDark = theme !== 'light';
    root.classList.remove('light-theme', 'dark-theme');
    root.classList.add(isDark ? 'dark-theme' : 'light-theme');
    root.setAttribute('data-theme', isDark ? 'dark' : 'light');

    if (body) {
      body.classList.remove('light-theme', 'dark-theme');
      body.classList.add(isDark ? 'dark-theme' : 'light-theme');
    }

    for (var i = 0; i < toggleButtons.length; i++) {
      if (toggleButtons[i]) {
        toggleButtons[i].textContent = isDark ? 'DARK' : 'LIGHT';
        toggleButtons[i].setAttribute('aria-label', isDark ? '切换到浅色主题' : '切换到深色主题');
      }
    }
  };

  var getTheme = function () {
    try {
      return localStorage.getItem(storageKey) || 'dark';
    } catch (e) {
      return 'dark';
    }
  };

  var setTheme = function (theme) {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (e) {}
    applyTheme(theme);
  };

  var currentTheme = getTheme();
  applyTheme(currentTheme);

  var handleToggle = function () {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(currentTheme);
  };

  for (var i = 0; i < toggleButtons.length; i++) {
    if (toggleButtons[i]) {
      toggleButtons[i].addEventListener('click', handleToggle);
    }
  }
});
