import { useState } from "react";
import { EnterForm } from "../../pages/enter";

interface UseMutation<T> {
  loading: boolean;
  data?: T;
  error?: any;
}

type UseMutationResult<T> = [(data: any) => void, UseMutation<T>];

export default function useMutation<T>(url: string): UseMutationResult<T> {
  const [state, setState] = useState({
    loading: false,
    data: undefined,
    error: undefined,
  });
  function mutation(data?: EnterForm) {
    setState((pre) => ({ ...pre, loading: true }));
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .catch(() => {})
      .then((data) => setState((pre) => ({ ...pre, data }))) //
      .catch((error) => setState((pre) => ({ ...pre, error }))) //
      .finally(() => setState((pre) => ({ ...pre, loading: false })));
  }
  return [mutation, { ...state }];
}
