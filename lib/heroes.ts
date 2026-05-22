// MESBG hero roster — curated stat lines for major characters.
// Stats reflect typical published profiles; verify against your latest army book.

export interface HeroStats {
  move: number;       // inches
  fight: string;      // "F/Shoot" e.g. "6/3+"
  strength: number;
  defence: number;
  attacks: number;
  wounds: number;
  courage: number;
}

export interface Hero {
  id: string;
  name: string;
  faction: 'good' | 'evil';
  army: string;
  points: number;
  stats: HeroStats;
  might: number;
  will: number;
  fate: number;
  notes?: string;
}

export const HEROES: Hero[] = [
  // ─────────── GOOD ───────────
  // The Fellowship
  {
    id: 'aragorn-king',
    name: 'Aragorn, King Elessar',
    faction: 'good',
    army: 'Minas Tirith',
    points: 170,
    stats: { move: 6, fight: '6/3+', strength: 4, defence: 6, attacks: 3, wounds: 3, courage: 7 },
    might: 3, will: 3, fate: 3,
    notes: 'Andúril cleaves shields. May call Heroic Strike as a Free action.',
  },
  {
    id: 'gandalf-grey',
    name: 'Gandalf the Grey',
    faction: 'good',
    army: 'The Fellowship',
    points: 170,
    stats: { move: 6, fight: '5/3+', strength: 4, defence: 5, attacks: 1, wounds: 3, courage: 7 },
    might: 3, will: 6, fate: 3,
    notes: 'Magical Powers: Sorcerous Blast, Immobilise, Blinding Light, Strengthen Will, Terrifying Aura.',
  },
  {
    id: 'gandalf-white',
    name: 'Gandalf the White',
    faction: 'good',
    army: 'Minas Tirith',
    points: 200,
    stats: { move: 6, fight: '5/3+', strength: 4, defence: 5, attacks: 1, wounds: 3, courage: 7 },
    might: 3, will: 10, fate: 3,
    notes: 'Stores 1 Will per turn (free). Mounted on Shadowfax. Word of Command, Sorcerous Blast.',
  },
  {
    id: 'legolas',
    name: 'Legolas Greenleaf',
    faction: 'good',
    army: 'The Fellowship',
    points: 90,
    stats: { move: 6, fight: '6/3+', strength: 3, defence: 5, attacks: 2, wounds: 2, courage: 6 },
    might: 3, will: 3, fate: 3,
    notes: 'Hits on 2+ with bow. May fire 3 times per Shoot phase. Elven cloak.',
  },
  {
    id: 'gimli',
    name: 'Gimli son of Gloin',
    faction: 'good',
    army: 'The Fellowship',
    points: 90,
    stats: { move: 5, fight: '6/4+', strength: 4, defence: 8, attacks: 2, wounds: 2, courage: 6 },
    might: 3, will: 3, fate: 3,
    notes: 'Throwing axes — 3 shots per Shoot phase. Counts as Wearing Armour and shield.',
  },
  {
    id: 'boromir',
    name: 'Boromir of Gondor',
    faction: 'good',
    army: 'The Fellowship',
    points: 120,
    stats: { move: 6, fight: '6/4+', strength: 4, defence: 5, attacks: 3, wounds: 3, courage: 6 },
    might: 6, will: 3, fate: 3,
    notes: 'Horn of Gondor: once per game, friendlies within 6" pass courage automatically this turn.',
  },
  {
    id: 'frodo',
    name: 'Frodo Baggins',
    faction: 'good',
    army: 'The Fellowship',
    points: 30,
    stats: { move: 4, fight: '3/4+', strength: 2, defence: 3, attacks: 1, wounds: 2, courage: 6 },
    might: 1, will: 3, fate: 3,
    notes: 'Sting glows blue. May put on the One Ring (Will point per turn).',
  },
  {
    id: 'sam',
    name: 'Samwise Gamgee',
    faction: 'good',
    army: 'The Fellowship',
    points: 15,
    stats: { move: 4, fight: '3/4+', strength: 2, defence: 4, attacks: 1, wounds: 2, courage: 5 },
    might: 1, will: 1, fate: 2,
    notes: 'Steadfast friend — bonus when fighting alongside Frodo.',
  },
  {
    id: 'merry',
    name: 'Meriadoc Brandybuck',
    faction: 'good',
    army: 'The Fellowship',
    points: 15,
    stats: { move: 4, fight: '3/4+', strength: 2, defence: 3, attacks: 1, wounds: 2, courage: 5 },
    might: 2, will: 1, fate: 1,
  },
  {
    id: 'pippin',
    name: 'Peregrin Took',
    faction: 'good',
    army: 'The Fellowship',
    points: 15,
    stats: { move: 4, fight: '3/4+', strength: 2, defence: 3, attacks: 1, wounds: 2, courage: 5 },
    might: 2, will: 1, fate: 1,
  },

  // Minas Tirith / Gondor
  {
    id: 'faramir',
    name: 'Faramir, Captain of Gondor',
    faction: 'good',
    army: 'Minas Tirith',
    points: 90,
    stats: { move: 6, fight: '5/3+', strength: 4, defence: 5, attacks: 2, wounds: 2, courage: 6 },
    might: 2, will: 3, fate: 2,
  },
  {
    id: 'denethor',
    name: 'Denethor, Steward of Gondor',
    faction: 'good',
    army: 'Minas Tirith',
    points: 60,
    stats: { move: 6, fight: '5/4+', strength: 4, defence: 5, attacks: 2, wounds: 2, courage: 4 },
    might: 2, will: 3, fate: 1,
  },
  {
    id: 'imrahil',
    name: 'Prince Imrahil of Dol Amroth',
    faction: 'good',
    army: 'Minas Tirith',
    points: 130,
    stats: { move: 6, fight: '6/3+', strength: 4, defence: 6, attacks: 3, wounds: 2, courage: 6 },
    might: 3, will: 2, fate: 3,
    notes: 'Mounted on warhorse. Lance.',
  },

  // Rohan
  {
    id: 'theoden',
    name: 'Théoden, King of Rohan',
    faction: 'good',
    army: 'Rohan',
    points: 130,
    stats: { move: 6, fight: '6/4+', strength: 4, defence: 6, attacks: 3, wounds: 3, courage: 6 },
    might: 3, will: 3, fate: 3,
    notes: 'Mounted. Inspires Riders of Rohan.',
  },
  {
    id: 'eomer',
    name: 'Éomer, Marshal of the Riddermark',
    faction: 'good',
    army: 'Rohan',
    points: 130,
    stats: { move: 6, fight: '6/3+', strength: 4, defence: 6, attacks: 3, wounds: 3, courage: 6 },
    might: 3, will: 2, fate: 2,
    notes: 'Mounted with throwing spears.',
  },
  {
    id: 'eowyn',
    name: 'Éowyn, Shieldmaiden of Rohan',
    faction: 'good',
    army: 'Rohan',
    points: 60,
    stats: { move: 6, fight: '4/4+', strength: 3, defence: 4, attacks: 1, wounds: 2, courage: 5 },
    might: 2, will: 2, fate: 2,
    notes: 'No man am I — bonus vs Ringwraiths.',
  },

  // Elves
  {
    id: 'elrond',
    name: 'Elrond, Master of Rivendell',
    faction: 'good',
    army: 'Rivendell',
    points: 170,
    stats: { move: 6, fight: '7/3+', strength: 5, defence: 7, attacks: 3, wounds: 3, courage: 7 },
    might: 3, will: 6, fate: 3,
    notes: 'Ring of Vilya — magical powers.',
  },
  {
    id: 'galadriel',
    name: 'Galadriel, Lady of Lothlórien',
    faction: 'good',
    army: 'Lothlórien',
    points: 110,
    stats: { move: 6, fight: '5/3+', strength: 3, defence: 3, attacks: 1, wounds: 2, courage: 7 },
    might: 1, will: 6, fate: 3,
    notes: 'Ring of Nenya. Mirror reveals — re-roll any one die per turn.',
  },
  {
    id: 'glorfindel',
    name: 'Glorfindel, Lord of the West',
    faction: 'good',
    army: 'Rivendell',
    points: 150,
    stats: { move: 6, fight: '7/3+', strength: 4, defence: 6, attacks: 3, wounds: 3, courage: 7 },
    might: 3, will: 3, fate: 3,
    notes: 'Mounted on Asfaloth. Reforged sword Hadhafang.',
  },
  {
    id: 'arwen',
    name: 'Arwen, Evenstar',
    faction: 'good',
    army: 'Rivendell',
    points: 60,
    stats: { move: 6, fight: '4/3+', strength: 3, defence: 4, attacks: 1, wounds: 2, courage: 6 },
    might: 1, will: 3, fate: 3,
    notes: 'Flood (Magical Power) — once per game.',
  },

  // ─────────── EVIL ───────────
  {
    id: 'sauron',
    name: 'Sauron, the Necromancer',
    faction: 'evil',
    army: 'Mordor',
    points: 600,
    stats: { move: 6, fight: '9/4+', strength: 9, defence: 9, attacks: 4, wounds: 5, courage: 7 },
    might: 10, will: 30, fate: 3,
    notes: 'The Dark Lord. Mace of Sauron, Master of All. Powerful Magical Powers.',
  },
  {
    id: 'witch-king',
    name: 'The Witch-King of Angmar',
    faction: 'evil',
    army: 'Mordor',
    points: 125,
    stats: { move: 6, fight: '5/4+', strength: 4, defence: 8, attacks: 2, wounds: 2, courage: 6 },
    might: 3, will: 25, fate: 3,
    notes: 'Lord of the Nazgûl. Black Dart, Drain Courage, Sap Will, Pall of Night.',
  },
  {
    id: 'saruman',
    name: 'Saruman the White',
    faction: 'evil',
    army: 'Isengard',
    points: 170,
    stats: { move: 6, fight: '5/3+', strength: 3, defence: 5, attacks: 1, wounds: 3, courage: 7 },
    might: 3, will: 8, fate: 3,
    notes: 'Voice of Saruman. Sorcerous Blast, Immobilise, Wrath of Bruinen.',
  },
  {
    id: 'lurtz',
    name: 'Lurtz, First Uruk-hai',
    faction: 'evil',
    army: 'Isengard',
    points: 95,
    stats: { move: 6, fight: '5/3+', strength: 4, defence: 6, attacks: 3, wounds: 2, courage: 5 },
    might: 3, will: 2, fate: 1,
    notes: 'Uruk crossbow, scimitar, shield.',
  },
  {
    id: 'ugluk',
    name: 'Uglúk of the White Hand',
    faction: 'evil',
    army: 'Isengard',
    points: 65,
    stats: { move: 6, fight: '5/3+', strength: 4, defence: 6, attacks: 2, wounds: 2, courage: 4 },
    might: 2, will: 2, fate: 1,
  },
  {
    id: 'mouth-of-sauron',
    name: 'The Mouth of Sauron',
    faction: 'evil',
    army: 'Mordor',
    points: 100,
    stats: { move: 6, fight: '5/4+', strength: 4, defence: 6, attacks: 1, wounds: 2, courage: 6 },
    might: 2, will: 6, fate: 2,
    notes: 'Mounted. Sorcerous Blast, Drain Courage, Black Dart.',
  },
  {
    id: 'gothmog',
    name: 'Gothmog, Lieutenant of Sauron',
    faction: 'evil',
    army: 'Mordor',
    points: 95,
    stats: { move: 5, fight: '5/4+', strength: 5, defence: 6, attacks: 3, wounds: 2, courage: 5 },
    might: 3, will: 2, fate: 2,
    notes: 'Mounted on Warg. Inspires Mordor Orcs.',
  },
  {
    id: 'shagrat',
    name: 'Shagrat, Captain of Cirith Ungol',
    faction: 'evil',
    army: 'Mordor',
    points: 65,
    stats: { move: 6, fight: '5/4+', strength: 4, defence: 6, attacks: 2, wounds: 2, courage: 4 },
    might: 2, will: 1, fate: 1,
  },
  {
    id: 'gorbag',
    name: 'Gorbag of Minas Morgul',
    faction: 'evil',
    army: 'Mordor',
    points: 55,
    stats: { move: 6, fight: '4/4+', strength: 4, defence: 5, attacks: 2, wounds: 2, courage: 4 },
    might: 2, will: 1, fate: 1,
  },
  {
    id: 'khamul',
    name: 'Khamûl the Easterling',
    faction: 'evil',
    army: 'Mordor',
    points: 110,
    stats: { move: 6, fight: '5/4+', strength: 4, defence: 7, attacks: 2, wounds: 2, courage: 6 },
    might: 2, will: 20, fate: 3,
    notes: 'Ringwraith. Drain Courage, Compel.',
  },
  {
    id: 'azog',
    name: 'Azog the Defiler',
    faction: 'evil',
    army: 'Moria / Gundabad',
    points: 200,
    stats: { move: 6, fight: '7/4+', strength: 5, defence: 7, attacks: 3, wounds: 3, courage: 5 },
    might: 6, will: 2, fate: 3,
    notes: 'Mounted on White Warg. Mace-claw.',
  },
  {
    id: 'bolg',
    name: 'Bolg, Son of Azog',
    faction: 'evil',
    army: 'Moria / Gundabad',
    points: 175,
    stats: { move: 6, fight: '7/4+', strength: 5, defence: 7, attacks: 3, wounds: 3, courage: 5 },
    might: 6, will: 3, fate: 2,
  },
];

export function getHeroesByFaction(faction: 'good' | 'evil'): Hero[] {
  return HEROES.filter((h) => h.faction === faction);
}

export function getHero(id: string): Hero | undefined {
  return HEROES.find((h) => h.id === id);
}
