interface LoaderProps {
  isFetching: boolean;
  fetchFallback: React.ReactNode;
  children: React.ReactNode;
}

export const Loader = (props: LoaderProps) => {
  if (!props.isFetching) return props.children;

  return props.fetchFallback;
};
