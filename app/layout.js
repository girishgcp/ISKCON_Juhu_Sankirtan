export const metadata = {
  title: 'ISKCON Juhu Sankirtan — Receipts',
  description: 'Digital book distribution receipt generator for ISKCON Juhu'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
