import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Sprout, ShoppingBag } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

export default function AuthPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-amber-50 to-green-100 dark:from-green-950 dark:via-amber-950 dark:to-green-900">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Welcome to <span className="text-primary">FARMAI</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Intelligent Agriculture Platform - Choose your role to get started
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Admin Login */}
          <AdminLoginSection />

          {/* Farmer Auth */}
          <FarmerAuthSection />

          {/* Buyer Auth */}
          <BuyerAuthSection />
        </div>
      </div>
    </div>
  );
}

function AdminLoginSection() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      await loginAdmin(email, password);
      toast.success('Admin login successful!');
      navigate({ to: '/admin' });
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 dark:bg-blue-500">
          <Shield className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl">Admin Login</CardTitle>
        <CardDescription>Access administrative controls</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="admin-email">Email</Label>
            <Input
              id="admin-email"
              type="email"
              placeholder="admin@farmai.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Logging in...' : 'Login as Admin'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

function FarmerAuthSection() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginFarmer, registerFarmer } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (mode === 'signup') {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return;
      }
    }

    setLoading(true);
    try {
      if (mode === 'signup') {
        await registerFarmer(email, password, name || null);
        toast.success('Account created successfully!');
      } else {
        await loginFarmer(email, password);
        toast.success('Login successful!');
      }
      navigate({ to: '/dashboard' });
    } catch (error: any) {
      toast.error(error.message || `${mode === 'signup' ? 'Registration' : 'Login'} failed`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-600 dark:bg-green-500">
          <Sprout className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl">Farmer Portal</CardTitle>
        <CardDescription>Manage your farm and crops</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={mode} onValueChange={(v) => setMode(v as 'signin' | 'signup')} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="farmer-signin-email">Email</Label>
                <Input
                  id="farmer-signin-email"
                  type="email"
                  placeholder="farmer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="farmer-signin-password">Password</Label>
                <Input
                  id="farmer-signin-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="farmer-signup-name">Name (Optional)</Label>
                <Input
                  id="farmer-signup-name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="farmer-signup-email">Email</Label>
                <Input
                  id="farmer-signup-email"
                  type="email"
                  placeholder="farmer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="farmer-signup-password">Password</Label>
                <Input
                  id="farmer-signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="farmer-signup-confirm">Confirm Password</Label>
                <Input
                  id="farmer-signup-confirm"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating account...' : 'Sign Up'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

function BuyerAuthSection() {
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginBuyer, registerBuyer } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (mode === 'signup') {
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      if (password.length < 6) {
        toast.error('Password must be at least 6 characters');
        return;
      }
    }

    setLoading(true);
    try {
      if (mode === 'signup') {
        await registerBuyer(email, password, name || null);
        toast.success('Account created successfully!');
      } else {
        await loginBuyer(email, password);
        toast.success('Login successful!');
      }
      navigate({ to: '/marketplace' });
    } catch (error: any) {
      toast.error(error.message || `${mode === 'signup' ? 'Registration' : 'Login'} failed`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="border-2 border-amber-200 dark:border-amber-800 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-600 dark:bg-amber-500">
          <ShoppingBag className="h-8 w-8 text-white" />
        </div>
        <CardTitle className="text-2xl">Buyer Portal</CardTitle>
        <CardDescription>Browse and purchase crops</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={mode} onValueChange={(v) => setMode(v as 'login' | 'signup')} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="buyer-login-email">Email</Label>
                <Input
                  id="buyer-login-email"
                  type="email"
                  placeholder="buyer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buyer-login-password">Password</Label>
                <Input
                  id="buyer-login-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="signup">
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="buyer-signup-name">Name (Optional)</Label>
                <Input
                  id="buyer-signup-name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buyer-signup-email">Email</Label>
                <Input
                  id="buyer-signup-email"
                  type="email"
                  placeholder="buyer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buyer-signup-password">Password</Label>
                <Input
                  id="buyer-signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="buyer-signup-confirm">Confirm Password</Label>
                <Input
                  id="buyer-signup-confirm"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Creating account...' : 'Sign Up'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
