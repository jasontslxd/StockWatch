import {
  addDoc,
  collection,
  Firestore,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from 'firebase/firestore';
import { User } from 'firebase/auth';

export const purchaseTicker = async (
  firestore: Firestore,
  user: User,
  ticker: string,
  quantity: number,
  price: number,
) => {
  try {
    // First check if user already has this ticker
    const portfolioQuery = query(
      collection(firestore, 'portfolio'),
      where('uid', '==', user.uid),
      where('ticker', '==', ticker),
    );

    const querySnapshot = await getDocs(portfolioQuery);

    // if user already has this ticker, update the contents
    if (!querySnapshot.empty) {
      const existingDoc = querySnapshot.docs[0];
      const currentData = existingDoc.data();

      const newQuantity = currentData.quantity + quantity;
      const newTotalCost = currentData.totalCost + quantity * price;
      const newAveragePrice = newTotalCost / newQuantity;

      await updateDoc(doc(firestore, 'portfolio', existingDoc.id), {
        quantity: newQuantity,
        totalCost: newTotalCost.toFixed(4),
        averagePrice: newAveragePrice.toFixed(4),
        lastUpdated: new Date(),
      });

      return { success: true };
    }

    // If no existing ticker found, proceed with adding new record
    await addDoc(collection(firestore, 'portfolio'), {
      uid: user.uid,
      ticker,
      quantity,
      totalCost: (quantity * price).toFixed(4),
      averagePrice: price.toFixed(4),
      lastUpdated: new Date(),
    });

    return { success: true };
  } catch (error) {
    console.error('Error in purchaseTicker:', error);
    return { success: false, error: 'Failed to process purchase' };
  }
};
