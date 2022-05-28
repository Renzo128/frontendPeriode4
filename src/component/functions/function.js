import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config-firebase";

const Getfriends = async (users, currentuser) => {  // vriend ophalen uit database
  const current = currentuser;
  const friend_id = users?.filter((user) => user !== current);
  const docRef = doc(db, "users", friend_id[0]);
  const docSnap = await getDoc(docRef);
  return docSnap.data();
};

export default Getfriends;
