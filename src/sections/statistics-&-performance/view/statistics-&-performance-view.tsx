import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { PageTitleSection } from 'src/components/page-title-section';
import { DashboardContent } from 'src/layouts/dashboard';
import { statisticsPerformanceFetch } from 'src/redux/actions/provider/statisticsAndPerformance';
import { AppDispatch } from 'src/redux/store';

import { TopNavButtons } from '../TopNavButtons';
import ProviderStats from '../ProviderStats';
import RevenueStats from '../RevenueStats';
import DashboardSummary from '../DashboardSummary';
import { FinancialAnalysisRevenue } from '../FinancialAnalysisRevenue';
import { CustomerSatisfactionReviews } from '../CustomerSatisfactionReviews';
import RecommendationCard from '../RecommendationCard';

 
export function StatisticsAndPerformanceView() {
  const [activeTab, setActiveTab] = useState('Performance Summary');
    const dispatch = useDispatch<AppDispatch>();
  
   useEffect(() => {
     dispatch(statisticsPerformanceFetch());
   }, [dispatch]);

  return (
    <DashboardContent>
      <PageTitleSection title="Statistics & Performance" />
      <TopNavButtons active={activeTab} onChange={setActiveTab} />
 
      {activeTab === 'Performance Summary' && (
        <>
          <ProviderStats />
          <RevenueStats />
          <DashboardSummary />
        </>
      )}
 
      {activeTab === 'Financial Analysis' && <FinancialAnalysisRevenue />}
 
      {activeTab === 'Client Feedback' && <CustomerSatisfactionReviews />}
 
      {activeTab === 'Recommendations' && <RecommendationCard />}
    </DashboardContent>
  );
}