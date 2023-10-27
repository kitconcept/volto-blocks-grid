import { renderHook, act } from '@testing-library/react-hooks';
import useDimensions from './useDimensions';

describe('useDimensions', () => {
  beforeEach(() => {
    global.window.addEventListener = jest.fn();
    global.window.removeEventListener = jest.fn();
    global.window.requestAnimationFrame = jest.fn((cb) => cb());
  });

  it('should call requestAnimationFrame when the ref is set', () => {
    const { result } = renderHook(() => useDimensions());

    act(() => {
      result.current[0]({ getBoundingClientRect: () => ({}) });
    });

    expect(global.window.requestAnimationFrame).toHaveBeenCalledTimes(1);
  });

  it('should return the correct dimensions', () => {
    const { result } = renderHook(() => useDimensions());

    act(() => {
      result.current[0]({
        getBoundingClientRect: () => ({
          width: 500,
          height: 500,
          top: 50,
          left: 50,
          x: 50,
          y: 50,
          right: 550,
          bottom: 550,
        }),
      });
    });

    expect(result.current[1]).toEqual({
      width: 500,
      height: 500,
      top: 50,
      left: 50,
      x: 50,
      y: 50,
      right: 550,
      bottom: 550,
    });
  });
});
