import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Settings, Mail, Smartphone, AlertTriangle } from "lucide-react";

interface AlertRule {
  id: string;
  name: string;
  condition: string;
  threshold: string;
  enabled: boolean;
  priority: 'high' | 'medium' | 'low';
  channels: string[];
}

const alertRules: AlertRule[] = [
  {
    id: '1',
    name: '원자재 가격 급등',
    condition: '구리 가격 전월 대비',
    threshold: '+15%',
    enabled: true,
    priority: 'high',
    channels: ['email', 'sms']
  },
  {
    id: '2',
    name: '환율 변동성 증가',
    condition: 'USD/KRW 일간 변동성',
    threshold: '>2%',
    enabled: true,
    priority: 'medium',
    channels: ['email']
  },
  {
    id: '3',
    name: '운송비 상승',
    condition: 'SCFI 지수 주간 변화',
    threshold: '+10%',
    enabled: false,
    priority: 'medium',
    channels: ['email']
  },
  {
    id: '4',
    name: '관세율 변경',
    condition: '한국 제품 관세율',
    threshold: '변경 시',
    enabled: true,
    priority: 'high',
    channels: ['email', 'sms', 'push']
  }
];

export function AlertSystem() {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'outline';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return '높음';
      case 'medium': return '보통';
      case 'low': return '낮음';
      default: return '보통';
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email': return <Mail className="h-3 w-3" />;
      case 'sms': return <Smartphone className="h-3 w-3" />;
      case 'push': return <Bell className="h-3 w-3" />;
      default: return <Bell className="h-3 w-3" />;
    }
  };

  return (
    <Card className="dashboard-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>알림 시스템</span>
            </CardTitle>
            <CardDescription>
              리스크 임계값 설정 및 알림 관리
            </CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            설정
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* 기존 알림 규칙 */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">활성 알림 규칙</h3>
            {alertRules.map((rule) => (
              <div
                key={rule.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">{rule.name}</span>
                    <Badge variant={getPriorityColor(rule.priority)} className="text-xs">
                      {getPriorityText(rule.priority)}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {rule.condition} {rule.threshold}
                  </p>
                  <div className="flex items-center space-x-1">
                    {rule.channels.map((channel, index) => (
                      <div key={index} className="flex items-center space-x-1 text-xs text-muted-foreground">
                        {getChannelIcon(channel)}
                        <span>{channel}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Switch checked={rule.enabled} />
              </div>
            ))}
          </div>

          {/* 새 알림 규칙 추가 */}
          <div className="border-t pt-6">
            <h3 className="text-sm font-medium mb-4">새 알림 규칙 추가</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="alert-name">알림 이름</Label>
                  <Input id="alert-name" placeholder="예: 금리 변동 알림" />
                </div>
                <div>
                  <Label htmlFor="alert-metric">모니터링 지표</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="지표 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exchange">환율</SelectItem>
                      <SelectItem value="commodity">원자재 가격</SelectItem>
                      <SelectItem value="shipping">운송비</SelectItem>
                      <SelectItem value="interest">금리</SelectItem>
                      <SelectItem value="tariff">관세율</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="alert-condition">조건</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="조건 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="above">초과</SelectItem>
                      <SelectItem value="below">미만</SelectItem>
                      <SelectItem value="change">변화율</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="alert-threshold">임계값</Label>
                  <Input id="alert-threshold" placeholder="예: 5%" />
                </div>
                <div>
                  <Label htmlFor="alert-priority">우선순위</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="우선순위 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">높음</SelectItem>
                      <SelectItem value="medium">보통</SelectItem>
                      <SelectItem value="low">낮음</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>알림 채널</Label>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="email-channel" />
                      <Label htmlFor="email-channel" className="text-sm">이메일</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="sms-channel" />
                      <Label htmlFor="sms-channel" className="text-sm">SMS</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="push-channel" />
                      <Label htmlFor="push-channel" className="text-sm">푸시</Label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Button className="w-full mt-4">
              <AlertTriangle className="h-4 w-4 mr-2" />
              알림 규칙 추가
            </Button>
          </div>

          {/* 알림 통계 */}
          <div className="border-t pt-6">
            <h3 className="text-sm font-medium mb-4">알림 통계 (최근 30일)</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-lg font-bold text-red-600">23</div>
                <div className="text-xs text-red-600">고위험 알림</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-lg font-bold text-yellow-600">45</div>
                <div className="text-xs text-yellow-600">중위험 알림</div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <div className="text-lg font-bold text-green-600">12</div>
                <div className="text-xs text-green-600">저위험 알림</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}