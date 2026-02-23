import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import { UserProfile } from '@/backend';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  // Return custom state that properly reflects actor dependency
  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useIsCallerAdmin() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useIsCallerFarmer() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerFarmer'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerFarmer();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}

export function useIsCallerBuyer() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerBuyer'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerBuyer();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });
}
