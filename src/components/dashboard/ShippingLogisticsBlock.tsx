import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, TrendingDown, Ship, Plane, Truck, Clock } from "lucide-react";
import { ChartModal } from "./ChartModal";

interface ShippingData {
  route: string;
  index: number;
  change: number;
  changePercent: number;
  duration: string;
  icon: React.ReactNode;
  riskLevel: 'low' | 'medium' | 'high';
}

const shippingData: ShippingData[] = [
  {
    route: "상하이→LA",
    index: 1398,
    change: -46,
    changePercent: -3.21,
    duration: "14-16일",
    icon: <Ship className="h-4 w-4" />,
    riskLevel: 'low'
  },
  {
    route: "상하이→뉴욕",
    index: 2156,
    change: 89,
    changePercent: 4.31,
    duration: "22-25일",
    icon: <Ship className="h-4 w-4" />,
    riskLevel: 'medium'
  },
  {
    route: "부산→LA",
    index: 1245,
    change: -23,
    changePercent: -1.81,
    duration: "12-14일",
    icon: <Ship className="h-4 w-4" />,
    riskLevel: 'low'
  },
  {
    route: "인천→시카고",
    index: 4580,
    change: 156,
    changePercent: 3.53,
    duration: "1-2일",
    icon: <Plane className="h-4 w-4" />,
    riskLevel: 'high'
  }
];

const logisticsMetrics = [
  {
    title: "평균 운송비 증가율",
    value: "+2.4%",
    description: "전월 대비"
  },
  {
    title: "항만 혼잡도",
    value: "보통",
    description: "LA/롱비치 항만"
  },
  {
    title: "연료 할증료",
    value: "+15.2%",
    description: "전년 대비"
  }
];

export function ShippingLogisticsBlock() {
  const [selectedShipping, setSelectedShipping] = useState<ShippingData | null>(null);
  
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
              <Ship className="h-5 w-5" />
              <span>운송비 / 물류</span>
            </CardTitle>
            <CardDescription>
              해운/항공 운임 지수 및 물류 현황
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
            샘플 데이터
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {shippingData.map((shipping, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${getRiskColor(shipping.riskLevel)} transition-all duration-300 hover:shadow-md`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {shipping.icon}
                  <span className="font-medium text-sm">{shipping.route}</span>
                </div>
                <Badge variant={getRiskBadgeVariant(shipping.riskLevel)} className="text-xs">
                  {shipping.riskLevel === 'high' ? '높음' : shipping.riskLevel === 'medium' ? '보통' : '낮음'}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <div 
                  className="text-lg font-bold cursor-pointer hover:text-primary transition-colors"
                  onClick={() => setSelectedShipping(shipping)}
                  title="클릭하여 상세 차트 보기"
                >
                  {shipping.index.toLocaleString()}
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  shipping.change > 0 ? 'text-red-600' : shipping.change < 0 ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {shipping.change > 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : shipping.change < 0 ? (
                    <TrendingDown className="h-3 w-3" />
                  ) : null}
                  <span>
                    {shipping.change > 0 ? '+' : ''}{shipping.change} 
                    ({shipping.changePercent > 0 ? '+' : ''}{shipping.changePercent.toFixed(2)}%)
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{shipping.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Separator className="my-4" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {logisticsMetrics.map((metric, index) => (
            <div key={index} className="text-center p-3 bg-muted/50 rounded-lg">
              <div className="text-lg font-bold">{metric.value}</div>
              <div className="text-sm font-medium">{metric.title}</div>
              <div className="text-xs text-muted-foreground">{metric.description}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2 text-blue-800">
            <Truck className="h-4 w-4" />
            <span className="text-sm font-medium">물류 인사이트</span>
          </div>
          <p className="text-xs text-blue-700 mt-1">
            항공 운임이 해운 대비 높은 증가율을 보이고 있어 긴급 화물 운송 비용 상승이 예상됩니다.
          </p>
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground text-center">
          출처: Shanghai Shipping Exchange, Freightos Baltic Index | 업데이트: 일일
        </div>
      </CardContent>
      
      {selectedShipping && (
        <ChartModal
          isOpen={!!selectedShipping}
          onClose={() => setSelectedShipping(null)}
          title={`${selectedShipping.route} 운임지수`}
          currentValue={selectedShipping.index}
          unit=""
          change={selectedShipping.change}
          changeType={selectedShipping.change > 0 ? 'increase' : selectedShipping.change < 0 ? 'decrease' : 'neutral'}
          riskLevel={selectedShipping.riskLevel}
          dataType="shipping"
        />
      )}
    </Card>
  );
}