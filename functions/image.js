
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const imageUrl = url.searchParams.get('url');

  if (!imageUrl) {
    return new Response('Missing "url" query parameter', { status: 400 });
  }

  try {
    const imageResponse = await fetch(imageUrl, {
      headers: {
        // Pretend to be a browser to avoid getting blocked
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!imageResponse.ok) {
        return new Response('Failed to fetch image', { status: imageResponse.status });
    }

    const response = new Response(imageResponse.body, imageResponse);
    // Set CORS headers to allow the browser to display the image
    response.headers.set('Access-Control-Allow-Origin', '*');
    
    return response;

  } catch (error) {
    return new Response('Error fetching image: ' + error.message, { status: 500 });
  }
}
