import { Storage } from '@capacitor/storage';

const setStorage = async (key: string, value: string) => {
  await Storage.set({
    key: key,
    value: value,
  });
};

const removeStorage = async (key: string) => {
  await Storage.remove({ key: key });
};

const getStorage = async (key: string) => {
  const { value } = await Storage.get({ key: key });
  return value;
};

export { setStorage, removeStorage, getStorage };
