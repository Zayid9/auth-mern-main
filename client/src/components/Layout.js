import { Outlet, Link, useLocation } from 'react-router-dom';

function Layout() {
  const location = useLocation();
  const isAuthPage = ['/login', '/register', '/reset-password'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAuthPage && (
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <Link to="/dashboard" className="flex items-center">
                  <span className="text-xl font-bold text-primary">Auth App</span>
                </Link>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    // Handle logout
                  }}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout; 