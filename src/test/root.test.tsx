import { describe, expect, it } from 'vitest';

describe('root presence', () => {
  it('root exists on page', () => {
    const rootElement = document.getElementById('root');
    expect(rootElement).toBeDefined();
  });
});
