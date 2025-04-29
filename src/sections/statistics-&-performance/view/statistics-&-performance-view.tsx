import { useState } from 'react';
import { Typography } from '@mui/material';
import { PageTitleSection } from 'src/components/page-title-section';
import { DashboardContent } from 'src/layouts/dashboard';
import { TopNavButtons } from '../TopNavButtons';
import ProviderStats from '../ProviderStats';
import RevenueStats from '../RevenueStats';
import DashboardSummary from '../DashboardSummary';
import { FinancialAnalysisRevenue } from '../FinancialAnalysisRevenue';
import { CustomerSatisfactionReviews } from '../CustomerSatisfactionReviews';
import RecommendationCard from '../RecommendationCard';

export function StatisticsAndPerformanceView() {
    const [activeTab, setActiveTab] = useState('Performance Summary');
  return (
    <DashboardContent >
      <PageTitleSection title="Statistics & Performance" />
      <TopNavButtons active={activeTab} onChange={setActiveTab} />
      <ProviderStats />
      <RevenueStats />
      <DashboardSummary />
      <FinancialAnalysisRevenue />
      <CustomerSatisfactionReviews />
      <RecommendationCard />
      
    </DashboardContent>
  );
}
