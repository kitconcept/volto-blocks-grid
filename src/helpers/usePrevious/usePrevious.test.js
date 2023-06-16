import { renderHook } from '@testing-library/react-hooks';
import usePrevious from './usePrevious';

describe('usePrevious', () => {
  it('should return the previous value', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 1 },
    });

    expect(result.current).toBeUndefined();

    rerender({ value: 2 });

    expect(result.current).toBe(1);
  });
});
