export default function ProtectedLayout({ children }) {
  return (
    <div>
      {/* Walang header at footer dito! */}
      <main>
        {children}  {/* puro content lang */}
      </main>
    </div>
  );
}