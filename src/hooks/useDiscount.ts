import { useState, useEffect } from 'react';

const DISCOUNT_PERCENTAGE = 5;
const MAX_DISCOUNT_CUSTOMERS = 10000;
const STORAGE_KEY = 'electroshop-discount-customers';

export const useDiscount = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [isEligible, setIsEligible] = useState(false);

  useEffect(() => {
    // Load customer count from localStorage
    const savedCount = localStorage.getItem(STORAGE_KEY);
    const count = savedCount ? parseInt(savedCount, 10) : 0;
    setCustomerCount(count);
    setIsEligible(count < MAX_DISCOUNT_CUSTOMERS);
  }, []);

  const claimDiscount = () => {
    if (isEligible) {
      const newCount = customerCount + 1;
      setCustomerCount(newCount);
      localStorage.setItem(STORAGE_KEY, newCount.toString());
      setIsEligible(newCount < MAX_DISCOUNT_CUSTOMERS);
      return true;
    }
    return false;
  };

  const calculateDiscountedPrice = (originalPrice: number) => {
    if (!isEligible) return originalPrice;
    return Math.round(originalPrice * (1 - DISCOUNT_PERCENTAGE / 100));
  };

  const getDiscountAmount = (originalPrice: number) => {
    if (!isEligible) return 0;
    return Math.round(originalPrice * (DISCOUNT_PERCENTAGE / 100));
  };

  const getRemainingSlots = () => {
    return Math.max(0, MAX_DISCOUNT_CUSTOMERS - customerCount);
  };

  return {
    isEligible,
    discountPercentage: DISCOUNT_PERCENTAGE,
    customerCount,
    remainingSlots: getRemainingSlots(),
    claimDiscount,
    calculateDiscountedPrice,
    getDiscountAmount,
  };
};