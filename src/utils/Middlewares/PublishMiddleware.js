/*
    Verifies les informations liées au vol
*/
export const ValidateFlight = (departure, destination) => {
  if (!departure || !destination) {
    console.log('champ(s) vide(s)');
    return false;
  }
  return true;
};

/*
    Verifies les informations liées aux dates
*/
export const ValidateDates = (departureDate, lastDepot, distributionDate) => {
  if (!departureDate || !lastDepot || distributionDate) {
    console.log('champs vides');
    return false;
  }
  return true;
};

/*
    Verifies les informations liées aux valises
*/
export const ValidateSuiteCases = bagages => {
  if (!bagages || bagages.length < 1) {
    console.log('champs vides');
    return false;
  }
  return true;
};
/*
    Verifies les informations liées au depot et retrait
*/
export const ValidateDepositAndRetrieval = (depot, retrait) => {
  if (!depot || !retrait) {
    console.log('champs vides');
    return false;
  }
  return true;
};

/*
    Verifies les informations liées aux contacts
*/
export const ValidateContacts = contacts => {
  if (!contacts || !contacts.length < 1) {
    console.log('champs vides');
    return false;
  }
  return true;
};

/*
    Verifies les informations liées aux Prix
*/
export const ValidatePrices = (pricePerKg, pricePerSuitcase) => {
  if (!pricePerKg || !pricePerSuitcase) {
    console.log('champs vides');
    return false;
  }
  return true;
};
