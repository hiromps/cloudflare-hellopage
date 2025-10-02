'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Users, Clock, Rocket, Plus, RefreshCw, Code, Globe, Zap, Server, Activity, Terminal, Sparkles, Moon, Sun } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface TimeData {
  utc: string;
  japan: string;
  timestamp: number;
  timezone: string;
  status: string;
}

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [timeData, setTimeData] = useState<TimeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [newUserName, setNewUserName] = useState<string>('');
  const [newUserEmail, setNewUserEmail] = useState<string>('');
  const [newUserRole, setNewUserRole] = useState<string>('user');

  useEffect(() => {
    setMounted(true);
    fetchData();
    const interval = setInterval(() => {
      fetchTime();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Fetch hello message
      const helloRes = await fetch('/api/hello');
      const helloData = await helloRes.json();
      setMessage(helloData.message);

      // Fetch users
      const usersRes = await fetch('/api/users');
      const usersData = await usersRes.json();
      setUsers(usersData.users);

      // Fetch time
      await fetchTime();

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTime = async () => {
    try {
      const timeRes = await fetch('/api/time');
      const timeData = await timeRes.json();
      setTimeData(timeData);
    } catch (error) {
      console.error('Error fetching time:', error);
    }
  };

  const addUser = async () => {
    try {
      const newUser = {
        name: newUserName || 'New User',
        email: newUserEmail || 'newuser@example.com',
        role: newUserRole
      };

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        fetchData(); // Refresh data
        setNewUserName('');
        setNewUserEmail('');
        setNewUserRole('user');
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-purple-900 dark:to-violet-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex justify-center items-center gap-3 mb-6">
            <Sparkles className="w-10 h-10 text-white animate-pulse" />
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              Hello World
            </h1>
            <Sparkles className="w-10 h-10 text-white animate-pulse" />
          </div>

          <p className="text-xl md:text-2xl text-white/90 mb-2">
            Next.js API Routes on Cloudflare Pages
          </p>

          <div className="flex justify-center gap-2 mb-6">
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <Zap className="w-3 h-3 mr-1" />
              Powered by Edge
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <Globe className="w-3 h-3 mr-1" />
              Global CDN
            </Badge>
            <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
              <Server className="w-3 h-3 mr-1" />
              Serverless
            </Badge>
          </div>

          {mounted && (
            <div className="flex justify-center mb-6">
              <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                <Sun className="w-4 h-4 text-white" />
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                />
                <Moon className="w-4 h-4 text-white" />
              </div>
            </div>
          )}

          {loading ? (
            <Alert className="inline-flex max-w-md mx-auto bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <Activity className="h-4 w-4 animate-spin" />
              <AlertTitle>Loading</AlertTitle>
              <AlertDescription>Fetching API data...</AlertDescription>
            </Alert>
          ) : (
            <Alert className="inline-flex max-w-md mx-auto bg-green-500/20 backdrop-blur-sm border-green-500/30 text-white">
              <Rocket className="h-4 w-4" />
              <AlertTitle>Connected</AlertTitle>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid grid-cols-3 max-w-lg mx-auto mb-6 bg-white/10 backdrop-blur-sm border border-white/20">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="api">API Info</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Time Card */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Clock className="w-5 h-5" />
                    Current Time
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Live server time updates
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-white">
                  {timeData && (
                    <div className="space-y-3">
                      <div className="text-2xl font-mono">
                        {timeData.japan.split(' ')[1]}
                      </div>
                      <Separator className="bg-white/20" />
                      <div className="space-y-1 text-sm">
                        <p className="flex justify-between">
                          <span className="text-white/70">Date:</span>
                          <span>{timeData.japan.split(' ')[0]}</span>
                        </p>
                        <p className="flex justify-between">
                          <span className="text-white/70">Timezone:</span>
                          <span>{timeData.timezone}</span>
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Users Summary Card */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Users className="w-5 h-5" />
                    Users Overview
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Active user statistics
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-white">
                  <div className="space-y-3">
                    <div className="text-4xl font-bold">
                      {users.length}
                    </div>
                    <Separator className="bg-white/20" />
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-blue-500/20 text-white">
                        {users.filter(u => u.role === 'admin').length} Admins
                      </Badge>
                      <Badge variant="secondary" className="bg-green-500/20 text-white">
                        {users.filter(u => u.role === 'user').length} Users
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* System Status Card */}
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Activity className="w-5 h-5" />
                    System Status
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    API health monitoring
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-white">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span>All Systems Operational</span>
                    </div>
                    <Separator className="bg-white/20" />
                    <div className="space-y-1 text-sm">
                      <p className="flex justify-between">
                        <span className="text-white/70">API Response:</span>
                        <Badge variant="secondary" className="bg-green-500/20 text-white">Fast</Badge>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-white/70">Uptime:</span>
                        <span>99.99%</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Features</CardTitle>
                </CardHeader>
                <CardContent className="text-white">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Code className="w-4 h-4 text-blue-400" />
                      <span>TypeScript Support</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-green-400" />
                      <span>Global Edge Network</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span>Instant Deployments</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Server className="w-4 h-4 text-purple-400" />
                      <span>Serverless Functions</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    onClick={fetchData}
                    className="w-full bg-white/20 hover:bg-white/30 text-white border-white/20"
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh All Data
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-green-500/20 hover:bg-green-500/30 text-white border-green-500/20">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New User
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 text-white">
                      <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription className="text-gray-400">
                          Create a new user account with the details below.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium">
                            Name
                          </label>
                          <Input
                            id="name"
                            value={newUserName}
                            onChange={(e) => setNewUserName(e.target.value)}
                            placeholder="Enter user name"
                            className="bg-gray-800 border-gray-700"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium">
                            Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            value={newUserEmail}
                            onChange={(e) => setNewUserEmail(e.target.value)}
                            placeholder="Enter email address"
                            className="bg-gray-800 border-gray-700"
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="role" className="text-sm font-medium">
                            Role
                          </label>
                          <Select value={newUserRole} onValueChange={setNewUserRole}>
                            <SelectTrigger className="bg-gray-800 border-gray-700">
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">User</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={addUser} className="bg-green-600 hover:bg-green-700">
                          Create User
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Users className="w-5 h-5" />
                  User Management
                </CardTitle>
                <CardDescription className="text-white/70">
                  View and manage all users in the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] pr-4">
                  <div className="space-y-4">
                    {users.map((user) => (
                      <Card key={user.id} className="bg-white/5 border-white/10">
                        <CardContent className="flex items-center gap-4 p-4">
                          <Avatar className="h-12 w-12 border-2 border-white/20">
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`} />
                            <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-medium text-white">{user.name}</p>
                            <p className="text-sm text-white/70">{user.email}</p>
                          </div>
                          <Badge
                            variant="secondary"
                            className={user.role === 'admin' ? 'bg-purple-500/20 text-white' : 'bg-blue-500/20 text-white'}
                          >
                            {user.role}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-green-500/20 hover:bg-green-500/30 text-white border-green-500/20">
                      <Plus className="w-4 h-4 mr-2" />
                      Add User
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 text-white">
                    <DialogHeader>
                      <DialogTitle>Add New User</DialogTitle>
                      <DialogDescription className="text-gray-400">
                        Create a new user account
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Name</label>
                        <Input
                          value={newUserName}
                          onChange={(e) => setNewUserName(e.target.value)}
                          placeholder="Enter name"
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input
                          type="email"
                          value={newUserEmail}
                          onChange={(e) => setNewUserEmail(e.target.value)}
                          placeholder="Enter email"
                          className="bg-gray-800 border-gray-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Role</label>
                        <Select value={newUserRole} onValueChange={setNewUserRole}>
                          <SelectTrigger className="bg-gray-800 border-gray-700">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="admin">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button onClick={addUser} className="bg-green-600 hover:bg-green-700">
                        Create
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="api">
            <div className="grid gap-6">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    <Terminal className="w-5 h-5" />
                    API Endpoints
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    Available API routes and their descriptions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
                    <div className="space-y-3">
                      <div className="text-green-400">
                        <p className="font-bold">GET /api/hello</p>
                        <p className="text-white/70 ml-4">Returns a welcome message with timestamp</p>
                      </div>
                      <Separator className="bg-white/10" />
                      <div className="text-green-400">
                        <p className="font-bold">GET /api/users</p>
                        <p className="text-white/70 ml-4">Fetches all users in the system</p>
                      </div>
                      <Separator className="bg-white/10" />
                      <div className="text-blue-400">
                        <p className="font-bold">POST /api/users</p>
                        <p className="text-white/70 ml-4">Creates a new user with provided data</p>
                      </div>
                      <Separator className="bg-white/10" />
                      <div className="text-green-400">
                        <p className="font-bold">GET /api/time</p>
                        <p className="text-white/70 ml-4">Returns current time in multiple formats</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">Response Example</CardTitle>
                  <CardDescription className="text-white/70">
                    Sample API response from /api/hello
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-black/30 rounded-lg p-4 font-mono text-sm text-white">
                    <pre>{JSON.stringify({
                      message: message || "Hello from API!",
                      timestamp: new Date().toISOString(),
                      status: "success"
                    }, null, 2)}</pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}