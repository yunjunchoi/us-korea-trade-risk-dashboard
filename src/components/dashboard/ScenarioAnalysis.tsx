import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, TrendingUp, AlertTriangle, Download } from "lucide-react";

interface ScenarioResult {
  scenario: string;
  impact: number;
  riskLevel: 'low' | 'medium' | 'high';
  description: string;
}

const scenarioResults: ScenarioResult[] = [
  {
    scenario: "환율 +5% 상승",
    impact: -12.5,
    riskLevel: 'high',
    description: "수출 이익률 12.5% 감소 예상"
  },
  {
    scenario: "운송비 +30% 상승",
    impact: -8.2,
    riskLevel: 'medium',
    description: "총 비용 8.2% 증가"
  },
  {
    scenario: "관세율 +10%p 인상",
    impact: -15.8,
    riskLevel: 'high',
    description: "경쟁력 15.8% 하락"
  },
  {
    scenario: "원자재 +20% 상승",
    impact: -6.7,
    riskLevel: 'medium',
    description: "원가 6.7% 상승"
  }
];

export function ScenarioAnalysis() {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
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
              <Calculator className="h-5 w-5" />
              <span>시나리오 분석</span>
            </CardTitle>
            <CardDescription>
              다양한 리스크 시나리오별 영향도 분석
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="preset" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="preset">사전 정의 시나리오</TabsTrigger>
            <TabsTrigger value="custom">맞춤 시나리오</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preset" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scenarioResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${getRiskColor(result.riskLevel)}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{result.scenario}</span>
                    <Badge variant={getRiskBadgeVariant(result.riskLevel)} className="text-xs">
                      {result.riskLevel === 'high' ? '높음' : result.riskLevel === 'medium' ? '보통' : '낮음'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4" />
                      <span className="text-lg font-bold">
                        {result.impact > 0 ? '+' : ''}{result.impact}%
                      </span>
                    </div>
                    <p className="text-xs">{result.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 text-blue-800 mb-2">
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm font-medium">종합 분석</span>
              </div>
              <p className="text-xs text-blue-700">
                환율과 관세율 변동이 가장 큰 영향을 미치므로 이에 대한 헤지 전략 수립이 필요합니다.
                운송비와 원자재 가격 상승은 상대적으로 관리 가능한 수준입니다.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="custom" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="exchange-rate">환율 변동률 (%)</Label>
                  <Input id="exchange-rate" type="number" placeholder="예: 5" />
                </div>
                <div>
                  <Label htmlFor="shipping-cost">운송비 변동률 (%)</Label>
                  <Input id="shipping-cost" type="number" placeholder="예: 30" />
                </div>
                <div>
                  <Label htmlFor="tariff-rate">관세율 변동 (%p)</Label>
                  <Input id="tariff-rate" type="number" placeholder="예: 10" />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="raw-material">원자재 가격 변동률 (%)</Label>
                  <Input id="raw-material" type="number" placeholder="예: 20" />
                </div>
                <div>
                  <Label htmlFor="industry">산업군</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="산업군 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="semiconductor">반도체/전자</SelectItem>
                      <SelectItem value="automotive">자동차/부품</SelectItem>
                      <SelectItem value="battery">에너지/배터리</SelectItem>
                      <SelectItem value="appliance">가전/소비재</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">
                  <Calculator className="h-4 w-4 mr-2" />
                  시나리오 분석 실행
                </Button>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-muted-foreground text-center">
                맞춤 시나리오 결과가 여기에 표시됩니다.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}