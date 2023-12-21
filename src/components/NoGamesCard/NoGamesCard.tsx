import { View, Text, Linking } from 'react-native';
import { styles } from './NoGamesCard.styles';
import CurrencyWrapper from '../CurrencyWrapper/CurrencyWraper';
import { COLORS } from '../../constans/COLORS';
import { useTranslation } from 'react-i18next';

interface Props {
  firstGameId?: number;
}

const NoGamesCard = (props: Props) => {
  const { t } = useTranslation();

  return (
    <View style={styles.itemWrapper}>
      <View style={styles.itemContainer}>
        <View style={styles.currencyContainer}>
          <CurrencyWrapper
            value={0}
            isPerks
            staticWidth
            style={{ backgroundColor: COLORS.darkGrey }}
            forLeagueProgression={undefined}
          />
          <CurrencyWrapper
            value={0}
            isPerks={false}
            staticWidth
            style={{ backgroundColor: COLORS.darkGrey }}
          />
        </View>
        <View style={styles.noGameContainer}>
          <Text style={styles.noGameText}>
            {`${t('dailyStats.noGame.card.text')}`}{' '}
            <Text
              style={{
                color: COLORS.green,
                textDecorationLine: 'underline',
              }}
              onPress={() => {
                Linking.openURL(
                  `https://www.opendota.com/matches/${props.firstGameId}`,
                );
              }}>
              {props.firstGameId}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default NoGamesCard;
