
import 'admin-lte/dist/css/adminlte.min.css';

export default function InstallLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
