// Nusantara Data — Indonesia national statistics, compiled from published official series.
// Every figure carries its source and reference year. Values marked "est." are rounded
// estimates from the named source; nothing here is fetched at run time.

export const country = {
  name: 'Indonesia',
  tagline: 'The archipelago in numbers — people, economy, health, learning and regions.',
  capital: 'Jakarta',
  provinces: 38,
  landKm2: 1904569,
  islands: '17,000+ (about 6,000 inhabited)',
  currency: 'Rupiah (IDR)',
  languages: 'Bahasa Indonesia (official) + 700+ local languages',
};

export const headlines = [
  { label: 'Population', value: '283.5M', note: '2024 · BPS / World Bank', delta: '+0.8% a year', page: 'population' },
  { label: 'GDP', value: '$1.40 tn', note: '2024 est. · World Bank', delta: 'growth 5.0% in 2024', page: 'economy' },
  { label: 'Inflation', value: '1.6%', note: 'Dec 2024, y/y · BPS', delta: 'within 1.5–3.5% target', page: 'economy' },
  { label: 'Unemployment', value: '4.9%', note: 'Aug 2024 · BPS Sakernas', delta: 'lowest in a decade', page: 'economy' },
  { label: 'Life expectancy', value: '72 yrs', note: '2023 · World Bank', delta: 'up from 65 in 2000', page: 'health' },
  { label: 'Literacy (15+)', value: '96%', note: '2023 est. · UNESCO UIS', delta: 'near-universal youth literacy', page: 'education' },
  { label: 'Internet users', value: '79.5%', note: '2024 · APJII survey', delta: '221.6M people online', page: 'population' },
  { label: 'Poverty rate', value: '8.6%', note: 'Sep 2024 · BPS', delta: 'first time below 9%', page: 'economy' },
];

// Population by census / intercensal estimate, millions (BPS; World Bank WDI for 2020–2024).
export const populationSeries = [
  { year: 1961, value: 97.1 }, { year: 1971, value: 119.2 }, { year: 1980, value: 147.5 },
  { year: 1990, value: 179.4 }, { year: 2000, value: 206.3 }, { year: 2010, value: 237.6 },
  { year: 2020, value: 270.2 }, { year: 2024, value: 283.5 },
];

// Real GDP growth, % year on year (BPS).
export const growthSeries = [
  { year: 2015, value: 4.9 }, { year: 2016, value: 5.0 }, { year: 2017, value: 5.1 },
  { year: 2018, value: 5.2 }, { year: 2019, value: 5.0 }, { year: 2020, value: -2.1 },
  { year: 2021, value: 3.7 }, { year: 2022, value: 5.3 }, { year: 2023, value: 5.0 },
  { year: 2024, value: 5.0 },
];

// December inflation, % year on year (BPS).
export const inflationSeries = [
  { year: 2015, value: 3.4 }, { year: 2016, value: 3.0 }, { year: 2017, value: 3.6 },
  { year: 2018, value: 3.1 }, { year: 2019, value: 2.7 }, { year: 2020, value: 1.7 },
  { year: 2021, value: 1.9 }, { year: 2022, value: 5.5 }, { year: 2023, value: 2.6 },
  { year: 2024, value: 1.6 },
];

// GDP by sector, share of 2024 output (BPS, rounded).
export const sectors = [
  { name: 'Manufacturing', share: 18.9 },
  { name: 'Agriculture, forestry & fishing', share: 12.6 },
  { name: 'Wholesale & retail trade', share: 12.4 },
  { name: 'Construction', share: 10.1 },
  { name: 'Mining & quarrying', share: 9.2 },
  { name: 'Transport & storage', share: 6.2 },
  { name: 'Information & communication', share: 4.4 },
  { name: 'Finance & insurance', share: 4.2 },
  { name: 'All other sectors', share: 22.0 },
];

// Age structure, % of population (BPS 2024 projection, rounded).
export const ageBands = [
  { band: '0–14', share: 24.5, note: '69M children' },
  { band: '15–24', share: 16.6, note: '47M youth' },
  { band: '25–49', share: 36.8, note: '104M prime working age' },
  { band: '50–64', share: 14.3, note: '41M' },
  { band: '65+', share: 7.8, note: '22M older adults' },
];

export const populationFacts = [
  { label: 'Urban share', value: '59%', note: '2024 · World Bank (urban population share)' },
  { label: 'Median age', value: '30.5 yrs', note: '2024 est. · UN World Population Prospects' },
  { label: 'Fertility rate', value: '2.1 children', note: '2023 · World Bank (births per woman)' },
  { label: 'Density', value: '149 / km²', note: '2024 · 283.5M over 1.90M km² of land' },
  { label: 'Java share', value: '~56%', note: '2024 · BPS (Java holds the majority)' },
  { label: 'Sex ratio', value: '102 men : 100 women', note: '2024 est. · BPS projection' },
];

export const economyFacts = [
  { label: 'GDP per capita', value: '$4,925', note: '2024 · World Bank (current US$)' },
  { label: 'Gini index', value: '0.381', note: 'Sep 2024 · BPS (0 = equal, 1 = unequal)' },
  { label: 'Exports', value: '$265 bn', note: '2024 · BPS (goods, rounded)' },
  { label: 'Trade balance', value: 'Surplus', note: '2024 · BPS (56th straight monthly surplus by Dec)' },
  { label: 'Labour force', value: '152M', note: 'Aug 2024 · BPS Sakernas' },
  { label: 'Informal work', value: '~59%', note: '2024 · BPS (share of workers)' },
];

export const healthFacts = [
  { label: 'Life expectancy', value: '72 years', note: '2023 · World Bank (both sexes)' },
  { label: 'Infant mortality', value: '16 / 1,000', note: '2023 · World Bank (live births)' },
  { label: 'Under-5 mortality', value: '20 / 1,000', note: '2023 · World Bank (live births)' },
  { label: 'Stunting (under-5)', value: '21.5%', note: '2023 · Ministry of Health (SKI survey)' },
  { label: 'Health coverage', value: '~97%', note: '2024 · BPJS Kesehatan membership, rounded' },
  { label: 'Doctors', value: '~0.7 / 1,000', note: '2023 est. · WHO Global Health Observatory' },
];

// Life expectancy at birth, years (World Bank WDI, rounded).
export const lifeSeries = [
  { year: 2000, value: 65 }, { year: 2005, value: 66 }, { year: 2010, value: 68 },
  { year: 2015, value: 70 }, { year: 2019, value: 71 }, { year: 2023, value: 72 },
];

export const educationFacts = [
  { label: 'Literacy, age 15+', value: '96%', note: '2023 est. · UNESCO UIS' },
  { label: 'Youth literacy', value: '~99%', note: '2023 est. · UNESCO UIS (ages 15–24)' },
  { label: 'Mean schooling', value: '8.8 years', note: '2024 · BPS (adults 25+)' },
  { label: 'Expected schooling', value: '13.2 years', note: '2024 · BPS (children entering school)' },
  { label: 'Primary enrolment', value: '~106%', note: '2023 · World Bank (gross, incl. over-age)' },
  { label: 'Tertiary enrolment', value: '~36%', note: '2023 est. · World Bank (gross)' },
];

// Net enrolment by level, % (Kemendikbud / BPS, rounded, 2023/24 school year).
export const enrolment = [
  { level: 'Primary (SD)', rate: 97 },
  { level: 'Junior secondary (SMP)', rate: 82 },
  { level: 'Senior secondary (SMA/SMK)', rate: 69 },
  { level: 'Tertiary', rate: 36 },
];

// All 38 provinces. Population: BPS 2023 mid-year estimates, millions, rounded to 0.1.
// Area: km² land area, rounded. GRDP per capita is deliberately omitted: provincial
// releases mix reference years, so this table keeps to population, area and density.
export const provinces = [
  { name: 'Aceh', capital: 'Banda Aceh', island: 'Sumatra', pop: 5.5, area: 57956 },
  { name: 'North Sumatra', capital: 'Medan', island: 'Sumatra', pop: 15.4, area: 72981 },
  { name: 'West Sumatra', capital: 'Padang', island: 'Sumatra', pop: 5.9, area: 42013 },
  { name: 'Riau', capital: 'Pekanbaru', island: 'Sumatra', pop: 6.9, area: 87824 },
  { name: 'Riau Islands', capital: 'Tanjung Pinang', island: 'Sumatra', pop: 2.2, area: 8202 },
  { name: 'Jambi', capital: 'Jambi', island: 'Sumatra', pop: 3.7, area: 50058 },
  { name: 'South Sumatra', capital: 'Palembang', island: 'Sumatra', pop: 8.8, area: 91592 },
  { name: 'Bangka Belitung', capital: 'Pangkal Pinang', island: 'Sumatra', pop: 1.5, area: 16424 },
  { name: 'Bengkulu', capital: 'Bengkulu', island: 'Sumatra', pop: 2.1, area: 19919 },
  { name: 'Lampung', capital: 'Bandar Lampung', island: 'Sumatra', pop: 9.4, area: 34624 },
  { name: 'Banten', capital: 'Serang', island: 'Java', pop: 12.4, area: 9663 },
  { name: 'Jakarta (DKI)', capital: 'Jakarta', island: 'Java', pop: 10.7, area: 664 },
  { name: 'West Java', capital: 'Bandung', island: 'Java', pop: 50.3, area: 37040 },
  { name: 'Central Java', capital: 'Semarang', island: 'Java', pop: 38.0, area: 32801 },
  { name: 'Yogyakarta (DIY)', capital: 'Yogyakarta', island: 'Java', pop: 3.8, area: 3133 },
  { name: 'East Java', capital: 'Surabaya', island: 'Java', pop: 41.4, area: 47804 },
  { name: 'Bali', capital: 'Denpasar', island: 'Bali & Nusa Tenggara', pop: 4.4, area: 5780 },
  { name: 'West Nusa Tenggara', capital: 'Mataram', island: 'Bali & Nusa Tenggara', pop: 5.6, area: 18572 },
  { name: 'East Nusa Tenggara', capital: 'Kupang', island: 'Bali & Nusa Tenggara', pop: 5.6, area: 48718 },
  { name: 'West Kalimantan', capital: 'Pontianak', island: 'Kalimantan', pop: 5.6, area: 147307 },
  { name: 'Central Kalimantan', capital: 'Palangka Raya', island: 'Kalimantan', pop: 2.8, area: 153565 },
  { name: 'South Kalimantan', capital: 'Banjarbaru', island: 'Kalimantan', pop: 4.2, area: 38744 },
  { name: 'East Kalimantan', capital: 'Samarinda', island: 'Kalimantan', pop: 4.1, area: 129067 },
  { name: 'North Kalimantan', capital: 'Tanjung Selor', island: 'Kalimantan', pop: 0.7, area: 75468 },
  { name: 'North Sulawesi', capital: 'Manado', island: 'Sulawesi', pop: 2.7, area: 13852 },
  { name: 'Gorontalo', capital: 'Gorontalo', island: 'Sulawesi', pop: 1.2, area: 11257 },
  { name: 'Central Sulawesi', capital: 'Palu', island: 'Sulawesi', pop: 3.1, area: 61841 },
  { name: 'West Sulawesi', capital: 'Mamuju', island: 'Sulawesi', pop: 1.5, area: 16788 },
  { name: 'South Sulawesi', capital: 'Makassar', island: 'Sulawesi', pop: 9.5, area: 46717 },
  { name: 'Southeast Sulawesi', capital: 'Kendari', island: 'Sulawesi', pop: 2.7, area: 38068 },
  { name: 'Maluku', capital: 'Ambon', island: 'Maluku & Papua', pop: 1.9, area: 46914 },
  { name: 'North Maluku', capital: 'Sofifi', island: 'Maluku & Papua', pop: 1.4, area: 31983 },
  { name: 'Papua', capital: 'Jayapura', island: 'Maluku & Papua', pop: 1.1, area: 82811 },
  { name: 'West Papua', capital: 'Manokwari', island: 'Maluku & Papua', pop: 0.6, area: 60199 },
  { name: 'Southwest Papua', capital: 'Sorong', island: 'Maluku & Papua', pop: 0.6, area: 39123 },
  { name: 'Central Papua', capital: 'Nabire', island: 'Maluku & Papua', pop: 1.4, area: 61353 },
  { name: 'Highland Papua', capital: 'Wamena', island: 'Maluku & Papua', pop: 1.5, area: 51410 },
  { name: 'South Papua', capital: 'Merauke', island: 'Maluku & Papua', pop: 0.5, area: 117849 },
];

export const islandGroups = ['All islands', 'Sumatra', 'Java', 'Bali & Nusa Tenggara', 'Kalimantan', 'Sulawesi', 'Maluku & Papua'];

export const sources = [
  { name: 'BPS — Statistics Indonesia', detail: 'Censuses, Sakernas labour survey, CPI, GDP, poverty and provincial estimates (bps.go.id).' },
  { name: 'World Bank — World Development Indicators', detail: 'Population, GDP, life expectancy, mortality and enrolment series (data.worldbank.org).' },
  { name: 'APJII', detail: 'Annual internet-user survey, 2024 release: 221.6M users, 79.5% penetration.' },
  { name: 'Ministry of Health (Kemenkes)', detail: 'Indonesian Health Survey (SKI) 2023: stunting and nutrition indicators.' },
  { name: 'UNESCO UIS / WHO GHO', detail: 'Literacy and health-workforce estimates, marked “est.” wherever modelled.' },
  { name: 'UN World Population Prospects', detail: 'Median age and demographic projections.' },
];

export const methods = [
  'Every figure on this site is labelled with its source and reference year. Where a source publishes a modelled estimate rather than a count, the label says “est.”.',
  'Provincial populations are BPS 2023 mid-year estimates rounded to the nearest 0.1 million; density is computed from those rounded figures, so it may differ by a person or two per km² from BPS’s own table.',
  'Chart series keep the source’s published values, rounded to one decimal. The 2020 dip in GDP growth is the COVID-19 contraction (−2.1%).',
  'This is an independent summary site, not an official publication. For decisions, always check the primary release at the source named on each figure.',
];
