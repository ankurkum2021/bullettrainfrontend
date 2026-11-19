/** Indian state / UT codes for catalog API rows. */
export const STATE_NAMES: Record<string, string> = {
  BR: "Bihar",
  CH: "Chandigarh",
  DL: "Delhi",
  GJ: "Gujarat",
  HR: "Haryana",
  JH: "Jharkhand",
  KA: "Karnataka",
  MH: "Maharashtra",
  PB: "Punjab",
  RJ: "Rajasthan",
  TN: "Tamil Nadu",
  TS: "Telangana",
  UP: "Uttar Pradesh",
  WB: "West Bengal",
};

export function stateNameFromCode(code: string): string | undefined {
  return STATE_NAMES[code.toUpperCase()];
}