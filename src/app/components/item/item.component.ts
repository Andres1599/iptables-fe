import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IptablesService } from 'src/app/services/iptables.service';
import { AlertComponent } from '../alert/alert.component';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  @Input() data: string;
  @Input() type: string;
  @Output() deletes: EventEmitter<boolean> = new EventEmitter<boolean>();
  chain: string;
  num: string;
  
  constructor(
    public dialog: MatDialog,
    public iptableService: IptablesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.chain = this.type;
  }

  verifyItem(): boolean {
    try {
      const pass = this.data.split(' ');
      if (pass[0] === 'Chain' || pass[0] === 'num') {
        return false;
      } 

      this.num = pass[0];
      
      return true;
      
    } catch (error) {
      return false;
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.iptableService.deleteRule({
          chain: this.chain,
          number: this.num
        }).subscribe( (value) => {
          if (value.ok) {
            this.deletes.emit(true);
          } else {
            this.deletes.emit(false);
          }
        })
      } else {
        this.deletes.emit(false);
      }
    });
  }

  goToEdit(): void {
    this.router.navigateByUrl('/edit/' + this.chain + '/' + this.num);
  }

}
