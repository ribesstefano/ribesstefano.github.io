/*
 * Light/dark colour-scheme toggle.
 *
 * The initial value is applied in <head> (see _includes/head/custom.html) so the
 * page never flashes the wrong scheme. This script only wires up the button.
 */
(function () {
  'use strict';

  var root = document.documentElement;
  var buttons = document.querySelectorAll('.theme-toggle');

  if (!buttons.length) {
    return;
  }

  function currentTheme() {
    var explicit = root.getAttribute('data-theme');
    if (explicit === 'light' || explicit === 'dark') {
      return explicit;
    }
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('sr-theme', theme);
    } catch (e) {
      /* storage unavailable (private mode); the choice just won't persist */
    }
  }

  function toggle(event) {
    event.preventDefault();
    applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  }

  Array.prototype.forEach.call(buttons, function (button) {
    button.addEventListener('click', toggle);
    // The control is an <a role="button">, so it needs the keyboard behaviour
    // a real <button> would give us for free.
    button.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
        toggle(event);
      }
    });
  });
})();
