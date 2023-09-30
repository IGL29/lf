import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { appStore } from 'src/app/store/app';
import { cartStore } from 'src/app/store/cart';
import { IState } from 'src/app/store/cart/cart.reducer';
import { corporateStore } from 'src/app/store/corporate';
import { feedbackStore } from 'src/app/store/feedback';
import { notificationsStore } from 'src/app/store/notifications';
import { INotifyWithId } from 'src/app/store/notifications/notifications.reducer';
import { orderStore } from 'src/app/store/order';
import { productsStore } from 'src/app/store/products';
import { IRootState } from 'src/app/store/root.reducer';
import { commentsStore } from '~pages/product/store/comments';
import { productStore } from '~pages/product/store/product';
import {
  ChangeCountRequestPayload,
  CommentRequestPayload,
  CorporateClientsRequestPayload,
  DeleteFromCartRequestPayload,
  FeedbackRequestPayload,
  OrderRequestPayload,
  PostToCartRequestPayload
} from '~types/apiPayloads';
import { IProduct } from '~types/product';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private notificationsStore = notificationsStore;
  private orderStore = orderStore;
  private corporateStore = corporateStore;
  private cartStore = cartStore;
  private commentsStore = commentsStore;
  private productsStore = productsStore;
  private productStore = productStore;
  private appStore = appStore;
  private feedbackStore = feedbackStore;

  constructor(private store: Store<IRootState>) {}

  public getProducts(): Observable<productsStore.IState['products']> {
    return this.store.select(productsStore.productsAllSelector);
  }

  public productsIsLoading(): Observable<productsStore.IState['isLoading']> {
    return this.store.select(productsStore.productsLoadingSelector);
  }

  public productsError(): Observable<productsStore.IState['error']> {
    return this.store.select(productsStore.productsErrorSelector);
  }

  public getProduct(): Observable<productStore.IState['product']> {
    return this.store.select(productStore.productSelector);
  }

  public getProductError(): Observable<productStore.IState['error']> {
    return this.store.select(productStore.productErrorSelector);
  }

  public productIsLoading(): Observable<productStore.IState['isLoading']> {
    return this.store.select(productStore.productLoadingSelector);
  }

  public isHydrateProduct(): Observable<productStore.IState['isHydrateSuccess']> {
    return this.store.select(productStore.productIsHydrateSelector);
  }

  public isHydrateProducts(): Observable<productStore.IState['isHydrateSuccess']> {
    return this.store.select(productsStore.productsIsHydrateSelector);
  }

  public getComments(): Observable<commentsStore.IState['comments']> {
    return this.store.select(commentsStore.commentsSelector);
  }

  public getCommentsError(): Observable<commentsStore.IState['error']> {
    return this.store.select(commentsStore.commentsErrorSelector);
  }

  public commentsIsLoading(): Observable<commentsStore.IState['isLoading']> {
    return this.store.select(commentsStore.commentsLoadingSelector);
  }

  public commentIsLoading(): Observable<commentsStore.IState['postIsLoading']> {
    return this.store.select(commentsStore.commentLoadingSelector);
  }

  public commentError(): Observable<commentsStore.IState['error']> {
    return this.store.select(commentsStore.commentErrorSelector);
  }

  public getCart(): Observable<cartStore.IState['inCart']> {
    return this.store.select(cartStore.inCartSelector);
  }

  public getCartPrice(): Observable<number> {
    return this.store.select(cartStore.cartPriceSelector);
  }

  public getCartDiscount(): Observable<number> {
    return this.store.select(cartStore.cartDiscountSelector);
  }

  public getCountInCart(): Observable<number> {
    return this.store.select(cartStore.countInCartSelector);
  }

  public cartIsLoading(): Observable<IState['isLoading']> {
    return this.store.select(cartStore.cartLoadingSelector);
  }

  public cartError(): Observable<IState['error']> {
    return this.store.select(cartStore.cartErrorSelector);
  }

  public cartPostingLoading(): Observable<IState['isPostLoading']> {
    return this.store.select(cartStore.cartPostLoadingSelector);
  }

  public feedbackIsLoading(): Observable<feedbackStore.IState['isLoading']> {
    return this.store.select(feedbackStore.feedbackLoadingSelector);
  }

  public orderLoading(): Observable<orderStore.IState['isLoading']> {
    return this.store.select(orderStore.orderLoadingSelector);
  }

  public corporateLoading(): Observable<orderStore.IState['isLoading']> {
    return this.store.select(corporateStore.requestLoadingSelector);
  }

  public getNotifications(): Observable<notificationsStore.IState['list']> {
    return this.store.select(this.notificationsStore.notificationsListSelector);
  }

  public getRootStore(): Store<IRootState> {
    return this.store;
  }

  public dispatchRemoveNotify(id: INotifyWithId['id']): void {
    this.store.dispatch(this.notificationsStore.removeAction({ id }));
  }

  public dispatchRemoveNotifyAll(): void {
    this.store.dispatch(this.notificationsStore.removeAllAction());
  }

  public dispatchOrder(orderData: OrderRequestPayload): void {
    this.store.dispatch(this.orderStore.requestAction(orderData));
  }

  public dispatchCorporateClients(data: CorporateClientsRequestPayload): void {
    this.store.dispatch(this.corporateStore.requestAction(data));
  }

  public dispatchChangeProductCount(payload: ChangeCountRequestPayload): void {
    this.store.dispatch(this.cartStore.postChangeCountAction(payload));
  }

  public dispatchPostToCart(cartItem: PostToCartRequestPayload): void {
    this.store.dispatch(this.cartStore.postProductAction(cartItem));
  }

  public dispatchClearCart(): void {
    this.store.dispatch(this.cartStore.clearAllAction());
  }

  public dispatchRequestCart(): void {
    this.store.dispatch(this.cartStore.requestAction());
  }

  public dispatchDeleteFromCart(id: DeleteFromCartRequestPayload): void {
    this.store.dispatch(this.cartStore.deleteProductAction(id));
  }

  public dispatchRequestComments(id: IProduct['id']): void {
    this.store.dispatch(this.commentsStore.requestAction({ id }));
  }

  public dispatchPostComment(data: CommentRequestPayload): void {
    this.store.dispatch(this.commentsStore.postAction({ data }));
  }

  public dispatchRequestProducts(): void {
    this.store.dispatch(this.productsStore.requestAction());
  }

  public dispatchRequestProduct(id: IProduct['id']): void {
    this.store.dispatch(this.productStore.requestAction({ id }));
  }

  public dispatchStartAction(): void {
    this.store.dispatch(this.appStore.startedAction());
  }

  public dispatchPostFeedback(data: FeedbackRequestPayload): void {
    this.store.dispatch(this.feedbackStore.requestAction(data));
  }
}
