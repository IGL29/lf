import { TestBed } from '@angular/core/testing';

import { StoreService } from './store.service';
import { Store } from '@ngrx/store';
import { mockStore } from '__tests__/mocks/store/Store';
import { getMockProduct } from '__tests__/mocks/data/product';
import { of } from 'rxjs';
import { mockProductsStore } from '__tests__/mocks/store/productsStore';
import { productsStore } from 'src/app/store/products';
import { productStore } from '~pages/product/store/product';
import { commentsStore } from '~pages/product/store/comments';
import { getMockReview } from '__tests__/mocks/data/review';
import { cartStore } from 'src/app/store/cart';
import { feedbackStore } from 'src/app/store/feedback';
import { orderStore } from 'src/app/store/order';
import { corporateStore } from 'src/app/store/corporate';
import { getMockNotify } from '__tests__/mocks/data/notify';
import { notificationsStore } from 'src/app/store/notifications';
import { mockNotificationsStore } from '__tests__/mocks/store/notificationsStore';
import { mockOrderStore } from '__tests__/mocks/store/orderStore';
import { mockCorporateStore } from '__tests__/mocks/store/corporateStore';
import { mockCartStore } from '__tests__/mocks/store/cartStore';
import { mockCommentStore } from '__tests__/mocks/store/commentsStore';
import { mockProductStore } from '__tests__/mocks/store/productStore';
import { mockAppStore } from '__tests__/mocks/store/appStore';
import { mockFeedbackStore } from '__tests__/mocks/store/feedbackStore';
import { IFeedbackData } from '~components/feedback-form/types';
import { INewReview } from '~components/review-form/types';
import { DeleteFromCartRequestPayload } from '~types/apiPayloads';
import { ICartItem } from '../cart-storage/cart-storage.service';
import { ICorporateUser } from '~pages/corporate-clients/component/types';
import { getMockCorporateUser } from '__tests__/mocks/data/corporate';
import { IOrderData } from '~pages/order/component/types';
import { getMockOrderUser } from '__tests__/mocks/data/order';

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StoreService,
        {
          provide: Store,
          useValue: mockStore
        }
      ]
    });
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be return stream with products', () => {
    const products = [getMockProduct({ id: 1 }), getMockProduct({ id: 2 })];
    const productsStream$ = of(products);
    mockStore.select.and.returnValue(productsStream$);
    expect(service.getProducts()).toEqual(productsStream$);
  });

  it('should be store.select with correctly selector', () => {
    service.getProducts();
    expect(mockStore.select).toHaveBeenCalledWith(productsStore.productsAllSelector);
  });

  it('should be return stream with state loading', () => {
    const isLoadingStream$ = of(true);
    mockStore.select.and.returnValue(isLoadingStream$);
    expect(service.productsIsLoading()).toEqual(isLoadingStream$);
  });

  it('should be store.select with correctly selector', () => {
    service.productsIsLoading();
    expect(mockStore.select).toHaveBeenCalledWith(productsStore.productsLoadingSelector);
  });

  it('should be return stream with state error', () => {
    const isErrorStream$ = of(true);
    mockStore.select.and.returnValue(isErrorStream$);
    expect(service.productsError()).toEqual(isErrorStream$);
  });

  it('should be store.select with correctly selector', () => {
    service.productsError();
    expect(mockStore.select).toHaveBeenCalledWith(productsStore.productsErrorSelector);
  });

  it('should be return stream with product', () => {
    const productStream$ = of(getMockProduct());
    mockStore.select.and.returnValue(productStream$);
    expect(service.getProduct()).toEqual(productStream$);
  });

  it('should be store.select with correctly selector', () => {
    service.getProduct();
    expect(mockStore.select).toHaveBeenCalledWith(productStore.productSelector);
  });

  it('should be return stream with state product error', () => {
    const errorStream$ = of(true);
    mockStore.select.and.returnValue(errorStream$);
    expect(service.getProduct()).toEqual(errorStream$);
  });

  it('should be store.select with correctly selector', () => {
    service.getProductError();
    expect(mockStore.select).toHaveBeenCalledWith(productStore.productErrorSelector);
  });

  it('should be return stream with state product loading', () => {
    const loadingStream$ = of(true);
    mockStore.select.and.returnValue(loadingStream$);
    expect(service.productIsLoading()).toEqual(loadingStream$);
  });

  it('should be store.select with correctly selector', () => {
    service.productIsLoading();
    expect(mockStore.select).toHaveBeenCalledWith(productStore.productLoadingSelector);
  });

  it('should be return stream with comments', () => {
    const reviewsStream$ = of(getMockReview(), getMockReview());
    mockStore.select.and.returnValue(reviewsStream$);
    expect(service.getComments()).toEqual(reviewsStream$);
  });

  it('should be store.select with correctly selector', () => {
    service.getComments();
    expect(mockStore.select).toHaveBeenCalledWith(commentsStore.commentsSelector);
  });

  it('should be return stream with state comments error', () => {
    const errorStream$ = of(true);
    mockStore.select.and.returnValue(errorStream$);
    expect(service.getCommentsError()).toEqual(errorStream$);
  });

  it('should be store.select with correctly selector', () => {
    service.getCommentsError();
    expect(mockStore.select).toHaveBeenCalledWith(commentsStore.commentsErrorSelector);
  });

  it('should be return stream with state comments loading', () => {
    const loadingStream$ = of(true);
    mockStore.select.and.returnValue(loadingStream$);
    expect(service.commentsIsLoading()).toEqual(loadingStream$);
  });

  it('should be store.select with correctly selector', () => {
    service.commentsIsLoading();
    expect(mockStore.select).toHaveBeenCalledWith(commentsStore.commentsLoadingSelector);
  });

  it('should be return stream with state comment loading', () => {
    const loadingStream$ = of(true);
    mockStore.select.and.returnValue(loadingStream$);
    expect(service.commentIsLoading()).toEqual(loadingStream$);
  });

  it('should be store.select with correctly selector', () => {
    service.commentIsLoading();
    expect(mockStore.select).toHaveBeenCalledWith(commentsStore.commentLoadingSelector);
  });

  it('should be return stream with state comment error', () => {
    const loadingStream$ = of(true);
    mockStore.select.and.returnValue(loadingStream$);
    expect(service.commentError()).toEqual(loadingStream$);
  });

  it('should be store.select with correctly selector', () => {
    service.commentError();
    expect(mockStore.select).toHaveBeenCalledWith(commentsStore.commentErrorSelector);
  });

  it('should be return stream with cart', () => {
    const cartStream$ = of([{ count: 5, product: getMockProduct() }]);
    mockStore.select.and.returnValue(cartStream$);
    expect(service.getCart()).toEqual(cartStream$);
  });

  it('should be store.select with correctly selector', () => {
    service.getCart();
    expect(mockStore.select).toHaveBeenCalledWith(cartStore.inCartSelector);
  });

  it('should be return stream with cart price', () => {
    const cartPriceStream$ = of(1000);
    mockStore.select.and.returnValue(cartPriceStream$);
    expect(service.getCartPrice()).toEqual(cartPriceStream$);
  });

  it('should be store.select with correctly selector', () => {
    service.getCartPrice();
    expect(mockStore.select).toHaveBeenCalledWith(cartStore.cartPriceSelector);
  });

  it('should be return stream with cart discount', () => {
    const cartDiscountStream$ = of(1000);
    mockStore.select.and.returnValue(cartDiscountStream$);
    expect(service.getCartDiscount()).toEqual(cartDiscountStream$);
  });

  it('should be store.select with correctly selector', () => {
    service.getCartDiscount();
    expect(mockStore.select).toHaveBeenCalledWith(cartStore.cartDiscountSelector);
  });

  it('should be return stream with cart discount', () => {
    const cartCountStream$ = of(20);
    mockStore.select.and.returnValue(cartCountStream$);
    expect(service.getCountInCart()).toEqual(cartCountStream$);
  });

  it('should be store.select with correctly selector', () => {
    service.getCountInCart();
    expect(mockStore.select).toHaveBeenCalledWith(cartStore.countInCartSelector);
  });

  it('should be return stream with state loading', () => {
    const loadingStream$ = of(true);
    mockStore.select.and.returnValue(loadingStream$);
    expect(service.cartIsLoading()).toEqual(loadingStream$);
  });

  it('should be store.select with correctly selector', () => {
    service.cartIsLoading();
    expect(mockStore.select).toHaveBeenCalledWith(cartStore.cartLoadingSelector);
  });

  it('should be return stream with state error', () => {
    const errorStream$ = of(true);
    mockStore.select.and.returnValue(errorStream$);
    expect(service.cartError()).toEqual(errorStream$);
  });

  it('should be store.select with correctly selector', () => {
    service.cartError();
    expect(mockStore.select).toHaveBeenCalledWith(cartStore.cartErrorSelector);
  });

  it('should be return stream with state loading', () => {
    const loadingStream$ = of(true);
    mockStore.select.and.returnValue(loadingStream$);
    expect(service.cartPostingLoading()).toEqual(loadingStream$);
  });

  it('should be store.select with correctly selector', () => {
    service.cartPostingLoading();
    expect(mockStore.select).toHaveBeenCalledWith(cartStore.cartPostLoadingSelector);
  });

  it('should be return stream with state loading', () => {
    const loadingStream$ = of(true);
    mockStore.select.and.returnValue(loadingStream$);
    expect(service.feedbackIsLoading()).toEqual(loadingStream$);
  });

  it('should be store.select with correctly selector', () => {
    service.feedbackIsLoading();
    expect(mockStore.select).toHaveBeenCalledWith(feedbackStore.feedbackLoadingSelector);
  });

  it('should be return stream with state loading', () => {
    const loadingStream$ = of(true);
    mockStore.select.and.returnValue(loadingStream$);
    expect(service.orderLoading()).toEqual(loadingStream$);
  });

  it('should be store.select with correctly selector', () => {
    service.orderLoading();
    expect(mockStore.select).toHaveBeenCalledWith(orderStore.orderLoadingSelector);
  });

  it('should be return stream with state loading', () => {
    const loadingStream$ = of(true);
    mockStore.select.and.returnValue(loadingStream$);
    expect(service.corporateLoading()).toEqual(loadingStream$);
  });

  it('should be store.select with correctly selector', () => {
    service.corporateLoading();
    expect(mockStore.select).toHaveBeenCalledWith(corporateStore.requestLoadingSelector);
  });

  it('should be return stream with notifications', () => {
    const notificationsStream$ = of([getMockNotify(), getMockNotify()]);
    mockStore.select.and.returnValue(notificationsStream$);
    expect(service.getNotifications()).toEqual(notificationsStream$);
  });

  it('should be store.select with correctly selector', () => {
    service.getNotifications();
    expect(mockStore.select).toHaveBeenCalledWith(notificationsStore.notificationsListSelector);
  });

  it('should be store.dispatch with correctly action', () => {
    service['notificationsStore'] = mockNotificationsStore;
    mockNotificationsStore.removeAction.and.returnValue({ type: 'some type', id: 5 });
    service.dispatchRemoveNotify('5');
    expect(mockStore.dispatch).toHaveBeenCalledWith({ type: 'some type', id: 5 });
  });

  it('should be store.dispatch with correctly action', () => {
    service['notificationsStore'] = mockNotificationsStore;
    mockNotificationsStore.removeAllAction.and.returnValue({ type: 'remove all' });
    service.dispatchRemoveNotifyAll();
    expect(mockStore.dispatch).toHaveBeenCalledWith({ type: 'remove all' });
  });

  it('should be store.dispatch with correctly action', () => {
    const mockAction: IOrderData = {
      delivery: { method: 'courier', time: '1040' },
      payment: 'card',
      user: getMockOrderUser()
    };
    service['orderStore'] = mockOrderStore;
    mockOrderStore.requestAction.and.returnValue(mockAction);
    service.dispatchOrder(mockAction);
    expect(mockStore.dispatch).toHaveBeenCalledWith(mockAction);
  });

  it('should be store.dispatch with correctly action', () => {
    const corporateData: ICorporateUser = getMockCorporateUser();
    service['corporateStore'] = mockCorporateStore;
    mockCorporateStore.requestAction.and.returnValue(corporateData);
    service.dispatchCorporateClients(corporateData);
    expect(mockStore.dispatch).toHaveBeenCalledWith(corporateData);
  });

  it('should be store.dispatch with correctly action', () => {
    const payload = { count: 1, id: 1 };
    service['cartStore'] = mockCartStore;
    mockCartStore.postChangeCountAction.and.returnValue(payload);
    service.dispatchChangeProductCount(payload);
    expect(mockStore.dispatch).toHaveBeenCalledWith(payload);
  });

  it('should be store.dispatch with correctly action', () => {
    const cartItem: ICartItem = { count: 1, product: getMockProduct() };
    service['cartStore'] = mockCartStore;
    mockCartStore.postProductAction.and.returnValue(cartItem);
    service.dispatchPostToCart(cartItem);
    expect(mockStore.dispatch).toHaveBeenCalledWith(cartItem);
  });

  it('should be store.dispatch with correctly action', () => {
    service['cartStore'] = mockCartStore;
    service.dispatchClearCart();
    expect(mockStore.dispatch).toHaveBeenCalled();
    expect(mockCartStore.clearAllAction).toHaveBeenCalled();
  });

  it('should be store.dispatch with correctly action', () => {
    service['cartStore'] = mockCartStore;
    service.dispatchRequestCart();
    expect(mockStore.dispatch).toHaveBeenCalled();
    expect(mockCartStore.requestAction).toHaveBeenCalled();
  });

  it('should be store.dispatch with correctly action', () => {
    const productId: DeleteFromCartRequestPayload = { id: 1 };
    service['cartStore'] = mockCartStore;
    mockCartStore.deleteProductAction.and.returnValue(productId);
    service.dispatchDeleteFromCart(productId);
    expect(mockStore.dispatch).toHaveBeenCalledWith(productId);
  });

  it('should be store.dispatch with correctly action', () => {
    const productId = 1;
    service['commentsStore'] = mockCommentStore;
    mockCommentStore.requestAction.and.returnValue(productId);
    service.dispatchRequestComments(productId);
    expect(mockStore.dispatch).toHaveBeenCalledWith(productId);
  });

  it('should be store.dispatch with correctly action', () => {
    const commentData: INewReview = {
      author: 'author name',
      comment: 'message',
      email: 'example@text.com',
      rating: 5
    };
    service['commentsStore'] = mockCommentStore;
    mockCommentStore.postAction.and.returnValue(commentData);
    service.dispatchPostComment(commentData);
    expect(mockStore.dispatch).toHaveBeenCalledWith(commentData);
  });

  it('should be store.dispatch with correctly action', () => {
    const products = [getMockProduct()];
    service['productsStore'] = mockProductsStore;
    mockProductsStore.requestAction.and.returnValue(products);
    service.dispatchRequestProducts();
    expect(mockStore.dispatch).toHaveBeenCalledWith(products);
  });

  it('should be store.dispatch with correctly action', () => {
    const productId = 5;
    service['productStore'] = mockProductStore;
    mockProductStore.requestAction.and.returnValue(productId);
    service.dispatchRequestProduct(productId);
    expect(mockStore.dispatch).toHaveBeenCalledWith(productId);
  });

  it('should be store.dispatch with correctly action', () => {
    const action = { type: 'start' };
    service['appStore'] = mockAppStore;
    mockAppStore.startedAction.and.returnValue(action);
    service.dispatchStartAction();
    expect(mockStore.dispatch).toHaveBeenCalledWith(action);
  });

  it('should be store.dispatch with correctly action', () => {
    const feedbackData: IFeedbackData = {
      comment: 'cool store',
      name: 'some name',
      phone: '+7456465465'
    };
    service['feedbackStore'] = mockFeedbackStore;
    mockFeedbackStore.requestAction.and.returnValue(feedbackData);
    service.dispatchPostFeedback(feedbackData);
    expect(mockStore.dispatch).toHaveBeenCalledWith(feedbackData);
  });
});
