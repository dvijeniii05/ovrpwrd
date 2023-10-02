interface LoaderProps {
  isFetching: boolean;
  isError?: boolean;
  isSuccess: boolean;
  fetchFallback: React.ReactNode;
  errorFallback?: React.ReactNode;
  children: React.ReactNode;
}

export const Loader = (props: LoaderProps) => {
  if (props.isSuccess && !props.isFetching) return props.children;

  return props.fetchFallback;
};
