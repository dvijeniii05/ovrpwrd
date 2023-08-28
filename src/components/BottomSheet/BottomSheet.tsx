import {
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/mainStore';
import { closeBottomSheet } from '../../redux/slices/userDataSlice';
import DobModal from '../../screens/Modals/DobModal/DobModal';
import { COLORS } from '../../constans/COLORS';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GenderModal from '../../screens/Modals/GenderModal/GenderModal';
import CountryModal from '../../screens/Modals/CountryModal/CountryModal';

const BottomSheet = () => {
  const dispatch = useDispatch();
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  const bottomSheetState = useSelector(
    (state: RootState) => state.userData.data.bottomSheetState,
  );

  useEffect(() => {
    if (bottomSheetState?.isOpen) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [bottomSheetState?.isOpen]);

  const modalPicker = () => {
    if (bottomSheetState?.type) {
      switch (bottomSheetState.type) {
        case 'DOB':
          return <DobModal />;
        case 'Gender':
          return <GenderModal />;
        case 'Country':
          return <CountryModal />;
        default:
          return null;
      }
    }
    return null;
  };

  return (
    <>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        enableDismissOnClose
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        handleStyle={{
          backgroundColor: COLORS.darkGrey,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
        }}
        style={{ backgroundColor: 'transparent' }}
        containerStyle={{ backgroundColor: COLORS.modalBackground }}
        backgroundStyle={{ backgroundColor: COLORS.darkGrey }}
        handleIndicatorStyle={{ backgroundColor: COLORS.neutral }}
        onDismiss={() => dispatch(closeBottomSheet())}>
        <BottomSheetView
          onLayout={handleContentLayout}
          style={{ paddingBottom: useSafeAreaInsets().bottom }}>
          {modalPicker()}
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default BottomSheet;
