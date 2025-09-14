import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, TrendingDown, DollarSign, Shield, AlertTriangle } from "lucide-react";
import { ChartModal } from "./ChartModal";

interface ExchangeData {
  pair: string;
  rate: number;
  change: number;
  changePercent: number;
  volatility: number;
  riskLevel: 'low' | 'medium' | 'high';
}

const exchangeData: ExchangeData[] = [
  {
    pair: "USD/KRW",
    rate: 1390.70,
    change: 3.10,
    changePercent: 0.22,
    volatility: 1.8,
    riskLevel: 'medium'
  },
  {
    pair: "EUR/KRW",
    rate: 1631.43,
    change: 7.38,
    changePercent: 0.45,
    volatility: 2.1,
    riskLevel: 'medium'
  },
  {
    pair: "CNY/KRW",
    rate: 195.29,
    change: 0.51,
    changePercent: 0.26,
    volatility: 1.2,
    riskLevel: 'low'
  },
  {
    pair: "JPY/KRW",
    rate: 940.87,
    change: 0.83,
    changePercent: 0.09,
    volatility: 0.9,
    riskLevel: 'low'
  }
];

const hedgingMetrics = [
  {
    title: "환헤지 비용",
    value: "0.85%",
    description: "연간 기준",
    trend: "up"
  },
  {
    title: "실효환율 지수",
    value: "102.4",
    description: "기준년도 대비",
    trend: "up"
  },
  {
    title: "환율 변동성",
    value: "1.6%",
    description: "30일 평균",
    trend: "down"
  }
];

export function ExchangeRiskBlock() {
  const [selectedExchange, setSelectedExchange] = useState<ExchangeData | null>(null);
  
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

  const getVolatilityColor = (volatility: number) => {
    if (volatility > 2.0) return 'text-red-600';
    if (volatility > 1.5) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>환율 / 환 리스크</span>
            </CardTitle>
            <CardDescription>
              주요 통화 환율 동향 및 변동성 분석
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
            샘플 데이터
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {exchangeData.map((exchange, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${getRiskColor(exchange.riskLevel)} transition-all duration-300 hover:shadow-md`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm">{exchange.pair}</span>
                </div>
                <Badge variant={getRiskBadgeVariant(exchange.riskLevel)} className="text-xs">
                  {exchange.riskLevel === 'high' ? '높음' : exchange.riskLevel === 'medium' ? '보통' : '낮음'}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div 
                  className="text-lg font-bold cursor-pointer hover:text-primary transition-colors"
                  onClick={() => setSelectedExchange(exchange)}
                  title="클릭하여 상세 차트 보기"
                >
                  {exchange.rate.toLocaleString()}
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  exchange.change > 0 ? 'text-red-600' : exchange.change < 0 ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {exchange.change > 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : exchange.change < 0 ? (
                    <TrendingDown className="h-3 w-3" />
                  ) : null}
                  <span>
                    {exchange.change > 0 ? '+' : ''}{exchange.change.toFixed(2)} 
                    ({exchange.changePercent > 0 ? '+' : ''}{exchange.changePercent.toFixed(2)}%)
                  </span>
                </div>
                <div className={`text-xs ${getVolatilityColor(exchange.volatility)}`}>
                  변동성: {exchange.volatility.toFixed(1)}%
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Separator className="my-4" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {hedgingMetrics.map((metric, index) => (
            <div key={index} className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-center space-x-1">
                <div className="text-lg font-bold">{metric.value}</div>
                {metric.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4 text-red-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-green-500" />
                )}
              </div>
              <div className="text-sm font-medium">{metric.title}</div>
              <div className="text-xs text-muted-foreground">{metric.description}</div>
            </div>
          ))}
        </div>
        
        <div className="space-y-3">
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 text-green-800">
              <Shield className="h-4 w-4" />
              <span className="text-sm font-medium">헤지 권장사항</span>
            </div>
            <p className="text-xs text-green-700 mt-1">
              USD/KRW 환율이 1,400원 근처에서 저항을 받고 있어 단기 헤지 포지션 고려 시점입니다.
            </p>
          </div>
          
          <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-2 text-yellow-800">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">주의사항</span>
            </div>
            <p className="text-xs text-yellow-700 mt-1">
              EUR/KRW 변동성이 증가하고 있어 유럽 수출 기업은 환위험 관리 강화가 필요합니다.
            </p>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground text-center">
          출처: 한국은행, Federal Reserve, ECB, BOJ | 업데이트: 실시간
        </div>
      </CardContent>
      
      {selectedExchange && (
        <ChartModal
          isOpen={!!selectedExchange}
          onClose={() => setSelectedExchange(null)}
          title={selectedExchange.pair}
          currentValue={selectedExchange.rate}
          unit=""
          change={selectedExchange.change}
          changeType={selectedExchange.change > 0 ? 'increase' : selectedExchange.change < 0 ? 'decrease' : 'neutral'}
          riskLevel={selectedExchange.riskLevel}
          dataType="exchange"
        />
      )}
    </Card>
  );
}