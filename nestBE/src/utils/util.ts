export function tile2long(x, z): number {
  return (x / Math.pow(2, z) * 360 - 180);
}

export function tile2lat(y, z): number {
  const n = Math.PI - 2 * Math.PI * y / Math.pow(2, z);
  return (180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))));
}
