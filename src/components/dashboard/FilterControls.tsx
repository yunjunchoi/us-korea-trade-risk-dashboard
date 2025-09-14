import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter, Download, RefreshCw, Eye } from "lucide-react";

interface FilterOption {
  id: string;
  label: string;
  value: string;
  active: boolean;
}

const industryFilters: FilterOption[] = [
  { id: '1', label: '반도체/전자', value: 'semiconductor', active: true },
  { id: '2', label: '자동차/부품', value: 'automotive', active: true },
  { id: '3', label: '에너지/배터리', value: 'battery', active: true },
  { id: '4', label: '가전/소비재', value: 'appliance', active: true },
  { id: '5', label: '철강/금속', value: 'steel', active: false },
  { id: '6', label: '화학/소재', value: 'chemical', active: false }
];

const timeFilters: FilterOption[] = [
  { id: '1', label: '실시간', value: 'realtime', active: true },
  { id: '2', label: '일간', value: 'daily', active: false },
  { id: '3', label: '주간', value: 'weekly', active: false },
  { id: '4', label: '월간', value: 'monthly', active: false }
];

const riskFilters: FilterOption[] = [
  { id: '1', label: '높음', value: 'high', active: true },
  { id: '2', label: '보통', value: 'medium', active: true },
  { id: '3', label: '낮음', value: 'low', active: true }
];

export function FilterControls() {
  const getFilterBadgeVariant = (active: boolean) => {
    return active ? 'default' : 'outline';
  };

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="h-5 w-5" />
              <span>필터 및 제어</span>
            </CardTitle>
            <CardDescription>
              대시보드 표시 옵션 및 데이터 필터링
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              새로고침
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              내보내기
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="industry" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="industry">산업군</TabsTrigger>
            <TabsTrigger value="time">시간</TabsTrigger>
            <TabsTrigger value="risk">리스크</TabsTrigger>
            <TabsTrigger value="view">보기</TabsTrigger>
          </TabsList>
          
          <TabsContent value="industry" className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {industryFilters.map((filter) => (
                <Badge
                  key={filter.id}
                  variant={getFilterBadgeVariant(filter.active)}
                  className="cursor-pointer hover:bg-primary/80 transition-colors"
                >
                  {filter.label}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              선택된 산업군: {industryFilters.filter(f => f.active).length}개
            </p>
          </TabsContent>
          
          <TabsContent value="time" className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {timeFilters.map((filter) => (
                <Badge
                  key={filter.id}
                  variant={getFilterBadgeVariant(filter.active)}
                  className="cursor-pointer hover:bg-primary/80 transition-colors"
                >
                  {filter.label}
                </Badge>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-sm font-medium">시작 날짜</label>
                <input
                  type="date"
                  className="w-full mt-1 px-3 py-2 border border-border rounded-md text-sm"
                  defaultValue="2025-01-01"
                />
              </div>
              <div>
                <label className="text-sm font-medium">종료 날짜</label>
                <input
                  type="date"
                  className="w-full mt-1 px-3 py-2 border border-border rounded-md text-sm"
                  defaultValue="2025-09-14"
                />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="risk" className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {riskFilters.map((filter) => (
                <Badge
                  key={filter.id}
                  variant={getFilterBadgeVariant(filter.active)}
                  className="cursor-pointer hover:bg-primary/80 transition-colors"
                >
                  {filter.label}
                </Badge>
              ))}
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium">리스크 임계값</label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="임계값 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">보수적</SelectItem>
                    <SelectItem value="moderate">보통</SelectItem>
                    <SelectItem value="aggressive">적극적</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="view" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">레이아웃</label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="레이아웃 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grid">그리드 뷰</SelectItem>
                    <SelectItem value="list">리스트 뷰</SelectItem>
                    <SelectItem value="compact">컴팩트 뷰</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">차트 유형</label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="차트 유형" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="line">선형 차트</SelectItem>
                    <SelectItem value="bar">막대 차트</SelectItem>
                    <SelectItem value="area">영역 차트</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">실시간 업데이트</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">애니메이션 효과</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">상세 툴팁</span>
                <input type="checkbox" defaultChecked className="rounded" />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Eye className="h-4 w-4" />
            <span>현재 보기: 반도체/전자, 자동차/부품, 에너지/배터리, 가전/소비재</span>
          </div>
          <Button size="sm">
            필터 적용
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}