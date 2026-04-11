export async function GET() {
  return Response.json({ message: "Hello from api" });
}
export async function POST(request) {
  const body = await request.json();

  return Response.json({
    message: `Hello ${body.name}`,
  });
}
