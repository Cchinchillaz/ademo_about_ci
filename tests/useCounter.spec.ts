import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useCounter from '../src/hooks/features/homepage/useCounter';

describe('useCounter', () => {
  it('should initialize with count 0 and val 1', () => {
    const { result } = renderHook(() => useCounter());
    
    expect(result.current.count).toBe(0);
    expect(result.current.val).toBe(1);
  });

  it('should increment count by val when increment is called', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });

  it('should increment count by the current val value', () => {
    const { result } = renderHook(() => useCounter());
    
    // Change val to 5
    act(() => {
      result.current.setVal(5);
    });
    
    // Increment should now add 5 to count
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(5);
    expect(result.current.val).toBe(5);
  });

  it('should increment multiple times correctly', () => {
    const { result } = renderHook(() => useCounter());
    
    // Set val to 3
    act(() => {
      result.current.setVal(3);
    });
    
    // Increment twice
    act(() => {
      result.current.increment();
      result.current.increment();
    });
    
    expect(result.current.count).toBe(6); // 3 + 3 = 6
  });

  it('should allow changing val and reflect in subsequent increments', () => {
    const { result } = renderHook(() => useCounter());
    
    // First increment with default val (1)
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
    
    // Change val to 10
    act(() => {
      result.current.setVal(10);
    });
    
    // Increment again with new val
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(11); // 1 + 10 = 11
    expect(result.current.val).toBe(10);
  });

  it('should handle negative val values', () => {
    const { result } = renderHook(() => useCounter());
    
    // Set val to negative number
    act(() => {
      result.current.setVal(-2);
    });
    
    // Increment (which will actually decrement)
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(-2);
    expect(result.current.val).toBe(-2);
  });
});
