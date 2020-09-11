import { Component, OnInit } from '@angular/core';
import { IptablesService } from 'src/app/services/iptables.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  rules: any;
  rulesOut: any;
  rulesFor: any;
  interfaces: any;

  constructor(
    private iptableService: IptablesService
  ) { }

  ngOnInit(): void {
    this.getRules();
    this.getRulesOut();
    this.getRulesFor();
    this.getInterfaces();
  }

  public getRules(): void {
    this.iptableService.getRules().subscribe( value => {
      if (value.data) {
        this.rules = value.data;
        this.rules.stdout = this.rules.stdout.filter( item => item != "");
      }
    })
  }

  public getRulesOut(): void {
    this.iptableService.getRulesOut().subscribe( value => {
      if (value.data) {
        this.rulesOut= value.data;
        this.rulesOut.stdout = this.rulesOut.stdout.filter( item => item != "");
      }
    })
  }

  public getRulesFor(): void {
    this.iptableService.getRulesFor().subscribe( value => {
      if (value.data) {
        this.rulesFor = value.data;
        this.rulesFor.stdout = this.rulesFor.stdout.filter( item => item != "");
      }
    })
  }

  public getInterfaces(): void {
    this.iptableService.getInterfaces().subscribe( (value: any) => {
      if (value.data) {
        this.interfaces = value.data;
        this.interfaces.stdout = this.interfaces.stdout.filter( item => item != "");
      }
    })
  }

  updatePart() {
    this.getRules();
    this.getRulesFor();
    this.getRulesOut();
  }

}
