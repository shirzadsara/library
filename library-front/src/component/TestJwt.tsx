import { useTestTokenQuery } from '../features/apiSlice';

export function TestJwt() {
  const { data, error, isLoading } = useTestTokenQuery();

  if (isLoading) return <p>در حال بررسی...</p>;
  if (error && 'status' in error) return <p>❌ {error.status}</p>;

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
