import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { Paquete } from '../../../interfaces/paquete.interface';
import { ICreateOrderRequest, IPayPalConfig, IPurchaseUnit } from 'ngx-paypal';
import { environment } from '../../../../../enviroments/envirement';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../modal/modal.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CartItemModel } from '../../../model/cart-item-models';
import { StoragesService } from '../../../services/storage.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cartItems: CartItemModel[] = []; // Arreglo de modelos CartItemModel
  total = 0;

  public payPalConfig?: IPayPalConfig;
  constructor(
    private messageService: MessageService,
    private modalService: NgbModal,
    private spinner: NgxSpinnerService,
    private storageService: StoragesService,


  ) { }

  ngOnInit(): void {
    if(this.storageService.existsCart()) {
      this.cartItems = this.storageService.getCart();
    }
    this.initConfig();
    this.getItem();
    this.total = this.getTotal();
    this.storageService.setCart(this.cartItems);
  }
  private initConfig(): void {

    this.payPalConfig = {
      currency: 'MXN',
      clientId: environment.clientId,
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{

          amount: {
            currency_code: 'MXN',
            value: this.getTotal().toString(),
            breakdown: {
              item_total: {
                currency_code: 'MXN',
                value: this.getTotal().toString(),
              }
            }
          },
          items: this.getItemsList(),
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        this.spinner.show();
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point',
          JSON.stringify(data));

        // Crear un objeto que cumpla con la interfaz IPurchaseUnit
        const purchaseUnit: IPurchaseUnit = {
            amount: {
                currency_code: data.purchase_units[0].amount.currency_code,
                value: data.purchase_units[0].amount.value,
            },
            items: data.purchase_units[0].items // Asegúrate de que esto sea de tipo ITransactionItem[]
        };

        // Llama a openModal pasando los argumentos individuales
        this.openModal(purchaseUnit.items, purchaseUnit.amount.value); // Pasa items y amount.value
        this.emptyCart();
        this.spinner.hide();
    }

    ,
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);

      },
      onError: err => {
        console.log('OnError', err);

      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);

      }
    };
  }

  getItem(): void {
    this.messageService.getMessage().subscribe((paquete: Paquete) => {
      let exists = false;
      this.cartItems.forEach((item) => {
        if (item.paqueteId === paquete.id) {
          exists = true;
          item.qty++;
        }
      });
      if (!exists) {
        const cartItem = new CartItemModel(paquete);
        this.cartItems.push(cartItem);
      }
      this.total = this.getTotal();
      this.storageService.setCart(this.cartItems);
    });
  }
  getItemsList(): any[]{
    const items: any[] = [];
    let item = {};
    this.cartItems.forEach((it: CartItemModel) => {
      item = {
        id: it.paqueteId,
        name: it.paqueteNombre,
        quantity: it.qty,
        unit_amount: {value: it.paqueteCosto, currency_code: 'MXN'}
      };
      items.push(item);
    });
    return items;
  }
  getTotal(): number {
    let total = 0;
    this.cartItems.forEach((item) => {
      total += item.paqueteCosto * item.qty;
    });
    return +total.toFixed(2);
  }

  emptyCart(): void {
    this.cartItems = [];
    this.total = 0;
    this.storageService.clear();
  }

  deleteItem(i: number): void {
    if (this.cartItems[i].qty > 1) {
      this.cartItems[i].qty--;
    } else {
      this.cartItems.splice(i, 1);
    }
    this.total = this.getTotal();
    this.storageService.setCart(this.cartItems);
  }


  openModal(items: any, amount: string): void {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.items = items;
    modalRef.componentInstance.amount = amount;
}
formatCurrency(amount: number): string {
  return amount.toLocaleString('es-MX', {
    style: 'currency',
    currency: 'MXN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}



}
