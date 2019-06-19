import firebase from "firebase";

export const addUser = async address => {
  firebase
    .database()
    .ref(`/users/${address}`)
    .set({ active: true });
};

export const _checkForUser = async address => {
  return await firebase
    .database()
    .ref(`/users/${address}`)
    .once("value");
};

export const _setNickname = async (address, nickname) => {
  return await firebase
    .database()
    .ref(`/users/${address}`)
    .update({
      nickname
    });
};

export const watchForNicknameChange = async(address) => {
  return await firebase
    .database()
    .ref(`/users/${address}`)
    .on("value", snap => snap.val())
}
