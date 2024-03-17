import axios, { AxiosError } from "axios";

// Type guard to check if the error is an AxiosError
export function isAxiosError(error: unknown): error is AxiosError {
  return (error as AxiosError).response !== undefined;
}
