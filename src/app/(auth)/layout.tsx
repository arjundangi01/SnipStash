export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 bg-muted/40">
      <div className="w-full max-w-md bg-background rounded-lg border shadow-sm">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}
