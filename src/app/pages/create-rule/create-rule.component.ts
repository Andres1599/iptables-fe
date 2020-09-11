import { Component, OnInit } from '@angular/core';
import { IptablesService } from 'src/app/services/iptables.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-rule',
  templateUrl: './create-rule.component.html',
  styleUrls: ['./create-rule.component.scss']
})
export class CreateRuleComponent implements OnInit {

  interfaces: any;
  showMessageSuccess = false;
  showMessageError = false;

  form: FormGroup;

  constructor(
    private iptableService: IptablesService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getInterfaces();
    this.validateForm();
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

  public createRule(): void {
    try {
      if (!this.form.valid) {
        this.form.markAllAsTouched();
      } else {
        const data = this.form.value;
        this.iptableService.newRule(data).subscribe( value => {
          if (value.data.ok) {
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
