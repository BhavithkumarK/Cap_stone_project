const registry = new Map();

export function registerPuzzle(type, generator, validator) {
  registry.set(type, { generator, validator });
}

export function getPuzzle(type) {
  return registry.get(type);
}
