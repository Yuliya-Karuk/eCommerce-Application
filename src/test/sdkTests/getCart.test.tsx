import { sdkService } from '@commercetool/sdk.service';
import { describe, expect, vi } from 'vitest';

describe('Testing sdkService', () => {
  test('getCart should return a Cart', async () => {
    vi.mock('@commercetools/platform-sdk', () => ({
      createApiBuilderFromCtpClient: vi.fn().mockReturnValue({
        withProjectKey: vi.fn().mockReturnValue({
          me: vi.fn().mockReturnValue({
            carts: vi.fn().mockReturnValue({
              post: vi.fn().mockReturnValue({
                execute: vi.fn().mockResolvedValue({
                  body: {
                    id: '1',
                    currency: 'USD',
                    version: 10,
                  },
                }),
              }),
            }),
          }),
        }),
      }),
    }));

    const mockCart = {
      id: '1',
      currency: 'USD',
      version: 10,
    };

    const cart = await sdkService.createCart();

    expect(cart).toEqual(mockCart);
  });
});
