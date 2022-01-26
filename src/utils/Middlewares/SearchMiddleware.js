import firestore from '@react-native-firebase/firestore';

const applyPromocode = ({promoCode}) => {};

const completSearch = async (departure, destination, date) => {
  var dueDate = new Date('2021-03-01T23:59:59.000z');
  // console.log(`date`, date);
  // console.log(`date`, dueDate);

  const results = await firestore()
    .collection('flights')
    .where('departure', '==', departure)
    .where('destination', '==', destination)
    // .orderBy('pricePerKg')
    .get()
    .then(query => {
      if (date !== new Date()) {
        var newState = query.docs;
        newState = newState.sort((a, b) => a - b);
        console.log('newState ', newState);
        return newState;
      }
      return query.docs;
    });
  return results;
};
//la meme fonction fait la recherche pour les deux type de recherche, a
const searchDepartureOrDestinationOnly = async (label, search, date) => {
  const results = await firestore()
    .collection('flights')
    .where(label, '==', search)
    // .where('distributionDate', '>=', date)
    .get()
    .then(query => {
      if (date !== new Date()) {
        var newState = query.docs;
        newState = newState.sort((a, b) => a - b);
        console.log(newState);
        return newState;
      }
      return query.docs;
    });
  return results;
};

export const findResults = async (
  departure,
  destination,
  date,
  type,
  promoCode,
) => {
  if (departure == '' || destination == '') {
    if (departure) {
      return searchDepartureOrDestinationOnly('departure', departure, date);
    }
    console.log(`date`, date);
    return searchDepartureOrDestinationOnly('destination', destination, date);
  }

  return completSearch(departure, destination, date);
};
