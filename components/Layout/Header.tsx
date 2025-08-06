import Link from 'next/link';

// Header
export default function Headers() {
  return (
    <>
      <header className="mb-2 h-8 w-full">
        <Link className="p-2 text-2xl font-bold" href="/">
          Fronthan Blog
        </Link>
      </header>
    </>
  );
}
