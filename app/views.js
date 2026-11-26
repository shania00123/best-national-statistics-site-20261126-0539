// Page templates for Nusantara Data. Interactive state (chart mode, table sort/filter)
// lives in main.js and is passed in, so every control re-renders from real data.

import {
  ageBands, country, economyFacts, educationFacts, enrolment, growthSeries, headlines,
  healthFacts, inflationSeries, islandGroups, lifeSeries, methods, populationFacts,
  populationSeries, provinces, sectors, sources,
} from './data.js';
import { barChart, lineChart, shareBars } from './charts.js';

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmtInt = (n) => n.toLocaleString('en-US');

export function nav(active) {
  const links = [
    ['#/', 'Overview', 'overview'],
    ['#/population', 'Population', 'population'],
    ['#/economy', 'Economy', 'economy'],
    ['#/health', 'Health', 'health'],
    ['#/education', 'Education', 'education'],
    ['#/regions', 'Regions', 'regions'],
    ['#/about', 'Sources & methods', 'about'],
  ];
  return `<nav class="nav" aria-label="Sections">${links.map(([href, label, key]) =>
    `<a href="${href}" class="${key === active ? 'on' : ''}" ${key === active ? 'aria-current="page"' : ''}>${label}</a>`).join('')}</nav>`;
}

function factGrid(facts) {
  return `<div class="facts">${facts.map((f) => `
    <article class="fact"><h3>${esc(f.label)}</h3><p class="fact-value">${esc(f.value)}</p><p class="fact-note">${esc(f.note)}</p></article>`).join('')}</div>`;
}

function chartCard(title, sub, chart, toggle) {
  return `<section class="card chart-card"><div class="card-head"><div><h2>${esc(title)}</h2><p class="sub">${esc(sub)}</p></div>${toggle ?? ''}</div>${chart}</section>`;
}

function modeToggle(id, mode) {
  return `<div class="toggle" role="group" aria-label="Chart type">
    <button data-toggle="${id}:line" class="${mode === 'line' ? 'on' : ''}">Line</button>
    <button data-toggle="${id}:bar" class="${mode === 'bar' ? 'on' : ''}">Bars</button></div>`;
}

export function overview(state) {
  const cards = headlines.map((h) => `
    <a class="stat" href="#/${h.page}"><span class="stat-label">${esc(h.label)}</span>
      <span class="stat-value">${esc(h.value)}</span>
      <span class="stat-note">${esc(h.note)}</span>
      <span class="stat-delta">${esc(h.delta)}</span></a>`).join('');
  const chart = state.overviewMode === 'bar'
    ? barChart(populationSeries, { unit: 'M', color: '#0f766e', min: 0 })
    : lineChart(populationSeries, { unit: 'M', color: '#0f766e' });
  return `
  <section class="hero">
    <p class="eyebrow">National statistics · ${esc(country.name)}</p>
    <h1>${esc(country.name)} in numbers</h1>
    <p class="lede">${esc(country.tagline)} Capital ${esc(country.capital)} · ${country.provinces} provinces · ${fmtInt(country.landKm2)} km² of land · ${esc(country.islands)} islands. Every figure below names its source and year — tap any card to explore its section.</p>
  </section>
  <div class="stats">${cards}</div>
  ${chartCard('Population, 1961–2024', 'Millions of people · BPS censuses; World Bank WDI for 2020–2024', chart, modeToggle('overviewMode', state.overviewMode))}
  <section class="card">
    <h2>Explore the country</h2>
    <p class="sub">Five sections, each with charts, labelled figures and working controls.</p>
    <div class="explore">
      <a href="#/population"><strong>Population</strong><span>Growth since 1961, age structure, cities and connectivity.</span></a>
      <a href="#/economy"><strong>Economy</strong><span>Growth, inflation, jobs, poverty and what the economy makes.</span></a>
      <a href="#/health"><strong>Health</strong><span>Life expectancy, child survival, nutrition and coverage.</span></a>
      <a href="#/education"><strong>Education</strong><span>Literacy, years of schooling and enrolment by level.</span></a>
      <a href="#/regions"><strong>Regions</strong><span>All 38 provinces — searchable, sortable, filterable by island.</span></a>
    </div>
  </section>`;
}

export function population(state) {
  const chart = state.popMode === 'bar'
    ? barChart(populationSeries, { unit: 'M', color: '#0f766e', min: 0 })
    : lineChart(populationSeries, { unit: 'M', color: '#0f766e' });
  return `
  <section class="hero compact"><p class="eyebrow">Population</p><h1>283.5 million people</h1>
  <p class="lede">The world’s fourth most populous country, growing at about 0.8% a year — slower than a generation ago, and ageing gradually.</p></section>
  ${factGrid(populationFacts)}
  ${chartCard('Population growth, 1961–2024', 'Millions · BPS censuses and projections', chart, modeToggle('popMode', state.popMode))}
  <section class="card"><h2>Age structure, 2024</h2><p class="sub">Share of population by age band · BPS projection, rounded</p>
    ${shareBars(ageBands.map((b) => ({ name: `Age ${b.band} — ${b.note}`, share: b.share })), { color: '#0f766e' })}
    <p class="reading">About two-thirds of Indonesians are of working age (15–64). The 65+ share, 7.8% today, is the fastest-growing band — the “demographic bonus” window is now.</p></section>
  <section class="card"><h2>Connected and urban</h2><p class="sub">APJII 2024 survey; World Bank urban share</p>
    ${shareBars([
      { name: 'Internet users (APJII 2024)', share: 79.5 },
      { name: 'Living in urban areas (2024)', share: 59 },
      { name: 'Living on Java (2024)', share: 56 },
    ], { color: '#2563eb' })}
    <p class="reading">Four in five Indonesians are online, yet settlement stays concentrated: Java, with about 7% of the land, holds roughly 56% of the people.</p></section>`;
}

export function economy(state) {
  const series = state.econSeries === 'inflation' ? inflationSeries : growthSeries;
  const isInflation = state.econSeries === 'inflation';
  const chart = state.econMode === 'line'
    ? lineChart(series, { unit: '%', color: isInflation ? '#b45309' : '#0f766e', min: isInflation ? 0 : undefined })
    : barChart(series, { unit: '%', color: isInflation ? '#b45309' : '#0f766e' });
  const seriesToggle = `<div class="toggle" role="group" aria-label="Indicator">
    <button data-toggle="econSeries:growth" class="${!isInflation ? 'on' : ''}">GDP growth</button>
    <button data-toggle="econSeries:inflation" class="${isInflation ? 'on' : ''}">Inflation</button></div>`;
  return `
  <section class="hero compact"><p class="eyebrow">Economy</p><h1>A $1.4 trillion economy</h1>
  <p class="lede">Southeast Asia’s largest economy: growth near 5%, inflation back inside target, and poverty below 9% for the first time.</p></section>
  ${factGrid(economyFacts)}
  ${chartCard(isInflation ? 'Inflation, December y/y' : 'Real GDP growth', isInflation ? 'Consumer prices, % year on year · BPS' : 'Annual change in real GDP, % · BPS (2020: COVID-19 contraction)', chart, `<div class="toggle-stack">${seriesToggle}${modeToggle('econMode', state.econMode)}</div>`)}
  <section class="card"><h2>What the economy produces, 2024</h2><p class="sub">Share of GDP by sector · BPS, rounded</p>
    ${shareBars(sectors, { color: '#b45309' })}
    <p class="reading">Manufacturing is the largest single sector at 18.9% of GDP. Services — trade, transport, finance, ICT — together outweigh agriculture and mining combined.</p></section>`;
}

export function health(state) {
  const chart = state.healthMode === 'bar'
    ? barChart(lifeSeries, { unit: ' yrs', color: '#be185d', min: 60 })
    : lineChart(lifeSeries, { unit: ' yrs', color: '#be185d', min: 60 });
  return `
  <section class="hero compact"><p class="eyebrow">Health</p><h1>Living longer, starting healthier</h1>
  <p class="lede">Life expectancy has gained seven years since 2000. Child survival keeps improving; stunting remains the hard problem.</p></section>
  ${factGrid(healthFacts)}
  ${chartCard('Life expectancy at birth, 2000–2023', 'Years · World Bank WDI (axis starts at 60)', chart, modeToggle('healthMode', state.healthMode))}
  <section class="card"><h2>The stunting challenge</h2><p class="sub">Share of under-fives stunted · Ministry of Health surveys</p>
    ${shareBars([
      { name: 'Stunted, 2013 (Riskesdas)', share: 37.2 },
      { name: 'Stunted, 2018 (Riskesdas)', share: 30.8 },
      { name: 'Stunted, 2023 (SKI)', share: 21.5 },
      { name: 'National target, 2024', share: 14 },
    ], { color: '#be185d' })}
    <p class="reading">Stunting fell by more than 15 points in a decade, but at 21.5% it still affects roughly one in five young children — above the 14% target set for 2024.</p></section>`;
}

export function education() {
  return `
  <section class="hero compact"><p class="eyebrow">Education</p><h1>Near-universal literacy</h1>
  <p class="lede">Almost every young Indonesian can read and write. The gap now is depth: how many years of schooling people complete, and at what quality.</p></section>
  ${factGrid(educationFacts)}
  <section class="card"><h2>Enrolment by level, 2023/24</h2><p class="sub">Net enrolment rate, % of official age group · Kemendikbud / BPS, rounded</p>
    ${shareBars(enrolment, { color: '#6d28d9' })}
    <p class="reading">Primary school is effectively universal at 97%. The steepest drop comes after junior secondary: about three in ten teenagers are not in senior secondary school.</p></section>
  <section class="card"><h2>Two schooling measures, explained</h2><p class="sub">BPS human-development indicators, 2024</p>
    <div class="explain">
      <div><h3>Mean years: 8.8</h3><p>The average adult aged 25+ has completed 8.8 years of schooling — roughly junior-secondary level. It rises slowly, as better-educated cohorts replace older ones.</p></div>
      <div><h3>Expected years: 13.2</h3><p>A child entering school today can expect 13.2 years of education if current enrolment patterns hold — the forward-looking twin of the mean.</p></div>
    </div></section>`;
}

export function regions(state) {
  const q = state.regionQuery.trim().toLowerCase();
  let rows = provinces.filter((p) =>
    (state.regionIsland === 'All islands' || p.island === state.regionIsland) &&
    (q === '' || p.name.toLowerCase().includes(q) || p.capital.toLowerCase().includes(q)));
  const key = state.regionSort;
  rows = [...rows].sort((a, b) => {
    const av = key === 'density' ? (a.pop * 1e6) / a.area : a[key];
    const bv = key === 'density' ? (b.pop * 1e6) / b.area : b[key];
    const cmp = typeof av === 'string' ? av.localeCompare(bv) : av - bv;
    return state.regionDir === 'asc' ? cmp : -cmp;
  });
  const totalPop = rows.reduce((s, p) => s + p.pop, 0);
  const arrow = (k) => (state.regionSort === k ? (state.regionDir === 'asc' ? ' ↑' : ' ↓') : '');
  const head = (k, label) => `<th><button class="sort" data-sort="${k}">${label}${arrow(k)}</button></th>`;
  const body = rows.map((p) => `<tr><td><strong>${esc(p.name)}</strong></td><td>${esc(p.capital)}</td><td>${esc(p.island)}</td>
    <td class="num">${p.pop.toFixed(1)}M</td><td class="num">${fmtInt(p.area)}</td><td class="num">${fmtInt(Math.round((p.pop * 1e6) / p.area))}</td></tr>`).join('');
  return `
  <section class="hero compact"><p class="eyebrow">Regions</p><h1>38 provinces</h1>
  <p class="lede">From Jakarta’s 16,000 people per km² to Highland Papua’s 30. Search, filter by island group, or tap a column to sort.</p></section>
  <section class="card">
    <div class="controls">
      <label class="search"><span>Search province or capital</span><input id="region-search" type="search" value="${esc(state.regionQuery)}" placeholder="e.g. Bandung, Papua, Bali…"></label>
      <div class="chips" role="group" aria-label="Island group">${islandGroups.map((g) =>
        `<button data-island="${esc(g)}" class="chip ${state.regionIsland === g ? 'on' : ''}">${esc(g)}</button>`).join('')}</div>
    </div>
    <p class="sub" id="region-summary">Showing ${rows.length} of 38 provinces · combined population ${totalPop.toFixed(1)}M · BPS 2023 estimates, rounded</p>
    <div class="tablewrap"><table>
      <thead><tr>${head('name', 'Province')}${head('capital', 'Capital')}${head('island', 'Island group')}${head('pop', 'Population')}${head('area', 'Area km²')}${head('density', 'People / km²')}</tr></thead>
      <tbody>${body || '<tr><td colspan="6" class="empty">No province matches that search. <button data-island="All islands" class="linklike">Reset filters</button></td></tr>'}</tbody>
    </table></div>
    <p class="reading">Density is computed from the rounded population and area shown, so it can differ slightly from BPS’s own published density.</p>
  </section>
  <section class="card"><h2>The five most populous provinces</h2><p class="sub">Millions of people · BPS 2023 estimates</p>
    ${shareBars([...provinces].sort((a, b) => b.pop - a.pop).slice(0, 5).map((p) => ({ name: `${p.name} (${p.capital})`, share: p.pop })), { color: '#0f766e', suffix: 'M' })}
    <p class="reading">West Java alone, at 50.3M, holds more people than most countries. The top three provinces — all on Java — together hold about 130M people.</p></section>`;
}

export function about() {
  return `
  <section class="hero compact"><p class="eyebrow">Sources & methods</p><h1>Where every number comes from</h1>
  <p class="lede">Nusantara Data is an independent summary. Each figure on the site names its source and year; this page explains how they were chosen.</p></section>
  <section class="card"><h2>Sources</h2><div class="sources">${sources.map((s) =>
    `<div class="source"><h3>${esc(s.name)}</h3><p>${esc(s.detail)}</p></div>`).join('')}</div></section>
  <section class="card"><h2>Methods & honesty notes</h2>${methods.map((m) => `<p class="reading">${esc(m)}</p>`).join('')}
    <p class="reading">Currency is the ${esc(country.currency)}. Official language: ${esc(country.languages)}.</p></section>`;
}

export function missing() {
  return `<section class="hero compact"><h1>Page not found</h1><p class="lede">That section does not exist. <a href="#/">Return to the overview</a>.</p></section>`;
}
