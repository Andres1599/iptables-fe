import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { IptablesService } from 'src/app/services/iptables.service';

@Component({
  selector: 'app-edite-rule',
  templateUrl: './edite-rule.component.html',
  styleUrls: ['./edite-rule.component.scss']
})
export class EditeRuleComponent implements OnInit {

  interfaces: any;
  showMessageSuccess = false;
  showMessageError = false;

  private route: ActivatedRouteSnapshot;

  chain: string;
  number: string;
  form: FormGroup;
  
  constructor(
    private iptableService: IptablesService,
    private router: Router,
    activeRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.route = activeRoute.snapshot;
  }

  ngOnInit(): void {
    this.chain = this.route.params.chain;
    this.number = this.route.params.num;
    this.validateForm();
    this.getInterfaces();
  }

  private validateForm(): void {
    this.form = this.formBuilder.group({
      chain: ['', Validators.required],
      protocol: ['', Validators.required],
      ports: ['', Validators.required],
      destino: ['', Validators.required],
      interfas: ['', Validators.required],
      origen: ['', Validators.required]
    });
  }

  public getInterfaces(): void {
    this.iptableService.getInterfaces().subscribe( (value: any) => {
      if (value.data) {
        this.interfaces = value.data;
        this.interfaces.stdout = this.interfaces.stdout.filter( item => item != "");
      }
    })
  }

  public goToDashboard(): void {
    this.router.navigateByUrl('/');
  }

  public compare(op: string, op2: string) {
    if (op === op2) {
      return true;
    } else {
      return false;
    }
  }

  public editRule(): void {
    try {
      if (!this.form.valid) {
        this.form.markAllAsTouched();
      } else {
        const data = this.form.value;
        data.number = this.number;
        console.log(data);
        this.iptableService.editRule(data).subscribe( value => {
          if (value.ok) {
            this.showMessageSuccess = true;
          } else {
            this.showMessageError = false;
          }
        })
      }
    } catch (error) {
      this.showMessageError = true;
    }
  }
}
