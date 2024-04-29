"use client"; // Error components must be Client Components

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error }: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className={`wrapper`}>
      <h1>Sorry, no results found!</h1>
      <Link href="/">Return home to discover more</Link>
    </section>
  );
}
