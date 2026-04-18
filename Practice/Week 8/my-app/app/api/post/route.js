import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key_here";
export async function GET(req) {
  const token = req.headers.get("Authorization")?.split(" ")[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      return Response.json({ message: "Authenticated", decoded });
    } catch (error) {
      return Response.json({ message: "Invalid Token" }, { status: 401 });
    }
  } else {
    return Response.json({ message: "No Token Provided" }, { status: 401 });
  }
}

export async function POST() {
  const token = jwt.sign({ id: 1, name: "Usama" }, SECRET_KEY, {
    expiresIn: "1d",
  });
  return Response.json({
    message: `Token Given`,
    token,
  });
}

export async function PUT() {
  return Response.json({ message: "Updating Data" });
}

export async function DELETE() {
  return Response.json({ message: "Deleting Data" });
}
