export default function Content({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full p-2 bg-[var(--moss-green)] rounded-lg border-4 border-[var(--forest-green)]">
      {children}
    </div>
  );
}