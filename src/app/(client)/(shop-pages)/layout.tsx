export default function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <section className="mb-8">
      <div className="container relative">{children}</div>
    </section>
  );
}
