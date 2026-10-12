// Hand-drawn pixel art, stored as text. Each icon is a list of equal-length
// strings: '#' is a filled pixel, '.' is empty. Read it like a 2D char array in
// Java: grid[y].charAt(x), where y is the row (top to bottom) and x is the column.
//
// Grid sizes are chosen to divide the size they're shown at, so every pixel
// lands on whole screen pixels and stays sharp: 20px / 10 cells = 2px per cell,
// and 56px / 14 cells = 4px per cell.
const ICONS = {
  // A chess knight facing left: ears, eye, snout, neck, and a separate base.
  knight: [
    '...##.....',
    '..#####...',
    '.##.####..',
    '#########.',
    '###..####.',
    '.....####.',
    '....#####.',
    '...######.',
    '..........',
    '.########.',
  ],
  // "</>": two small chevrons around a stair-stepped slash.
  code: [
    '..........',
    '......#...',
    '......#...',
    '.#...#..#.',
    '#....#...#',
    '#...#....#',
    '.#..#...#.',
    '...#......',
    '...#......',
    '..........',
  ],
  // A big "?" for the face-down "Next project" card.
  question: [
    '..............',
    '....######....',
    '...########...',
    '..###....###..',
    '..##......##..',
    '..........##..',
    '.........###..',
    '.......####...',
    '......###.....',
    '......##......',
    '......##......',
    '..............',
    '......##......',
    '......##......',
  ],
} satisfies Record<string, string[]>;

export type PixelIconName = keyof typeof ICONS; // 'knight' | 'code' | 'question'

type Run = { x: number; y: number; length: number };

// Turns a grid into horizontal "runs" of filled pixels, so a row like
// "..####.." becomes one 4-wide rectangle instead of four 1-wide ones.
// (Run-length encoding: fewer SVG elements, same picture.)
function toRuns(grid: string[]): Run[] {
  const runs: Run[] = [];
  grid.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      if (row[x] !== '#') {
        x++;
        continue;
      }
      const start = x;
      while (x < row.length && row[x] === '#') x++;
      runs.push({ x: start, y, length: x - start });
    }
  });
  return runs;
}

type PixelIconProps = {
  name: PixelIconName;
  size?: number; // rendered width and height, in CSS pixels
  className?: string;
};

// Draws the icon as an SVG where 1 grid cell = 1 SVG unit; the viewBox then
// scales it up to `size`. fill="currentColor" means the icon takes the text
// color of whatever it sits in, so the same icon works on any card.
export default function PixelIcon({ name, size = 20, className }: PixelIconProps) {
  const grid = ICONS[name];
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox={`0 0 ${grid[0].length} ${grid.length}`}
      fill="currentColor"
      shapeRendering="crispEdges" // no anti-aliasing: hard pixel edges
      aria-hidden="true" // decoration only: the text next to it already says what it is
      focusable="false"
    >
      {toRuns(grid).map(({ x, y, length }) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={length} height={1} />
      ))}
    </svg>
  );
}
