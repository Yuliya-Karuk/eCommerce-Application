import {
  ByProjectKeyRequestBuilder,
  ClientResponse,
  createApiBuilderFromCtpClient,
  CustomerDraft,
  CustomerSignInResult,
  Product,
  ProductProjection,
  ProductType,
} from '@commercetools/platform-sdk';
import { Client, ClientBuilder } from '@commercetools/sdk-client-v2';
import { storage } from '@utils/storage';
import {
  anonymousMiddlewareOptions,
  httpMiddlewareOptions,
  passwordAuthMiddlewareOptions,
  refreshAuthMiddlewareOption,
} from './middlewareOptions';
import { tokenController } from './token.service';

const { VITE_CTP_PROJECT_KEY } = import.meta.env;

export class SdkService {
  private clientBuilder: ClientBuilder;
  private client: Client;
  private apiRoot: ByProjectKeyRequestBuilder;

  constructor() {
    this.clientBuilder = new ClientBuilder().withHttpMiddleware(httpMiddlewareOptions);
    if (storage.getTokenStore()) {
      this.createRefreshedClient();
    } else {
      this.createAnonymousClient();
    }
  }

  public createAnonymousClient() {
    this.client = this.clientBuilder.withAnonymousSessionFlow(anonymousMiddlewareOptions).build();

    this.apiRoot = createApiBuilderFromCtpClient(this.client).withProjectKey({
      projectKey: VITE_CTP_PROJECT_KEY,
    });
  }

  private createRefreshedClient() {
    const options = refreshAuthMiddlewareOption;
    options.refreshToken = storage.getTokenStore()?.refreshToken as string;
    this.client = this.clientBuilder.withRefreshTokenFlow(options).build();

    this.apiRoot = createApiBuilderFromCtpClient(this.client).withProjectKey({
      projectKey: VITE_CTP_PROJECT_KEY,
    });
  }

  private createWithPasswordClient(email: string, password: string) {
    const options = passwordAuthMiddlewareOptions;
    options.credentials.user = {
      username: email,
      password,
    };

    this.client = this.clientBuilder.withPasswordFlow(options).build();

    this.apiRoot = createApiBuilderFromCtpClient(this.client).withProjectKey({
      projectKey: VITE_CTP_PROJECT_KEY,
    });
  }

  public async loginUser(email: string, password: string): Promise<ClientResponse<CustomerSignInResult>> {
    this.createWithPasswordClient(email, password);

    tokenController.refresh();

    const result = await this.apiRoot.me().login().post({ body: { email, password } }).execute();
    return result;
  }

  public async register(userData: CustomerDraft): Promise<ClientResponse<CustomerSignInResult>> {
    const result = await this.apiRoot.customers().post({ body: userData }).execute();
    return result;
  }

  public logoutUser() {
    this.createAnonymousClient();
  }

  // удалить потом - пока нужен для формата
  // public async getProducts(): Promise<ProductProjection[]> {
  //   try {
  //     const data = await this.apiRoot
  //       .productProjections()
  //       .search()
  //       .get({
  //         queryArgs: {
  //           filter: [
  //             `productType.id:"94600ee8-025b-4519-a207-1f08fa220837","674a579b-0e25-4cfb-8cc7-b38c539fd609","7eb85544-1840-44ad-9b41-82db77674d06"`,
  //           ],
  //         },
  //       })
  //       .execute();
  //     return data.body.results;
  //   } catch (error) {
  //     throw new Error(CustomErrors.SERVER_ERROR);
  //   }
  // }

  public async getProductsByType(productTypeId: string): Promise<ProductProjection[]> {
    const data = await this.apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: [`productType.id:${productTypeId}`],
        },
      })
      .execute();
    console.log(data.body.results);
    return data.body.results;
  }

  public async getProductsTypes(): Promise<ProductType[]> {
    const data = await this.apiRoot.productTypes().get().execute();
    return data.body.results;
  }

  public async getProduct(productKey: string): Promise<Product> {
    const data = await this.apiRoot.products().withKey({ key: productKey }).get().execute();
    // const data = await this.apiRoot.productProjections().withKey({ key: productKey }).get().execute();
    return data.body;
  }

  public async filterProductsByAttribute() {
    const data = await this.apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          filter: [`variants.attributes.brand.key:"Plantpatio", "Smart Garden"`],
        },
      })
      .execute();
    return data.body;
  }
}

export const sdkService = new SdkService();
