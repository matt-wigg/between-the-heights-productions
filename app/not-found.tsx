import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container page">
      <span className="eyebrow">404</span>
      <h1 className="page__title">Page not found</h1>
      <p className="page__lede">
        That page does not exist or has moved. Start from the work, or tell us about a project.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <Link href="/work" className="btn">
          Selected work
        </Link>
        <Link href="/contact" className="btn btn--ghost">
          Start a project
        </Link>
      </div>
    </div>
  );
}
