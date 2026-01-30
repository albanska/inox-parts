import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const sessionCookie = {  // Renamed to avoid shadowing
  name: "session",
  options: { httpOnly: true, secure: true, sameSite: 'lax', path: "/" },
  duration: 24 * 60 * 60 * 1000
}

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET)

async function encrypt(payload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secretKey)
}

async function decrypt(input) {
  if (!input) return null
  try {
    const { payload } = await jwtVerify(input, secretKey)
    return payload
  } catch {
    return null
  }
}

export async function createSession(userId) {
  const expires = new Date(Date.now() + sessionCookie.duration);
  const session = await encrypt({ userId, expires });

  const cookieStore = await cookies(); // ✅ await cookies()
  cookieStore.set(sessionCookie.name, session, {
    ...sessionCookie.options,
    expires,
  });

  redirect('/admin');
}

export async function verifySession(href) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(sessionCookie.name)?.value;

  const session = await decrypt(sessionToken);

  if (!session?.userId) {
    return false;
  }

  return {status: true, session};
}
export async function deleteSession() {
  const cookieStore = await cookies(); // ✅ await the cookies
  cookieStore.delete(sessionCookie.name);

  redirect('/admin/log-in');
}