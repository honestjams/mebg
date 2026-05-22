// Phase rules content
export const PHASES = [
  {
    name: 'Priority Phase',
    icon: '⚔️',
    color: '#8b1a1a', // deep red
    rules: [
      'Both players roll a D6. The player with the highest result has Priority this turn.',
      'In the event of a tie, the player who had Priority in the previous turn keeps it.',
      'The player with Priority moves first in the Move Phase.',
      'Heroic Actions must be declared here — starting with the Priority player.',
      'The player with Priority chooses the order fights are resolved in the Fight Phase.',
    ],
    tips: 'Heroic Move, Heroic Shoot, Heroic Combat, Heroic Strength, Heroic Defence, and Heroic Accuracy are declared in this phase.',
  },
  {
    name: 'Move Phase',
    icon: '🏃',
    color: '#1a3a1a', // deep green
    rules: [
      'The Priority player moves all their models first, then their opponent.',
      'Models may move up to their Move value in inches.',
      'A model may choose to Run — it may move double its Move value but cannot shoot this turn.',
      'To Charge an enemy, move into base contact. You must charge if you can.',
      'Models may jump, climb, or cross obstacles — halve remaining movement after.',
      'Cavalry models may attempt to Knock Down infantry when charging (Strength 3 hit).',
    ],
    tips: 'Remember: models that Run cannot shoot. Mounted models add +1 to their Fight value when charging.',
  },
  {
    name: 'Shoot Phase',
    icon: '🏹',
    color: '#3a2a0a', // dark gold
    rules: [
      'Any model with a shooting weapon that has not Run may shoot.',
      'Target must be within Range and Line of Sight (draw a line from eye to target).',
      'Roll a D6 to hit: equal to or higher than the model\'s Shoot value.',
      'If the roll To Hit succeeds, roll To Wound using the Strength vs Defence table.',
      'In The Way: if something is between shooter and target, roll a D6 — on a 1-3 the shot hits the obstruction instead.',
      'Volley Fire: models behind friendly models may shoot over them (hits on 6 only).',
    ],
    tips: 'Natural roll of 1 always misses. Mounted targets: if the mount is hit, check if the rider is struck. In The Way rolls happen for each piece of terrain or model in the line of fire.',
  },
  {
    name: 'Fight Phase',
    icon: '🗡️',
    color: '#4a1a1a', // dark red
    rules: [
      'The Priority player chooses the order all combats are resolved in.',
      'All models in base contact with an enemy must fight.',
      'Each model in a combat rolls a number of dice equal to their Attacks value.',
      'The highest single die in each side\'s pool wins the fight. Fight value breaks ties; if still tied, both sides roll again.',
      'The winner strikes: roll To Wound for each Attack using the Strength vs Defence table.',
      'A roll of 6 To Wound is always a wound. A roll of 1 always fails.',
      'Losers may use Fate points to attempt to ignore wounds (roll D6: 4+ saves the wound).',
    ],
    tips: 'Spears/pikes allow supporting models to add their attacks to the fight. Two-handed weapons give +1 Strength but fight last if tied. Knock-backs occur when a mounted model wins a fight against infantry.',
  },
];

// Wound table: woundTable[strength-1][defence-1] = required roll (or null = impossible)
export const WOUND_TABLE: (number | null)[][] = [
  [4, 5, 6, 6, null, null, null, null, null, null], // S1
  [3, 4, 5, 6, 6, null, null, null, null, null],    // S2
  [2, 3, 4, 5, 6, 6, null, null, null, null],       // S3
  [2, 3, 4, 5, 6, 6, null, null, null, null],       // S4 (same as S3 vs low D)
  [2, 3, 3, 4, 5, 6, 6, null, null, null],          // S5
  [2, 2, 3, 4, 5, 6, 6, null, null, null],          // S6
  [2, 2, 3, 3, 4, 5, 6, 6, null, null],             // S7
  [2, 2, 2, 3, 4, 5, 6, 6, null, null],             // S8
  [2, 2, 2, 3, 3, 4, 5, 6, 6, null],               // S9
  [2, 2, 2, 2, 3, 4, 5, 6, 6, 6],                  // S10
];

export const HEROIC_ACTIONS = [
  { name: 'Heroic Move', cost: '1 Might', effect: 'Move your models before the Priority player in the Move Phase.' },
  { name: 'Heroic Shoot', cost: '1 Might', effect: 'Shoot before the enemy in the Shoot Phase.' },
  { name: 'Heroic Combat', cost: '1 Might', effect: 'After winning a fight, the hero may move and fight again immediately.' },
  { name: 'Heroic Strength', cost: '1 Might', effect: '+1 Strength for the remainder of the turn.' },
  { name: 'Heroic Defence', cost: '1 Might', effect: '+1 Defence for the remainder of the turn.' },
  { name: 'Heroic Accuracy', cost: '1 Might', effect: '+1 to all To Hit rolls for the remainder of the Shoot Phase.' },
  { name: 'Heroic March', cost: '1 Might', effect: 'All friendly models within 6" may move as if they had declared a Heroic Move.' },
  { name: 'Heroic Channelling', cost: '1 Might', effect: '+1 to all Magical Power casting rolls this turn.' },
  { name: 'Heroic Resolve', cost: '1 Might', effect: 'All friendly models within 6" pass Courage tests automatically this turn.' },
  { name: 'Heroic Strike', cost: '1 Might', effect: '+1 Fight value in the next fight this hero participates in.' },
  { name: 'Heroic Challenge', cost: '1 Might', effect: 'Force the nearest visible enemy hero to fight this hero.' },
];
