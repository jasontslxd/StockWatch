import { User } from "firebase/auth";
import { Firestore, doc, getDoc } from "firebase/firestore";

export const getWatchList = async (firestore: Firestore, user: User) => {
  try {
    const watchlistRef = doc(firestore, "watchlist", user.uid);
    const watchlistDoc = await getDoc(watchlistRef);

    if (!watchlistDoc.exists()) {
      return []; 
    }

    const data = watchlistDoc.data();
    return data.tickers || []; 
  } catch (error) {
    console.error("Error getting watchlist:", error);
    throw error;
  }
}