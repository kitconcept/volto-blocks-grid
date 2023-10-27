import { renderHook } from '@testing-library/react-hooks';
import { fireEvent } from '@testing-library/dom';
import useOutsideClick from './useOutsideClick';

describe('useOutsideClick', () => {
  it('should call callback when mousedown event is triggered outside of ref', () => {
    const ref = { current: document.createElement('div') };
    const callback = jest.fn();
    renderHook(() => useOutsideClick(ref, callback));

    fireEvent.mouseDown(document.body);

    expect(callback).toHaveBeenCalled();
  });

  it('should not call callback when mousedown event is triggered inside of ref', () => {
    const ref = { current: document.createElement('div') };
    const callback = jest.fn();
    renderHook(() => useOutsideClick(ref, callback));

    fireEvent.mouseDown(ref.current);

    expect(callback).not.toHaveBeenCalled();
  });

  it('should not call callback when mousedown event is triggered inside of ref', () => {
    const elem = document.createElement('div');
    document.body.appendChild(elem);

    const ref = { current: document.body };
    const callback = jest.fn();
    renderHook(() => useOutsideClick(ref, callback));

    fireEvent.mouseDown(elem);

    expect(callback).not.toHaveBeenCalled();
  });
});
