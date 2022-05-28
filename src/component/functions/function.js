import { doc, getDoc } from "firebase/firestore";
import { useContext } from "react";
import { db } from "../../config-firebase";

const Getfriends = async (users, currentuser) => {
  const current = currentuser;
  const friend_id = users?.filter((user) => user != current);
  const docRef = doc(db, "users", friend_id[0]);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export default Getfriends;

export const getmessages = async (context) => {
  const docRef = doc(db, "chats", context.query.id);
  const docSnap = await getDoc(docRef);

  return {
    props: {
      chat: JSON.stringify(docSnap.data()),
      id: context.query.id,
    },
  };
};
