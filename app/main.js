// Nusantara Data — Indonesia national statistics on hash routes.
//   #/            overview dashboard
//   #/population  #/economy  #/health  #/education  #/regions  #/about
// All data is bundled in data.js; the site makes no network requests.
// window.__shotReady flips true once a page is on screen, for screenshot tooling.

import { about, economy, education, health, missing, nav, overview, population, regions } from './views.js';

const app = document.getElementById('app');
const navSlot = document.getElementById('nav');

const state = {
  overviewMode: 'line',
  popMode: 'line',
  econSeries: 'growth',
  econMode: 'bar',
  healthMode: 'line',
  regionQuery: '',
  regionIsland: 'All islands',
  regionSort: 'pop',
  regionDir: 'desc',
};

const pages = {
  overview: ['Indonesia in numbers', () => overview(state)],
  population: ['Population', () => population(state)],
  economy: ['Economy', () => economy(state)],
  health: ['Health', () => health(state)],
  education: ['Education', () => education()],
  regions: ['Regions — 38 provinces', () => regions(state)],
  about: ['Sources & methods', () => about()],
};

function currentPage() {
  const key = location.hash.replace(/^#\/?/, '').split('/')[0] || 'overview';
  return pages[key] ? key : null;
}

function render(keepScroll = false) {
  window.__shotReady = false;
  const key = currentPage();
  const y = window.scrollY;
  if (key) {
    document.title = `${pages[key][0]} | Nusantara Data — Indonesia Statistics`;
    app.innerHTML = pages[key][1]();
  } else {
    document.title = 'Not found | Nusantara Data — Indonesia Statistics';
    app.innerHTML = missing();
  }
  navSlot.innerHTML = nav(key ?? 'overview');
  wire();
  if (keepScroll) window.scrollTo(0, y); else window.scrollTo(0, 0);
  window.__shotReady = true;
}

function wire() {
  app.querySelectorAll('[data-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const [field, value] = btn.dataset.toggle.split(':');
      state[field] = value;
      render(true);
    });
  });
  app.querySelectorAll('[data-island]').forEach((btn) => {
    btn.addEventListener('click', () => {
      state.regionIsland = btn.dataset.island;
      if (btn.classList.contains('linklike')) state.regionQuery = '';
      render(true);
    });
  });
  app.querySelectorAll('[data-sort]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const k = btn.dataset.sort;
      if (state.regionSort === k) state.regionDir = state.regionDir === 'asc' ? 'desc' : 'asc';
      else { state.regionSort = k; state.regionDir = k === 'name' || k === 'capital' || k === 'island' ? 'asc' : 'desc'; }
      render(true);
    });
  });
  const search = document.getElementById('region-search');
  if (search) {
    search.addEventListener('input', () => {
      state.regionQuery = search.value;
      const pos = search.selectionStart;
      render(true);
      const again = document.getElementById('region-search');
      if (again) { again.focus(); again.setSelectionRange(pos, pos); }
    });
  }
}

window.addEventListener('hashchange', () => render(false));
render(false);
