import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, TrendingDown, Percent, Building, CreditCard } from "lucide-react";
import { ChartModal } from "./ChartModal";

interface InterestRateData {
  type: string;
  rate: number;
  change: number;
  changePercent: number;
  country: string;
  riskLevel: 'low' | 'medium' | 'high';
}

const interestRateData: InterestRateData[] = [
  {
    type: "연준 기준금리",
    rate: 4.50,
    change: -0.25,
    changePercent: -5.26,
    country: "미국",
    riskLevel: 'medium'
  },
  {
    type: "10년 국채수익률",
    rate: 4.25,
    change: 0.15,
    changePercent: 3.66,
    country: "미국",
    riskLevel: 'medium'
  },
  {
    type: "한국 기준금리",
    rate: 3.25,
    change: 0.00,
    changePercent: 0.00,
    country: "한국",
    riskLevel: 'low'
  },
  {
    type: "회사채 스프레드",
    rate: 1.85,
    change: 0.12,
    changePercent: 6.95,
    country: "미국",
    riskLevel: 'high'
  }
];

const financialMetrics = [
  {
    title: "기대 인플레이션",
    value: "2.4%",
    description: "5년 BEI",
    trend: "up"
  },
  {
    title: "실질금리",
    value: "1.85%",
    description: "인플레이션 조정",
    trend: "up"
  },
  {
    title: "금융조건지수",
    value: "보통",
    description: "Fed 기준",
    trend: "neutral"
  }
];

export function InterestRateBlock() {
  const [selectedRate, setSelectedRate] = useState<InterestRateData | null>(null);
  
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'medium': return 'border-yellow-500 bg-yellow-50';
      case 'low': return 'border-green-500 bg-green-50';
      default: return 'border-gray-300';
    }
  };

  const getRiskBadgeVariant = (level: string) => {
    switch (level) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'default';
      default: return 'outline';
    }
  };

  const getCountryFlag = (country: string) => {
    return country === '미국' ? '🇺🇸' : '🇰🇷';
  };

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Percent className="h-5 w-5" />
              <span>금리 / 금융조건</span>
            </CardTitle>
            <CardDescription>
              주요국 금리 동향 및 금융시장 조건
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
            샘플 데이터
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {interestRateData.map((rate, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${getRiskColor(rate.riskLevel)} transition-all duration-300 hover:shadow-md`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getCountryFlag(rate.country)}</span>
                  <span className="font-medium text-sm">{rate.type}</span>
                </div>
                <Badge variant={getRiskBadgeVariant(rate.riskLevel)} className="text-xs">
                  {rate.riskLevel === 'high' ? '높음' : rate.riskLevel === 'medium' ? '보통' : '낮음'}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <div 
                  className="text-lg font-bold cursor-pointer hover:text-primary transition-colors"
                  onClick={() => setSelectedRate(rate)}
                  title="클릭하여 상세 차트 보기"
                >
                  {rate.rate.toFixed(2)}%
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  rate.change > 0 ? 'text-red-600' : rate.change < 0 ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {rate.change > 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : rate.change < 0 ? (
                    <TrendingDown className="h-3 w-3" />
                  ) : null}
                  <span>
                    {rate.change > 0 ? '+' : ''}{rate.change.toFixed(2)}bp
                    {rate.changePercent !== 0 && (
                      <span className="ml-1">
                        ({rate.changePercent > 0 ? '+' : ''}{rate.changePercent.toFixed(1)}%)
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Separator className="my-4" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {financialMetrics.map((metric, index) => (
            <div key={index} className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center space-x-1">
                <div className="text-lg font-bold">{metric.value}</div>
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-red-500" />
                ) : metric.trend === 'down' ? (
                  <TrendingDown className="h-4 w-4 text-green-500" />
                ) : null}
              </div>
              <div className="text-sm font-medium">{metric.title}</div>
              <div className="text-xs text-muted-foreground">{metric.description}</div>
            </div>
          ))}
        </div>
        
        <div className="space-y-3">
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 text-blue-800">
              <Building className="h-4 w-4" />
              <span className="text-sm font-medium">금융 전망</span>
            </div>
            <p className="text-xs text-blue-700 mt-1">
              연준의 금리 인하 사이클이 시작되어 기업 차입 비용 부담이 완화될 전망입니다.
            </p>
          </div>
          
          <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
            <div className="flex items-center space-x-2 text-orange-800">
              <CreditCard className="h-4 w-4" />
              <span className="text-sm font-medium">신용 리스크</span>
            </div>
            <p className="text-xs text-orange-700 mt-1">
              회사채 스프레드 확대로 중소기업 자금조달 비용 상승이 우려됩니다.
            </p>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground text-center">
          출처: Federal Reserve, 한국은행, Treasury.gov | 업데이트: 일일
        </div>
      </CardContent>
      
      {selectedRate && (
        <ChartModal
          isOpen={!!selectedRate}
          onClose={() => setSelectedRate(null)}
          title={selectedRate.type}
          currentValue={selectedRate.rate}
          unit="%"
          change={selectedRate.change}
          changeType={selectedRate.change > 0 ? 'increase' : selectedRate.change < 0 ? 'decrease' : 'neutral'}
          riskLevel={selectedRate.riskLevel}
          dataType="interest"
        />
      )}
    </Card>
  );
}