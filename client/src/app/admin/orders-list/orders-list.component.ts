import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../core/services/orderService/order.service';
import {Order} from '../../core/model/order';
import {MatDialog} from '@angular/material/dialog';
import {OrderAcceptationStatusDialogComponent} from '../order-acceptation-status-dialog/order-acceptation-status-dialog.component';
import {User} from '../../core/model/user';
import {OrderProductsService} from '../../core/services/orderProductsService/order-products.service';
import {OrderProduct} from '../../core/model/orderProduct';
import {UserService} from '../../core/services/userService/user.service';
import { Result } from 'postcss';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss']
})
export class OrdersListComponent implements OnInit {

  ordersList: Order[];
  deliveryTimeInMinutes = 0;
  selectedOrder: Order[];
  user: User;
  products: OrderProduct[];
  displayedColumns: string[] = [ 'name', 'quantity', 'price'];

  constructor(private orderService: OrderService, private dialog: MatDialog, private orderProductsService: OrderProductsService, private userService: UserService) {
  }
  ngOnInit(): void {
    this.getSortOrders();

  }
  accept(order): void{
    this.dialog.open(OrderAcceptationStatusDialogComponent,
      {data: {deliveryTimeInMinutes: this.deliveryTimeInMinutes}
      }).afterClosed().subscribe(result => {
        this.deliveryTimeInMinutes = result;

        if (this.deliveryTimeInMinutes > 0){
          order.deliveryDate = new Date();
          order.deliveryDate.setMinutes(order.deliveryDate.getMinutes() + this.deliveryTimeInMinutes);
          this.orderService.updateOrder(order.id, order);
        }
    });
  }
  reject(order: Order): void{
    order.totalPrice = 0;
    this.orderService.updateOrder(order.id, order);
  }

    getSortOrders(){
    this.orderService.findOrders().subscribe(data => this.ordersList = data.sort((a, b) => +new Date(b.date) - +new Date(a.date)));
  }
  onNgModelChange(event){
    this.selectedOrder = event;
    //console.log(this.selectedOrder[0]);
    this.userService.getUserById(1)
    .pipe(switchMap(user => {
        this.user = user;
        return this.orderService.findOrdersByUserId(this.user.id);
    }))
    .subscribe(orders => this.ordersList = orders);
    //console.log(this.selectedOrder[0]);
   }
}
