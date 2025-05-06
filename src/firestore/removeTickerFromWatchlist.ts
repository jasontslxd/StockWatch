import { User } from 'firebase/auth';
import {
  Firestore,
  doc,
  getDoc,
  updateDoc,
  arrayRemove,
} from 'firebase/firestore';

export const removeTickerFromWatchlist = async (
  firestore: Firestore,
  user: User,
  ticker: string,
) => {
  try {
    const watchlistRef = doc(firestore, 'watchlist', user.uid);
    const watchlistDoc = await getDoc(watchlistRef);

    if (!watchlistDoc.exists()) {
      throw new Error('Watchlist not found');
    }

    await updateDoc(watchlistRef, {
      tickers: arrayRemove(ticker),
      updatedAt: new Date(),
    });

    return true;
  } catch (error) {
    console.error('Error removing ticker from watchlist:', error);
    throw error;
  }
};
