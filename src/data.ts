/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, JournalArticle, SourcingPoint, PressMention } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "01",
    name: "L'Objet Brossé",
    frenchName: "brosse à dents en os et laiton",
    category: "toothbrush",
    price: 180,
    description: "A functional sculpture. Sculpted from hand-polished white bone and weighted with a solid raw brass neck sleeve. Features hand-tufted biodegradable bamboo charcoal fiber bristles designed for delicate stimulation and timeless preservation.",
    originCountry: "Jura, France",
    isLimited: true,
    limitedRemaining: 18,
    image: "/src/assets/images/selene_toothbrush_1782103208011.jpg",
    ingredients: [
      { name: "Polished White Bone", info: "Ethically salvaged, dense bone material, hand-shaped to cradle the palm.", origin: "Alps Foothills" },
      { name: "Raw Lead-Free Brass", info: "Unlacquered brass weight that gains a glorious personal patina over years of use.", origin: "Jura Valley" },
      { name: "Bamboo Charcoal Bristles", info: "Finely tapered natural filaments that naturally neutralize odors.", origin: "Kyoto Highlands" }
    ],
    ceremonySteps: [
      { step: "01", title: "The Embrace", description: "Hold the cool brass neck between your thumb and index finger, letting the dense bone counter-weight settle into the palm." },
      { step: "02", title: "The Cleansing Loop", description: "Use slow, deliberate circular strokes downward from the gum margin. Treat each tooth as a miniature architectural tile." },
      { step: "03", title: "The Return", description: "Rinse in tepid water and stand upright on raw travertine to dry naturally, allowing the brass to interact with the room atmosphere." }
    ],
    pairWithIds: ["02", "03"],
    rotationImages: ["/src/assets/images/selene_toothbrush_1782103208011.jpg"]
  },
  {
    id: "02",
    name: "La Pâte Dentaire",
    frenchName: "dentifrice minéral et menthe sauvage",
    category: "toothpaste",
    price: 65,
    description: "An obsidian-infused restorative paste presented in a soft, heavy-gauge aluminum tubes sealed with a heavy brass key. Infused with mineral silica, crushed volcanic obsidian, organic spearmint, and ancient Sado sea salt for absolute oral purification.",
    originCountry: "Hokkaido, Japan",
    isLimited: false,
    image: "/src/assets/images/selene_toothpaste_1782103222878.jpg",
    ingredients: [
      { name: "Sado Sea Minerals", info: "Mineral-dense deep sea salt collected from 200m depth to soothe delicate tissue.", origin: "Sado Island" },
      { name: "Birch Bark Sap", info: "Antibacterial elixir tapped at early thaw, keeping breath crystal-pure.", origin: "Hokkaido Forests" },
      { name: "Volcanic Obsidian", info: "Micro-ground polishing crystals that draw stains away without chemical bleaching.", origin: "Mount Yotei" }
    ],
    ceremonySteps: [
      { step: "01", title: "The Unleash", description: "Slowly thread the heavy brass key through the bottom of the tube, pressing just enough dark obsidian paste onto the dry bristles." },
      { step: "02", title: "The Activation", description: "Brush gently without water first. Allow the mineral saliva to create a warm, thick foam of botanical minerals." },
      { step: "03", title: "The Purification", description: "Rinse with deep ice-cold water, exhaling into the mirror to witness the crisp clarity of glacial mint." }
    ],
    pairWithIds: ["01", "04"],
    rotationImages: ["/src/assets/images/selene_toothpaste_1782103222878.jpg"]
  },
  {
    id: "03",
    name: "Le Pain d'Olive",
    frenchName: "savon minéral sur travertin",
    category: "soap",
    price: 95,
    description: "Cold-cured for six months, this dense bar of organic mountain olive nectar, wild sea grass, and pure sea clays rest on a custom chiselled square of raw Tuscan travertine stone. It lathers into a heavy, silk-cream emulsion that shields skin oils.",
    originCountry: "Tuscany, Italy",
    isLimited: true,
    limitedRemaining: 42,
    image: "/src/assets/images/selene_soap_1782103236712.jpg",
    ingredients: [
      { name: "Centenarian Olive Oil", info: "Hand-pressed olives from orchards active since the late Renaissance, dense in anti-oxidants.", origin: "Siena Groves" },
      { name: "Raw Silt Clay", info: "Nutrient-packed grey clay that purges environmental pollutants on touch.", origin: "Volterra Thermal Springs" },
      { name: "Wild Vetiver Extract", info: "An earthy, smoked grounding oil that anchors natural skin scent.", origin: "Reunion Plains" }
    ],
    ceremonySteps: [
      { step: "01", title: "The Temperance", description: "Slowly rotate the soap bar in warm hands under running stream to release the first slick layer of herbal oils." },
      { step: "02", title: "The Anointing", description: "Apply the thick cream directly to temple, collarbone, and hands. Do not scrub; let the thermal silt extract toxins through temperature difference." },
      { step: "03", title: "The Resting", description: "Rinse and return the block to its custom travertine tablet. It absorbs excess moisture, ensuring the soap returns to marble dryness." }
    ],
    pairWithIds: ["01", "04"],
    rotationImages: ["/src/assets/images/selene_soap_1782103236712.jpg"]
  },
  {
    id: "04",
    name: "L'Ambre Céleste",
    frenchName: "bougie parfumée de cire d'abeille",
    category: "candle",
    price: 150,
    description: "An olfactive masterpiece. Crafted from hand-collected forest forest apiary beeswax poured into a heavy charcoal-smoked double-wall glass cylinder. Releases a quiet and hypnotic cedarwood, damp moss, leather, and grey ambergris throw that mimics an ancient library in winter.",
    originCountry: "Jura Alps, France",
    isLimited: false,
    image: "/src/assets/images/selene_candle_1782103251354.jpg",
    ingredients: [
      { name: "Highland Forest Beeswax", info: "Unrefined raw beeswax that burns pristine, sweet, and incredibly slow without toxic emissions.", origin: "Jura Pine Ridges" },
      { name: "Grey Ambergris Infusion", info: "A marine-salted animalic pheromone note that suspends fragrance molecules for 24-hour persistence.", origin: "Atlantic Shores" },
      { name: "Cured Cedarwood Oil", info: "Smoked cedar heartwood distillate that crackles softly in the burning wick.", origin: "Kyoto Woodlands" }
    ],
    ceremonySteps: [
      { step: "01", title: "The Truncation", description: "Trim the lead-free organic linen wick to exactly 4mm before striking match. This guarantees a quiet, smokeless steady pool." },
      { step: "02", title: "The Wax Pool", description: "Let the candle burn for at least two hours on first ignition to let the liquid wax melt uniformly to the glass perimeter." },
      { step: "03", title: "The Cloaking", description: "Never blow out the flame. Extinguish by gently placing the included glass coaster over the rim, confining the embers." }
    ],
    pairWithIds: ["02", "03"],
    rotationImages: ["/src/assets/images/selene_candle_1782103251354.jpg"]
  }
];

export const HERO_STILL_LIFE_IMAGE = "/src/assets/images/selene_hero_1782103267922.jpg";

export const BRAND_PHILOSOPHY = {
  manifestoLines: [
    "Nature, sourced with pure obsession.",
    "Science, explained with quiet poetry.",
    "The daily care, returned to its sacred ritual."
  ],
  longCopy: "In an era of Clinical Overproduction and artificial haste, SÉLÈNE seeks absolute silence. We believe premium objects of care should stand as silent watchmen of our daily refinement. Our toothbrushes, cosmetics, soaps, and candles are not tools of mechanical repetition; they are the materials of a solemn singular ceremony."
};

export const SOURCING_POINTS: SourcingPoint[] = [
  {
    id: "01",
    name: "The Jura Hills",
    material: "Lead-free raw brass & Boxwood",
    coordinates: { x: 48, y: 35 },
    location: "Bourgogne-Franche-Comté, France",
    description: "Where our brass sleeve elements and bone frames are sculpted by fourth-generation artisans in a workshop active since 1884."
  },
  {
    id: "02",
    name: "Sado Shorelines",
    material: "Obsidian Powder & Sea Salts",
    coordinates: { x: 74, y: 32 },
    location: "Niigata Prefecture, Japan",
    description: "Sourced at 200m depth where the mineral concentration maintains absolute crystalline parity with natural biological fluids."
  },
  {
    id: "03",
    name: "Siena Olive Groves",
    material: "Centenarian Cold Olive Oil",
    coordinates: { x: 50, y: 41 },
    location: "Tuscany, Italy",
    description: "Pressed from heritage Frantoio olive trees, yielding oil with a highly protective polymer coat for custom soap curing."
  },
  {
    id: "04",
    name: "Volterra Springs",
    material: "Thermal Spring Grey Mud",
    coordinates: { x: 51, y: 43 },
    location: "Pisa Province, Italy",
    description: "Naturally warm mud baths loaded with colloidal sulphur and volcanic ash to stimulate skin defense cells."
  }
];

export const PRESS_MENTIONS: PressMention[] = [
  {
    id: "01",
    publisher: "MILK DECORATION",
    logoText: "MILK",
    statement: "Sélène collapses the border between clinical necessity and structural sculpture."
  },
  {
    id: "02",
    publisher: "HARPER'S BAZAAR",
    logoText: "BAZAAR",
    statement: "To brush one’s teeth with L’Objet Brossé is to understand that true luxury lives in forgotten spaces."
  },
  {
    id: "03",
    publisher: "CEREAL MAGAZINE",
    logoText: "CEREAL",
    statement: "Restraint as an architectural masterclass. Sélène’s travertine base alone is a desk object of sheer desire."
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: "01",
    title: "An Inward Return: The Architecture of Morning",
    category: "RITUAL",
    excerpt: "How redesigning tactile feedback in our morning tools alters neural pathways of daily speed.",
    content: "We spend their first waking minutes handling cheap, textured synthetic polymers. The neon-tinted toothbrush, the squeasable plastic cosmetic tube, the aerosolized mist. These materials signal stress to the central nervous system. By returning to weight—solid bone, unlacquered copper alloys, dense hand-turned stone—we trigger an immediate sensory deceleration. In this photo-essay, we look at the Jura workshops that shape our bone and brass and discuss why we refuse synthetic haste.",
    pullQuote: "“To touch rough volcanic obsidian and cold brass in the morning is a tactile anchor back to gravity.”",
    readTime: "6 Min Read",
    image: "/src/assets/images/selene_toothbrush_1782103208011.jpg"
  },
  {
    id: "02",
    title: "The Alchemy of Long-Cured Beeswax",
    category: "COMPOSITION",
    excerpt: "Exploring the slow fermentation and clean throw of mountain nectar cells inside Jurasso glass.",
    content: "Standard paraffin candles release trace petroleum fumes that disrupt internal cellular clocks. Sélène honeybees harvest wild pine nectar on mountain peaks exceeding 1200 meters. The result is a pure dark comb that, when cured in limestone caves, develops a high concentrations of biological lipids. When sparked with organic linen fibers, it purifies the indoor atmosphere and emits an incredibly subtle scent of honey-coated cedar forests.",
    pullQuote: "“We do not mask the atmosphere; we crystallize it.”",
    readTime: "8 Min Read",
    image: "/src/assets/images/selene_candle_1782103251354.jpg"
  }
];
