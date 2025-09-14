import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, TrendingDown, ShoppingCart, Users, Home, Briefcase } from "lucide-react";
import { ChartModal } from "./ChartModal";

interface EconomicData {
  indicator: string;
  value: string;
  change: number;
  changePercent: number;
  unit: string;
  icon: React.ReactNode;
  riskLevel: 'low' | 'medium' | 'high';
}

const economicData: EconomicData[] = [
  {
    indicator: "소매판매",
    value: "578.2",
    change: 2.4,
    changePercent: 0.42,
    unit: "십억달러",
    icon: <ShoppingCart className="h-4 w-4" />,
    riskLevel: 'low'
  },
  {
    indicator: "소비자신뢰지수",
    value: "102.8",
    change: -3.2,
    changePercent: -3.02,
    unit: "지수",
    icon: <Users className="h-4 w-4" />,
    riskLevel: 'medium'
  },
  {
    indicator: "실업률",
    value: "3.8",
    change: 0.1,
    changePercent: 2.70,
    unit: "%",
    icon: <Briefcase className="h-4 w-4" />,
    riskLevel: 'low'
  },
  {
    indicator: "주택착공",
    value: "1.42",
    change: -0.08,
    changePercent: -5.33,
    unit: "백만호",
    icon: <Home className="h-4 w-4" />,
    riskLevel: 'high'
  }
];

const demandMetrics = [
  {
    title: "개인소득 증가율",
    value: "+3.2%",
    description: "전년 대비",
    trend: "up"
  },
  {
    title: "가계지출",
    value: "+2.8%",
    description: "전월 대비",
    trend: "up"
  },
  {
    title: "제조업 PMI",
    value: "48.2",
    description: "수축 구간",
    trend: "down"
  }
];

export function USEconomyBlock() {
  const [selectedEconomic, setSelectedEconomic] = useState<EconomicData | null>(null);
  
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

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-lg">🇺🇸</span>
              <span>미국 소비력 / 경기지표</span>
            </CardTitle>
            <CardDescription>
              미국 경제 동향 및 소비 수요 분석
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
            샘플 데이터
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {economicData.map((data, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${getRiskColor(data.riskLevel)} transition-all duration-300 hover:shadow-md`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {data.icon}
                  <span className="font-medium text-sm">{data.indicator}</span>
                </div>
                <Badge variant={getRiskBadgeVariant(data.riskLevel)} className="text-xs">
                  {data.riskLevel === 'high' ? '높음' : data.riskLevel === 'medium' ? '보통' : '낮음'}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <div 
                  className="text-lg font-bold cursor-pointer hover:text-primary transition-colors"
                  onClick={() => setSelectedEconomic(data)}
                  title="클릭하여 상세 차트 보기"
                >
                  {data.value} {data.unit}
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  data.change > 0 ? 'text-red-600' : data.change < 0 ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {data.change > 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : data.change < 0 ? (
                    <TrendingDown className="h-3 w-3" />
                  ) : null}
                  <span>
                    {data.change > 0 ? '+' : ''}{data.change} 
                    ({data.changePercent > 0 ? '+' : ''}{data.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Separator className="my-4" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {demandMetrics.map((metric, index) => (
            <div key={index} className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center space-x-1">
                <div className="text-lg font-bold">{metric.value}</div>
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : metric.trend === 'down' ? (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                ) : null}
              </div>
              <div className="text-sm font-medium">{metric.title}</div>
              <div className="text-xs text-muted-foreground">{metric.description}</div>
            </div>
          ))}
        </div>
        
        <div className="space-y-3">
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 text-green-800">
              <ShoppingCart className="h-4 w-4" />
              <span className="text-sm font-medium">소비 전망</span>
            </div>
            <p className="text-xs text-green-700 mt-1">
              소매판매 증가와 개인소득 상승으로 소비재 수요 증가가 예상됩니다.
            </p>
          </div>
          
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center space-x-2 text-red-800">
              <Home className="h-4 w-4" />
              <span className="text-sm font-medium">주의 섹터</span>
            </div>
            <p className="text-xs text-red-700 mt-1">
              주택 부문 둔화와 제조업 PMI 수축으로 건설/산업재 수요 감소 우려가 있습니다.
            </p>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground text-center">
          출처: U.S. Bureau of Economic Analysis, Federal Reserve | 업데이트: 월간
        </div>
      </CardContent>
      
      {selectedEconomic && (
        <ChartModal
          isOpen={!!selectedEconomic}
          onClose={() => setSelectedEconomic(null)}
          title={selectedEconomic.indicator}
          currentValue={selectedEconomic.value}
          unit={selectedEconomic.unit}
          change={selectedEconomic.change}
          changeType={selectedEconomic.change > 0 ? 'increase' : selectedEconomic.change < 0 ? 'decrease' : 'neutral'}
          riskLevel={selectedEconomic.riskLevel}
          dataType="economy"
        />
      )}
    </Card>
  );
}