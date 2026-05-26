// Standard game length — varies by scenario; default for custom games.
export const DEFAULT_MAX_TURNS = 10;

export interface PhaseAction {
  step: string;
  detail: string;
  who?: string;
}

export interface PhaseData {
  name: string;
  short: string;
  icon: string;
  color: string;
  rules: string[];
  actions: PhaseAction[];
  tips: string;
}

export const PHASES: PhaseData[] = [
  // ────────────────────────────────────────────────────────────────────────────
  // PRIORITY PHASE
  // ────────────────────────────────────────────────────────────────────────────
  {
    name: 'Priority Phase',
    short: 'Priority',
    icon: '⚔️',
    color: '#8b1a1a',
    rules: [
      'Both players roll a D6. The player with the highest result has Priority.',
      'On a tie, Priority passes to the player who did NOT have it in the previous turn.',
      'Turn 1 (Narrative): the Good player has Priority automatically. In Matched/Open Play both roll, re-rolling ties.',
      'The Priority player moves first and chooses the order fights are resolved in the Fight Phase.',
      'Heroic Actions are NOT declared in this phase — they are declared at the start of the relevant phase (Move, Shoot, or Fight).',
      'Any "start of turn" special rules (ongoing spells, scenario triggers) are resolved here.',
    ],
    actions: [
      {
        step: '1. Roll for Priority',
        detail: 'Each player rolls a D6. Highest result wins Priority. On a tie, Priority passes to the player who did NOT hold it last turn (Turn 1 Narrative exception: Good has Priority).',
        who: 'All players',
      },
      {
        step: '2. Mark Priority',
        detail: 'Note or announce which player has Priority. They will move first and choose combat resolution order in the Fight Phase.',
        who: 'Priority player',
      },
      {
        step: '3. Resolve start-of-turn effects',
        detail: 'Apply any rules that trigger at the start of the turn: ongoing spell effects, scenario objective arrivals, special army rules (e.g. Sauron\'s influence). Heroic Actions will be declared in later phases.',
        who: 'All players',
      },
    ],
    tips: 'Priority is valuable but not always decisive — sometimes letting the opponent move first creates better charge opportunities. Heroic Move and Heroic March are declared at the START of the Move Phase, not here.',
  },

  // ────────────────────────────────────────────────────────────────────────────
  // MOVE PHASE
  // ────────────────────────────────────────────────────────────────────────────
  {
    name: 'Move Phase',
    short: 'Move',
    icon: '🏃',
    color: '#1a3a1a',
    rules: [
      'At the START of the Move Phase, heroes may declare Heroic Move, Heroic March, Heroic Resolve, or Heroic Channelling. The player WITHOUT Priority declares first; players alternate.',
      'Every model has a 1" Control Zone. Enemy models cannot enter this zone unless charging. A model within an enemy Control Zone may only remain still, charge, or move away without getting closer.',
      'The Priority player moves all models first, then other players in order.',
      'Models move up to their Move characteristic in inches in any direction.',
      'Difficult Terrain: distance in difficult terrain counts as double (so a 6" move yields only 3" in difficult terrain).',
      'Charging requires Line of Sight before moving. Move into base contact with an enemy. Once charged, both models are Engaged and cannot move further this phase.',
      'Multiple enemies may be charged if the model\'s base can reach all of them.',
      'After entering one Control Zone, a charger ignores further Control Zones to reach its intended target.',
      'Jumping: roll D6 — 1 fails (move ends), 2-5 success (movement ends), 6 success (complete remaining movement).',
      'Climbing: Cavalry may not Climb. Roll D6 — 1 falls (Prone, falling damage); 2-5 climbs to top (movement ends); 6 reaches top (complete remaining movement).',
      'Prone models: no Control Zone, half-height for LoS. May crawl 1" per turn or stand (costs half Move). Cannot charge while prone.',
      'Reinforcements arriving by Maelstrom of Battle enter from specified board edges and cannot charge that turn.',
    ],
    actions: [
      {
        step: '1. Declare Heroic Actions (Move Phase)',
        detail: 'Player WITHOUT Priority declares first, then players alternate. Heroes may declare: Heroic Move ("With Me!" — hero and friends within 6" move first), Heroic March (+3"/+5" bonus, cannot charge), Heroic Resolve (+1 die to Resist tests this turn, hero cannot move), or Heroic Channelling (all powers cast as Channelled versions). Each costs 1 Might. Cannot declare after being charged.',
        who: 'Non-priority player first, then alternating',
      },
      {
        step: '2. Resolve Heroic Move / Heroic March models',
        detail: 'Heroes who declared Heroic Move now move before the Priority player. "With Me!" — hero notes start position, moves, then any friendly within 6" may also move (must end within 6" of hero). Heroic March adds +3" (infantry) or +5" (cavalry/fly) but models using it cannot charge.',
        who: 'Declared heroes',
      },
      {
        step: '3. Priority player moves',
        detail: 'Move all models. Check Control Zones — entering one requires a charge. Resolve charges (move into base contact). Navigate terrain using jump/climb tests as needed.',
        who: 'Priority player',
      },
      {
        step: '4. Other players move (in priority order)',
        detail: 'Each remaining player moves all their models. Same Control Zone and charging rules apply.',
        who: 'Non-priority players',
      },
      {
        step: '5. Broken army Courage tests',
        detail: 'If any player\'s force is Broken (casualties exceed half starting models), each non-Engaged model must test before moving. Roll 2D6 + Courage — if the total is 10 or more, pass. On a FAIL the model is immediately removed from play as a casualty ("lost its nerve"). Engaged models are exempt.',
        who: 'Broken army players',
      },
      {
        step: '6. Pair off fights',
        detail: 'After all movement, models in base contact with enemies are Engaged. The Priority player resolves any ambiguous pairing choices.',
        who: 'Priority player (ambiguous cases)',
      },
    ],
    tips: 'Heroic Move is declared at the START of this phase, costs 1 Might, and lets the hero (and friends within 6") move before the Priority player. Heroic March gives a movement bonus but those models cannot charge — great for getting Warriors onto objectives.',
  },

  // ────────────────────────────────────────────────────────────────────────────
  // SHOOT PHASE
  // ────────────────────────────────────────────────────────────────────────────
  {
    name: 'Shoot Phase',
    short: 'Shoot',
    icon: '🏹',
    color: '#3a2a0a',
    rules: [
      'At the START of the Shoot Phase, heroes may declare Heroic Shoot or Heroic Accuracy. Player WITHOUT Priority declares first; players alternate.',
      'A model may shoot if: it has a missile weapon, a valid target in LoS and range, has NOT moved more than half its Move allowance this turn, has not attempted Jump/Climb/Swim (even if successful), is not Prone, and is not Engaged in combat.',
      'Target must have some visible part in Line of Sight.',
      'Good models may not take shots where there is any risk of hitting another Good model.',
      'Roll a D6 equal to or above the Shoot value to hit. A natural 6 always hits. Moving models suffer -1 to their Shoot value for that shot.',
      'In The Way — Terrain: roll D6 for each obstruction. 5+ for purpose-built fortifications / windows / doorways. 4+ for flimsy fences / bushes / crops / long grass. 3+ for walls / rocks / tree trunks / sturdy fences. On a fail the shot hits the obstruction instead.',
      'In The Way — Friendly models in base contact with cover they can see over may lean out (no ITW test). Engaged models cannot do this.',
      'In The Way — Enemy models (Evil armies only): roll D6 per enemy in the way; 1-3 the nearest friendly is hit instead; 4-6 the shot passes through to the original target.',
      'After a hit, roll To Wound using the Strength vs Defence table. A natural 6 always wounds.',
      'Heroic Accuracy: re-rolls all failed In The Way rolls (not a +1 to hit).',
    ],
    actions: [
      {
        step: '1. Declare Heroic Actions (Shoot Phase)',
        detail: 'Non-priority player declares first, alternating. Heroic Shoot (costs 1 Might): hero and friendly models within 6" shoot before the enemy this turn — "Loose!" allows all to shoot even without a missile weapon. Heroic Accuracy (costs 1 Might): hero (and "Take Aim!" — friends within 6") re-rolls all failed In The Way rolls.',
        who: 'Non-priority player first, alternating',
      },
      {
        step: '2. Heroic Shoot models fire',
        detail: 'Heroes who declared Heroic Shoot and their nearby friends fire before normal Shoot Phase order.',
        who: 'Declared heroes and friends within 6"',
      },
      {
        step: '3. Priority player\'s shooters fire',
        detail: 'For each shooting model: confirm it meets all shoot criteria (no more than half move, not Engaged, not Prone, not post-Jump/Climb). Measure range. Draw LoS — if completely blocked by friendlies (Good armies) the shot cannot be taken.',
        who: 'Priority player',
      },
      {
        step: '4. Non-priority player\'s shooters fire',
        detail: 'Same process as above for all remaining players.',
        who: 'Non-priority players',
      },
      {
        step: '5. Resolve each shot — To Hit roll',
        detail: 'Roll D6 ≥ Shoot value (minus 1 if the model moved this turn). Natural 6 always hits. For each piece of terrain or model in the way, roll the appropriate In The Way test (5+/4+/3+ depending on terrain type).',
        who: 'Shooting player',
      },
      {
        step: '6. Resolve each shot — To Wound roll',
        detail: 'Cross-reference Strength vs Defence on the wound table. Roll D6 — meet or exceed the required number. Natural 6 always wounds. Multi-wound models track remaining wounds.',
        who: 'Shooting player',
      },
      {
        step: '7. Fate saves',
        detail: 'Hero targets may spend Fate points to negate wounds. Each Fate point spent: roll D6 on a 4, 5, or 6 the wound is ignored. Multiple Fate points may be spent — each roll is for the same wound, and you decide whether to spend another after each roll.',
        who: 'Target (hero) player',
      },
      {
        step: '8. Remove casualties',
        detail: 'Remove slain models. Update each player\'s points-lost for breaking-point tracking.',
        who: 'All players',
      },
    ],
    tips: 'Remember: Heroic Accuracy gives re-rolls on In The Way tests — not a bonus to hit. Good armies cannot shoot into any area where their own models could be struck. A model that moved more than HALF its Move value this turn cannot shoot at all.',
  },

  // ────────────────────────────────────────────────────────────────────────────
  // FIGHT PHASE
  // ────────────────────────────────────────────────────────────────────────────
  {
    name: 'Fight Phase',
    short: 'Fight',
    icon: '🗡️',
    color: '#4a1a1a',
    rules: [
      'At the START of the Fight Phase, heroes may declare Heroic Strike, Heroic Combat, Heroic Strength, Heroic Defence, or Heroic Challenge. Player WITHOUT Priority declares first; players alternate.',
      'The Priority player chooses the order in which all combats are resolved.',
      'Every model in base contact with an enemy must fight — no exceptions.',
      'Duel Roll: each side rolls a number of D6 equal to their Attacks value. Compare the single highest die — highest wins.',
      'Tie (equal highest die): the model with the higher Fight value wins. If Fight values are also equal, the Priority player rolls a single D6: on a 1–3 the Evil side wins; on a 4–6 the Good side wins.',
      'The winning side makes Strikes — rolls To Wound using Strength vs Defence for each Attack. Natural 6 always wounds; natural 1 always fails.',
      'The losing side backs away 1" directly away from the winner (controlling player chooses direction). A Trapped model (cannot back away 1") — each of the winner\'s Attacks becomes two Strikes instead.',
      'Spears/pikes: a model directly behind a fighter and armed with a spear may add its Attacks to the duel for its side. Pikes can support through up to 2 ranks.',
      'Two-handed weapons: +1 Strength when striking but lose fights on tied Duel rolls.',
      'Hero targets may spend Fate after wounds are determined (4+, one Fate point per attempt).',
      'Might can modify any die roll in the fight by +/–1 per point; when both heroes spend Might on a duel, the losing side bids first, players alternate until both pass or a 6 is reached.',
      'Heroic Strike: adds D6 to the hero\'s Fight value (rolled at start of the duel, can\'t exceed 10).',
      'Heroic Strength: adds D3 to the hero\'s Strength for this phase (can\'t exceed 10).',
      'Heroic Defence: hero only suffers wounds on natural 6s regardless of other modifiers.',
      'Heroic Combat: if declared hero wins the fight AND all opponents in the fight are slain, the hero (and engaged allies, not supporters) may move and fight again immediately.',
      'Heroic Challenge: the challenging hero and their opponent fight in isolation — all other models cannot contribute dice, Fight values, or Strikes. Winner gains D3 Might (may exceed starting allocation).',
    ],
    actions: [
      {
        step: '1. Declare Heroic Actions (Fight Phase)',
        detail: 'Non-priority player declares first, alternating. Options and their costs (1 Might each): Heroic Strike (+D6 Fight value this fight, max 10), Heroic Strength (+D3 Strength this phase, max 10), Heroic Defence (wounds only on natural 6s), Heroic Combat (move and fight again if all opponents slain), Heroic Challenge (fight in isolation with opponent; winner gets D3 Might).',
        who: 'Non-priority player first, alternating',
      },
      {
        step: '2. Priority player chooses fight order',
        detail: 'The Priority player picks which combat to resolve first. Strategic order matters — clearing models can free others or deny support.',
        who: 'Priority player',
      },
      {
        step: '3. Duel Roll',
        detail: 'Each side rolls D6 for each Attack. Compare highest single die. Spear/pike models directly behind may add their Attacks. Heroic Strike: roll the bonus D6 now and add to that hero\'s Fight value for the tie-break.',
        who: 'Both sides',
      },
      {
        step: '4. Resolve ties',
        detail: 'If highest dice are equal: higher Fight value wins. If Fight is also equal: Priority player rolls a single D6 — 1-3 the Evil side wins, 4-6 the Good side wins. Might can be spent to adjust dice after all dice are rolled — losing side bids first, alternating.',
        who: 'Both sides',
      },
      {
        step: '5. Winner strikes',
        detail: 'Winner rolls To Wound using Strength vs Defence (Heroic Strength bonus applies). Two-handed weapons add +1S but lose tied duels. Natural 6 always wounds; natural 1 always fails. Trapped losers (can\'t back away) suffer 2 Strikes per Attack.',
        who: 'Winning side',
      },
      {
        step: '6. Fate and Might saves',
        detail: 'Hero targets spend Fate: roll D6 per point, 4+ negates that wound. Might can adjust individual Fate rolls. Multiple Fate points may be spent for the same wound — decide after each roll.',
        who: 'Hero target\'s player',
      },
      {
        step: '7. Loser backs away',
        detail: 'The losing side moves 1" directly back (controlling player chooses direction). If Trapped (obstacle or models prevent a full 1" move), they are Trapped — already factored into step 5.',
        who: 'Losing side',
      },
      {
        step: '8. Heroic Combat follow-up',
        detail: 'If a Heroic Combat hero wins AND all opponents in that specific fight are slain, the hero and their directly-engaged allies (not supporters) may immediately move and potentially charge new enemies. They fight again in normal fight sequence. Each model benefits from Heroic Combat at most once per turn.',
        who: 'Heroic Combat hero and allies',
      },
      {
        step: '9. Next combat — repeat from step 2',
        detail: 'Remove casualties. Update points-lost. Priority player picks the next combat. Continue until all fights are resolved.',
        who: 'Priority player',
      },
    ],
    tips: 'Heroic Strike adds a D6 to Fight (not +1), so it can dramatically swing tied duels. Heroic Combat is only triggered if you win AND clear all opponents in that fight. Trapped models double the winner\'s Strikes — try to back enemies into walls and obstacles.',
  },

  // ────────────────────────────────────────────────────────────────────────────
  // END PHASE
  // ────────────────────────────────────────────────────────────────────────────
  {
    name: 'End Phase',
    short: 'End',
    icon: '🌙',
    color: '#3a2a4a',
    rules: [
      'Resolve any effects that last "until the End Phase" (e.g. Paralyse, Transfix, other lingering spells).',
      'Clear all stray tokens and dice from the table.',
      'Score any Victory Points awarded at end of turn (scenario-specific).',
      'Check for game-end conditions — most scenarios end when one force hits 25% of starting models.',
      'For scenarios with a "broken-roll" end: if any force is Broken, roll a D6. On a 1–2 the game ends. Otherwise continue.',
      'Decisive Victory: if one side has double or more VPs than the other, they claim a Crushing Victory.',
      'Sudden Death: if one force is completely wiped out, the game ends immediately regardless of turn count.',
      'If the agreed turn limit is reached without triggering another end condition, the game ends and VPs are compared.',
    ],
    actions: [
      {
        step: '1. Resolve end-of-turn effects',
        detail: 'Remove or resolve all spell effects that last "until the End Phase" — Paralyse, Transfix, Compel, Immobilise, Wither, etc. Return affected models to their normal state.',
        who: 'All players',
      },
      {
        step: '2. Check Control Zone / objective scoring',
        detail: 'For scenarios that score objectives per-turn or in the End Phase (Capture and Control, Domination, etc.): check which models are within the required distance. Award VPs as described in your scenario.',
        who: 'All players',
      },
      {
        step: '3. Roll for game end (broken-roll scenarios)',
        detail: 'If your scenario uses "after one force breaks, roll D6 — end on 1-2": check if any force is broken. If so, roll a D6. On a 1 or 2 the game ends now — proceed to final VP tally. On 3+ the game continues.',
        who: 'Non-priority player rolls (or agree)',
      },
      {
        step: '4. Check 25% threshold (25pct scenarios)',
        detail: 'If your scenario ends when one force hits 25% of starting models: count remaining models for each player. If any player is at or below 25%, the game ends immediately.',
        who: 'All players',
      },
      {
        step: '5. Sudden Death / turn limit',
        detail: 'If any force is completely eliminated, the game ends. If the agreed maximum turns has been reached, the game ends.',
        who: 'All players',
      },
      {
        step: '6. Concession',
        detail: 'A player with a Broken force may concede at the end of any turn. The opposing players claim the scenario.',
        who: 'Broken army player',
      },
      {
        step: '7. Advance to next turn',
        detail: 'Clear the table, reset priority, and begin the Priority Phase of the next turn.',
        who: 'All',
      },
    ],
    tips: 'Most standard scenarios end at 25% — track casualty points carefully. "Broken-roll" scenarios (Hold Ground, Lords of Battle, Capture and Control, Fog of War) can continue many turns after one side breaks, creating dramatic comebacks.',
  },
];

// ─── WOUND TABLE ─────────────────────────────────────────────────────────────
// woundTable[strength-1][defence-1] = required roll (null = impossible)
// Based on the official MESBG To Wound chart.
export const WOUND_TABLE: (number | null)[][] = [
  [4, 5, 6, 6, null, null, null, null, null, null], // S1
  [4, 4, 5, 6, 6, null, null, null, null, null],    // S2
  [3, 4, 4, 5, 6, 6, null, null, null, null],       // S3
  [3, 3, 4, 4, 5, 6, 6, null, null, null],          // S4
  [3, 3, 3, 4, 4, 5, 6, 6, null, null],             // S5
  [3, 3, 3, 3, 4, 4, 5, 6, 6, null],                // S6
  [3, 3, 3, 3, 3, 4, 4, 5, 6, 6],                   // S7
  [3, 3, 3, 3, 3, 3, 4, 4, 5, 6],                   // S8
  [3, 3, 3, 3, 3, 3, 3, 4, 4, 5],                   // S9
  [3, 3, 3, 3, 3, 3, 3, 3, 4, 4],                   // S10
];

// ─── HEROIC ACTIONS (verified list) ──────────────────────────────────────────
export const HEROIC_ACTIONS = [
  {
    name: 'Heroic Move',
    phase: 'Move',
    cost: '1 Might',
    effect: 'The hero (and friendly models within 6" — "With Me!") moves before the Priority player\'s normal moves. Models that choose not to move forfeit their Move phase.',
  },
  {
    name: 'Heroic March',
    phase: 'Move',
    cost: '1 Might',
    effect: 'The hero gains +3" move (infantry) or +5" (cavalry/fly). "At The Double!" — friendly models within 6" get the same bonus. Models using Heroic March cannot charge.',
  },
  {
    name: 'Heroic Resolve',
    phase: 'Move',
    cost: '1 Might',
    effect: 'Triggers immediately on declaration. Friendly models within 6" gain +1 free die to all Resist tests this turn. The declaring hero cannot move this turn but may cast Magical Powers.',
  },
  {
    name: 'Heroic Channelling',
    phase: 'Move',
    cost: '1 Might',
    effect: 'The hero casts all Magical Powers using their Channelled versions this turn (different effects per spell).',
  },
  {
    name: 'Heroic Shoot',
    phase: 'Shoot',
    cost: '1 Might',
    effect: 'The hero shoots before other models. "Loose!" — friendly models within 6" may also shoot (even without missile weapons); models choosing not to participate cannot shoot later that phase.',
  },
  {
    name: 'Heroic Accuracy',
    phase: 'Shoot',
    cost: '1 Might',
    effect: 'The hero re-rolls all failed In The Way rolls when shooting. "Take Aim!" — friendly models within 6" also re-roll failed In The Way tests. Cannot be used if Engaged.',
  },
  {
    name: 'Heroic Strike',
    phase: 'Fight',
    cost: '1 Might',
    effect: 'Roll a D6 and add the result to the hero\'s Fight value for this fight (cannot exceed Fight 10). The bonus is applied before the duel dice are rolled.',
  },
  {
    name: 'Heroic Strength',
    phase: 'Fight',
    cost: '1 Might',
    effect: 'Roll a D3 and add the result to the hero\'s Strength for this phase (cannot exceed Strength 10).',
  },
  {
    name: 'Heroic Defence',
    phase: 'Fight',
    cost: '1 Might',
    effect: 'The hero only suffers wounds on a natural 6 this phase, regardless of other modifiers. If normally wounded on 6/4+ or 6/5+, both dice must be natural 6s.',
  },
  {
    name: 'Heroic Combat',
    phase: 'Fight',
    cost: '1 Might',
    effect: 'If the hero wins the fight AND all opponents in that fight are slain, the hero and their directly-engaged allies may immediately move and potentially charge new enemies. They fight again in normal sequence. Cannot benefit from this more than once per turn.',
  },
  {
    name: 'Heroic Challenge',
    phase: 'Fight',
    cost: '1 Might',
    effect: 'The hero challenges an enemy Hero of equal or higher Heroic Tier in base contact. In the resulting fight, all other models cannot contribute dice, Fight values, or Strikes. The winner gains D3 Might (may exceed starting allocation). If declined, the refusing hero\'s Heroic Actions no longer affect friendly models until the challenger is slain.',
  },
];

// ─── COURAGE REFERENCE ───────────────────────────────────────────────────────
export const COURAGE_RULES = {
  roll: '2D6 + Courage value. If the total is 10 or more the test is passed.',
  brokenThreshold: 'A force is Broken when casualties exceed half its starting models (rounded down).',
  brokenEffect: 'All non-Engaged models in a Broken force must test (2D6 + Courage ≥ 10) at the start of the Move Phase before moving. On a fail, the model is immediately removed from play as a casualty — it has lost its nerve.',
  standFast: 'Warrior models do not need to test if a friendly Hero within 6" has already passed their Courage test this turn. Engaged Heroes cannot trigger Stand Fast!',
  terror: 'Models must pass a Courage test before charging a model with Terror. On a fail, they cannot charge that model.',
};
