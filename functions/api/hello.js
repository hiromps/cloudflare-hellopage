export async function onRequest(context) {
  const { request } = context;

  if (request.method === 'GET') {
    return new Response(JSON.stringify({
      message: 'Hello from Cloudflare Functions!',
      timestamp: new Date().toISOString(),
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
      return new Response(JSON.stringify({
        message: 'Data received successfully',
        receivedData: body,
        timestamp: new Date().toISOString(),
        status: 'success'
      }), {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      return new Response(JSON.stringify({
        message: 'Invalid JSON',
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