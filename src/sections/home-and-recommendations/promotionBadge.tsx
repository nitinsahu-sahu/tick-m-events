import React from 'react';
import { Box } from '@mui/material';

// Define types for our promotions
interface Promotion {
  _id: string;
  promotionType: string;
  eventId: string;
  discountValue: string;
  ticketSelection: string;
  validityPeriodStart: string;
  validityPeriodEnd: string;
  promoCode: string;
  createdBy: string;
  status: string;
}

// Helper function to check if promotion is active
const isPromotionActive = (promotion: Promotion): boolean => {
  if (!promotion || promotion.status !== 'active') return false;
  
  const currentDate = new Date();
  const startDate = new Date(promotion.validityPeriodStart);
  const endDate = new Date(promotion.validityPeriodEnd);
  endDate.setHours(23, 59, 59, 999); // Set to end of day
  
  return currentDate >= startDate && currentDate <= endDate;
};

// Define the type mapping with index signature
type PromotionTypeMap = {
  [key: string]: string;
  percentageDiscount: string;
  fixedDiscount: string;
  buyOneGetOne: string;
  earlyBird: string;
};

// Helper function to format promotion type for display
const formatPromotionType = (promotionType: string): string => {
  const typeMap: PromotionTypeMap = {
    percentageDiscount: 'Discount',
    fixedDiscount: 'Fixed Off',
    buyOneGetOne: 'BOGO',
    earlyBird: 'Early Bird',
    // Add more mappings as needed
  };
  
  return typeMap[promotionType] || promotionType;
};

// Promotion Badge Component
export function PromotionBadge({ promotions }: { promotions?: Promotion[] }) {
    console.log('promotions',promotions);
    
  // Filter active promotions
  const activePromotions = promotions?.filter(isPromotionActive) || [];
  
  // If no active promotions, don't render anything
  if (activePromotions.length === 0) return null;
  
  // Get unique promotion types
  const promotionTypes = [...new Set(activePromotions.map((p: Promotion) => p.promotionType))];
    console.log('promotionTypes',promotionTypes);
    console.log('activePromotions',activePromotions);
  
  // Format text for display
  const badgeText = promotionTypes.map(formatPromotionType).join(' | ');
    console.log('badgeText',badgeText);
  
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: 90,
        height: 90,
        overflow: 'hidden',
        borderTopLeftRadius: 24,
        zIndex: 1,
        backgroundColor: 'transparent',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 26,
          left: -25,
          backgroundColor: '#0B2E4C',
          color: '#fff',
          px: 2,
          py: '2px',
          fontSize: '10px',
          fontWeight: 600,
          transform: 'rotate(-45deg)',
          width: '120px',
          textAlign: 'center',
          boxShadow: 2,
        }}
      >
        {badgeText}
      </Box>
    </Box>
  );
}