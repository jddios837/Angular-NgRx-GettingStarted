import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable, Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import { getCurrentProduct, getError, getProducts, getShowProductCode, State } from '../state/product.reducer';
import * as ProductActions from '../state/product.actions';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  // errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  products$: Observable<Product[]>;
  selectedProduct$: Observable<Product>;
  displayCode$: Observable<boolean>;
  errorMessage$: Observable<string>;
  // sub: Subscription;

  constructor(private store: Store<State>) { }
  // private productService: ProductService) { }

  ngOnInit(): void {
    // this.sub = this.productService.selectedProductChanges$.subscribe(
    //   currentProduct => this.selectedProduct = currentProduct
    // );
    // TODO: Unsubscribe
    // this.store.select(getCurrentProduct).subscribe(
    //   currentProduct => this.selectedProduct = currentProduct
    // );

    // this.productService.getProducts().subscribe({
    //   next: (products: Product[]) => this.products = products,
    //   error: err => this.errorMessage = err
    // });

    this.products$ = this.store.select(getProducts);

    this.errorMessage$ = this.store.select(getError);

    this.store.dispatch(ProductActions.loadProducts());

    this.selectedProduct$ = this.store.select(getCurrentProduct)

    this.displayCode$ = this.store.select(getShowProductCode)
    // TODO: Unsubscribe
    // this.store.select(getShowProductCode).subscribe(
    //   showProductCode => this.displayCode = showProductCode
    // );
    // this.store.select('products').subscribe(
    //   products => this.displayCode = products.showProductCode
    //   // if (products) {
    //   //   console.log('Store products');

    //   //   this.displayCode = products.showProductCode;
    //   // }

    // )
  }

  ngOnDestroy(): void {
    // this.sub.unsubscribe();
  }

  checkChanged(): void {
    // this.displayCode = !this.displayCode;
    // this.store.dispatch(
    //   { type: '[Product] Toggle Product Code' }
    // );
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  newProduct(): void {
    // this.productService.changeSelectedProduct(this.productService.newProduct());
    this.store.dispatch(ProductActions.initializeCurrentProduct());
  }

  productSelected(product: Product): void {
    // this.productService.changeSelectedProduct(product);
    this.store.dispatch(ProductActions.setCurrentProduct({ currentProductId: product.id }));
  }

}
