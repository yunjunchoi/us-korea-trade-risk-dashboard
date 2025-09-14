import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, TrendingDown, Minus, AlertTriangle } from "lucide-react";
import { ChartModal } from "./ChartModal";
interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  riskLevel: 'low' | 'medium' | 'high';
  description?: string;
  unit?: string;
  target?: number;
  current?: number;
  dataType?: 'commodity' | 'shipping' | 'exchange' | 'interest' | 'economy' | 'tariff';
}

export function MetricCard({ 
  title, 
  value, 
  change, 
  changeType, 
  riskLevel, 
  description, 
  unit = '%',
  target,
  current,
  dataType = 'economy'
}: MetricCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
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

  const getChangeIcon = () => {
    switch (changeType) {
      case 'increase': return <TrendingUp className="h-4 w-4 text-red-500" />;
      case 'decrease': return <TrendingDown className="h-4 w-4 text-green-500" />;
      case 'neutral': return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getChangeColor = () => {
    switch (changeType) {
      case 'increase': return 'text-red-600';
      case 'decrease': return 'text-green-600';
      case 'neutral': return 'text-gray-600';
    }
  };

  return (
    <Card className="metric-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="flex items-center space-x-2">
          <div className={`risk-indicator ${getRiskColor(riskLevel)}`}></div>
          <Badge variant={getRiskBadgeVariant(riskLevel)} className="text-xs">
            {riskLevel === 'high' ? '높음' : riskLevel === 'medium' ? '보통' : '낮음'}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div 
            className="text-2xl font-bold cursor-pointer hover:text-primary transition-colors"
            onClick={() => setIsModalOpen(true)}
            title="클릭하여 상세 차트 보기"
          >
            {value}
          </div>
          <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
            {getChangeIcon()}
            <span className="text-sm font-medium">
              {change > 0 ? '+' : ''}{change}{unit}
            </span>
          </div>
        </div>
        
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        
        <div className="text-xs text-muted-foreground mt-2 opacity-75">
          출처: 종합 지수 | 업데이트: 실시간
        </div>
        {target && current && (
          <div className="mt-3">
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>현재: {current}</span>
              <span>목표: {target}</span>
            </div>
            <Progress value={(current / target) * 100} className="h-2" />
          </div>
        )}
        
        {riskLevel === 'high' && (
          <div className="flex items-center space-x-1 mt-2 text-red-600">
            <AlertTriangle className="h-3 w-3" />
            <span className="text-xs">주의 필요</span>
          </div>
        )}
      </CardContent>
      
      <ChartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        currentValue={value}
        unit={unit}
        change={change}
        changeType={changeType}
        riskLevel={riskLevel}
        dataType={dataType}
      />
    </Card>
  );
}