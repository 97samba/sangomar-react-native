import {Box, HStack, VStack, Text, Heading, Center} from 'native-base';
import React, {useState, useContext} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import DateTimePicker from '@react-native-community/datetimepicker';
import {TouchableOpacity} from 'react-native';
import {PublishContext} from '../../screens/Publish';
import moment from 'moment';

const Dates = () => {
  const {
    departureDate,
    setdepartureDate,
    lastDepot,
    setLastDepot,
    distributionDate,
    setdistributionDate,
  } = useContext(PublishContext);

  const [showDeparture, setshowDeparture] = useState(false);
  const [showArrival, setshowArrival] = useState(false);
  const [showLastDepot, setshowLastDepot] = useState(false);

  const HandleDateChanged = (date, setDate, optionDate, show) => {
    date ? setDate(date) : setDate(optionDate);

    console.log(`date : `, date);
    show(false);
  };
  const validateDate = () => {
    setLastDepot(new Date().setDate(departureDate.getDate() - 1));
    setdistributionDate(new Date().setDate(departureDate.getDate() + 1));
  };

  return (
    <VStack space={2}>
      <Heading fontSize={20} my={2} color="blueGray.600">
        Dates
      </Heading>
      {showDeparture && (
        <Center>
          <DateTimePicker
            value={departureDate}
            testID="departurePicker"
            onChange={(e, date) => {
              HandleDateChanged(
                date,
                setdepartureDate,
                departureDate,
                setshowDeparture,
              );
              validateDate('departure');
            }}
            mode="datetime"
          />
        </Center>
      )}
      <HStack space={3} bg="white" py={2} rounded={5} alignItems="center">
        <FontAwesome5
          name="calendar-alt"
          size={20}
          color="gray"
          style={{marginLeft: 10}}
        />
        <Box width="80%">
          <TouchableOpacity
            onPress={() => {
              setshowDeparture(true);
            }}>
            <Text color="gray.400">Date de départ</Text>
            <Text>{moment(departureDate).format('LL')}</Text>
          </TouchableOpacity>
        </Box>
      </HStack>
      {showLastDepot && (
        <Center>
          <DateTimePicker
            value={new Date()}
            testID="depotPicker"
            onChange={(e, date) =>
              HandleDateChanged(date, setLastDepot, lastDepot, setshowLastDepot)
            }
            mode="datetime"
          />
        </Center>
      )}
      <HStack space={3} bg="white" py={2} rounded={5} alignItems="center">
        <FontAwesome5
          name="calendar-times"
          size={20}
          color="gray"
          style={{marginLeft: 10}}
        />
        <Box width="80%">
          <TouchableOpacity onPress={() => setshowLastDepot(true)}>
            <Text color="gray.400">Dernier dépot</Text>
            <Text>{moment(lastDepot).format('LL')}</Text>
          </TouchableOpacity>
        </Box>
      </HStack>
      {showArrival && (
        <Center>
          <DateTimePicker
            value={distributionDate}
            onChange={(e, date) =>
              HandleDateChanged(
                date,
                setdistributionDate,
                distributionDate,
                setshowArrival,
              )
            }
            mode="datetime"
          />
        </Center>
      )}
      <HStack space={3} bg="white" py={2} rounded={5} alignItems="center">
        <FontAwesome5
          name="calendar-check"
          size={20}
          color="gray"
          style={{marginLeft: 10}}
        />
        <Box width="80%">
          <TouchableOpacity
            onPress={() => {
              setshowArrival(true);
            }}>
            <Text color="gray.400">Date de distribution</Text>
            <Text>{moment(distributionDate).format('LL')}</Text>
          </TouchableOpacity>
        </Box>
      </HStack>
    </VStack>
  );
};
export default Dates;
