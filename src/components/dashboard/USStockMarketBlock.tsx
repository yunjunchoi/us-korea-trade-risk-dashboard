import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, BarChart3, Building2, Zap, Heart, Cpu, Car, Home, ShoppingBag, Banknote, Factory } from "lucide-react";
import { ChartModal } from "./ChartModal";

interface SectorData {
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  icon: React.ReactNode;
  riskLevel: 'low' | 'medium' | 'high';
}

interface StockData {
  name: string;
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  marketCap: string;
  sector: string;
  riskLevel: 'low' | 'medium' | 'high';
}

const sectorData: SectorData[] = [
  {
    name: "기술주",
    symbol: "XLK",
    price: 218.45,
    change: 2.34,
    changePercent: 1.08,
    icon: <Cpu className="h-4 w-4" />,
    riskLevel: 'medium'
  },
  {
    name: "금융",
    symbol: "XLF",
    price: 43.21,
    change: -0.89,
    changePercent: -2.02,
    icon: <Banknote className="h-4 w-4" />,
    riskLevel: 'high'
  },
  {
    name: "헬스케어",
    symbol: "XLV",
    price: 156.78,
    change: 1.23,
    changePercent: 0.79,
    icon: <Heart className="h-4 w-4" />,
    riskLevel: 'low'
  },
  {
    name: "에너지",
    symbol: "XLE",
    price: 89.34,
    change: 3.45,
    changePercent: 4.02,
    icon: <Zap className="h-4 w-4" />,
    riskLevel: 'medium'
  },
  {
    name: "소비재",
    symbol: "XLY",
    price: 167.89,
    change: -1.56,
    changePercent: -0.92,
    icon: <ShoppingBag className="h-4 w-4" />,
    riskLevel: 'medium'
  },
  {
    name: "산업재",
    symbol: "XLI",
    price: 134.56,
    change: 0.78,
    changePercent: 0.58,
    icon: <Factory className="h-4 w-4" />,
    riskLevel: 'low'
  },
  {
    name: "부동산",
    symbol: "XLRE",
    price: 45.67,
    change: -0.34,
    changePercent: -0.74,
    icon: <Home className="h-4 w-4" />,
    riskLevel: 'high'
  },
  {
    name: "통신서비스",
    symbol: "XLC",
    price: 78.23,
    change: 1.89,
    changePercent: 2.48,
    icon: <Building2 className="h-4 w-4" />,
    riskLevel: 'low'
  }
];

const topStocks: StockData[] = [
  {
    name: "Apple Inc.",
    symbol: "AAPL",
    price: 227.52,
    change: 3.45,
    changePercent: 1.54,
    marketCap: "3.45T",
    sector: "기술주",
    riskLevel: 'low'
  },
  {
    name: "Microsoft Corp.",
    symbol: "MSFT",
    price: 415.26,
    change: -2.18,
    changePercent: -0.52,
    marketCap: "3.08T",
    sector: "기술주",
    riskLevel: 'low'
  },
  {
    name: "NVIDIA Corp.",
    symbol: "NVDA",
    price: 118.11,
    change: 5.67,
    changePercent: 5.04,
    marketCap: "2.91T",
    sector: "기술주",
    riskLevel: 'medium'
  },
  {
    name: "Alphabet Inc.",
    symbol: "GOOGL",
    price: 165.87,
    change: 1.23,
    changePercent: 0.75,
    marketCap: "2.04T",
    sector: "기술주",
    riskLevel: 'low'
  },
  {
    name: "Amazon.com Inc.",
    symbol: "AMZN",
    price: 186.43,
    change: -1.89,
    changePercent: -1.00,
    marketCap: "1.95T",
    sector: "소비재",
    riskLevel: 'medium'
  },
  {
    name: "Meta Platforms Inc.",
    symbol: "META",
    price: 563.27,
    change: 8.45,
    changePercent: 1.52,
    marketCap: "1.43T",
    sector: "통신서비스",
    riskLevel: 'medium'
  },
  {
    name: "Tesla Inc.",
    symbol: "TSLA",
    price: 248.98,
    change: -12.34,
    changePercent: -4.73,
    marketCap: "795B",
    sector: "자동차",
    riskLevel: 'high'
  },
  {
    name: "Berkshire Hathaway",
    symbol: "BRK.A",
    price: 627500,
    change: 2500,
    changePercent: 0.40,
    marketCap: "926B",
    sector: "금융",
    riskLevel: 'low'
  },
  {
    name: "Eli Lilly and Co.",
    symbol: "LLY",
    price: 789.45,
    change: 15.67,
    changePercent: 2.02,
    marketCap: "751B",
    sector: "헬스케어",
    riskLevel: 'low'
  },
  {
    name: "JPMorgan Chase & Co.",
    symbol: "JPM",
    price: 234.56,
    change: -3.21,
    changePercent: -1.35,
    marketCap: "687B",
    sector: "금융",
    riskLevel: 'medium'
  }
];

export function USStockMarketBlock() {
  const [selectedSector, setSelectedSector] = useState<SectorData | null>(null);
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);

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

  const formatPrice = (price: number, symbol: string) => {
    if (symbol === 'BRK.A') {
      return `$${price.toLocaleString()}`;
    }
    return `$${price.toFixed(2)}`;
  };

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <span className="text-lg">🇺🇸</span>
              <BarChart3 className="h-5 w-5" />
              <span>미국 증시 현황</span>
            </CardTitle>
            <CardDescription>
              섹터별 성과 및 주요 종목 동향 (샘플 데이터)
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-700 border-yellow-200">
              샘플 데이터
            </Badge>
            <Badge variant="outline" className="text-xs">
              API 연동 예정
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="sectors" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sectors">섹터별 현황</TabsTrigger>
            <TabsTrigger value="top-stocks">Top 10 종목</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sectors" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {sectorData.map((sector, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${getRiskColor(sector.riskLevel)} transition-all duration-300 hover:shadow-md cursor-pointer`}
                  onClick={() => setSelectedSector(sector)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {sector.icon}
                      <span className="font-medium text-sm">{sector.name}</span>
                    </div>
                    <Badge variant={getRiskBadgeVariant(sector.riskLevel)} className="text-xs">
                      {sector.riskLevel === 'high' ? '높음' : sector.riskLevel === 'medium' ? '보통' : '낮음'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-lg font-bold">
                      ${sector.price.toFixed(2)}
                    </div>
                    <div className={`flex items-center space-x-1 text-sm ${
                      sector.change > 0 ? 'text-green-600' : sector.change < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {sector.change > 0 ? (
                        <TrendingUp className="h-3 w-3" />
                      ) : sector.change < 0 ? (
                        <TrendingDown className="h-3 w-3" />
                      ) : null}
                      <span>
                        {sector.change > 0 ? '+' : ''}{sector.change.toFixed(2)} 
                        ({sector.changePercent > 0 ? '+' : ''}{sector.changePercent.toFixed(2)}%)
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {sector.symbol}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="top-stocks" className="space-y-4">
            <div className="space-y-3">
              {topStocks.map((stock, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${getRiskColor(stock.riskLevel)} transition-all duration-300 hover:shadow-md cursor-pointer`}
                  onClick={() => setSelectedStock(stock)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="text-lg font-bold">#{index + 1}</div>
                        <div>
                          <div className="font-medium">{stock.name}</div>
                          <div className="text-sm text-muted-foreground">{stock.symbol} • {stock.sector}</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        {formatPrice(stock.price, stock.symbol)}
                      </div>
                      <div className={`flex items-center justify-end space-x-1 text-sm ${
                        stock.change > 0 ? 'text-green-600' : stock.change < 0 ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {stock.change > 0 ? (
                          <TrendingUp className="h-3 w-3" />
                        ) : stock.change < 0 ? (
                          <TrendingDown className="h-3 w-3" />
                        ) : null}
                        <span>
                          {stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)} 
                          ({stock.changePercent > 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%)
                        </span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        시가총액: ${stock.marketCap}
                      </div>
                    </div>
                    
                    <Badge variant={getRiskBadgeVariant(stock.riskLevel)} className="text-xs ml-4">
                      {stock.riskLevel === 'high' ? '높음' : stock.riskLevel === 'medium' ? '보통' : '낮음'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <Separator className="my-4" />
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-lg font-bold text-green-600">5</div>
            <div className="text-xs text-green-600">상승 섹터</div>
          </div>
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-lg font-bold text-red-600">3</div>
            <div className="text-xs text-red-600">하락 섹터</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-lg font-bold text-blue-600">7</div>
            <div className="text-xs text-blue-600">상승 종목</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-lg font-bold text-orange-600">3</div>
            <div className="text-xs text-orange-600">하락 종목</div>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-muted-foreground text-center">
          출처: Yahoo Finance, Bloomberg (샘플 데이터) | 업데이트: 실시간 연동 예정
        </div>
      </CardContent>
      
      {selectedSector && (
        <ChartModal
          isOpen={!!selectedSector}
          onClose={() => setSelectedSector(null)}
          title={`${selectedSector.name} 섹터 (${selectedSector.symbol})`}
          currentValue={selectedSector.price}
          unit=""
          change={selectedSector.change}
          changeType={selectedSector.change > 0 ? 'increase' : selectedSector.change < 0 ? 'decrease' : 'neutral'}
          riskLevel={selectedSector.riskLevel}
          dataType="economy"
        />
      )}
      
      {selectedStock && (
        <ChartModal
          isOpen={!!selectedStock}
          onClose={() => setSelectedStock(null)}
          title={`${selectedStock.name} (${selectedStock.symbol})`}
          currentValue={selectedStock.price}
          unit=""
          change={selectedStock.change}
          changeType={selectedStock.change > 0 ? 'increase' : selectedStock.change < 0 ? 'decrease' : 'neutral'}
          riskLevel={selectedStock.riskLevel}
          dataType="economy"
        />
      )}
    </Card>
  );
}