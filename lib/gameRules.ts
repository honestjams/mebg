// Standard game length and end-of-game rules
export const DEFAULT_MAX_TURNS = 10;

// Detailed action checklist for each phase — sequenced sub-steps the players
// should walk through. Each step has a short heading and an explanation.
export interface PhaseAction {
  step: string;       // short title
  detail: string;     // longer description
  who?: string;       // who performs / declares
}

export interface PhaseData {
  name: string;
  short: string;       // for navigator
  icon: string;
  color: string;
  rules: string[];     // top-level rules (existing)
  actions: PhaseAction[]; // NEW granular sub-steps
  tips: string;
}

export const PHASES: PhaseData[] = [
  {
    name: 'Priority Phase',
    short: 'Priority',
    icon: '⚔️',
    color: '#8b1a1a',
    rules: [
      'Both players roll a D6. The highest result has Priority this turn.',
      'In the event of a tie, the player who held Priority in the previous turn keeps it. On Turn 1, a tie means neither side has Priority.',
      'The player with Priority moves first and chooses fight order in the Fight Phase.',
      'Heroic Actions are declared in this phase, alternating from the Priority player.',
    ],
    actions: [
      { step: '1. Roll for Priority', detail: 'Each player rolls a D6. The highest result has Priority. Ties are broken by who held Priority last turn (Turn 1 ties = no Priority).', who: 'All players' },
      { step: '2. Mark the Priority Marker', detail: 'Place the Priority indicator with the winning player. This player chooses fight resolution order later.', who: 'Priority player' },
      { step: '3. Declare Heroic Moves', detail: 'Starting with the Priority player and alternating, heroes may spend 1 Might to declare Heroic Move. All friendly models within 6" may also move first (if Heroic March).', who: 'Heroes, alternating' },
      { step: '4. Declare other Heroic Actions', detail: 'Heroic Shoot, Heroic Strike, Heroic Defence, Heroic Strength, Heroic Channelling, Heroic Resolve, Heroic Combat, Heroic Accuracy, Heroic Challenge — declare in turn order.', who: 'Heroes' },
      { step: '5. Resolve "start of turn" effects', detail: 'Apply any rules that trigger at the start of the turn (e.g. Stand Fast! courage tests, ongoing spell effects, summoned models, special army rules).', who: 'All players' },
    ],
    tips: 'Heroic Move is the most powerful declaration — being able to move before the enemy can win games. Save 1 Might per hero for it where possible.',
  },
  {
    name: 'Move Phase',
    short: 'Move',
    icon: '🏃',
    color: '#1a3a1a',
    rules: [
      'The Priority player moves all their models first, then opposing players in turn.',
      'Models may move up to their Move value in inches. Difficult terrain halves movement through it.',
      'Run: a model may move double its Move value but cannot shoot this turn.',
      'Charge: to charge an enemy you must end the move in base contact. You must charge if you can reach an unengaged enemy.',
      'Climbing, jumping or crossing obstacles uses In The Way / climb rolls — see scenery rules.',
      'Cavalry charging unmounted infantry roll for Knock To The Ground (S3 hit).',
    ],
    actions: [
      { step: '1. Heroic Move models move', detail: 'Any heroes who declared Heroic Move (and any models they brought with them via Heroic March) move first.', who: 'Declared Heroes' },
      { step: '2. Priority player moves', detail: 'The Priority player moves all remaining models. Resolve charges, broken-army courage tests, and Stand Fast! triggers.', who: 'Priority player' },
      { step: '3. Other players move in priority order', detail: 'Each remaining player moves all their models, in descending priority order. (In a 2-player game this is just the non-Priority player.)', who: 'Non-priority players' },
      { step: '4. Resolve charge effects', detail: 'Cavalry roll Knock To The Ground vs charged infantry. Pikemen on charge resolve their step. Spear support pairings are noted.', who: 'Charging models' },
      { step: '5. Broken army Courage', detail: 'If any player is below half-strength (broken), all their models must test Courage (2D6 ≤ Courage) to move toward the enemy.', who: 'Broken army players' },
    ],
    tips: 'A model that Runs (double move) cannot shoot. Mounted models gain +1 Fight when they charge. Heroic March moves all friends within 6" along with the hero.',
  },
  {
    name: 'Shoot Phase',
    short: 'Shoot',
    icon: '🏹',
    color: '#3a2a0a',
    rules: [
      'Any model with a missile weapon that did not Run, charge, or fight may shoot.',
      'Target must be within Range and Line of Sight (eye-to-target sightline).',
      'Roll a D6 to hit; equal or higher than the model\'s Shoot value succeeds. Natural 1 always misses.',
      'If the hit succeeds, roll to Wound using the Strength vs Defence wound table.',
      'In The Way: each piece of terrain or model between shooter and target — roll D6. 1-3 hits the obstruction instead.',
      'Volley Fire: bows may fire over friendly models, hitting only on natural 6s.',
    ],
    actions: [
      { step: '1. Declare shooters', detail: 'For each model wishing to shoot, confirm it didn\'t Run, charge into combat, or end the Move Phase in combat. Engaged models may not shoot.', who: 'All players (priority first)' },
      { step: '2. Check Range & Line of Sight', detail: 'Measure range. Draw a sightline from the shooter\'s eyes to any part of the target. Note any "In the Way" rolls needed.', who: 'Active shooter' },
      { step: '3. Heroic Shoot', detail: 'A Hero who declared Heroic Shoot (and any models within 6") may shoot before the opposing side.', who: 'Declared heroes' },
      { step: '4. Resolve hit roll', detail: 'Roll a D6 — equal or higher than the Shoot value hits. A natural 1 always misses regardless of modifiers.', who: 'Active shooter' },
      { step: '5. Resolve In The Way', detail: 'For each model or piece of terrain in the line: roll D6. On 1-3 the shot hits that target instead. Friends in the way: shot is wasted unless using Volley Fire.', who: 'Both players' },
      { step: '6. Resolve wound roll', detail: 'Use the Wound table (S vs D). Fate may be spent by hero targets after wounds are taken (4+ ignores).', who: 'Target' },
      { step: '7. Remove casualties', detail: 'Remove any slain models. Track points lost for breaking-point.', who: 'Owning player' },
    ],
    tips: 'Heroic Accuracy gives +1 to hit rolls for the hero and friendly models within 6". Mounted targets: if the mount is hit, roll a die — on a 1 the rider is also struck.',
  },
  {
    name: 'Fight Phase',
    short: 'Fight',
    icon: '🗡️',
    color: '#4a1a1a',
    rules: [
      'All models in base-to-base contact with an enemy must fight.',
      'The Priority player chooses the order combats are resolved in.',
      'Each model rolls a number of D6 equal to its Attacks value.',
      'The highest single die in each side wins. Ties broken by Fight value; if still tied, both sides re-roll all dice.',
      'The winning side strikes — roll to Wound using S vs D for each Attack.',
      'A natural 6 to wound is always a wound; a natural 1 always fails.',
      'Hero targets may spend Fate (4+ ignores each wound). Might can modify any die ±1 per point.',
    ],
    actions: [
      { step: '1. Identify combats', detail: 'Walk the table — every model in base contact with an enemy must fight. Group multi-model fights together.', who: 'Priority player' },
      { step: '2. Choose order', detail: 'The Priority player picks which combat to resolve first. Cleared models can sometimes free others.', who: 'Priority player' },
      { step: '3. Declare Heroic Strike', detail: 'Either hero in this fight may now spend 1 Might to declare Heroic Strike (+1 Fight value for this fight). Higher Fight strikes first if it matters.', who: 'Engaged heroes' },
      { step: '4. Roll Duel dice', detail: 'Each side rolls dice equal to total Attacks (spears/pikes add their attacks). Compare highest single die.', who: 'Both sides' },
      { step: '5. Resolve ties', detail: 'Higher Fight wins. If Fight values are tied, re-roll all duel dice for both sides.', who: 'Both sides' },
      { step: '6. Winner strikes', detail: 'The winning side rolls to Wound using S vs D, one die per Attack. Two-handed weapons add +1 S but strike last on a tie. Mighty Blow uses Might to add to wound rolls.', who: 'Winning side' },
      { step: '7. Spend Fate', detail: 'Hero target may spend any number of Fate points: each rolls D6, a 4+ ignores that wound.', who: 'Hero target' },
      { step: '8. Cavalry knockback', detail: 'If a mounted model won the fight against infantry, the loser is Knocked to the Ground.', who: 'Mounted winner' },
      { step: '9. Heroic Combat', detail: 'A hero who declared Heroic Combat and wiped out all their opponents may move and fight again immediately.', who: 'Declared heroes' },
      { step: '10. Remove casualties & next combat', detail: 'Remove dead models. Update points-lost. Proceed to the next combat chosen by the Priority player.', who: 'All' },
    ],
    tips: 'Spears support a friendly model in front (adds 1 Attack to the duel). Two-handed weapons: +1 Strength but lose ties. Pikes can support to 2 ranks deep.',
  },
  {
    name: 'End Phase',
    short: 'End',
    icon: '🌙',
    color: '#3a2a4a',
    rules: [
      'Check all "end of turn" effects (lingering spells, scenario triggers, objectives).',
      'Score any Victory Points awarded at end of turn.',
      'Check for scenario-specific game-end conditions.',
      'If this was the final turn (default 10), the game ends and the winner is determined by VPs.',
      'From turn 8 onward, some scenarios call for a "roll for game end" check.',
    ],
    actions: [
      { step: '1. Resolve end-of-turn effects', detail: 'Spells with "until the end of the turn" expire. Apply lingering damage, terror auras dissipate, etc.', who: 'All players' },
      { step: '2. Score objectives', detail: 'Many scenarios award VP at end of turn for holding objectives, killing heroes, or maintaining army integrity. Update VP trackers.', who: 'All players' },
      { step: '3. Roll for game end (turn 8+)', detail: 'In scenarios with a variable end: roll a D6. On a 3+ the game ends. Otherwise continue.', who: 'Priority player' },
      { step: '4. Check breaking point & concession', detail: 'A broken player may concede at the end of any turn — opposing players claim the scenario.', who: 'Broken players' },
      { step: '5. Advance to next turn', detail: 'If the game continues, reset the priority marker, return to the Priority Phase, and begin the next turn.', who: 'All' },
    ],
    tips: 'Many scenarios use "Lords of Battle" style scoring: VPs per enemy hero killed and per 100 enemy points removed. Always check the specific scenario.',
  },
];

// Wound table: woundTable[strength-1][defence-1] = required roll (or null = impossible)
export const WOUND_TABLE: (number | null)[][] = [
  [4, 5, 6, 6, null, null, null, null, null, null], // S1
  [3, 4, 5, 6, 6, null, null, null, null, null],    // S2
  [3, 4, 5, 5, 6, 6, null, null, null, null],       // S3
  [3, 3, 4, 5, 5, 6, 6, null, null, null],          // S4
  [2, 3, 4, 4, 5, 6, 6, 6, null, null],             // S5
  [2, 3, 3, 4, 5, 5, 6, 6, 6, null],                // S6
  [2, 2, 3, 4, 4, 5, 6, 6, 6, 6],                   // S7
  [2, 2, 3, 3, 4, 5, 5, 6, 6, 6],                   // S8
  [2, 2, 2, 3, 4, 4, 5, 6, 6, 6],                   // S9
  [2, 2, 2, 3, 3, 4, 5, 5, 6, 6],                   // S10
];

export const HEROIC_ACTIONS = [
  { name: 'Heroic Move', cost: '1 Might', effect: 'Move your hero and any friendly models within 6" before the Priority player\'s normal moves.' },
  { name: 'Heroic March', cost: '1 Might', effect: 'All friendly models within 6" of the hero may move as if they had declared a Heroic Move.' },
  { name: 'Heroic Shoot', cost: '1 Might', effect: 'Hero and friendly models within 6" may shoot before the enemy in the Shoot Phase.' },
  { name: 'Heroic Accuracy', cost: '1 Might', effect: '+1 to all To Hit rolls for the hero and friends within 6" for the Shoot Phase.' },
  { name: 'Heroic Strike', cost: '1 Might', effect: '+1 Fight value for the hero in this fight. The opponent may also declare a Heroic Strike to match.' },
  { name: 'Heroic Combat', cost: '1 Might', effect: 'After winning a fight and eliminating all opponents, the hero may move and fight again immediately.' },
  { name: 'Heroic Strength', cost: '1 Might', effect: '+1 Strength for the hero for the remainder of the turn.' },
  { name: 'Heroic Defence', cost: '1 Might', effect: '+1 Defence for the hero for the remainder of the turn.' },
  { name: 'Heroic Resolve', cost: '1 Might', effect: 'All friendly models within 6" pass Courage tests automatically this turn.' },
  { name: 'Heroic Channelling', cost: '1 Might', effect: '+1 to all Magical Power casting rolls this turn for the hero.' },
  { name: 'Heroic Challenge', cost: '1 Might', effect: 'The nearest visible enemy hero must fight this hero in the next Fight Phase.' },
];
