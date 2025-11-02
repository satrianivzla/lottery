
'use client'

import 'admin-lte/dist/css/adminlte.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import AdminLTEInitializer from '@/components/AdminLTEInitializer';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="hold-transition sidebar-mini">
        <AdminLTEInitializer />
        <div className="wrapper">
          <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
              </li>
            </ul>
          </nav>

          <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href="/admin" className="brand-link">
              <span className="brand-text font-weight-light">Lottery Admin</span>
            </a>

            <div className="sidebar">
              <nav className="mt-2">
                <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                  <li className="nav-item">
                    <a href="/admin/raffles" className="nav-link">
                      <i className="nav-icon fas fa-th"></i>
                      <p>
                        Raffles
                      </p>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </aside>

          <div className="content-wrapper">
            {children}
          </div>

          <footer className="main-footer">
            <strong>Copyright &copy; 2024 <a href="#">Lottery App</a>.</strong> All rights reserved.
          </footer>
        </div>
      </body>
    </html>
  )
}
