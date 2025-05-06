import { IPortfolioItem } from 'common';
import { User } from 'firebase/auth';
import {
  Firestore,
  where,
  getDocs,
  collection,
  query,
} from 'firebase/firestore';

export const getPortfolioBreakdown = async (
  firestore: Firestore,
  user: User,
): Promise<IPortfolioItem[]> => {
  const portfolioQuery = query(
    collection(firestore, 'portfolio'),
    where('uid', '==', user.uid),
  );
  const querySnapshot = await getDocs(portfolioQuery);

  const portfolioItems: IPortfolioItem[] = querySnapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ticker: data.ticker,
      quantity: data.quantity,
      averagePrice: parseFloat(data.averagePrice),
      totalCost: parseFloat(data.totalCost),
    };
  });

  return portfolioItems;
};
