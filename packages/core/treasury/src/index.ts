export const manifest = {
  name: "treasury",
  version: "1.0.0",
  layer: "core",
  dependsOn: ["ledger"],
  events: ["TREASURY_SETTLED", "PAYOUT_PROCESSED"],
  cartridges: []
};
