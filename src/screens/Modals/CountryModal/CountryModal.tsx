import { View } from 'react-native';
import CountryPicker, {
  Country,
  DARK_THEME,
} from 'react-native-country-picker-modal';
import { useDispatch } from 'react-redux';
import {
  closeBottomSheet,
  updateUserDetails,
} from '../../../redux/slices/userDataSlice';

const CountryModal = () => {
  const dispatch = useDispatch();

  const handleOnSelect = (country: Country) => {
    dispatch(updateUserDetails({ country: country.name }));
    dispatch(closeBottomSheet());
  };

  return (
    <View>
      <CountryPicker
        theme={DARK_THEME}
        countryCode="AD"
        visible
        withAlphaFilter
        onSelect={handleOnSelect}
        onClose={() => dispatch(closeBottomSheet())}
      />
    </View>
  );
};

export default CountryModal;
