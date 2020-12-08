import { Component, OnInit} from '@angular/core';
import { RuleConditionTypeListEnum } from 'src/app/enums/rule-condition-type-list.enum';
import { MonitoringRuleService } from 'src/app/services/monitoring-rule.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  constructor(
    private _monitoringRuleService: MonitoringRuleService
  ) {
    
  }

  ngOnInit(): void {
  }

}
