export function sanitizeInput(v: string) {
  v = v.replace(/^\n+/, '');

  v = v.replace(/\n{2,}/g, '\n');

  v = v.replace(/\n+$/, '\n');

  return v;
}
