import { Bell, TrendingUp, TrendingDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  alertCount: number;
}
export function DashboardHeader({ alertCount }: DashboardHeaderProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">한-미 무역 리스크 대시보드</h1>
              <p className="text-sm text-muted-foreground">실시간 수출/공급망 모니터링</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* 실시간 상태 표시 */}
          <div className="flex items-center space-x-2">
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-muted-foreground">실시간 연결됨</span>
          </div>

          {/* 알림 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative cursor-pointer p-2 hover:bg-muted rounded-md transition-colors">
                <Bell className="h-4 w-4" />
                {alertCount > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {alertCount > 9 ? '9+' : alertCount}
                  </Badge>
                )}
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>리스크 알림</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-start space-x-2 p-3">
                <div className="h-2 w-2 bg-red-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">원자재 가격 급등</p>
                  <p className="text-xs text-muted-foreground">구리 가격이 전월 대비 15% 상승</p>
                  <p className="text-xs text-muted-foreground">5분 전</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-start space-x-2 p-3">
                <div className="h-2 w-2 bg-yellow-500 rounded-full mt-2"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">환율 변동성 증가</p>
                  <p className="text-xs text-muted-foreground">USD/KRW 일간 변동성 2% 초과</p>
                  <p className="text-xs text-muted-foreground">15분 전</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}