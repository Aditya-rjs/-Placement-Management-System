/**
 * adminAuthService.js
 * Persistent Admin Authentication & Role-Based Access Control (RBAC) Service.
 * Supports up to 5 Admin accounts (1 Default Super Admin + max 4 Additional Admins).
 * Uses SHA-256 hashing for password security & localStorage for persistence.
 */

const STORAGE_KEY_ADMINS = 'lnjpit_pms_admin_accounts_v1';
const STORAGE_KEY_SESSION = 'lnjpit_pms_admin_session_v1';
const MAX_ADMINS_LIMIT = 5;

// ── Default Super Admin Setup ─────────────────────────────────────────────
const DEFAULT_SUPER_ADMIN = {
  id: 'super-admin-001',
  name: 'Aditya Raj Singh',
  email: 'bringaditya1212@gmail.com',
  // Pre-hashed SHA-256 for "Admin@9727"
  passwordHash: '8e819b1db3c19e59d95fbc9a49aa5cfbb13e117ec1e9754f9d8544e39665c822',
  role: 'SUPER_ADMIN', // 'SUPER_ADMIN' | 'NORMAL_ADMIN'
  status: 'active',     // 'active' | 'disabled'
  createdAt: '2026-08-07T00:00:00.000Z',
  isDefault: true,
};

// ── Helper: Hash Password using Web Crypto SHA-256 ────────────────────────
export async function hashPassword(plainPassword) {
  if (!plainPassword) return '';
  const encoder = new TextEncoder();
  const data = encoder.encode(plainPassword);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// ── Initialize & Read Persistent Admins ──────────────────────────────────
export function getAdminAccounts() {
  try {
    const data = localStorage.getItem(STORAGE_KEY_ADMINS);
    if (data) {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Ensure default super admin always exists
        const hasSuperAdmin = parsed.some(a => a.role === 'SUPER_ADMIN');
        if (!hasSuperAdmin) {
          parsed.unshift(DEFAULT_SUPER_ADMIN);
          localStorage.setItem(STORAGE_KEY_ADMINS, JSON.stringify(parsed));
        }
        return parsed;
      }
    }
  } catch (err) {
    console.error('Failed to load admin accounts from storage:', err);
  }

  // Initialize with default super admin
  const initial = [DEFAULT_SUPER_ADMIN];
  localStorage.setItem(STORAGE_KEY_ADMINS, JSON.stringify(initial));
  return initial;
}

// Save admins to storage
function saveAdminAccounts(accounts) {
  localStorage.setItem(STORAGE_KEY_ADMINS, JSON.stringify(accounts));
}

// ── Session Management ────────────────────────────────────────────────────
export function getCurrentSession() {
  try {
    const sessionStr = localStorage.getItem(STORAGE_KEY_SESSION);
    if (!sessionStr) return null;
    const session = JSON.parse(sessionStr);
    
    // Verify session user still exists and is active
    const admins = getAdminAccounts();
    const current = admins.find(a => a.id === session.id || a.email.toLowerCase() === session.email.toLowerCase());
    
    if (!current || current.status !== 'active') {
      clearCurrentSession();
      return null;
    }
    return current;
  } catch (err) {
    return null;
  }
}

export function clearCurrentSession() {
  localStorage.removeItem(STORAGE_KEY_SESSION);
}

// ── Authentication (Login) ────────────────────────────────────────────────
export async function loginAdmin(email, plainPassword) {
  const admins = getAdminAccounts();
  const targetEmail = email.trim().toLowerCase();
  const inputHash = await hashPassword(plainPassword);

  const admin = admins.find(a => a.email.toLowerCase() === targetEmail);

  if (!admin) {
    throw new Error('Invalid email or password.');
  }

  if (admin.passwordHash !== inputHash) {
    throw new Error('Invalid email or password.');
  }

  if (admin.status === 'disabled') {
    throw new Error('This Admin account has been disabled by the Super Admin.');
  }

  // Store session
  const sessionData = {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    role: admin.role,
    loggedInAt: new Date().toISOString(),
  };

  localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(sessionData));
  return admin;
}

// ── Super Admin Management Actions ────────────────────────────────────────

// 1. Create New Admin (Max 5 Total)
export async function createAdmin({ name, email, password, role = 'NORMAL_ADMIN' }, currentAdmin) {
  if (!currentAdmin || currentAdmin.role !== 'SUPER_ADMIN') {
    throw new Error('Access Denied: Only the Super Admin can create Admin accounts.');
  }

  const admins = getAdminAccounts();
  if (admins.length >= MAX_ADMINS_LIMIT) {
    throw new Error(`System Limit Reached: Maximum of ${MAX_ADMINS_LIMIT} Admin accounts allowed (1 Super Admin + 4 Additional Admins).`);
  }

  const normalizedEmail = email.trim().toLowerCase();
  if (admins.some(a => a.email.toLowerCase() === normalizedEmail)) {
    throw new Error(`An Admin account with email "${email}" already exists.`);
  }

  const passwordHash = await hashPassword(password);
  const newAdmin = {
    id: `admin-${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    passwordHash,
    role: role === 'SUPER_ADMIN' ? 'SUPER_ADMIN' : 'NORMAL_ADMIN',
    status: 'active',
    createdAt: new Date().toISOString(),
    isDefault: false,
  };

  admins.push(newAdmin);
  saveAdminAccounts(admins);
  return newAdmin;
}

// 2. Update Admin Details (Name, Email, Role)
export function updateAdmin(adminId, { name, email, role }, currentAdmin) {
  if (!currentAdmin || currentAdmin.role !== 'SUPER_ADMIN') {
    throw new Error('Access Denied: Only the Super Admin can edit Admin accounts.');
  }

  const admins = getAdminAccounts();
  const targetIndex = admins.findIndex(a => a.id === adminId);
  if (targetIndex === -1) {
    throw new Error('Admin account not found.');
  }

  const target = admins[targetIndex];
  const newEmail = email.trim().toLowerCase();

  // Check email uniqueness if changed
  if (newEmail !== target.email.toLowerCase() && admins.some(a => a.email.toLowerCase() === newEmail)) {
    throw new Error(`Email "${email}" is already in use by another Admin.`);
  }

  // Prevent changing default super admin role
  if (target.isDefault && role && role !== 'SUPER_ADMIN') {
    throw new Error('The default Super Admin account role cannot be downgraded.');
  }

  admins[targetIndex] = {
    ...target,
    name: name ? name.trim() : target.name,
    email: newEmail,
    role: role || target.role,
  };

  saveAdminAccounts(admins);

  // If editing self, update current session
  const activeSession = getCurrentSession();
  if (activeSession && activeSession.id === adminId) {
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify({
      ...activeSession,
      name: admins[targetIndex].name,
      email: admins[targetIndex].email,
      role: admins[targetIndex].role,
    }));
  }

  return admins[targetIndex];
}

// 3. Reset another Admin's Password
export async function resetAdminPassword(adminId, newPassword, currentAdmin) {
  if (!currentAdmin || currentAdmin.role !== 'SUPER_ADMIN') {
    throw new Error('Access Denied: Only the Super Admin can reset another Admin password.');
  }

  const admins = getAdminAccounts();
  const targetIndex = admins.findIndex(a => a.id === adminId);
  if (targetIndex === -1) {
    throw new Error('Admin account not found.');
  }

  const newHash = await hashPassword(newPassword);
  admins[targetIndex].passwordHash = newHash;
  saveAdminAccounts(admins);
  return true;
}

// 4. Toggle Admin Status (Enable / Disable)
export function toggleAdminStatus(adminId, currentAdmin) {
  if (!currentAdmin || currentAdmin.role !== 'SUPER_ADMIN') {
    throw new Error('Access Denied: Only the Super Admin can enable or disable Admin accounts.');
  }

  const admins = getAdminAccounts();
  const targetIndex = admins.findIndex(a => a.id === adminId);
  if (targetIndex === -1) {
    throw new Error('Admin account not found.');
  }

  if (admins[targetIndex].isDefault) {
    throw new Error('The default Super Admin account cannot be disabled.');
  }

  admins[targetIndex].status = admins[targetIndex].status === 'active' ? 'disabled' : 'active';
  saveAdminAccounts(admins);
  return admins[targetIndex];
}

// 5. Delete Admin Account
export function deleteAdmin(adminId, currentAdmin) {
  if (!currentAdmin || currentAdmin.role !== 'SUPER_ADMIN') {
    throw new Error('Access Denied: Only the Super Admin can delete Admin accounts.');
  }

  let admins = getAdminAccounts();
  const target = admins.find(a => a.id === adminId);
  if (!target) {
    throw new Error('Admin account not found.');
  }

  if (target.isDefault) {
    throw new Error('The default Super Admin account cannot be deleted.');
  }

  admins = admins.filter(a => a.id !== adminId);
  saveAdminAccounts(admins);
  return true;
}

// 6. Update Self Credentials (Email & Password)
export async function updateSelfProfile({ email, currentPassword, newPassword }, currentAdmin) {
  if (!currentAdmin) {
    throw new Error('Authentication required.');
  }

  const admins = getAdminAccounts();
  const targetIndex = admins.findIndex(a => a.id === currentAdmin.id);
  if (targetIndex === -1) {
    throw new Error('Account record not found.');
  }

  // Verify current password if changing password
  if (newPassword) {
    const currentHash = await hashPassword(currentPassword);
    if (admins[targetIndex].passwordHash !== currentHash) {
      throw new Error('Incorrect current password.');
    }
    admins[targetIndex].passwordHash = await hashPassword(newPassword);
  }

  // Change email if provided
  if (email) {
    const newEmail = email.trim().toLowerCase();
    if (newEmail !== admins[targetIndex].email.toLowerCase() && admins.some(a => a.email.toLowerCase() === newEmail)) {
      throw new Error(`Email "${email}" is already taken by another Admin.`);
    }
    admins[targetIndex].email = newEmail;
  }

  saveAdminAccounts(admins);

  // Update session
  localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify({
    ...currentAdmin,
    email: admins[targetIndex].email,
  }));

  return admins[targetIndex];
}
