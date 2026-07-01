export const manifest = {
  name: "identity",
  version: "1.0.0",
  layer: "core",
  dependsOn: ["kernel"],
  events: ["PARTNER_ONBOARDED", "IDENTITY_VERIFIED"],
  cartridges: []
};
