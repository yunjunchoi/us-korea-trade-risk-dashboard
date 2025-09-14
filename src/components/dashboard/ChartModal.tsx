import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, Download, Calendar, BarChart3 } from "lucide-react";

interface ChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  currentValue: string | number;
  unit?: string;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  riskLevel: 'low' | 'medium' | 'high';
  dataType: 'commodity' | 'shipping' | 'exchange' | 'interest' | 'economy' | 'tariff';
}

// 5년치 샘플 데이터 생성 함수
const generateHistoricalData = (dataType: string, currentValue: number) => {
  const data = [];
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 5);
  
  for (let i = 0; i < 60; i++) { // 5년 * 12개월
    const date = new Date(startDate);
    date.setMonth(date.getMonth() + i);
    
    let value;
    switch (dataType) {
      case 'commodity':
        // 원자재 가격 - 변동성이 큰 패턴
        value = currentValue * (0.7 + Math.random() * 0.6) + Math.sin(i * 0.2) * currentValue * 0.1;
        break;
      case 'shipping':
        // 운송비 - 코로나 시기 급등 패턴
        if (i > 36 && i < 48) { // 2022-2023년 급등
          value = currentValue * (1.5 + Math.random() * 0.8);
        } else {
          value = currentValue * (0.8 + Math.random() * 0.4);
        }
        break;
      case 'exchange':
        // 환율 - 상대적으로 안정적이지만 트렌드 존재
        value = currentValue * (0.85 + Math.random() * 0.3) + (i * 2);
        break;
      case 'interest':
        // 금리 - 단계적 변화 패턴
        if (i < 24) value = currentValue * 0.1; // 저금리 시대
        else if (i < 48) value = currentValue * (0.1 + (i - 24) * 0.03);
        else value = currentValue * (0.9 + Math.random() * 0.2);
        break;
      case 'economy':
        // 경제지표 - 완만한 성장 트렌드
        value = currentValue * (0.9 + Math.random() * 0.2) + Math.sin(i * 0.1) * currentValue * 0.05;
        break;
      case 'tariff':
        // 관세율 - 정책 변화에 따른 급변
        if (i < 48) value = 25; // 기존 관세율
        else if (i < 58) value = 25 - (i - 48) * 1; // 점진적 인하
        else value = currentValue; // 현재 관세율
        break;
      default:
        value = currentValue * (0.8 + Math.random() * 0.4);
    }
    
    data.push({
      date: date.toISOString().slice(0, 7), // YYYY-MM 형식
      value: Math.round(value * 100) / 100,
      year: date.getFullYear(),
      month: date.getMonth() + 1
    });
  }
  
  return data;
};

export function ChartModal({ 
  isOpen, 
  onClose, 
  title, 
  currentValue, 
  unit = '', 
  change, 
  changeType, 
  riskLevel,
  dataType 
}: ChartModalProps) {
  const numericValue = typeof currentValue === 'string' ? parseFloat(currentValue) : currentValue;
  const historicalData = generateHistoricalData(dataType, numericValue);
  
  // 연도별 평균 데이터
  const yearlyData = historicalData.reduce((acc, item) => {
    const year = item.year;
    if (!acc[year]) {
      acc[year] = { year, values: [], average: 0 };
    }
    acc[year].values.push(item.value);
    return acc;
  }, {} as Record<number, { year: number; values: number[]; average: number }>);
  
  Object.values(yearlyData).forEach(yearData => {
    yearData.average = yearData.values.reduce((sum, val) => sum + val, 0) / yearData.values.length;
  });
  
  const yearlyChartData = Object.values(yearlyData).map(item => ({
    year: item.year.toString(),
    value: Math.round(item.average * 100) / 100
  }));

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getChangeIcon = () => {
    switch (changeType) {
      case 'increase': return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'decrease': return <TrendingDown className="h-4 w-4 text-green-500" />;
      default: return <BarChart3 className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatTooltipValue = (value: number) => {
    return `${value.toLocaleString()}${unit}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
              <DialogDescription>
                최근 5년간 추이 분석 및 상세 데이터
              </DialogDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={riskLevel === 'high' ? 'destructive' : riskLevel === 'medium' ? 'secondary' : 'default'}>
                {riskLevel === 'high' ? '높음' : riskLevel === 'medium' ? '보통' : '낮음'}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        {/* 현재 값 및 변화량 표시 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-2xl font-bold">{currentValue}{unit}</div>
            <div className="text-sm text-muted-foreground">현재 값</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center space-x-1">
              {getChangeIcon()}
              <span className="text-lg font-bold">
                {change > 0 ? '+' : ''}{change}{unit}
              </span>
            </div>
            <div className="text-sm text-muted-foreground">전월 대비</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg">
            <div className="text-lg font-bold" style={{ color: getRiskColor(riskLevel) }}>
              {riskLevel === 'high' ? '높음' : riskLevel === 'medium' ? '보통' : '낮음'}
            </div>
            <div className="text-sm text-muted-foreground">리스크 수준</div>
          </div>
        </div>

        <Tabs defaultValue="monthly" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="monthly">월별 추이</TabsTrigger>
            <TabsTrigger value="yearly">연도별 평균</TabsTrigger>
          </TabsList>
          
          <TabsContent value="monthly" className="space-y-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>최근 5년간 월별 데이터 (총 {historicalData.length}개월)</span>
            </div>
            
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historicalData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="date" 
                    tick={{ fontSize: 12 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${value}${unit}`}
                  />
                  <Tooltip 
                    formatter={(value: number) => [formatTooltipValue(value), title]}
                    labelFormatter={(label) => `날짜: ${label}`}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke={getRiskColor(riskLevel)}
                    fill={getRiskColor(riskLevel)}
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="yearly" className="space-y-4">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <BarChart3 className="h-4 w-4" />
              <span>연도별 평균값 비교</span>
            </div>
            
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={yearlyChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="year" 
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${value}${unit}`}
                  />
                  <Tooltip 
                    formatter={(value: number) => [formatTooltipValue(value), `${title} 평균`]}
                    labelFormatter={(label) => `${label}년`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={getRiskColor(riskLevel)}
                    strokeWidth={3}
                    dot={{ fill: getRiskColor(riskLevel), strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>

        {/* 통계 요약 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t">
          <div className="text-center">
            <div className="text-lg font-bold">
              {Math.max(...historicalData.map(d => d.value)).toLocaleString()}{unit}
            </div>
            <div className="text-xs text-muted-foreground">5년 최고값</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">
              {Math.min(...historicalData.map(d => d.value)).toLocaleString()}{unit}
            </div>
            <div className="text-xs text-muted-foreground">5년 최저값</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">
              {(historicalData.reduce((sum, d) => sum + d.value, 0) / historicalData.length).toFixed(2)}{unit}
            </div>
            <div className="text-xs text-muted-foreground">5년 평균</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold">
              {(Math.sqrt(historicalData.reduce((sum, d) => {
                const avg = historicalData.reduce((s, item) => s + item.value, 0) / historicalData.length;
                return sum + Math.pow(d.value - avg, 2);
              }, 0) / historicalData.length)).toFixed(2)}{unit}
            </div>
            <div className="text-xs text-muted-foreground">표준편차</div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}