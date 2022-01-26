import firestore from '@react-native-firebase/firestore';

const verifyArgs = type => {
  return true;
};

export const calculatePricePerKG = (type, weight, shipping, pricePerKg) => {
  if (verifyArgs(type)) {
  }

  return shipping ? weight * pricePerKg + 2 : weight * pricePerKg;
};

export const makeReservationWeight = async (
  idFlight,
  price,
  weight,
  shipping,
  userID,
  paymentMethod,
) => {
  console.log(`price`, price);
  console.log(`weight`, weight);
  console.log(`shipping`, shipping);
  console.log(`idFlight`, idFlight);
  console.log(`userID`, userID);
  console.log(`shipping`, shipping);
  console.log(`paymentMethod`, paymentMethod);

  const reservation = {
    flightId: idFlight,
    userId: userID,
    price: calculatePricePerKG('weight', weight, shipping, price),
    weight: weight,
    paymentMethod: paymentMethod,
    shipping: shipping,
    reservationDate: new Date(),
  };
  //normally on batch
  await firestore()
    .collection('flights')
    .doc(idFlight)
    .update({
      reservations: firestore.FieldValue.arrayUnion({
        userID: userID,
        weight: weight,
        price: reservation.price,
        date: new Date(),
      }),
    });

  const documents = await firestore().collection('reservations');

  // await documents.add(reservation);
};
