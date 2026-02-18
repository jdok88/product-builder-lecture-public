
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
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!imageResponse.ok) {
      return new Response(`Failed to fetch image. Status: ${imageResponse.status}`, { status: imageResponse.status });
    }

    const contentType = imageResponse.headers.get('content-type');
    const buffer = await imageResponse.arrayBuffer();
    const base64String = btoa(String.fromCharCode(...new Uint8Array(buffer)));
    
    const dataUrl = `data:${contentType};base64,${base64String}`;

    const jsonResponse = new Response(JSON.stringify({ dataUrl }), {
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    });
    
    return jsonResponse;

  } catch (error) {
    return new Response('Error fetching image: ' + error.message, { status: 500 });
  }
}
