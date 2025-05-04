import { User } from "firebase/auth";
import { Firestore, where, getDocs, collection, query } from "firebase/firestore";

export const getPortfolioSummary = async (firestore: Firestore, user: User) => {
  const portfolioQuery = query(collection(firestore, "portfolio"), where("uid", "==", user.uid));
  const querySnapshot = await getDocs(portfolioQuery);

  const totalValue = querySnapshot.docs.reduce((acc, doc) => {
    const { quantity, averagePrice } = doc.data();
    return acc + (quantity * averagePrice);
  }, 0);

  return totalValue;
}