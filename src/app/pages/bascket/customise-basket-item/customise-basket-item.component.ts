import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ProductOrderModel } from '@app/core/models/order-model';
import { ProductModel } from '@app/core/models/product-model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { BasketService } from '../basket.service';

@Component({
  selector: 'app-customise-basket-item',
  templateUrl: './customise-basket-item.component.html',
  styleUrls: ['./customise-basket-item.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomiseBasketItemComponent implements OnInit {
  @Input() item!: ProductOrderModel<ProductModel>;
  isLoading = false;

  constructor (
    private modal: NzModalRef,
    private _messageSvc: NzMessageService,
    private _basketSvc: BasketService
  ) { }
  ngOnInit(): void {
  }

  destroyModal(): void {
    this.modal.destroy();
  }

  addToBasket(): void {
    this.isLoading = true;

    this._basketSvc.add(this.item).then(
      () => {
        this._messageSvc.success('Item adicionado');
        this.modal.destroy();
      },
      () => {
        this._messageSvc.error('Erro ao adicionar');
      },
    ).finally(() => this.isLoading = false);
  }
}
