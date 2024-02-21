import { useState, useEffect, useCallback } from "react";

type AsyncFunction<T> = () => Promise<T>;

interface UseAsyncFunctionResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

const useAsyncFunction = <T>(
  asyncFunction: AsyncFunction<T>
): UseAsyncFunctionResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // The execute function now directly depends on asyncFunction and its dependencies
  const execute = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await asyncFunction();
      setData(response);
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [asyncFunction]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      execute();
    }

    return () => {
      isMounted = false;
    };
  }, [execute]);

  return { data, isLoading, error };
};

export default useAsyncFunction;
