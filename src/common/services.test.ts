import { describe, it, expect } from "vitest";
import { isValidPhoneNumber, isValidOtp } from "./services";

describe("Services", () => {
  describe("isValidPhoneNumber", () => {
    it("should return true for a valid 8-digit number", () => {
      expect(isValidPhoneNumber("12345678")).toBe(true);
    });

    it("should return false for a non-numeric number", () => {
      expect(isValidPhoneNumber("12345678a")).toBe(false);
    });

    it("should return false for a number that is not 8 digits", () => {
      expect(isValidPhoneNumber("1234567")).toBe(false);
      expect(isValidPhoneNumber("123456789")).toBe(false);
    });
  });

  describe("isValidOtp", () => {
    it("should return true for a valid 6-digit number", () => {
      expect(isValidOtp("123456")).toBe(true);
    });

    it("should return false for a non-numeric number", () => {
      expect(isValidOtp("12345a")).toBe(false);
    });

    it("should return false for a number that is not 6 digits", () => {
      expect(isValidOtp("1234567")).toBe(false);
      expect(isValidOtp("12345")).toBe(false);
    });
  });
});