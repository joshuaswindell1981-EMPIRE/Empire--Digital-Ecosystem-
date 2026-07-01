export interface Manifest {
  name: string;
  version: string;
  layer: 'core' | 'ai' | 'economy' | 'world' | 'platform';
  dependsOn: string[];
  events: string[];
  cartridges: string[];
}

const cartridges: Map<string, Manifest> = new Map();

export function register(manifest: Manifest): void {
  cartridges.set(manifest.name, manifest);
}

export function load(): Manifest[] {
  return Array.from(cartridges.values());
}

export function get(name: string): Manifest | undefined {
  return cartridges.get(name);
}

export const REGISTRY = {
  register,
  load,
  get
};
