import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Firebase Auth
vi.mock('firebase/auth', () => ({
  browserSessionPersistence: vi.fn(),
  getAuth: vi.fn(),
  setPersistence: vi.fn(),
  onAuthStateChanged: vi.fn(),
  signOut: vi.fn(),
  RecaptchaVerifier: vi.fn(),
  signInWithPhoneNumber: vi.fn(),
  ConfirmationResult: vi.fn(),
}));
