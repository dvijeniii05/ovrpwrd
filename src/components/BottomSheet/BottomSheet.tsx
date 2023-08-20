import {
  BottomSheetModal,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import { useEffect, useMemo, useRef } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store/mainStore';
import { closeBottomSheet } from '../../redux/slices/userDataSlice';
import { dobModal } from '../../screens/Modals/dobModal/dobModal';
import { COLORS } from '../../constans/COLORS';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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

  const isBottomSheetOpen = useSelector(
    (state: RootState) => state.userData.data.isBottomSheetOpen,
  );

  useEffect(() => {
    if (isBottomSheetOpen) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isBottomSheetOpen]);

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
          {dobModal()}
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default BottomSheet;
