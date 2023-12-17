import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import StandardButton from '../../../components/Buttons/StandardButton/StandardButton';
import { useDispatch } from 'react-redux';
import {
  closeBottomSheet,
  updateUserDetails,
} from '../../../redux/slices/userDataSlice';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native-gesture-handler';
import { styles } from './DobModal.styles';

export const DobModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const maxYear = new Date().getFullYear() - 5;
  const yearRange = maxYear - 100;
  let years: number[] = [];
  for (let i = maxYear; i > yearRange; i--) {
    years.push(i);
  }
  const monthsData = [
    {
      month: 'January',
      days: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
    },
    {
      month: 'February',
      days: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29,
      ],
    },
    {
      month: 'March',
      days: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
    },
    {
      month: 'April',
      days: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      ],
    },
    {
      month: 'May',
      days: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
    },
    {
      month: 'June',
      days: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      ],
    },
    {
      month: 'July',
      days: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
    },
    {
      month: 'August',
      days: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
    },
    {
      month: 'September',
      days: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      ],
    },
    {
      month: 'October',
      days: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
    },
    {
      month: 'November',
      days: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
      ],
    },
    {
      month: 'December',
      days: [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
        21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
      ],
    },
  ];
  const [selectedYear, setSelectedYear] = useState<number>(maxYear);
  const [selectedMonth, setSelectedMonth] = useState<string>('January');
  const [selectedDay, setSelectedDay] = useState<number>(0);

  const dates = monthsData.find(item => item.month === selectedMonth)?.days;
  let datesMatrix: Array<number[]> = [];
  for (let i = 0; i < 5; i++) {
    let valuesInRow = 7;
    if (dates !== undefined) {
      datesMatrix.push(dates?.slice(i * valuesInRow, i * valuesInRow + 7));
    }
  }

  const onPress = () => {
    const dob = new Date(
      selectedYear,
      monthsData.indexOf(
        monthsData.filter(item => item.month === selectedMonth)[0],
      ),
      selectedDay,
      12,
    );
    const splitter = dob.toUTCString().split(', ')[1].split(' ');
    const convertedDob = `${splitter[0]}-${splitter[1]}-${splitter[2]}`;
    dispatch(updateUserDetails({ dob: convertedDob }));
    dispatch(closeBottomSheet());
  };

  return (
    <View>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{t('dob.header')}</Text>
      </View>
      <View style={{ paddingLeft: 16 }}>
        <FlatList
          data={years}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.yearsContainer}
          contentContainerStyle={styles.yearsContentContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedYear(item)}
              style={styles.yearsOrMonthsButton}>
              <Text style={styles.yearsText(item === selectedYear)}>
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
        <FlatList
          data={monthsData}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.monthsContentContainer}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => setSelectedMonth(item.month)}
              style={styles.yearsOrMonthsButton}>
              <Text style={styles.monthsText(item.month === selectedMonth)}>
                {item.month}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.daysContainer}>
        {datesMatrix?.map(row => (
          <View key={row[0]} style={{ flexDirection: 'row' }}>
            {row?.map(number => (
              <TouchableOpacity
                key={number.toString()}
                style={styles.dayButton(number === selectedDay)}
                onPress={() => setSelectedDay(number)}>
                <Text style={styles.dayText}>{number}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>
      <View style={styles.selectButtonContainer}>
        <StandardButton
          isDisabled={!selectedDay}
          buttonText={t('button.select')}
          onPress={onPress}
          style={{ marginTop: 40 }}
        />
      </View>
    </View>
  );
};

export default DobModal;
