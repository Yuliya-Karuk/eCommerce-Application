import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

export class TokenCacheController implements TokenCache {
  private token: TokenStore = {
    token: '',
    expirationTime: 0,
    refreshToken: '',
  };

  public set(cache: TokenStore): void {
    this.token = cache;
  }

  public get(): TokenStore {
    return this.token;
  }

  public refresh(): void {
    this.token = {
      token: '',
      expirationTime: 0,
      refreshToken: '',
    };
  }
}

export const tokenController = new TokenCacheController();
