// Amir — "The Seeker". Suralink's recurring host character.
// Pixel grids: one character per pixel, '.' = transparent. 16 px wide, 26 px tall.
// Rule: no facial features, ever (faceless brand + matches the inspo).

export const AMIR_PALETTE: Record<string, string> = {
  k: '#1c2620', // outline
  w: '#f1ece0', // kufi white
  y: '#d4a73a', // gold trim
  h: '#2a1d15', // hair
  s: '#c68b5c', // skin
  S: '#a36e47', // skin shadow
  g: '#2f6b4a', // thobe green
  G: '#21513a', // thobe shadow
  b: '#5a3a22', // shoes / leather
  l: '#fbe7a1', // phone screen glow
};

const HEAD = [
  '......kkkk......',
  '.....kwwwwk.....',
  '....kwwwwwwk....',
  '....kyyyyyyk....',
  '....khsssshk....',
  '....kssssssk....',
  '....kssssssk....',
  '.....kSSSSk.....',
  '......kssk......',
  '....kkwyywkk....',
];

const LOWER = [
  '...kgggyygggk...',
  '...kgggyygggk...',
  '...kGggyyggGk...',
  '...kGggggggGk...',
  '...kGGggggGGk...',
  '...kyyyyyyyyk...',
  '....kbbkkbbk....',
  '...kbbbkkbbbk...',
];

const idle = [
  ...HEAD,
  '...kggggggggk...',
  '..kggggyyggggk..',
  '..kgGggyyggGgk..',
  '.kgGkggyyggkGgk.',
  '.kgGkggyyggkGgk.',
  '.kgGkggyyggkGgk.',
  '.ksskggyyggkssk.',
  '..kkkggyyggkkk..',
  ...LOWER,
];

const point = [
  '......kkkk......',
  '.....kwwwwk...k.',
  '....kwwwwwwk.ksk',
  '....kyyyyyyk.ksk',
  '....khsssshk.kgk',
  '....kssssssk.kgk',
  '....kssssssk.kgk',
  '.....kSSSSk..kgk',
  '......kssk...kgk',
  '....kkwyywkk.kgk',
  '...kggggggggkgGk',
  '..kggggyyggggGk.',
  '..kgGggyyggggk..',
  '.kgGkggyyggggk..',
  '.kgGkggyyggggk..',
  '.kgGkggyyggggk..',
  '.ksskggyyggggk..',
  '..kkkggyygggk...',
  ...LOWER,
];

const read = [
  ...HEAD,
  '...kggggggggk...',
  '..kggggyyggggk..',
  '..kgGggyyggGgk..',
  '..kgGkggggkGgk..',
  '..kgkyyyyyykgk..',
  '..kskwwwkwwwksk.',
  '..kskwwwkwwwksk.',
  '...kkyyyyyyykk..',
  ...LOWER,
];

const phone = [
  ...HEAD,
  '...kggggggggk...',
  '..kggggyyggggk..',
  '..kgGggyyggGgk..',
  '.kgGkggyyggggk..',
  '.kgGkggykkkkgk..',
  '.kgGkggykllksk..',
  '.ksskggykllksk..',
  '..kkkggykkkkk...',
  ...LOWER,
];

const react = [
  '......kkkk......',
  '.....kwwwwk.....',
  '....kwwwwwwk....',
  '....kyyyyyyk....',
  'kk..khsssshk..kk',
  'ksk.kssssssk.ksk',
  'ksk.kssssssk.ksk',
  'kgk..kSSSSk..kgk',
  'kgk...kssk...kgk',
  'kgkkkkwyywkkkkgk',
  '.kgGgggyygggGgk.',
  '..kggggyyggggk..',
  '...kgggyygggk...',
  '...kgggyygggk...',
  '...kgggyygggk...',
  '...kgggyygggk...',
  '...kgggyygggk...',
  '...kgggyygggk...',
  ...LOWER,
];

const dua = [
  ...HEAD,
  '...kggggggggk...',
  '..kggggyyggggk..',
  '..kgGggyyggGgk..',
  '.kgGkkssksskkGgk',
  '.kgGgkssksskgGgk',
  '.kgGggkkkkkkgGk.',
  '..kgGggyyggGgk..',
  '..kkkggyyggkkk..',
  ...LOWER,
];

const back = [
  '......kkkk......',
  '.....kwwwwk.....',
  '....kwwwwwwk....',
  '....kyyyyyyk....',
  '....khhhhhhk....',
  '....khhhhhhk....',
  '....khhhhhhk....',
  '.....khhhhk.....',
  '......kssk......',
  '....kkggggkk....',
  '...kggggggggk...',
  '..kggggggggggk..',
  '..kgGggggggGgk..',
  '.kgGkggggggkGgk.',
  '.kgGkggggggkGgk.',
  '.kgGkggggggkGgk.',
  '.ksskggggggkssk.',
  '..kkkggggggkkk..',
  '...kggggggggk...',
  '...kggggggggk...',
  '...kGggggggGk...',
  '...kGggggggGk...',
  '...kGGggggGGk...',
  '...kyyyyyyyyk...',
  '....kbbkkbbk....',
  '...kbbbkkbbbk...',
];

// Side view (facing right). Flip horizontally to walk left.
const SIDE_HEAD = [
  '.....kkkk.......',
  '....kwwwwk......',
  '...kwwwwwwk.....',
  '...kyyyyyyk.....',
  '...khhssssk.....',
  '...khsssssk.....',
  '...khssssssk....',
  '....kSSSSk......',
  '.....kssk.......',
  '....kkgggyk.....',
];
const sideTorso = (arm: 'back' | 'mid' | 'fwd') => {
  const a = {back: 'kGGggggyk', mid: 'kgGGgggyk', fwd: 'kggGGggyk'}[arm];
  const hand = {back: 'kssggggyk', mid: 'kgssgggyk', fwd: 'kgggssgyk'}[arm];
  return [
    '...kggggggyk....',
    '...kggggggyk....',
    `...${a}....`,
    `...${a}....`,
    `...${a}....`,
    `...${a}....`,
    `...${hand}....`,
    '...kggggggyk....',
    '...kggggggyk....',
  ];
};
const LEGS_APART = [
  '..kgggggggyk....',
  '..kGggggggyk....',
  '.kGgggggggggk...',
  '.kGGgggggggGk...',
  '.kyyyyyyyyyyk...',
  '.kbbk....kbbk...',
  'kbbbk....kbbbk..',
];
const LEGS_TOGETHER = [
  '...kgggggyk.....',
  '...kGggggyk.....',
  '...kGggggGk.....',
  '...kGGgggGk.....',
  '...kyyyyyyk.....',
  '....kbbbbk......',
  '....kbbbbbk.....',
];

const walk = [
  [...SIDE_HEAD, ...sideTorso('back'), ...LEGS_APART],
  [...SIDE_HEAD, ...sideTorso('mid'), ...LEGS_TOGETHER],
  [...SIDE_HEAD, ...sideTorso('fwd'), ...LEGS_APART],
  [...SIDE_HEAD, ...sideTorso('mid'), ...LEGS_TOGETHER],
];

export const AMIR = {
  name: 'Amir',
  palette: AMIR_PALETTE,
  poses: {idle, point, read, phone, react, dua, back},
  walk,
};
export type AmirPose = keyof typeof AMIR.poses;
