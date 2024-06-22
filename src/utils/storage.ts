import { TokenStore } from '@commercetools/sdk-client-v2';
import { CartStorage } from '@models/index';

export class StorageService {
  private storageKey: string = 'sprout_token';
  private cartKey: string = 'sprout_cart';
  private anonKey: string = 'sprout_anon_id';

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

  public setCartStore(cartId: string, anonymousId: string): void {
    localStorage.setItem(
      this.cartKey,
      JSON.stringify({
        cartId,
        anonymousId,
      })
    );
  }

  public getCartStore(): CartStorage | null {
    const data = localStorage.getItem(this.cartKey);
    return data ? JSON.parse(data) : null;
  }

  public removeCartStore(): void {
    localStorage.removeItem(this.cartKey);
  }

  public setAnonId(anonymousId: string): void {
    localStorage.setItem(this.anonKey, JSON.stringify(anonymousId));
  }

  public getAnonId(): string | null {
    const data = localStorage.getItem(this.anonKey);
    return data ? JSON.parse(data) : null;
  }
}

export const storage = new StorageService();
