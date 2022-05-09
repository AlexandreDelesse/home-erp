import React from "react";

export default function AsyncComponent({ query, children }) {
  if (query.isLoading) return <>Loading</>;
  if (query.isError) return <>Error</>;

  return <>{children}</>;
}
