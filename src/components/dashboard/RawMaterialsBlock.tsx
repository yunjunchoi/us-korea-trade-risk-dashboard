import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, TrendingDown, Fuel, Zap, Wrench, DollarSign } from "lucide-react";
import { ChartModal } from "./ChartModal";

interface RawMaterialData {
  name: string;
  price: number;
  change: number;
  changePercent: number;
  unit: string;
  icon: React.ReactNode;
  riskLevel: 'low' | 'medium' | 'high';
}

const rawMaterialsData: RawMaterialData[] = [
  {
    name: "WTI 원유",
    price: 78.45,
    change: 2.34,
    changePercent: 3.08,
    unit: "$/배럴",
    icon: <Fuel className="h-4 w-4" />,
    riskLevel: 'medium'
  },
  {
    name: "브렌트유",
    price: 82.15,
    change: 1.89,
    changePercent: 2.35,
    unit: "$/배럴",
    icon: <Fuel className="h-4 w-4" />,
    riskLevel: 'medium'
  },
  {
    name: "구리",
    price: 4.23,
    change: 0.15,
    changePercent: 3.68,
    unit: "$/lb",
    icon: <Wrench className="h-4 w-4" />,
    riskLevel: 'high'
  },
  {
    name: "알루미늄",
    price: 2678.85,
    change: -45.20,
    changePercent: -1.65,
    unit: "$/톤",
    icon: <Wrench className="h-4 w-4" />,
    riskLevel: 'low'
  },
  {
    name: "천연가스",
    price: 2.89,
    change: 0.12,
    changePercent: 4.33,
    unit: "$/MMBtu",
    icon: <Zap className="h-4 w-4" />,
    riskLevel: 'medium'
  },
  {
    name: "니켈",
    price: 18450,
    change: 320,
    changePercent: 1.77,
    unit: "$/톤",
    icon: <Wrench className="h-4 w-4" />,
    riskLevel: 'medium'
  }
];

export function RawMaterialsBlock() {
  const [selectedMaterial, setSelectedMaterial] = useState<RawMaterialData | null>(null);
  
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
              <DollarSign className="h-5 w-5" />
              <span>원자재 / 원재료 가격</span>
            </CardTitle>
            <CardDescription>
              국제 원자재 가격 동향 및 리스크 분석
            </CardDescription>
          </div>
          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
            샘플 데이터
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rawMaterialsData.map((material, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${getRiskColor(material.riskLevel)} transition-all duration-300 hover:shadow-md`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {material.icon}
                  <span className="font-medium text-sm">{material.name}</span>
                </div>
                <Badge variant={getRiskBadgeVariant(material.riskLevel)} className="text-xs">
                  {material.riskLevel === 'high' ? '높음' : material.riskLevel === 'medium' ? '보통' : '낮음'}
                </Badge>
              </div>
              
              <div className="space-y-1">
                <div 
                  className="text-lg font-bold cursor-pointer hover:text-primary transition-colors"
                  onClick={() => setSelectedMaterial(material)}
                  title="클릭하여 상세 차트 보기"
                >
                  {material.price.toLocaleString()} {material.unit}
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  material.change > 0 ? 'text-red-600' : material.change < 0 ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {material.change > 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : material.change < 0 ? (
                    <TrendingDown className="h-3 w-3" />
                  ) : null}
                  <span>
                    {material.change > 0 ? '+' : ''}{material.change.toFixed(2)} 
                    ({material.changePercent > 0 ? '+' : ''}{material.changePercent.toFixed(2)}%)
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Separator className="my-4" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="text-lg font-bold text-red-600">2</div>
            <div className="text-muted-foreground">고위험 품목</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-yellow-600">3</div>
            <div className="text-muted-foreground">중위험 품목</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-600">1</div>
            <div className="text-muted-foreground">저위험 품목</div>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground text-center">
          출처: Bloomberg, Reuters, LME | 업데이트: 15분 지연
        </div>
      </CardContent>
      
      {selectedMaterial && (
        <ChartModal
          isOpen={!!selectedMaterial}
          onClose={() => setSelectedMaterial(null)}
          title={selectedMaterial.name}
          currentValue={selectedMaterial.price}
          unit={selectedMaterial.unit}
          change={selectedMaterial.change}
          changeType={selectedMaterial.change > 0 ? 'increase' : selectedMaterial.change < 0 ? 'decrease' : 'neutral'}
          riskLevel={selectedMaterial.riskLevel}
          dataType="commodity"
        />
      )}
    </Card>
  );
}