import { Attribute } from '@commercetools/platform-sdk';
import { ProductAttributes } from '@components/ProductAttributes/ProductAttributesView';

export function isNotNullable<T>(value: T): NonNullable<T> {
  if (value === undefined || value === null) {
    throw new Error(`Not expected value`);
  }
  return value;
}

export function convertCentsToDollarsString(num: number, fractionDigits = 2): string {
  const divisor = 10 ** fractionDigits;
  const result = num / divisor;

  return result.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  });
}

interface KeyValue {
  key: string;
  label: string;
}

export interface MyAttribute {
  name: keyof ProductAttributes;
  value: string[] | KeyValue[];
}

export function convertProductAttributesArrayToObject(attributesArray: Attribute[] | undefined): ProductAttributes {
  if (attributesArray === undefined) {
    throw new Error('error: attributes array is undefined');
  }
  const result: ProductAttributes = {
    details: '',
  };
  attributesArray.forEach(item => {
    const { name, value } = item as MyAttribute;
    const [firstValue] = value;
    if (typeof firstValue === 'string') {
      result[name] = firstValue;
    } else {
      result[name] = firstValue.label;
    }
  });
  return result;
}
