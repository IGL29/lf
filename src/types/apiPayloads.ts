import { ICorporateUser } from '~pages/corporate-clients/component/types';
import { IOrderData } from '~pages/order/component/types';
import { IProduct } from './product';
import { Cart, ICartItem } from 'src/app/services/cart-storage/cart-storage.service';
import { INewReview } from '~components/review-form/types';
import { IFeedbackData } from '~components/feedback-form/types';

export type ErrorPayload = { error: string };
export type SuccessPayload = { data: 'success' };

export type CorporateClientsRequestPayload = ICorporateUser;

export type CartResponsePayload = { inCart: Cart };

export type PostToCartRequestPayload = ICartItem;
export type PostToCartResponsePayload = { inCart: Cart };

export type ChangeCountRequestPayload = { id: number; count: number };
export type ChangeCountResponsePayload = { inCart: Cart };

export type DeleteFromCartRequestPayload = { id: IProduct['id'] };
export type DeleteFromCartResponsePayload = { inCart: Cart };

export type ClearCartResponsePayload = { inCart: Cart };

export type OrderRequestPayload = IOrderData;
export type OrderResponsePayload = { id: string };

export type FeedbackRequestPayload = IFeedbackData;

export type CommentRequestPayload = INewReview;
