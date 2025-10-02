const users = [
  { id: 1, name: 'Tanaka Taro', email: 'tanaka@example.com', role: 'admin' },
  { id: 2, name: 'Suzuki Hanako', email: 'suzuki@example.com', role: 'user' },
  { id: 3, name: 'Sato Ichiro', email: 'sato@example.com', role: 'user' }
];

export async function onRequest(context) {
  const { request } = context;

  if (request.method === 'GET') {
    return new Response(JSON.stringify({
      users,
      count: users.length,
      status: 'success'
    }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  if (request.method === 'POST') {
    try {
      const body = await request.json();
      const newUser = {
        id: users.length + 1,
        ...body
      };
      users.push(newUser);

      return new Response(JSON.stringify({
        message: 'User created successfully',
        user: newUser,
        status: 'success'
      }), {
        status: 201,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({
        message: 'Invalid data',
        status: 'error'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
  }

  return new Response('Method not allowed', { status: 405 });
}