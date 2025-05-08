import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  isValidPhoneNumber,
  isValidOtp,
  formatChangeAmount,
  formatChangePercentage,
  mapTickerHistoricalPriceToPoints,
  getChangeWithinTimeRange,
} from './services';
import {
  TickerMovementTimeRange,
  ITickerPriceData,
  ITickerPriceDataPoint,
} from 'common';
import { vi } from 'vitest';

describe('Services', () => {
  describe('isValidPhoneNumber', () => {
    it('should return true for a valid 8-digit number', () => {
      expect(isValidPhoneNumber('12345678')).toBe(true);
    });

    it('should return false for a non-numeric number', () => {
      expect(isValidPhoneNumber('12345678a')).toBe(false);
    });

    it('should return false for a number that is not 8 digits', () => {
      expect(isValidPhoneNumber('1234567')).toBe(false);
      expect(isValidPhoneNumber('123456789')).toBe(false);
    });
  });

  describe('isValidOtp', () => {
    it('should return true for a valid 6-digit number', () => {
      expect(isValidOtp('123456')).toBe(true);
    });

    it('should return false for a non-numeric number', () => {
      expect(isValidOtp('12345a')).toBe(false);
    });

    it('should return false for a number that is not 6 digits', () => {
      expect(isValidOtp('1234567')).toBe(false);
      expect(isValidOtp('12345')).toBe(false);
    });
  });

  describe('formatChangeAmount', () => {
    it('should format positive numbers correctly', () => {
      expect(formatChangeAmount('123.456')).toBe('+$123.46');
      expect(formatChangeAmount('0.1')).toBe('+$0.10');
    });

    it('should format negative numbers correctly', () => {
      expect(formatChangeAmount('-123.456')).toBe('-$123.46');
      expect(formatChangeAmount('-0.1')).toBe('-$0.10');
    });

    it('should handle invalid inputs', () => {
      expect(formatChangeAmount('abc')).toBe('abc');
      expect(formatChangeAmount('')).toBe('');
    });
  });

  describe('formatChangePercentage', () => {
    it('should format positive percentages correctly', () => {
      expect(formatChangePercentage('123.456')).toBe('+123.46%');
      expect(formatChangePercentage('0.1')).toBe('+0.10%');
      expect(formatChangePercentage('123.456%')).toBe('+123.46%');
    });

    it('should format negative percentages correctly', () => {
      expect(formatChangePercentage('-123.456')).toBe('-123.46%');
      expect(formatChangePercentage('-0.1')).toBe('-0.10%');
      expect(formatChangePercentage('-123.456%')).toBe('-123.46%');
    });

    it('should handle invalid inputs', () => {
      expect(formatChangePercentage('abc')).toBe('abc');
      expect(formatChangePercentage('')).toBe('');
    });
  });

  describe('mapTickerHistoricalPriceToPoints', () => {
    const mockData: ITickerPriceData[] = [
      {
        date: new Date('2024-03-19'),
        open: '100.00',
        high: '105.00',
        low: '95.00',
        close: '105.00',
        volume: '1000',
      },
      {
        date: new Date('2024-03-18'),
        open: '100.00',
        high: '115.00',
        low: '100.00',
        close: '100.00',
        volume: '2000',
      },
      {
        date: new Date('2024-02-25'),
        open: '100.00',
        high: '115.00',
        low: '100.00',
        close: '95.00',
        volume: '2000',
      },
      {
        date: new Date('2024-01-19'),
        open: '100.00',
        high: '115.00',
        low: '100.00',
        close: '90.00',
        volume: '2000',
      },
      {
        date: new Date('2023-12-01'),
        open: '100.00',
        high: '115.00',
        low: '100.00',
        close: '85.00',
        volume: '2000',
      },
      {
        date: new Date('2023-05-01'),
        open: '100.00',
        high: '115.00',
        low: '100.00',
        close: '80.00',
        volume: '2000',
      },
      {
        date: new Date('2022-05-01'),
        open: '100.00',
        high: '115.00',
        low: '100.00',
        close: '75.00',
        volume: '2000',
      },
    ];

    const mockResult: ITickerPriceDataPoint[] = [
      {
        date: new Date('2022-05-01'),
        close: 75.0,
      },
      {
        date: new Date('2023-05-01'),
        close: 80.0,
      },
      {
        date: new Date('2023-12-01'),
        close: 85.0,
      },
      {
        date: new Date('2024-01-19'),
        close: 90.0,
      },
      {
        date: new Date('2024-02-25'),
        close: 95.0,
      },
      {
        date: new Date('2024-03-18'),
        close: 100.0,
      },
      {
        date: new Date('2024-03-19'),
        close: 105.0,
      },
    ];

    beforeEach(() => {
      vi.useFakeTimers();
      vi.setSystemTime(new Date('2024-03-20'));
    });

    afterEach(() => {
      vi.useRealTimers();
    });

    it('should filter and map data for OneDay range', () => {
      const result = mapTickerHistoricalPriceToPoints(
        mockData,
        TickerMovementTimeRange.OneDay,
      );
      expect(result).toHaveLength(1);
      expect(result).toEqual(mockResult.slice(-1));
    });

    it('should return the last trading day when no data matches OneDay range', () => {
      const mockLastTradingDayData: ITickerPriceData[] = [
        {
          date: new Date('2024-03-17'),
          open: '100.00',
          high: '105.00',
          low: '95.00',
          close: '100.00',
          volume: '1000',
        },
        {
          date: new Date('2024-03-16'),
          open: '100.00',
          high: '115.00',
          low: '100.00',
          close: '110.00',
          volume: '2000',
        },
      ];
      const result = mapTickerHistoricalPriceToPoints(
        mockLastTradingDayData,
        TickerMovementTimeRange.OneDay,
      );
      expect(result).toHaveLength(1);
      expect(result).toEqual([
        {
          date: new Date('2024-03-17'),
          close: 100.0,
        },
      ]);
    });

    it('should filter and map data for FiveDays range', () => {
      const result = mapTickerHistoricalPriceToPoints(
        mockData,
        TickerMovementTimeRange.FiveDays,
      );
      expect(result).toHaveLength(2);
      expect(result).toEqual(mockResult.slice(-2));
    });

    it('should filter and map data for ThirtyDays range', () => {
      const result = mapTickerHistoricalPriceToPoints(
        mockData,
        TickerMovementTimeRange.ThirtyDays,
      );
      expect(result).toHaveLength(3);
      expect(result).toEqual(mockResult.slice(-3));
    });

    it('should filter and map data for NinetyDays range', () => {
      const result = mapTickerHistoricalPriceToPoints(
        mockData,
        TickerMovementTimeRange.NinetyDays,
      );
      expect(result).toHaveLength(4);
      expect(result).toEqual(mockResult.slice(-4));
    });

    it('should filter and map data for SixMonths range', () => {
      const result = mapTickerHistoricalPriceToPoints(
        mockData,
        TickerMovementTimeRange.SixMonths,
      );
      expect(result).toHaveLength(5);
      expect(result).toEqual(mockResult.slice(-5));
    });

    it('should filter and map data for OneYear range', () => {
      const result = mapTickerHistoricalPriceToPoints(
        mockData,
        TickerMovementTimeRange.OneYear,
      );
      expect(result).toHaveLength(6);
      expect(result).toEqual(mockResult.slice(-6));
    });

    it('should return all data for AllTime range', () => {
      const result = mapTickerHistoricalPriceToPoints(
        mockData,
        TickerMovementTimeRange.AllTime,
      );
      expect(result).toHaveLength(7);
      expect(result).toEqual(mockResult);
    });
  });

  describe('getChangeWithinTimeRange', () => {
    it('should calculate change correctly for positive movement', () => {
      const mockData: ITickerPriceDataPoint[] = [
        { date: new Date(), close: 100 },
        { date: new Date(), close: 110 },
      ];
      const result = getChangeWithinTimeRange(mockData);
      expect(result.changeValue).toBe('10');
      expect(result.changePercent).toBe('10');
    });

    it('should calculate change correctly for negative movement', () => {
      const mockData: ITickerPriceDataPoint[] = [
        { date: new Date(), close: 100 },
        { date: new Date(), close: 90 },
      ];
      const result = getChangeWithinTimeRange(mockData);
      expect(result.changeValue).toBe('-10');
      expect(result.changePercent).toBe('-10');
    });

    it('should handle single data point', () => {
      const mockData: ITickerPriceDataPoint[] = [
        { date: new Date(), close: 100 },
      ];
      const result = getChangeWithinTimeRange(mockData);
      expect(result.changeValue).toBe('0');
      expect(result.changePercent).toBe('0');
    });
  });
});
