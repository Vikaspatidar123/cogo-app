/* eslint-disable no-param-reassign */
const getFinalServices = (services, location, mode) => {
  if (Object.keys(services).length > 0) {
    return services;
  }
  if (location.origin.is_icd && mode === "fcl_freight") {
    services.export_haulage_freight = true;
  }
  if (location.destination.is_icd && mode === "fcl_freight") {
    services.import_haulage_freight = true;
  }
  return services;
};
export default getFinalServices;
