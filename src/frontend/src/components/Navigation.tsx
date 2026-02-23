import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, Sprout, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useAuth } from '@/hooks/useAuth';
import { useGetCallerUserProfile, useIsCallerAdmin } from '@/hooks/useUserProfile';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const { identity } = useInternetIdentity();
  const { logout } = useAuth();
  const { data: userProfile } = useGetCallerUserProfile();
  const { data: isAdmin } = useIsCallerAdmin();

  const isAuthenticated = !!identity && !!userProfile;

  const publicLinks = [
    { path: '/', label: 'Login' },
    { path: '/about', label: 'About' },
  ];

  const authenticatedLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/crop-prediction', label: 'Crop Prediction' },
    { path: '/cost-calculator', label: 'Cost Calculator' },
    { path: '/profit-calculator', label: 'Profit Calculator' },
    { path: '/marketplace', label: 'Marketplace' },
  ];

  const adminLinks = [
    { path: '/admin', label: 'Admin' },
  ];

  const navLinks = isAuthenticated
    ? [...authenticatedLinks, ...(isAdmin ? adminLinks : [])]
    : publicLinks;

  const isActive = (path: string) => currentPath === path;

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
              <Sprout className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">FARMAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button
                  variant={isActive(link.path) ? 'default' : 'ghost'}
                  className="text-sm font-medium"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            {isAuthenticated && (
              <Button
                variant="ghost"
                className="text-sm font-medium"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} onClick={() => setMobileMenuOpen(false)}>
                <Button
                  variant={isActive(link.path) ? 'default' : 'ghost'}
                  className="w-full justify-start text-sm font-medium"
                >
                  {link.label}
                </Button>
              </Link>
            ))}
            {isAuthenticated && (
              <Button
                variant="ghost"
                className="w-full justify-start text-sm font-medium"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
