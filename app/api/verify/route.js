import jwt from "jsonwebtoken";

export async function POST(req) {
  const body = await req.json();
  const { user, accessToken } = body;

  try {
    const decoded = jwt.verify(accessToken, process.env.PI_API_SECRET);

    return Response.json({
      ok: true,
      message: "JWT verified",
      decoded,
      user
    });
  } catch (err) {
    return Response.json({
      ok: false,
      error: err.message
    });
  }
}
