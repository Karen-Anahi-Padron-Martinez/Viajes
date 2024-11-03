import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: ``
})
export class ModalComponent implements OnInit {
  @Input() amount: any;
  @Input() items: any;
Crosss: any;
item: any;

  constructor(
    public activeModal: NgbActiveModal
  ) { }
  ngOnInit(): void {

  }

}
