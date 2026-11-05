import { supabase } from '../supabase';

// Storage Key for Multiple Corporate Accounts
const STORAGE_KEY = 'an_secure_corporate_database';
const MAX_FAILED_ATTEMPTS = 3;

// 1. Get all registered users from storage
export const getStoredUsers = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved
      ? JSON.parse(saved)
      : [
          // Default system admin
          {
            email: 'admin@anjaneynexus.com',
            password: 'AdminSecurePassword123',
            fullName: 'Administrator',
            companyName: 'Anjaney Nexus India LLP',
            role: 'admin',
            attempts: 0,
            isLocked: false,
          },
        ];
  } catch {
    return [
      {
        email: 'admin@anjaneynexus.com',
        password: 'AdminSecurePassword123',
        fullName: 'Administrator',
        companyName: 'Anjaney Nexus India LLP',
        role: 'admin',
        attempts: 0,
        isLocked: false,
      },
    ];
  }
};

// 2. Register a new email & password pair
export const registerUser = (email, password, extraData = {}) => {
  const users = getStoredUsers();
  const cleanEmail = email.toLowerCase().trim();

  // Validate confirm password if provided
  if (extraData.confirmPassword && extraData.confirmPassword !== password) {
    return { success: false, message: 'Passwords do not match. Please verify your password.' };
  }

  // Check if email already exists
  const existing = users.find((u) => u.email === cleanEmail);
  if (existing) {
    return { success: false, message: 'This email ID is already registered in the system.' };
  }

  const isAccountAdmin = cleanEmail.includes('admin') || cleanEmail.startsWith('admin@') || extraData.role === 'admin';
  const role = isAccountAdmin ? 'admin' : (extraData.role === 'seller' ? 'seller' : 'user');

  // Create new user record
  const newUser = {
    email: cleanEmail,
    password: password, // Exact password linkage
    fullName: extraData.fullName || cleanEmail.split('@')[0],
    companyName: extraData.companyName || (isAccountAdmin ? 'Anjaney Nexus Admin' : (role === 'seller' ? 'Corporate Seller' : 'Corporate Partner')),
    role: role,
    isAdmin: isAccountAdmin,
    attempts: 0,
    isLocked: false,
    ...extraData,
  };

  users.push(newUser);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    localStorage.setItem('an_active_session_user', JSON.stringify(newUser));
    localStorage.setItem('user', JSON.stringify(newUser));
    localStorage.setItem('an_user', JSON.stringify(newUser));
    localStorage.setItem('userInfo', JSON.stringify({ ...newUser, token: 'session-' + Date.now() }));
    localStorage.setItem('token', 'session-' + Date.now());

    window.dispatchEvent(new Event('auth-change'));
    window.dispatchEvent(new Event('authChange'));
    window.dispatchEvent(new Event('storage'));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }

  return { success: true, message: `Successfully registered ${cleanEmail}`, user: newUser };
};

// 3. Strict Login Verification (No random approvals)
export const verifyLogin = (email, password) => {
  const users = getStoredUsers();
  const cleanEmail = email.toLowerCase().trim();

  // Step A: Find user by email
  const userIndex = users.findIndex((u) => u.email === cleanEmail);

  if (userIndex === -1) {
    return { success: false, message: 'Access Denied: Email ID is not registered.' };
  }

  const user = users[userIndex];

  // Step B: Check if account is locked
  if (user.isLocked) {
    return {
      success: false,
      message: `Account for ${cleanEmail} is locked due to multiple failed attempts.`,
    };
  }

  // Step C: STRICT PASSWORD MATCH CHECK
  // Both email AND password must match precisely. No loose comparisons.
  if (user.password === password) {
    // Reset attempt counter on success
    users[userIndex].attempts = 0;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }

    return {
      success: true,
      message: `Authentication successful for ${cleanEmail}`,
      user: {
        email: user.email,
        fullName: user.fullName || user.email.split('@')[0],
        companyName: user.companyName || 'Corporate Partner',
        role: user.role || (user.email.includes('admin') ? 'admin' : 'user'),
      },
    };
  } else {
    // Step D: Increment failed attempts on incorrect password
    const nextAttempts = (user.attempts || 0) + 1;
    const isNowLocked = nextAttempts >= MAX_FAILED_ATTEMPTS;

    users[userIndex].attempts = nextAttempts;
    users[userIndex].isLocked = isNowLocked;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
    } catch (err) {
      console.error('Failed to save to localStorage:', err);
    }

    if (isNowLocked) {
      return {
        success: false,
        message: `Maximum limit reached (${MAX_FAILED_ATTEMPTS}). Account is now LOCKED.`,
      };
    }

    return {
      success: false,
      message: `Incorrect password! Failed attempt ${nextAttempts} of ${MAX_FAILED_ATTEMPTS}.`,
    };
  }
};

// 4. Helper to manually unlock/reset an account
export const unlockUser = (email) => {
  const users = getStoredUsers();
  const cleanEmail = email.toLowerCase().trim();
  const updated = users.map((u) =>
    u.email === cleanEmail ? { ...u, attempts: 0, isLocked: false } : u
  );
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
  return { success: true, message: `Account ${cleanEmail} has been unlocked.` };
};

// 5. Actively Delete Registered Users (Database & LocalStorage)
export const deleteRegisteredUser = async (email) => {
  const cleanEmail = email ? email.toLowerCase().trim() : '';
  const users = getStoredUsers();
  const updated = users.filter((u) => u.email !== cleanEmail);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    const active = localStorage.getItem('an_active_session_user');
    if (active && JSON.parse(active).email === cleanEmail) {
      localStorage.removeItem('an_active_session_user');
      localStorage.removeItem('user');
      localStorage.removeItem('an_user');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
      window.dispatchEvent(new Event('auth-change'));
    }
  } catch (err) {
    console.error('Failed to update local storage:', err);
  }

  try {
    await fetch('/api/auth/delete-by-email', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: cleanEmail }),
    });
  } catch (err) {
    console.warn('Backend deletion call failed (running in offline mode):', err);
  }

  return { success: true, message: `User ${cleanEmail} deleted.` };
};

export const clearAllRegisteredUsers = async () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('an_active_session_user');
    localStorage.removeItem('user');
    localStorage.removeItem('an_user');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('token');
    window.dispatchEvent(new Event('auth-change'));
    window.dispatchEvent(new Event('authChange'));
    window.dispatchEvent(new Event('storage'));
  } catch (err) {
    console.error('Failed to clear localStorage:', err);
  }

  try {
    const res = await fetch('/api/auth/delete-all', { method: 'DELETE' });
    const data = await res.json().catch(() => ({}));
    return { success: true, message: data.message || 'All registered users deleted.' };
  } catch (err) {
    return { success: true, message: 'All local registered users deleted.' };
  }
};

// ==========================================
// 5. REAL SUPABASE AUTHENTICATION METHODS
// ==========================================

// 1. REAL SIGN UP (Hashes password securely & sends confirmation email)
export const handleRealSignUp = async (email, password, companyName) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.toLowerCase().trim(),
      password: password, // Automatically hashed securely by Supabase backend
      options: {
        data: { company_name: companyName },
      },
    });

    if (error) {
      return { success: false, message: error.message };
    }
    return {
      success: true,
      data,
      message: 'Account created! Please check your email to verify your account.',
    };
  } catch (err) {
    return { success: false, message: err.message || 'Sign up failed.' };
  }
};

// 2. REAL SIGN IN (Strict database lookup & password verification)
export const handleRealSignIn = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.toLowerCase().trim(),
      password: password,
    });

    if (error) {
      return { success: false, message: 'Access Denied: Invalid email or password.' };
    }
    return { success: true, user: data.user, message: 'Authentication successful!' };
  } catch (err) {
    return { success: false, message: err.message || 'Sign in failed.' };
  }
};
