import ContentLoader from 'react-content-loader/native';
import { View } from 'react-native';
import { COLORS } from '../../constans/COLORS';

type ViewBox = `${number},${number},${number},${number}`;

export interface SkeletonProps {
  children?: React.ReactNode;
  /**
   * Used to set viewBox property of the ContentLoader
   *
   * Example:
   ```
    viewBox="0,0,300,90"
   ```
   */
  viewBox: ViewBox;
}

export const SkeletonLoader = (props: SkeletonProps) => {
  const calculatedRatio =
    Number(props.viewBox.split(',')[2]) / Number(props.viewBox.split(',')[3]);

  const aspectRatio = props.viewBox ? calculatedRatio : undefined;

  return (
    <View
      style={{
        width: '100%',
        height: aspectRatio ? undefined : '100%',
        aspectRatio,
        alignSelf: 'center',
      }}>
      <ContentLoader
        speed={1}
        width={'100%'}
        height={'100%'}
        viewBox={props.viewBox}
        backgroundColor={COLORS.darkGrey}
        foregroundColor={COLORS.mainBlue}>
        {props.children}
      </ContentLoader>
    </View>
  );
};
