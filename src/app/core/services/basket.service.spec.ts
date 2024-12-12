import { TestBed } from '@angular/core/testing';
import { BasketService } from './basket.service';

describe('BasketService', () => {
  let service: BasketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
    });
    service = TestBed.inject(BasketService);
    jest.clearAllMocks();
  });

  it('should exist', () => {
    expect(service).toBeDefined();
  });

  describe('addToBasket', () => {
    it('should increase quantity if product is in basket', () => {
      service.basketItems.update(() => ({
        911: {
          //@ts-ignore
          product: {},
          quantity: 1,
        }
      }));

      //@ts-ignore
      service.addToBasket({ sku: 911 });

      expect(service.basketItems()[911].quantity).toEqual(2);
    });

    it('should add product with quantity of 1 if product is not in basket', () => {
      service.basketItems.update(() => ({}));

      //@ts-ignore
      service.addToBasket({ sku: 911 });

      expect(service.basketItems()[911].quantity).toEqual(1);
    });
  });

  describe('removeFromBasket', () => {
    it('should decrease quantity if product is in basket', () => {
      service.basketItems.update(() => ({
        911: {
          //@ts-ignore
          product: {},
          quantity: 2,
        }
      }));

      //@ts-ignore
      service.removeFromBasket({ sku: 911 });

      expect(service.basketItems()[911].quantity).toEqual(1);
    });

    it('should remove product if quantity is 1', () => {
      service.basketItems.update(() => ({
        911: {
          //@ts-ignore
          product: {},
          quantity: 1,
        }
      }));

      //@ts-ignore
      service.removeFromBasket({ sku: 911 });

      expect(service.basketItems()[911]).toBe(undefined);
    });
  });

  describe('removeAll', () => {
    it('should remove product', () => {
      service.basketItems.update(() => ({
        911: {
          //@ts-ignore
          product: {},
          quantity: 3,
        }
      }));

      //@ts-ignore
      service.removeAll({ sku: 911 });

      expect(service.basketItems()[911]).toBe(undefined);
    });
  });

  describe('isInBasket', () => {
    it('should return true if product is in basket', () => {
      service.basketItems.update(() => ({
        911: {
          //@ts-ignore
          product: {},
          quantity: 1,
        }
      }));
      //@ts-ignore
      expect(service.isInBasket({ sku: 911 })).toEqual(true);
    });

    it('should return false if product is in basket', () => {
      service.basketItems.update(() => ({
        911: {
          //@ts-ignore
          product: {},
          quantity: 1,
        }
      }));
      //@ts-ignore
      expect(service.isInBasket({ sku: 900 })).toEqual(false);
    });
  });

  describe('ableToAdd', () => {
    it('should return true if product is not in basket', () => {
      service.basketItems.update(() => ({}));
      //@ts-ignore
      expect(service.ableToAdd({ sku: 911 })).toEqual(true);
    });

    it('should return false if product is at its maximum', () => {
      service.basketItems.update(() => ({
        911: {
          //@ts-ignore
          product: { basketLimit: 3 },
          quantity: 3,
        }
      }));
      //@ts-ignore
      expect(service.ableToAdd({ sku: 911 })).toEqual(false);
    });
  });

  describe('totalPricePerProduct', () => {
    it('should return total price per product', () => {
      service.basketItems.update(() => ({
        911: {
          //@ts-ignore
          product: { price: 1 },
          quantity: 3,
        },
        912: {
          //@ts-ignore
          product: { price: 3 },
          quantity: 1,
        },
      }));
      //@ts-ignore
      expect(service.totalPricePerProduct({ sku: 911 })).toEqual('3.00');
    });
  });

});
