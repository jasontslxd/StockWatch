import { IFirestoreContext } from 'common';
import { createContext } from 'react';

export const FirestoreContext = createContext<IFirestoreContext>({
  firestore: null,
});
