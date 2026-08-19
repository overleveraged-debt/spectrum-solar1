// Cryptographic SHA-256 Auth Utility for Admin Dashboard

const AUTH_SALT = 'spectrum_solar_secure_salt_2026';
const SESSION_EXPIRY_MS = 2 * 60 * 60 * 1000; // 2 hours

// Convert buffer to hex string
function bufferToHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

// Compute SHA-256 Hash using native Web Crypto API
async function sha256(message: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return bufferToHex(hashBuffer);
}

// In-Memory Token Reference (held securely in RAM)
let inMemorySessionToken: string | null = null;

export async function createSessionSignature(passcode: string, timestamp: number): Promise<string> {
  const payload = `${passcode}:${AUTH_SALT}:${timestamp}`;
  const signature = await sha256(payload);
  inMemorySessionToken = signature;
  return signature;
}

export async function verifyCurrentSession(): Promise<{ isValid: boolean; reason?: string }> {
  const sessionToken = inMemorySessionToken || sessionStorage.getItem('spectrum_admin_sig');
  const timestampStr = sessionStorage.getItem('spectrum_admin_ts');
  const lastActiveStr = localStorage.getItem('spectrum_admin_last_active');

  if (!sessionToken || !timestampStr || !lastActiveStr) {
    return { isValid: false, reason: 'No active session token found.' };
  }

  const timestamp = parseInt(timestampStr, 10);
  const lastActive = parseInt(lastActiveStr, 10);
  const now = Date.now();

  // Check 2-hour inactivity
  if (now - lastActive > SESSION_EXPIRY_MS) {
    clearAuthSession();
    return { isValid: false, reason: 'Session expired due to 2 hours of inactivity.' };
  }

  // Cryptographically re-verify the signature with the expected passcode
  const correctPasscode = import.meta.env.VITE_ADMIN_PASSCODE || 'admin123';
  const expectedSignature = await sha256(`${correctPasscode}:${AUTH_SALT}:${timestamp}`);

  if (sessionToken !== expectedSignature) {
    clearAuthSession();
    return { isValid: false, reason: 'Invalid or forged security signature.' };
  }

  // Keep in-memory cache synchronized
  inMemorySessionToken = expectedSignature;
  return { isValid: true };
}

export function saveAuthSession(signature: string, timestamp: number) {
  inMemorySessionToken = signature;
  sessionStorage.setItem('spectrum_admin_sig', signature);
  sessionStorage.setItem('spectrum_admin_ts', timestamp.toString());
  localStorage.setItem('spectrum_admin_last_active', Date.now().toString());
  localStorage.setItem('spectrum_admin_authenticated', 'true');
}

export function refreshActivityTimestamp() {
  localStorage.setItem('spectrum_admin_last_active', Date.now().toString());
}

export function clearAuthSession() {
  inMemorySessionToken = null;
  sessionStorage.removeItem('spectrum_admin_sig');
  sessionStorage.removeItem('spectrum_admin_ts');
  localStorage.removeItem('spectrum_admin_authenticated');
  localStorage.removeItem('spectrum_admin_last_active');
}
