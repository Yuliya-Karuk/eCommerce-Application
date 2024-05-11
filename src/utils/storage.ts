import { TokenStore } from '@commercetools/sdk-client-v2';

export class StorageService {
  private storageKey: string = 'sprout_token';

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
}

export const storage = new StorageService();
