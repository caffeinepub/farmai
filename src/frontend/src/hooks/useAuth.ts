import { useInternetIdentity } from './useInternetIdentity';
import { useActor } from './useActor';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { UserType } from '@/backend';

// Simple password hashing (for demo purposes - in production use proper hashing)
function hashPassword(password: string): string {
  return btoa(password); // Base64 encoding as simple hash
}

export function useAuth() {
  const { identity, clear: clearIdentity, login: iiLogin } = useInternetIdentity();
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const isAuthenticated = !!identity;

  // Register a new farmer
  const registerFarmer = async (email: string, password: string, name: string | null) => {
    if (!identity) {
      await iiLogin();
    }
    
    if (!actor) {
      throw new Error('Actor not available');
    }

    const passwordHash = hashPassword(password);
    await actor.registerFarmer(email, passwordHash, name);
    
    // Invalidate queries to refresh user data
    queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
  };

  // Register a new buyer
  const registerBuyer = async (email: string, password: string, name: string | null) => {
    if (!identity) {
      await iiLogin();
    }
    
    if (!actor) {
      throw new Error('Actor not available');
    }

    const passwordHash = hashPassword(password);
    await actor.registerBuyer(email, passwordHash, name);
    
    // Invalidate queries to refresh user data
    queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
  };

  // Login as farmer
  const loginFarmer = async (email: string, password: string) => {
    if (!identity) {
      await iiLogin();
    }
    
    if (!actor) {
      throw new Error('Actor not available');
    }

    // Get user profile and verify credentials
    const profile = await actor.getCallerUserProfile();
    
    if (!profile) {
      throw new Error('No account found. Please sign up first.');
    }

    const passwordHash = hashPassword(password);
    if (profile.passwordHash !== passwordHash) {
      throw new Error('Invalid credentials');
    }

    if (profile.userType !== UserType.farmer) {
      throw new Error('This account is not registered as a farmer');
    }

    // Invalidate queries to refresh user data
    queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
  };

  // Login as buyer
  const loginBuyer = async (email: string, password: string) => {
    if (!identity) {
      await iiLogin();
    }
    
    if (!actor) {
      throw new Error('Actor not available');
    }

    // Get user profile and verify credentials
    const profile = await actor.getCallerUserProfile();
    
    if (!profile) {
      throw new Error('No account found. Please sign up first.');
    }

    const passwordHash = hashPassword(password);
    if (profile.passwordHash !== passwordHash) {
      throw new Error('Invalid credentials');
    }

    if (profile.userType !== UserType.buyer) {
      throw new Error('This account is not registered as a buyer');
    }

    // Invalidate queries to refresh user data
    queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
  };

  // Login as admin
  const loginAdmin = async (email: string, password: string) => {
    if (!identity) {
      await iiLogin();
    }
    
    if (!actor) {
      throw new Error('Actor not available');
    }

    // Get user profile and verify credentials
    const profile = await actor.getCallerUserProfile();
    
    if (!profile) {
      throw new Error('No admin account found');
    }

    const passwordHash = hashPassword(password);
    if (profile.passwordHash !== passwordHash) {
      throw new Error('Invalid credentials');
    }

    if (profile.userType !== UserType.admin) {
      throw new Error('This account does not have admin privileges');
    }

    // Invalidate queries to refresh user data
    queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
  };

  // Logout
  const logout = async () => {
    await clearIdentity();
    queryClient.clear();
    navigate({ to: '/' });
  };

  return {
    isAuthenticated,
    identity,
    registerFarmer,
    registerBuyer,
    loginFarmer,
    loginBuyer,
    loginAdmin,
    logout,
  };
}
