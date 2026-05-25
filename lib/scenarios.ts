// All official MESBG scenarios — Rules Manual standard pool + Matched Play Guide.
// VP scoring and end conditions are per the latest rules.

export type GameEndType =
  | '25pct'          // ends when one force drops to ≤25% starting models
  | 'broken-roll'    // continues after one force breaks; roll D6 each turn, ends on 1-2
  | 'artifact'       // ends when artifact escapes OR one force hits 25%
  | 'ongoing';       // other (e.g. scenario-specific)

export interface Scenario {
  id: string;
  name: string;
  source: 'rules-manual' | 'matched-play';
  objective: string;
  specialRules: string[];
  vpScoring: string[];
  gameEnd: string;
  gameEndType: GameEndType;
}

// ─── RULES MANUAL (Standard Pool of 12) ────────────────────────────────────

export const RULES_MANUAL_SCENARIOS: Scenario[] = [
  {
    id: 'domination',
    name: 'Domination',
    source: 'rules-manual',
    objective: 'Control five scattered objective markers across the battlefield.',
    specialRules: [
      'Five objectives placed: one at center, others placed alternately by players at least 12" from any existing objective.',
      'An objective is controlled if only your models are within 3" of it at game end.',
      'An objective is contested if both sides have models within 3" — the side with more scores 1 VP.',
    ],
    vpScoring: [
      '2 VP per objective you fully control (only your models within 3").',
      '1 VP per contested objective where you have more models within 3".',
      '1 VP if you wound the enemy army leader; 3 VP if you kill them.',
      '1 VP if the enemy force is Broken.',
    ],
    gameEnd: 'When one force is reduced to 25% or fewer of its starting models.',
    gameEndType: '25pct',
  },
  {
    id: 'to-the-death',
    name: 'To the Death!',
    source: 'rules-manual',
    objective: 'Crush the enemy and slay their leader.',
    specialRules: [
      'Both sides deploy within 12" of their own board edge.',
      'A banner remaining at game end is worth additional VPs.',
    ],
    vpScoring: [
      '1 VP if you wound the enemy leader; 3 VP if you kill them.',
      '3 VP if the enemy force is Broken; 5 VP if the enemy is Broken and your force is not.',
      '1 VP if you have at least one banner remaining; 2 VP if the enemy has none.',
      '2 VP if the enemy force is reduced to 25% or fewer of its starting models.',
    ],
    gameEnd: 'When one force is reduced to 25% or fewer of its starting models.',
    gameEndType: '25pct',
  },
  {
    id: 'hold-ground',
    name: 'Hold Ground',
    source: 'rules-manual',
    objective: 'Control the single objective marker at the center of the battlefield.',
    specialRules: [
      'Maelstrom of Battle: warbands roll to arrive each turn from specified board edges.',
      'One objective is placed at the exact board center.',
      'An objective is controlled if only your models are within 6" of it; contested if both sides have models within 6".',
    ],
    vpScoring: [
      '3–7 VP based on how many more models you have within 6" of the objective than your opponent.',
      '1 VP if you wound the enemy leader; 2 VP if you kill them.',
      '1 VP if the enemy force is Broken; 3 VP if the enemy is Broken and your force is not.',
    ],
    gameEnd: 'After one force Breaks, roll a D6 at the end of each turn. On a 1–2 the game ends immediately.',
    gameEndType: 'broken-roll',
  },
  {
    id: 'lords-of-battle',
    name: 'Lords of Battle',
    source: 'rules-manual',
    objective: 'Inflict maximum casualties — the side with the highest Wound Tally wins.',
    specialRules: [
      'A Time of Heroes: when a Hero kills an enemy Hero in the same Fight, they regain 1 spent Might point.',
      'Wound Tally = total Wounds inflicted on the enemy + Fate points the enemy spent to save wounds.',
    ],
    vpScoring: [
      '3–7 VP based on how much higher your Wound Tally is compared to your opponent\'s.',
      '1 VP if you wound the enemy leader; 2 VP if you kill them.',
      '1 VP if the enemy force is Broken; 3 VP if the enemy is Broken and your force is not.',
    ],
    gameEnd: 'After one force Breaks, roll a D6 at the end of each turn. On a 1–2 the game ends immediately.',
    gameEndType: 'broken-roll',
  },
  {
    id: 'reconnoitre',
    name: 'Reconnoitre',
    source: 'rules-manual',
    objective: 'Move more models off the opponent\'s board edge than they move off yours.',
    specialRules: [
      'Reinforcements: warbands roll to enter from their own board edge; automatic arrival on turn 4 if not yet on board.',
      'Models that exit the opponent\'s board edge are removed from play — they have escaped.',
    ],
    vpScoring: [
      '3–7 VP based on how many more models you escape off the enemy board edge than your opponent.',
      '1 VP if you wound the enemy leader; 2 VP if you kill them.',
      '1 VP if the enemy force is Broken; 3 VP if the enemy is Broken and your force is not.',
    ],
    gameEnd: 'When one force is reduced to 25% or fewer of its starting models.',
    gameEndType: '25pct',
  },
  {
    id: 'clash-by-moonlight',
    name: 'A Clash by Moonlight',
    source: 'rules-manual',
    objective: 'Defeat the enemy in darkness with limited visibility and altered shooting rules.',
    specialRules: [
      'The Dark of Night: shooting attacks and magical powers are limited to 12" range.',
      'Shooting attacks within 12" gain +1 To Wound.',
      'Siege Engines can only hit on a natural 6 against targets beyond 12".',
    ],
    vpScoring: [
      '1 VP if you wound the enemy leader; 2 VP if you kill them.',
      '3 VP if the enemy force is Broken; 5 VP if the enemy is Broken and your force is not.',
      '1–5 VP based on comparative hero survival and kill counts.',
    ],
    gameEnd: 'When one force is reduced to 25% or fewer of its starting models.',
    gameEndType: '25pct',
  },
  {
    id: 'seize-the-prize',
    name: 'Seize the Prize',
    source: 'rules-manual',
    objective: 'Recover a central artifact and carry it off the opponent\'s board edge.',
    specialRules: [
      'The artifact starts buried at the board center — an Infantry model in base contact must roll 4+ to unearth it.',
      'The artifact counts as a Light Object once unearthed.',
      'Only Infantry models may attempt to pick up or carry the artifact.',
    ],
    vpScoring: [
      '3–7 VP based on where the artifact is at game end (your side, center, opponent\'s side, or escaped).',
      '1 VP if you wound the enemy leader; 2 VP if you kill them.',
      '1 VP if the enemy force is Broken; 3 VP if the enemy is Broken and your force is not.',
    ],
    gameEnd: 'Immediately when the artifact exits the opponent\'s board edge, OR when one force hits 25%.',
    gameEndType: 'artifact',
  },
  {
    id: 'contest-of-champions',
    name: 'Contest of Champions',
    source: 'rules-manual',
    objective: 'Your army leader must accumulate more close-combat kills than the enemy leader.',
    specialRules: [
      'The Last Stand: a leader regains 1 spent Might point each time they kill an enemy Hero or multi-Wound model in close combat.',
      'Both leaders are placed in the center of the battlefield at setup.',
    ],
    vpScoring: [
      '3–7 VP based on how many more close-combat kills your leader has than the enemy leader.',
      '1–3 VP for your leader wounding or killing the enemy leader.',
      '1 VP if the enemy force is Broken; 2 VP if the enemy is Broken and your force is not.',
    ],
    gameEnd: 'When one force is reduced to 25% or fewer of its starting models.',
    gameEndType: '25pct',
  },
  {
    id: 'capture-and-control',
    name: 'Capture and Control',
    source: 'rules-manual',
    objective: 'Control more of the five objectives (center + four cardinal points) than your opponent.',
    specialRules: [
      'An objective becomes controlled when one of your models base-contacts it during the End Phase.',
      'A controlled objective reverts to neutral if both sides have models in base contact in the End Phase.',
      'Objectives remain controlled until the opposing side claims them.',
    ],
    vpScoring: [
      '2 VP per objective you control at game end.',
      '1 VP if you wound the enemy leader.',
      '1 VP if the enemy force is Broken.',
    ],
    gameEnd: 'After one force Breaks, roll a D6 at the end of each turn. On a 1–2 the game ends immediately.',
    gameEndType: 'broken-roll',
  },
  {
    id: 'heirloom-of-ages-past',
    name: 'Heirloom of Ages Past',
    source: 'rules-manual',
    objective: 'Find and possess a hidden relic among six objective markers.',
    specialRules: [
      'Maelstrom of Battle: warbands roll to arrive each turn from specified board edges.',
      'Uncovering the Relic: a model in base contact with an objective rolls a D6; on a 6 it is the relic.',
      'Relic of Power: the relic carrier cannot voluntarily drop it; they must roll a D6 each turn — on a 1 they are Transfixed.',
    ],
    vpScoring: [
      '6 VP if you are holding the relic; 3 VP if you have more models within 3" of the relic than your opponent.',
      '1 VP if you wound the enemy leader; 2 VP if you kill them.',
      '1 VP if the enemy force is Broken; 2 VP if the enemy is Broken and your force is not.',
      '1 VP if you have at least one banner remaining; 2 VP if the enemy has none.',
    ],
    gameEnd: 'When one force is reduced to 25% or fewer of its starting models.',
    gameEndType: '25pct',
  },
  {
    id: 'fog-of-war',
    name: 'Fog of War',
    source: 'rules-manual',
    objective: 'Secretly accomplish three hidden objectives while disrupting the enemy\'s plans.',
    specialRules: [
      'At setup each player secretly selects: one friendly Hero to protect, one enemy Hero to wound/kill, one terrain piece to control.',
      'Objectives are revealed at game end.',
    ],
    vpScoring: [
      '1–3 VP for your nominated hero surviving (more for healthier survival).',
      '1–3 VP for wounding or killing the opponent\'s nominated hero.',
      '1–3 VP for having more models than the opponent on your chosen terrain piece.',
      '1–3 VP if the enemy force is Broken.',
    ],
    gameEnd: 'After one force Breaks, roll a D6 at the end of each turn. On a 1–2 the game ends immediately.',
    gameEndType: 'broken-roll',
  },
  {
    id: 'storm-the-camp',
    name: 'Storm the Camp',
    source: 'rules-manual',
    objective: 'Capture the opponent\'s corner camp while defending your own.',
    specialRules: [
      'Each army deploys entirely within 12" of a chosen corner.',
      'A camp is captured if you have more models within 12" of the enemy\'s corner than they do.',
      'Models within their own camp automatically pass Courage tests.',
    ],
    vpScoring: [
      '3–6 VP for capturing the opponent\'s camp.',
      '1 VP if you wound the enemy leader; 3 VP if you kill them.',
      '1 VP if the enemy force is Broken; 3 VP if the enemy is Broken and your force is not.',
    ],
    gameEnd: 'When one force is reduced to 25% or fewer of its starting models.',
    gameEndType: '25pct',
  },
];

// ─── MATCHED PLAY GUIDE (Additional 6 standard + 6 doubles) ─────────────────

export const MATCHED_PLAY_SCENARIOS: Scenario[] = [
  {
    id: 'command-the-battlefield',
    name: 'Command the Battlefield',
    source: 'matched-play',
    objective: 'Control the most quadrants of the divided battlefield.',
    specialRules: [
      'The battlefield is divided into four equal quadrants.',
      'A quadrant is controlled if only your models are within it at game end; contested if both sides have models.',
    ],
    vpScoring: [
      '1–2 VP per quadrant you fully control.',
      '1 VP if you wound the enemy leader; 2 VP if you kill them.',
      '1 VP if the enemy force is Broken; 2 VP if the enemy is Broken and your force is not.',
    ],
    gameEnd: 'When one force is reduced to 25% or fewer of its starting models.',
    gameEndType: '25pct',
  },
  {
    id: 'retrieval',
    name: 'Retrieval',
    source: 'matched-play',
    objective: 'Reclaim a stolen relic from the enemy and escape the battlefield with it.',
    specialRules: [
      'The relic starts with a designated enemy model.',
      'If the carrier is killed, any model may pick it up.',
      'The relic counts as a Light Object.',
    ],
    vpScoring: [
      '1–7 VP based on retrieving the relic and its location relative to your board edge.',
      '1 VP if you wound the enemy leader; 2 VP if you kill them.',
      '1 VP if the enemy force is Broken; 3 VP if the enemy is Broken and your force is not.',
    ],
    gameEnd: 'After one force Breaks, roll a D6 at the end of each turn. On a 1–2 the game ends immediately.',
    gameEndType: 'broken-roll',
  },
  {
    id: 'breakthrough',
    name: 'Breakthrough',
    source: 'matched-play',
    objective: 'Capture objectives across the battlefield — objectives further into enemy territory are worth more.',
    specialRules: [
      'Objectives are placed across the battlefield, weighted toward the opponent\'s deployment zone.',
      'Objectives in your own zone are worth less than objectives in the opponent\'s zone.',
    ],
    vpScoring: [
      '1 VP for controlling your own zone objective; 1–2 VP for centerline objectives; 2–4 VP for opponent\'s zone objective.',
      '1 VP if you wound the enemy leader; 2 VP if you kill them.',
      '1 VP if the enemy force is Broken.',
    ],
    gameEnd: 'When one force is reduced to 25% or fewer of its starting models.',
    gameEndType: '25pct',
  },
  {
    id: 'destroy-the-supplies',
    name: 'Destroy the Supplies',
    source: 'matched-play',
    objective: 'Destroy all of the opponent\'s supply markers while protecting your own.',
    specialRules: [
      'Each side has a number of supply markers placed in their deployment zone.',
      'A supply marker is destroyed when an enemy model is in base contact with it and passes a 4+ roll at the start of its Move.',
      'A banner remaining at game end is worth additional VPs.',
    ],
    vpScoring: [
      '2 VP per enemy supply marker destroyed.',
      '1 VP if you wound the enemy leader; 2 VP if you kill them.',
      '1 VP if the enemy force is Broken; 2 VP if the enemy is Broken and your force is not.',
      '1 VP if you have at least one banner remaining; 2 VP if the enemy has none.',
    ],
    gameEnd: 'When one force is reduced to 25% or fewer of its starting models.',
    gameEndType: '25pct',
  },
  {
    id: 'divide-and-conquer',
    name: 'Divide & Conquer',
    source: 'matched-play',
    objective: 'Control multiple objectives while your army is split across two deployment zones.',
    specialRules: [
      'The army deploys split across two flanks; the central objective is not accessible at the start.',
      'Objectives in opponent\'s territory score more than those in your own.',
    ],
    vpScoring: [
      '3–5 VP for controlling the central objective.',
      '1–2 VP for other objectives controlled.',
      '1 VP if you wound the enemy leader; 2 VP if you kill them.',
      '1 VP if the enemy force is Broken.',
    ],
    gameEnd: 'After one force Breaks, roll a D6 at the end of each turn. On a 1–2 the game ends immediately.',
    gameEndType: 'broken-roll',
  },
  {
    id: 'assassination',
    name: 'Assassination',
    source: 'matched-play',
    objective: 'Use your secret assassin to wound or kill a secretly-chosen enemy target.',
    specialRules: [
      'Each player secretly designates one of their Heroes as the assassin and one enemy Hero as their target.',
      'Revealed at game end; bonus VPs depend on the assassin and target\'s status.',
    ],
    vpScoring: [
      '1–7 VP based on whether your assassin wounded or killed the enemy target.',
      '1 VP if you wound the enemy leader; 2 VP if you kill them.',
      '1 VP if the enemy force is Broken; 3 VP if the enemy is Broken and your force is not.',
    ],
    gameEnd: 'After one force Breaks, roll a D6 at the end of each turn. On a 1–2 the game ends immediately.',
    gameEndType: 'broken-roll',
  },
];

export const ALL_SCENARIOS: Scenario[] = [
  ...RULES_MANUAL_SCENARIOS,
  ...MATCHED_PLAY_SCENARIOS,
];

export function getScenario(id: string): Scenario | undefined {
  return ALL_SCENARIOS.find((s) => s.id === id);
}
