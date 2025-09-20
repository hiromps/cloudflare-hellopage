'use client';

import { useState, useEffect } from 'react';

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
  const [message, setMessage] = useState<string>('');
  const [users, setUsers] = useState<User[]>([]);
  const [timeData, setTimeData] = useState<TimeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
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
      const timeRes = await fetch('/api/time');
      const timeData = await timeRes.json();
      setTimeData(timeData);

    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addUser = async () => {
    try {
      const newUser = {
        name: 'New User',
        email: 'newuser@example.com',
        role: 'user'
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
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white mb-4">
            Hello World
          </h1>
          <p className="text-xl text-white/90 mb-8">
            Next.js with API Routes on Cloudflare Pages
          </p>

          {loading ? (
            <div className="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
              <p className="text-white font-medium">
                🔄 Loading API data...
              </p>
            </div>
          ) : (
            <div className="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-lg border border-white/30">
              <p className="text-white font-medium">
                🚀 {message}
              </p>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Time API */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-4">📅 Current Time</h2>
            {timeData && (
              <div className="space-y-2 text-white/90">
                <p><strong>Japan:</strong> {timeData.japan}</p>
                <p><strong>UTC:</strong> {new Date(timeData.utc).toLocaleString()}</p>
                <p><strong>Timezone:</strong> {timeData.timezone}</p>
              </div>
            )}
          </div>

          {/* Users API */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">👥 Users ({users.length})</h2>
              <button
                onClick={addUser}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Add User
              </button>
            </div>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {users.map((user) => (
                <div key={user.id} className="text-white/90 text-sm">
                  <strong>{user.name}</strong> - {user.email} ({user.role})
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={fetchData}
            className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg border border-white/30 text-white font-medium transition-all"
          >
            🔄 Refresh Data
          </button>
        </div>
      </div>
    </main>
  );
}