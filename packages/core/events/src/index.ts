export const manifest = {
  name: "events",
  version: "1.0.0",
  layer: "core",
  dependsOn: ["kernel"],
  events: ["EVENT_RECORDED", "EVENT_REPLAYED"],
  cartridges: []
};

export interface DomainEvent {
  id: string;
  type: string;
  aggregateId: string;
  timestamp: Date;
  data: Record<string, unknown>;
}
