import { useQuery } from '@tanstack/react-query';
import { useActor } from '@/hooks/useActor';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, Sprout, ShoppingBag } from 'lucide-react';
import { UserProfile, UserType } from '@/backend';
import { Principal } from '@icp-sdk/core/principal';

export default function AdminDashboardPage() {
  const { actor } = useActor();

  const { data: users, isLoading } = useQuery<Array<[Principal, UserProfile]>>({
    queryKey: ['allUsers'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.listAllUsers();
    },
    enabled: !!actor,
  });

  const userStats = users?.reduce(
    (acc, [_, profile]) => {
      if (profile.userType === UserType.admin) acc.admins++;
      else if (profile.userType === UserType.farmer) acc.farmers++;
      else if (profile.userType === UserType.buyer) acc.buyers++;
      return acc;
    },
    { admins: 0, farmers: 0, buyers: 0 }
  ) || { admins: 0, farmers: 0, buyers: 0 };

  const getUserTypeIcon = (userType: UserType) => {
    switch (userType) {
      case UserType.admin:
        return <Shield className="h-4 w-4" />;
      case UserType.farmer:
        return <Sprout className="h-4 w-4" />;
      case UserType.buyer:
        return <ShoppingBag className="h-4 w-4" />;
    }
  };

  const getUserTypeBadgeVariant = (userType: UserType): 'default' | 'secondary' | 'outline' => {
    switch (userType) {
      case UserType.admin:
        return 'default';
      case UserType.farmer:
        return 'secondary';
      case UserType.buyer:
        return 'outline';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage users and monitor platform activity</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Admins</CardTitle>
            <Shield className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.admins}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Farmers</CardTitle>
            <Sprout className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.farmers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Buyers</CardTitle>
            <ShoppingBag className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userStats.buyers}</div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>View and manage all registered users</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
              <p className="text-muted-foreground mt-4">Loading users...</p>
            </div>
          ) : users && users.length > 0 ? (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Principal ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>User Type</TableHead>
                    <TableHead>Role</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map(([principal, profile]) => (
                    <TableRow key={principal.toString()}>
                      <TableCell className="font-mono text-xs">
                        {principal.toString().slice(0, 20)}...
                      </TableCell>
                      <TableCell>{profile.name || '-'}</TableCell>
                      <TableCell>{profile.email}</TableCell>
                      <TableCell>
                        <Badge variant={getUserTypeBadgeVariant(profile.userType)} className="gap-1">
                          {getUserTypeIcon(profile.userType)}
                          {profile.userType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{profile.role}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No users found
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
