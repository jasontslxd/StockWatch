import { User } from "firebase/auth";
import { Firestore, doc, setDoc, arrayUnion, getDoc } from "firebase/firestore";

export const addTickerToWatchlist = async (firestore: Firestore, user: User, ticker: string) => {
  try {
    const watchlistRef = doc(firestore, "watchlist", user.uid);
    const watchlistDoc = await getDoc(watchlistRef);

    if (!watchlistDoc.exists()) {
      await setDoc(watchlistRef, {
        tickers: [ticker],
        userId: user.uid,
        updatedAt: new Date()
      });
    } else {
      await setDoc(watchlistRef, {
        tickers: arrayUnion(ticker),
        updatedAt: new Date()
      }, { merge: true });
    }

    return true;
  } catch (error) {
    console.error("Error adding ticker to watchlist:", error);
    throw error;
  }
}