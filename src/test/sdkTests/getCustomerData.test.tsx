import { sdkService } from '@commercetool/sdk.service';
import { describe, expect, vi } from 'vitest';

describe('Testing sdkService', () => {
  test('getCustomerData should return a Customer', async () => {
    vi.mock('@commercetools/platform-sdk', () => ({
      createApiBuilderFromCtpClient: vi.fn().mockReturnValue({
        withProjectKey: vi.fn().mockReturnValue({
          me: vi.fn().mockReturnValue({
            get: vi.fn().mockReturnValue({
              execute: vi.fn().mockResolvedValue({
                body: {
                  id: '1',
                  version: 10,
                },
              }),
            }),
          }),
        }),
      }),
    }));

    const mockCustomer = {
      id: '1',
      version: 10,
    };

    const customerData = await sdkService.getCustomerData();

    expect(customerData).toEqual(mockCustomer);
  });
});
