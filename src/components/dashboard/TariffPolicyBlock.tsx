import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, TrendingDown, Scale, FileText, AlertTriangle, Calendar } from "lucide-react";
import { ChartModal } from "./ChartModal";

interface TariffData {
  country: string;
  currentRate: number;
  previousRate: number;
  change: number;
  effectiveDate: string;
  flag: string;
  riskLevel: 'low' | 'medium' | 'high';
  products: string[];
}

const tariffData: TariffData[] = [
  {
    country: "한국",
    currentRate: 15.0,
    previousRate: 25.0,
    change: -10.0,
    effectiveDate: "2025-02-07",
    flag: "🇰🇷",
    riskLevel: 'medium',
    products: ["자동차", "전자제품", "철강"]
  },
  {
    country: "중국",
    currentRate: 60.0,
    previousRate: 25.0,
    change: 35.0,
    effectiveDate: "2025-01-20",
    flag: "🇨🇳",
    riskLevel: 'high',
    products: ["전자제품", "기계", "화학"]
  },
  {
    country: "일본",
    currentRate: 20.0,
    previousRate: 15.0,
    change: 5.0,
    effectiveDate: "2025-02-01",
    flag: "🇯🇵",
    riskLevel: 'medium',
    products: ["자동차", "기계", "정밀기기"]
  },
  {
    country: "독일",
    currentRate: 25.0,
    previousRate: 10.0,
    change: 15.0,
    effectiveDate: "2025-01-25",
    flag: "🇩🇪",
    riskLevel: 'high',
    products: ["자동차", "기계", "화학"]
  }
];

const policyMetrics = [
  {
    title: "관세 적용 품목",
    value: "2,847",
    description: "HS 코드 기준",
    trend: "up"
  },
  {
    title: "평균 관세율",
    value: "28.5%",
    description: "가중평균",
    trend: "up"
  },
  {
    title: "무역분쟁 건수",
    value: "12",
    description: "진행 중",
    trend: "neutral"
  }
];

export function TariffPolicyBlock() {
  const [selectedTariff, setSelectedTariff] = useState<TariffData | null>(null);
  
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Scale className="h-5 w-5" />
              <span>정책 / 관세 / 수출입 규제</span>
            </CardTitle>
            <CardDescription>
              미국 무역정책 변화 및 관세율 동향
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
            샘플 데이터
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {tariffData.map((tariff, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${getRiskColor(tariff.riskLevel)} transition-all duration-300 hover:shadow-md`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{tariff.flag}</span>
                  <span className="font-medium text-sm">{tariff.country}</span>
                </div>
                <Badge variant={getRiskBadgeVariant(tariff.riskLevel)} className="text-xs">
                  {tariff.riskLevel === 'high' ? '높음' : tariff.riskLevel === 'medium' ? '보통' : '낮음'}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span 
                    className="text-lg font-bold cursor-pointer hover:text-primary transition-colors"
                    onClick={() => setSelectedTariff(tariff)}
                    title="클릭하여 상세 차트 보기"
                  >
                    {tariff.currentRate}%
                  </span>
                  <div className={`flex items-center space-x-1 text-sm ${
                    tariff.change > 0 ? 'text-red-600' : tariff.change < 0 ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {tariff.change > 0 ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : tariff.change < 0 ? (
                      <TrendingDown className="h-3 w-3" />
                    ) : null}
                    <span>
                      {tariff.change > 0 ? '+' : ''}{tariff.change}%p
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3" />
                  <span>시행: {formatDate(tariff.effectiveDate)}</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mt-2">
                  {tariff.products.slice(0, 3).map((product, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {product}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Separator className="my-4" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {policyMetrics.map((metric, index) => (
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
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 text-green-800">
              <FileText className="h-4 w-4" />
              <span className="text-sm font-medium">한국 우대 조치</span>
            </div>
            <p className="text-xs text-green-700 mt-1">
              한-미 관세협정으로 한국 제품에 대한 관세율이 25%에서 15%로 인하되었습니다.
            </p>
          </div>
          
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center space-x-2 text-red-800">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm font-medium">고위험 국가</span>
            </div>
            <p className="text-xs text-red-700 mt-1">
              중국과 독일에 대한 관세율이 대폭 인상되어 해당 국가 경쟁업체 대비 우위 확보 가능합니다.
            </p>
          </div>
          
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 text-blue-800">
              <Calendar className="h-4 w-4" />
              <span className="text-sm font-medium">예정 정책</span>
            </div>
            <p className="text-xs text-blue-700 mt-1">
              3월 중 드 미니미스 면세 혜택 중단 및 추가 품목별 관세 조정이 예정되어 있습니다.
            </p>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground text-center">
          출처: USITC DataWeb, WITS, 관세청 | 업데이트: 정책 변경 시
        </div>
      </CardContent>
      
      {selectedTariff && (
        <ChartModal
          isOpen={!!selectedTariff}
          onClose={() => setSelectedTariff(null)}
          title={`${selectedTariff.country} 관세율`}
          currentValue={selectedTariff.currentRate}
          unit="%"
          change={selectedTariff.change}
          changeType={selectedTariff.change > 0 ? 'increase' : selectedTariff.change < 0 ? 'decrease' : 'neutral'}
          riskLevel={selectedTariff.riskLevel}
          dataType="tariff"
        />
      )}
    </Card>
  );
}