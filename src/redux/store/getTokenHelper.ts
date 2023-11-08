import { mainStore } from './mainStore';

export const getToken = () => {
  const token = mainStore.getState()?.userData?.data?.token;
  return token;
};
