import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { productSeed } from "../src/db/seed-data";
import { extraProductSeed } from "../src/db/enhancements";
import { dmartProducts } from "../src/db/dmart-products";
import { expandedProducts } from "../src/db/expanded-products";
import { originalExpansionProducts } from "../src/db/original-expansion";

const outputDir = path.join(process.cwd(), "public/images/product-art");
const items = [
  ...productSeed,
  ...extraProductSeed,
  ...dmartProducts,
  ...expandedProducts,
  ...originalExpansionProducts,
];

const categoryPalettes: Record<string, [string, string, string][]> = {
  "atta-rice-grains": [["#78350f", "#d97706", "#fef3c7"], ["#7c2d12", "#ea580c", "#ffedd5"], ["#713f12", "#ca8a04", "#fef9c3"]],
  "dal-pulses": [["#064e3b", "#059669", "#d1fae5"], ["#713f12", "#a16207", "#fef9c3"], ["#7c2d12", "#c2410c", "#ffedd5"]],
  "oils-ghee": [["#713f12", "#eab308", "#fef9c3"], ["#78350f", "#f59e0b", "#fef3c7"], ["#7c2d12", "#d97706", "#ffedd5"]],
  "oil-ghee": [["#713f12", "#eab308", "#fef9c3"], ["#78350f", "#f59e0b", "#fef3c7"]],
  "spices-masalas": [["#7c2d12", "#dc2626", "#fee2e2"], ["#7f1d1d", "#b91c1c", "#fee2e2"], ["#713f12", "#ea580c", "#ffedd5"]],
  "sugar-salt": [["#1e3a8a", "#3b82f6", "#dbeafe"], ["#3730a3", "#6366f1", "#e0e7ff"]],
  "tea-coffee": [["#78350f", "#92400e", "#fef3c7"], ["#7c2d12", "#7c2d12", "#ffedd5"], ["#374151", "#4b5563", "#f3f4f6"]],
  beverages: [["#78350f", "#92400e", "#fef3c7"], ["#064e3b", "#10b981", "#d1fae5"]],
  "biscuits-snacks": [["#7c2d12", "#ea580c", "#ffedd5"], ["#78350f", "#d97706", "#fef3c7"], ["#713f12", "#ca8a04", "#fef9c3"]],
  "fresh-produce": [["#064e3b", "#10b981", "#d1fae5"], ["#7c2d12", "#16a34a", "#dcfce7"], ["#713f12", "#22c55e", "#bbf7d0"]],
  "dairy-eggs": [["#1e3a8a", "#3b82f6", "#dbeafe"], ["#3730a3", "#6366f1", "#e0e7ff"], ["#064e3b", "#0ea5e9", "#e0f2fe"]],
  "bakery-breakfast": [["#78350f", "#d97706", "#fef3c7"], ["#7c2d12", "#ea580c", "#ffedd5"]],
  "personal-care": [["#831843", "#ec4899", "#fce7f3"], ["#581c87", "#a855f7", "#f3e8ff"], ["#064e3b", "#14b8a6", "#ccfbf1"]],
  household: [["#064e3b", "#14b8a6", "#ccfbf1"], ["#1e3a8a", "#0ea5e9", "#e0f2fe"], ["#134e4a", "#0891b2", "#cffafe"]],
};

function hash(value: string) {
  return [...value].reduce((total, char) => (total * 31 + char.charCodeAt(0)) >>> 0, 7);
}

function escape(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function lines(name: string) {
  const words = name.split(/\s+/);
  const result: string[] = [];
  let line = "";
  for (const word of words) {
    if (`${line} ${word}`.trim().length > 22 && line) {
      result.push(line);
      line = word;
    } else line = `${line} ${word}`.trim();
  }
  if (line) result.push(line);
  return result.slice(0, 3);
}

function label(category: string) {
  return ({
    "atta-rice-grains": "STAPLES", "dal-pulses": "PULSES", "oils-ghee": "OIL & GHEE",
    "oil-ghee": "COOKING OIL", "spices-masalas": "MASALA", "sugar-salt": "ESSENTIALS",
    "tea-coffee": "BEVERAGES", beverages: "BEVERAGES", "biscuits-snacks": "SNACKS",
    "fresh-produce": "FRESH PRODUCE", "dairy-eggs": "DAIRY", "bakery-breakfast": "BREAKFAST",
    "personal-care": "PERSONAL CARE", household: "HOME CARE",
  } as Record<string, string>)[category] ?? "DAILY ESSENTIAL";
}

function packShape(category: string, slug: string, color: string, light: string) {
  if (category.includes("oil") || /oil|ghee/.test(slug)) {
    return `<path d="M455 270h290l-18 88 68 77v440c0 55-45 100-100 100H505c-55 0-100-45-100-100V435l68-77-18-88Z" fill="#fff" filter="url(#shadow)"/><rect x="490" y="205" width="220" height="105" rx="28" fill="${color}"/><rect x="445" y="510" width="310" height="325" rx="34" fill="${light}"/><path d="M455 650h290" stroke="${color}" stroke-width="14"/><circle cx="520" cy="580" r="8" fill="${color}" opacity=".3"/><circle cx="680" cy="580" r="8" fill="${color}" opacity=".3"/>`;
  }
  if (category === "personal-care" || category === "household") {
    return `<path d="M470 260h260v95l58 74v450c0 53-43 96-96 96H508c-53 0-96-43-96-96V429l58-74v-95Z" fill="#fff" filter="url(#shadow)"/><rect x="505" y="188" width="190" height="108" rx="24" fill="${color}"/><path d="M455 500h290v345H455z" fill="${light}"/><circle cx="600" cy="675" r="95" fill="#fff" opacity=".65"/><path d="M540 750h120M540 790h120M540 830h120" stroke="${color}" stroke-width="8" opacity=".4"/>`;
  }
  if (category === "fresh-produce") {
    return `<circle cx="600" cy="610" r="355" fill="#fff" filter="url(#shadow)"/><circle cx="600" cy="610" r="315" fill="${light}"/><path d="M350 820c150 85 350 85 500 0" fill="none" stroke="${color}" stroke-width="24" stroke-linecap="round"/><circle cx="520" cy="650" r="12" fill="${color}" opacity=".4"/><circle cx="680" cy="650" r="12" fill="${color}" opacity=".4"/><circle cx="600" cy="720" r="12" fill="${color}" opacity=".4"/>`;
  }
  if (category === "dairy-eggs" || category === "beverages" || category === "tea-coffee") {
    return `<path d="m430 310 90-115h250l75 115v590c0 42-34 76-76 76H431c-42 0-76-34-76-76V310h75Z" fill="#fff" filter="url(#shadow)"/><path d="M430 310h415L770 195H520z" fill="${color}"/><rect x="400" y="475" width="400" height="360" rx="32" fill="${light}"/><path d="M450 550h300M450 620h300M450 690h300M450 760h300" stroke="${color}" stroke-width="6" opacity=".3"/>`;
  }
  return `<path d="M360 240c145-45 335-45 480 0l-35 690c-135 58-275 58-410 0l-35-690Z" fill="#fff" filter="url(#shadow)"/><path d="M360 240c145-45 335-45 480 0l-8 150H368l-8-150Z" fill="${color}"/><path d="M382 735h436l-13 195c-135 58-275 58-410 0l-13-195Z" fill="${light}"/><ellipse cx="600" cy="760" rx="160" ry="85" fill="#fff" opacity=".7"/><path d="M480 800h240M480 840h240" stroke="${color}" stroke-width="8" opacity=".3"/>`;
}

function barcodeHint(x: number, y: number, color: string) {
  const bars = [3, 1, 4, 2, 5, 1, 3, 2, 4, 1, 3, 2, 5, 1, 4, 2, 3, 1];
  let svg = `<g opacity=".6">`;
  let offset = 0;
  for (const width of bars) {
    svg += `<rect x="${x + offset}" y="${y}" width="${width}" height="45" fill="${color}"/>`;
    offset += width + 2;
  }
  svg += `</g>`;
  return svg;
}

async function main() {
  await mkdir(outputDir, { recursive: true });
  const seen = new Set<string>();
  let count = 0;
  for (const item of items) {
    if (seen.has(item.slug)) continue;
    seen.add(item.slug);
    const palettes = categoryPalettes[item.categorySlug] ?? categoryPalettes["atta-rice-grains"];
    const [dark, color, light] = palettes[hash(item.slug) % palettes.length];
    const title = lines(item.name);
    const titleMarkup = title.map((line, index) => `<tspan x="600" dy="${index === 0 ? 0 : 54}">${escape(line)}</tspan>`).join("");
    const packHeader = escape(item.name.split(/\s+/).slice(0, 2).join(" ").toUpperCase());
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
<defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${light}"/><stop offset="1" stop-color="#fff"/></linearGradient><filter id="shadow" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="28" stdDeviation="28" flood-color="${dark}" flood-opacity=".2"/></filter><pattern id="dots" width="46" height="46" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="3" fill="${color}" opacity=".16"/></pattern></defs>
<rect width="1200" height="1200" rx="80" fill="url(#bg)"/><rect width="1200" height="1200" rx="80" fill="url(#dots)"/>
<circle cx="1050" cy="145" r="170" fill="${color}" opacity=".1"/><circle cx="125" cy="1050" r="210" fill="${dark}" opacity=".08"/>
${packShape(item.categorySlug, item.slug, color, light)}
<text x="600" y="355" text-anchor="middle" font-family="Arial, sans-serif" font-size="25" font-weight="800" letter-spacing="5" fill="${dark}">${packHeader}</text>
<text x="600" y="460" text-anchor="middle" font-family="Arial, sans-serif" font-size="23" font-weight="800" letter-spacing="4" fill="${color}">${escape(label(item.categorySlug))}</text>
<text x="600" y="640" text-anchor="middle" font-family="Apple Color Emoji, Segoe UI Emoji, sans-serif" font-size="155">${escape(item.emoji)}</text>
<text x="600" y="815" text-anchor="middle" font-family="Arial, sans-serif" font-size="43" font-weight="900" fill="${dark}">${titleMarkup}</text>
<rect x="485" y="945" width="230" height="58" rx="29" fill="${dark}"/><text x="600" y="984" text-anchor="middle" font-family="Arial, sans-serif" font-size="25" font-weight="800" fill="#fff">${escape(item.unit.toUpperCase())}</text>
<text x="600" y="1090" text-anchor="middle" font-family="Arial, sans-serif" font-size="19" font-weight="700" letter-spacing="5" fill="${dark}" opacity=".65">QUALITY ASSURED • DAILY VALUE</text>
${barcodeHint(420, 1120, dark)}
</svg>`;
    await writeFile(path.join(outputDir, `${item.slug}.svg`), svg);
    count += 1;
  }
  console.log(`Generated ${count} unique 1200×1200 product visuals.`);
}

main().catch((error) => { console.error(error); process.exit(1); });
