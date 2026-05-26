// All official MESBG scenarios — Rules Manual standard pool + Matched Play Guide.
// VP scoring verified against prancingponypub.ru.

export type GameEndType =
  | '25pct'          // ends when one force drops to ≤25% starting models
  | 'broken-roll'    // continues after one force breaks; roll D6 each turn, ends on 1-2
  | 'artifact'       // ends when artifact escapes OR both forces hit 25%
  | 'ongoing';       // other (scenario-specific)

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
      'Five objectives placed: one at centre, others placed alternately by players at least 12" from any existing objective and 6" from board edges.',
      'An objective is controlled if only your models are within 3" of it at game end.',
      'An objective is contested if both sides have models within 3" — the side with more models within 3" scores 1 VP.',
    ],
    vpScoring: [
      '2 VP for each objective marker that has only friendly models within 3".',
      '1 VP for each objective marker that has more friendly models than enemy models within 3" (contested).',
      '1 VP for causing one or more Wounds on the enemy leader (Fate-saved wounds do not count); also 1 VP if you kill them.',
      '1 VP if the enemy force is Broken at the end of the game.',
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
      '1 VP for causing one or more Wounds on the enemy leader (Fate-saved wounds do not count); 3 VP if you kill them.',
      '3 VP if the enemy force is Broken at the end of the game; 5 VP if the enemy is Broken and your force is unbroken.',
      '1 VP if you have at least one banner remaining at the end of the game.',
      '2 VP if the enemy force is reduced to 25% or fewer of its starting models.',
    ],
    gameEnd: 'When one force is reduced to 25% or fewer of its starting models.',
    gameEndType: '25pct',
  },
  {
    id: 'hold-ground',
    name: 'Hold Ground',
    source: 'rules-manual',
    objective: 'Control the single objective marker at the centre of the battlefield.',
    specialRules: [
      'Maelstrom of Battle: forces do not deploy at the start. Each turn roll a D6 per warband not yet on the board to see if and where they arrive.',
      'One objective is placed at the exact board centre.',
      'Control = only your models within 6"; contested if both sides have models within 6".',
    ],
    vpScoring: [
      '3 VP if you have more models within 6" of the objective than your opponent.',
      '5 VP if you have at least twice as many models within 6" of the objective as your opponent.',
      '7 VP if you have at least three times as many models within 6" of the objective as your opponent, or you are the only player with models within 6".',
      '1 VP for causing one or more Wounds on the enemy leader (Fate-saved wounds do not count); 2 VP if you kill them.',
      '1 VP if the enemy force is Broken at the end of the game; 3 VP if the enemy is Broken and your force is unbroken.',
    ],
    gameEnd: 'Once one force Breaks, roll a D6 at the end of each turn — on a 1 or 2 the game ends immediately.',
    gameEndType: 'broken-roll',
  },
  {
    id: 'lords-of-battle',
    name: 'Lords of Battle',
    source: 'rules-manual',
    objective: 'Inflict maximum casualties — the side with the highest Wound Tally wins.',
    specialRules: [
      'A Time of Heroes: when your force kills an enemy Hero in the same Fight, one of your Heroes in that fight regains 1 spent Might point.',
      'Wound Tally = total Wounds inflicted on the enemy + Fate points the enemy spent to save wounds.',
    ],
    vpScoring: [
      '3 VP if your Wound Tally is greater than your opponent\'s.',
      '5 VP if your Wound Tally is at least twice as large as your opponent\'s.',
      '1 VP for causing one or more Wounds on the enemy leader (Fate-saved wounds do not count); 2 VP if you kill them.',
      '1 VP if the enemy force is Broken at the end of the game; 3 VP if the enemy is Broken and your force is unbroken.',
    ],
    gameEnd: 'Once one force Breaks, roll a D6 at the end of each turn — on a 1 or 2 the game ends immediately.',
    gameEndType: 'broken-roll',
  },
  {
    id: 'reconnoitre',
    name: 'Reconnoitre',
    source: 'rules-manual',
    objective: 'Move more models off the opponent\'s board edge than they move off yours.',
    specialRules: [
      'Reinforcements: each turn, roll a D6 per warband not yet on the board. On 1–3 they do not arrive but gain +1 next turn; on 4–6 they arrive. All warbands arrive automatically by turn 4.',
      'Models that exit the opponent\'s board edge are removed from play — they have escaped.',
    ],
    vpScoring: [
      '3 VP if more of your models have escaped the battlefield via your opponent\'s board edge than your opponent\'s models.',
      '5 VP if at least two of your models and at least twice as many as your opponent have escaped.',
      '7 VP if at least three of your models and at least three times as many as your opponent have escaped.',
      '1 VP for causing one or more Wounds on the enemy leader (Fate-saved wounds do not count); 2 VP if you kill them.',
      '1 VP if the enemy force is Broken at the end of the game; 3 VP if the enemy is Broken and your force is unbroken.',
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
      'The Dark of Night: models cannot be targeted by shooting, Magical Powers, or special abilities if the target is more than 12" away.',
      'All shooting attacks gain +1 to wound rolls.',
      'Siege Engines targeting a model beyond 12" away only hit on a roll of 6.',
    ],
    vpScoring: [
      '1 VP for causing one or more Wounds on the enemy leader (Fate-saved wounds do not count); 2 VP if you kill them.',
      '3 VP if the enemy force is Broken at the end of the game; 5 VP if the enemy is Broken and your force is unbroken.',
      '1 VP if you have at least one Hero model remaining at the end of the game.',
      '3 VP if you have at least one Hero remaining AND you have killed more enemy Hero models than your opponent has killed of yours.',
      '5 VP if you have at least one Hero remaining AND your opponent has no Hero models remaining.',
    ],
    gameEnd: 'When one force is reduced to 25% or fewer of its starting models.',
    gameEndType: '25pct',
  },
  {
    id: 'seize-the-prize',
    name: 'Seize the Prize',
    source: 'rules-manual',
    objective: 'Recover a central artefact and carry it off the opponent\'s board edge.',
    specialRules: [
      'The artefact starts buried at the board centre. An Infantry model in base contact may attempt to free it at the end of its Move — roll a D6; on a 4+ it is freed (only one attempt per side per turn).',
      'Once freed, the artefact counts as a Light Object. Only Infantry models may pick it up or carry it.',
      'The model carrying the artefact cannot voluntarily drop it.',
    ],
    vpScoring: [
      '3 VP if one of your models is carrying the artefact within your own board half at game end.',
      '5 VP if one of your models is carrying the artefact within your opponent\'s board half at game end.',
      '7 VP if one of your models carries the artefact off the board via your opponent\'s board edge.',
      '1 VP for causing one or more Wounds on the enemy leader (Fate-saved wounds do not count); 2 VP if you kill them.',
      '1 VP if the enemy force is Broken at the end of the game; 3 VP if the enemy is Broken and your force is unbroken.',
    ],
    gameEnd: 'Immediately when a model carries the artefact off via the opponent\'s board edge, OR when both forces have been reduced to 25% of their starting models.',
    gameEndType: 'artifact',
  },
  {
    id: 'contest-of-champions',
    name: 'Contest of Champions',
    source: 'rules-manual',
    objective: 'Your army leader must accumulate more close-combat kills than the enemy leader.',
    specialRules: [
      'The Last Stand: each time a leader kills a Hero or a multi-Wound model in close combat, they immediately regain 1 spent Might point.',
      'Kills caused by shooting, Magical Powers, or the Hurl Brutal Power Attack do not count toward the leader\'s kill score.',
    ],
    vpScoring: [
      '3 VP if your leader has killed more models than your opponent\'s leader.',
      '5 VP if your leader has killed at least two models and at least twice as many as your opponent\'s leader.',
      '7 VP if your leader has killed at least three models and at least three times as many as your opponent\'s leader.',
      '1 VP if your leader causes one or more Wounds on the enemy leader (Fate-saved wounds do not count); 3 VP if your leader kills the enemy leader.',
      '1 VP if the enemy force is Broken at the end of the game; 2 VP if the enemy is Broken and your force is unbroken.',
    ],
    gameEnd: 'When one force is reduced to 25% or fewer of its starting models.',
    gameEndType: '25pct',
  },
  {
    id: 'capture-and-control',
    name: 'Capture and Control',
    source: 'rules-manual',
    objective: 'Control more of the five objectives (centre + four equidistant points) than your opponent.',
    specialRules: [
      'During the End Phase of any turn, if one or more of your models are in base contact with an objective, that objective comes under your control.',
      'If both sides have models in base contact with an objective during the End Phase, it returns to neutral.',
      'Objectives remain controlled until the opposing side claims them.',
    ],
    vpScoring: [
      '2 VP for each objective marker that is under your control at the end of the game.',
      '1 VP for causing one or more Wounds on the enemy leader OR for killing them (Fate-saved wounds do not count) — this is a flat 1 VP whether wounding or killing.',
      '1 VP if the enemy force is Broken at the end of the game.',
    ],
    gameEnd: 'Once one force Breaks, roll a D6 at the end of each turn — on a 1 or 2 the game ends immediately.',
    gameEndType: 'broken-roll',
  },
  {
    id: 'heirloom-of-ages-past',
    name: 'Heirloom of Ages Past',
    source: 'rules-manual',
    objective: 'Find and possess a hidden relic among six objective markers.',
    specialRules: [
      'Maelstrom of Battle: forces do not deploy at the start. Each turn roll a D6 per warband not yet on the board.',
      'Uncovering the Relic: a model in base contact with an objective marker rolls a D6; on a 6 it is the relic (markers that are not the relic are removed).',
      'Relic of Power: the relic carrier cannot voluntarily drop it; at the start of each turn before Priority, roll a D6 — on a 1 the carrier is Transfixed.',
    ],
    vpScoring: [
      '6 VP if your force is in possession of the relic (a friendly model is carrying it) at the end of the game.',
      '3 VP if you are not in possession of the relic but have more models within 3" of the relic than your opponent.',
      '1 VP for causing one or more Wounds on the enemy leader (Fate-saved wounds do not count); 2 VP if you kill them.',
      '1 VP if the enemy force is Broken at the end of the game; 2 VP if the enemy is Broken and your force is unbroken.',
      '1 VP if you have at least one banner remaining at game end; 2 VP if you have at least one banner and your opponent has none.',
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
      'At setup, secretly note: (1) one of your own Heroes to protect; (2) one enemy Hero to wound/kill; (3) one terrain piece in the opponent\'s half to control. Do not reveal objectives until game end.',
      'Your chosen friendly Hero cannot be your leader unless they are your only Hero. Same restriction applies to the enemy Hero target.',
    ],
    vpScoring: [
      '1 VP if your nominated friendly Hero is still alive at the end of the game; 3 VP if they are alive and have suffered no Wounds.',
      '1 VP for causing one or more Wounds on your nominated enemy Hero (Fate-saved wounds do not count); 3 VP if you kill them.',
      '1 VP if you have more models than your opponent completely within your chosen terrain piece at game end; 3 VP if your opponent has no models in that terrain piece and you have at least one.',
      '1 VP if the enemy force is Broken at the end of the game; 3 VP if the enemy is Broken and your force is unbroken.',
    ],
    gameEnd: 'Once one force Breaks, roll a D6 at the end of each turn — on a 1 or 2 the game ends immediately.',
    gameEndType: 'broken-roll',
  },
  {
    id: 'storm-the-camp',
    name: 'Storm the Camp',
    source: 'rules-manual',
    objective: 'Capture the opponent\'s corner camp while defending your own.',
    specialRules: [
      'Each army deploys entirely within 12" of a chosen table corner.',
      'A camp is captured if, during the End Phase of any turn, you have more models entirely within your opponent\'s 12" corner area than they do.',
      'Models defending their own camp automatically pass Courage tests.',
    ],
    vpScoring: [
      '3 VP if your force captured your opponent\'s camp at the end of the game.',
      '6 VP if your force captured your opponent\'s camp AND your own camp was not captured.',
      '1 VP for causing one or more Wounds on the enemy leader (Fate-saved wounds do not count); 3 VP if you kill them.',
      '1 VP if the enemy force is Broken at the end of the game; 3 VP if the enemy is Broken and your force is unbroken.',
    ],
    gameEnd: 'When one force is reduced to 25% or fewer of its starting models.',
    gameEndType: '25pct',
  },
];

// ─── MATCHED PLAY GUIDE (Additional 6 scenarios) ────────────────────────────

export const MATCHED_PLAY_SCENARIOS: Scenario[] = [
  {
    id: 'command-the-battlefield',
    name: 'Command the Battlefield',
    source: 'matched-play',
    objective: 'Control the most quadrants of the divided battlefield.',
    specialRules: [
      'The battlefield is divided into four equal quarters.',
      'Worthless Land: models wholly within 12" of the centre of the battlefield do not count as being in any quarter.',
      'Maelstrom of Battle: forces do not deploy at the start — each turn roll a D6 per warband not yet on the board.',
    ],
    vpScoring: [
      '1 VP for each quarter of the board where you have more friendly models wholly within it than enemy models.',
      '2 VP (instead of 1) for each quarter where you have at least double the number of models wholly within it compared to your opponent.',
      '1 VP for causing one or more Wounds on the enemy leader (Fate-saved wounds do not count); 2 VP if you kill them.',
      '1 VP if the enemy force is Broken at the end of the game; 2 VP if the enemy is Broken and your force is unbroken.',
    ],
    gameEnd: 'When one force is reduced to 25% or fewer of its starting models.',
    gameEndType: '25pct',
  },
  {
    id: 'retrieval',
    name: 'Retrieval',
    source: 'matched-play',
    objective: 'Retrieve the enemy\'s relic and escape the battlefield with it.',
    specialRules: [
      'Each side has a relic (Light Object) placed in their deployment zone. Friendly models cannot pick up their own relic until an enemy model has picked it up first.',
      'If the carrier is killed, any model may pick it up.',
    ],
    vpScoring: [
      '1 VP if your opponent\'s relic has moved from its original position.',
      '3 VP if you have retrieved your opponent\'s relic (a friendly model is carrying it).',
      '5 VP if you have retrieved your opponent\'s relic and the model carrying it is in your own deployment zone.',
      '7 VP if you have retrieved your opponent\'s relic and moved it off the board via your deployment zone edges.',
      '1 VP for causing one or more Wounds on the enemy leader (Fate-saved wounds do not count); 2 VP if you kill them.',
      '1 VP if the enemy force is Broken at the end of the game; 3 VP if the enemy is Broken and your force is unbroken.',
    ],
    gameEnd: 'When one force is reduced to 25% or fewer of its starting models.',
    gameEndType: '25pct',
  },
  {
    id: 'breakthrough',
    name: 'Breakthrough',
    source: 'matched-play',
    objective: 'Capture objectives — those deeper in enemy territory score more.',
    specialRules: [
      'Four objectives: one in each deployment zone and two on the centreline.',
      'An objective is controlled if you have more models within 3" of it than your opponent at game end.',
    ],
    vpScoring: [
      '1 VP if you have more friendly models within 3" of your own deployment zone objective than your opponent.',
      '1 VP if you have more friendly models within 3" of a centreline objective; 2 VP instead if your opponent has no models within 3" of it.',
      '2 VP if you have more friendly models within 3" of your opponent\'s deployment zone objective; 4 VP instead if your opponent has no models within 3" of it.',
      '1 VP for causing one or more Wounds on the enemy leader (Fate-saved wounds do not count); 2 VP if you kill them.',
      '1 VP if the enemy force is Broken at the end of the game.',
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
      'Each side places supply markers in their deployment zone.',
      'A supply marker is destroyed if, during the End Phase, an enemy model is in base contact with it and has not cast Magical Powers, used a missile weapon, been in a Fight, or been under Paralyse/Immobilise/Transfix that turn.',
    ],
    vpScoring: [
      '2 VP for each enemy supply marker that has been destroyed.',
      '1 VP for causing one or more Wounds on the enemy leader (Fate-saved wounds do not count); 2 VP if you kill them.',
      '1 VP if the enemy force is Broken at the end of the game; 2 VP if the enemy is Broken and your force is unbroken.',
      '1 VP if you have at least one banner remaining at game end; 2 VP if you have at least one banner and your opponent has none.',
    ],
    gameEnd: 'When one force is reduced to 25% or fewer of its starting models.',
    gameEndType: '25pct',
  },
  {
    id: 'divide-and-conquer',
    name: 'Divide & Conquer',
    source: 'matched-play',
    objective: 'With your army split across two flanks, claim the key areas of the battlefield.',
    specialRules: [
      'Each army splits into two halves, deploying in opposite corners of their board edge.',
      'Three objectives: one at the centre, one in each player\'s own flank.',
    ],
    vpScoring: [
      '3 VP if you have more models within 3" of the central objective than your opponent; 5 VP instead if only you have models within 3" of it.',
      '1 VP if you have more models within 3" of each of the other objectives than your opponent; 2 VP instead if only you have models within 3" of it.',
      '1 VP for causing one or more Wounds on the enemy leader (Fate-saved wounds do not count); 2 VP if you kill them.',
      '1 VP if the enemy force is Broken at the end of the game.',
    ],
    gameEnd: 'When one force is reduced to 25% or fewer of its starting models.',
    gameEndType: '25pct',
  },
  {
    id: 'assassination',
    name: 'Assassination',
    source: 'matched-play',
    objective: 'Use your secret assassin to wound or kill a secretly-chosen enemy Hero target.',
    specialRules: [
      'At setup, secretly note one of your own Hero models as your Assassin and one enemy Hero as your Target. Reveal both at game end.',
      'The Target may not be the enemy leader unless they are the only enemy Hero.',
    ],
    vpScoring: [
      '1 VP if your target has suffered one or more Wounds at the end of the game.',
      '3 VP if your target has suffered Wounds and your assassin caused at least one of them.',
      '5 VP if your target has been slain.',
      '7 VP if your target has been slain and your assassin dealt the killing blow.',
      '1 VP for causing one or more Wounds on the enemy leader (Fate-saved wounds do not count); 2 VP if you kill them.',
      '1 VP if the enemy force is Broken at the end of the game; 3 VP if the enemy is Broken and your force is unbroken.',
    ],
    gameEnd: 'Once one force Breaks, roll a D6 at the end of each turn — on a 1 or 2 the game ends immediately.',
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
