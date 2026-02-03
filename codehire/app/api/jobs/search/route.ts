export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');
  
  const response = await fetch(`https://mantik-api.com/jobs?q=${query}`, {
    headers: { 'Authorization': `Bearer ${process.env.MANTIK_API_KEY}` }
  });
  
  const jobs = await response.json();
  return Response.json(jobs);
}