import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { IssuesService } from 'src/app/services/issues.service';
import { Issue } from '../issues/issues.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  currentTab: string = 'tab1';  
  issues: Array<Issue> = [];
  barChartData: any[] = [
    { data: [], label: 'Count' },
  ];
  barChartLabels: string[] = [];
  barChartOptions: any = {
    responsive: true,
  };
  barChartLegend = true;
  barChartType = 'bar';
  // line chart
  lineChartData: any[] = [
    { data: [], label: 'Last 30 Days' },
    { data: [], label: 'Last 60 Days' },
  ];
  lineChartLabels: string[] = [];
  lineChartOptions: any = {
    responsive: true,
  };
  lineChartLegend = true;
  issuesDeviated: boolean = false;
  issuesDeviationPercentage: any = 0;

  constructor(private issueService: IssuesService, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.issueService.getIssuess().subscribe((res) => {
      this.issues = res;
      this.initiateChat(30);
      this.initiateLineChat();
    })
  }

  changeTab(tabId: string) {
    this.currentTab = tabId;
  }

  initiateChat(days: number) {
    this.barChartData[0].data = [];
    this.barChartLabels = [];
    let tags: any = [];
    const currentDate = new Date();
    const thirtyDaysAgo = new Date(currentDate.getTime() - days * 24 * 60 * 60 * 1000);
    const filteredRecords = this.issues.filter(record => new Date(record['createdON']) >= thirtyDaysAgo);
    filteredRecords.forEach(item => item.tags.forEach( tag => tags.push(tag)));
    const itemCounts: Record<string, number> = {};
    tags.forEach((item: any) => {
      itemCounts[item] = (itemCounts[item] || 0) + 1;
    });
    const itemsArray: [string, number][] = Object.entries(itemCounts);
    itemsArray.sort((a, b) => b[1] - a[1]);
    const finalArray = itemsArray.slice(0, 5);
    for(const item of finalArray) {
      this.barChartData[0].data.push(item[1]);
      this.barChartLabels.push(item[0])
    }
    this.cd.detectChanges();
  }

  initiateLineChat() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);
    const statusCountsForThirtyDays: Record<string, number> = {};
    const lastThirtyDaysData = this.issues.filter(item => new Date(item['createdON']) >= thirtyDaysAgo);
    lastThirtyDaysData.forEach(item => {
      const status = item.status;
      statusCountsForThirtyDays[status] = (statusCountsForThirtyDays[status] || 0) + 1;
    });
    const statusCountsForSixtyDays: Record<string, number> = {};
    const lastSixtyDaysData = this.issues.filter(item => (new Date(item['createdON']) >= sixtyDaysAgo && new Date(item['createdON']) <= thirtyDaysAgo));
    lastSixtyDaysData.forEach(item => {
      const status = item.status;
      statusCountsForSixtyDays[status] = (statusCountsForSixtyDays[status] || 0) + 1;
    });
    const statusCountsForThirtyDaysArray: [string, number][] = Object.entries(statusCountsForThirtyDays);
    const statusCountsForSixtyDaysDaysArray: [string, number][] = Object.entries(statusCountsForSixtyDays);
    for(const item of statusCountsForThirtyDaysArray) {
      this.lineChartData[0].data.push(item[1]);
      this.lineChartLabels.push(item[0])
    }
    for(const item of statusCountsForSixtyDaysDaysArray) {
      this.lineChartData[1].data.push(item[1]);
    }
    console.log(this.lineChartData);
    console.log(this.lineChartLabels);
    if(lastSixtyDaysData < lastThirtyDaysData) {
        this.issuesDeviated = true;
        this.issuesDeviationPercentage = ((lastThirtyDaysData.length - lastSixtyDaysData.length) / lastSixtyDaysData.length * 100);
        this.issuesDeviationPercentage = this.issuesDeviationPercentage.toFixed(2);
    } else {
        this.issuesDeviated = false;
        this.issuesDeviationPercentage = ((lastSixtyDaysData.length - lastThirtyDaysData.length) / lastThirtyDaysData.length * 100);
        this.issuesDeviationPercentage = this.issuesDeviationPercentage.toFixed(2);
    }
    this.cd.detectChanges()
  }
  
}