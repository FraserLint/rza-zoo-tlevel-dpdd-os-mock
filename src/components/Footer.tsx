export default function Footer() {
  return (
    <footer className="bg-[var(--moss-green)] px-0 py-2 shadow-lg rounded-lg border-4 border-[var(--forest-green)] mt-4">
      <div className="max-w-[95%] mx-auto flex items-center justify-between">
        <div className="text-[var(--day-card)]">
          Riget Zoo Adventures @ 2025 All Rights Reserved.
        </div>
        <div className="flex items-center gap-8 text-[var(--day-card)]">
          <div>Contact Email: enquiries@rza.org</div>
          <div>Contact No: 0123 456 7891</div>
        </div>
      </div>
    </footer>
  );
}