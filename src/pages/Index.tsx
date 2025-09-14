import { useState } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RawMaterialsBlock } from "@/components/dashboard/RawMaterialsBlock";
import { ShippingLogisticsBlock } from "@/components/dashboard/ShippingLogisticsBlock";
import { ExchangeRiskBlock } from "@/components/dashboard/ExchangeRiskBlock";
import { InterestRateBlock } from "@/components/dashboard/InterestRateBlock";
import { USEconomyBlock } from "@/components/dashboard/USEconomyBlock";
import { TariffPolicyBlock } from "@/components/dashboard/TariffPolicyBlock";
import { USStockMarketBlock } from "@/components/dashboard/USStockMarketBlock";

const Index = () => {
  const [alertCount] = useState(5);

  // 주요 지표 데이터
  const keyMetrics = [
    {
      title: "종합 리스크 지수",
      value: "72.4",
      change: 2.8,
      changeType: 'increase' as const,
      riskLevel: 'medium' as const,
      description: "전월 대비 상승",
      dataType: 'economy' as const
    },
    {
      title: "수출 경쟁력 지수",
      value: "85.2",
      change: -1.5,
      changeType: 'decrease' as const,
      riskLevel: 'low' as const,
      description: "관세 인하 효과",
      dataType: 'tariff' as const
    },
    {
      title: "공급망 안정성",
      value: "78.9",
      change: 0.3,
      changeType: 'neutral' as const,
      riskLevel: 'medium' as const,
      description: "보통 수준 유지",
      dataType: 'shipping' as const
    },
    {
      title: "환위험 노출도",
      value: "65.1",
      change: 4.2,
      changeType: 'increase' as const,
      riskLevel: 'high' as const,
      description: "변동성 증가",
      dataType: 'exchange' as const
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader alertCount={alertCount} />
      
      <main className="container mx-auto px-6 py-6">
        {/* 주요 지표 요약 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {keyMetrics.map((metric, index) => (
            <MetricCard
              key={index}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={metric.changeType}
              riskLevel={metric.riskLevel}
              description={metric.description}
              dataType={metric.dataType}
            />
          ))}
        </div>

        {/* 6개 핵심 블록 + 미국 증시 - 좌측에서 우측으로 배치 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <RawMaterialsBlock />
          <ShippingLogisticsBlock />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ExchangeRiskBlock />
          <InterestRateBlock />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <USEconomyBlock />
          <TariffPolicyBlock />
        </div>
        
        {/* 미국 증시 현황 - 전체 너비 */}
        <div className="mb-6">
          <USStockMarketBlock />
        </div>
      </main>
    </div>
  );
};

export default Index;