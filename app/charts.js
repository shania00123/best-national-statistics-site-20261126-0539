// Inline-SVG chart builders: no library, no network. Each returns an SVG string sized
// by its viewBox so it scales from phone to desktop without layout shift.

const W = 640;
const H = 252;
const PAD = { top: 18, right: 16, bottom: 34, left: 52 };

function scale(values, min, max) {
  const lo = min ?? Math.min(...values);
  const hi = max ?? Math.max(...values);
  const span = hi - lo || 1;
  return (v) => PAD.top + (H - PAD.top - PAD.bottom) * (1 - (v - lo) / span);
}

function axes(lo, hi, fmt) {
  const y = scale([], lo, hi);
  let out = '';
  for (let i = 0; i <= 4; i++) {
    const v = lo + ((hi - lo) * i) / 4;
    const yy = y(v).toFixed(1);
    out += `<line x1="${PAD.left}" y1="${yy}" x2="${W - PAD.right}" y2="${yy}" class="grid"/>`;
    out += `<text x="${PAD.left - 8}" y="${yy}" class="axis" text-anchor="end" dy="4">${fmt(v)}</text>`;
  }
  return out;
}

export function lineChart(series, { unit = '', color = '#0f766e', min, max } = {}) {
  const values = series.map((d) => d.value);
  const lo = min ?? Math.floor(Math.min(...values) * 0.95);
  const hi = max ?? Math.ceil(Math.max(...values) * 1.05);
  const y = scale(values, lo, hi);
  const x = (i) => PAD.left + ((W - PAD.left - PAD.right) * i) / (series.length - 1);
  const pts = series.map((d, i) => `${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(' ');
  const area = `${PAD.left},${y(lo).toFixed(1)} ${pts} ${(W - PAD.right).toFixed(1)},${y(lo).toFixed(1)}`;
  const dots = series
    .map((d, i) => `<circle cx="${x(i).toFixed(1)}" cy="${y(d.value).toFixed(1)}" r="3.5" fill="${color}"><title>${d.year}: ${d.value}${unit}</title></circle>`)
    .join('');
  const labels = series
    .map((d, i) => (i % Math.ceil(series.length / 6) === 0 || i === series.length - 1
      ? `<text x="${x(i).toFixed(1)}" y="${H - 12}" class="axis" text-anchor="middle">${d.year}</text>` : ''))
    .join('');
  const last = series[series.length - 1];
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Line chart, latest ${last.year}: ${last.value}${unit}">
    ${axes(lo, hi, (v) => `${Math.round(v * 10) / 10}${unit}`)}
    <polygon points="${area}" fill="${color}" opacity="0.12"/>
    <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>
    ${dots}${labels}
    <text x="${(W - PAD.right).toFixed(1)}" y="${(y(last.value) - 10).toFixed(1)}" class="lastval" text-anchor="end" fill="${color}">${last.value}${unit}</text>
  </svg>`;
}

export function barChart(series, { unit = '', color = '#b45309', min = 0 } = {}) {
  const values = series.map((d) => d.value);
  const lo = Math.min(min, ...values);
  const hi = Math.max(...values) * 1.15;
  const y = scale(values, lo, hi);
  const slot = (W - PAD.left - PAD.right) / series.length;
  const bw = Math.min(38, slot * 0.62);
  const zeroY = y(Math.max(lo, 0));
  const bars = series.map((d, i) => {
    const cx = PAD.left + slot * i + slot / 2;
    const top = Math.min(y(d.value), zeroY);
    const height = Math.abs(zeroY - y(d.value));
    const fill = d.value < 0 ? '#b91c1c' : color;
    return `<rect x="${(cx - bw / 2).toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${height.toFixed(1)}" rx="3" fill="${fill}"><title>${d.year}: ${d.value}${unit}</title></rect>
      <text x="${cx.toFixed(1)}" y="${H - 12}" class="axis" text-anchor="middle">${d.year}</text>
      <text x="${cx.toFixed(1)}" y="${(d.value < 0 ? zeroY + 16 : top - 5).toFixed(1)}" class="barval" text-anchor="middle">${d.value}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Bar chart">${axes(lo, hi, (v) => `${Math.round(v * 10) / 10}${unit}`)}${bars}</svg>`;
}

// Horizontal share bars for sector / enrolment style data: [{name, share|rate}].
export function shareBars(rows, { color = '#0f766e', suffix = '%' } = {}) {
  const max = Math.max(...rows.map((r) => r.share ?? r.rate));
  return `<div class="sharebars">${rows.map((r) => {
    const v = r.share ?? r.rate;
    return `<div class="sharebar"><span class="sharebar-name">${r.name ?? r.level}</span>
      <span class="sharebar-track"><span class="sharebar-fill" style="width:${((v / max) * 100).toFixed(1)}%;background:${color}"></span></span>
      <span class="sharebar-val">${v}${suffix}</span></div>`;
  }).join('')}</div>`;
}
