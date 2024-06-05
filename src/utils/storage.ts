import { TokenStore } from '@commercetools/sdk-client-v2';

export class StorageService {
  // рефактор надо
  private storageKey: string = 'sprout_token';
  private cartKey: string = 'sprout_cart';

  public setTokenStore(token: TokenStore): void {
    localStorage.setItem(this.storageKey, JSON.stringify(token));
  }

  public getTokenStore(): TokenStore | null {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  public removeTokenStore(): void {
    localStorage.removeItem(this.storageKey);
  }

  public setCartStore(cartId: string): void {
    localStorage.setItem(this.cartKey, JSON.stringify(cartId));
  }

  public getCartStore(): string | null {
    const data = localStorage.getItem(this.cartKey);
    return data ? JSON.parse(data) : null;
  }

  public removeCartStore(): void {
    localStorage.removeItem(this.cartKey);
  }
}

export const storage = new StorageService();
