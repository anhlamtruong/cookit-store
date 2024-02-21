import React, { ReactElement, ComponentType } from "react";

interface UseDataFetchProps<DataType> {
  isLoading: boolean;
  isError: boolean;
  data: DataType | null;
  errorComponent: ReactElement;
  loadingComponent: ReactElement;
}

function useDataFetch<DataType>({
  isLoading,
  isError,
  data,
  errorComponent,
  loadingComponent,
}: UseDataFetchProps<DataType>): {
  component: ReactElement | null;
  data: DataType | null;
} {
  let component: ReactElement | null = null;
  if (isLoading) {
    component = loadingComponent;
  } else if (isError) {
    component = errorComponent;
  }

  return { component, data };
}

export default useDataFetch;
