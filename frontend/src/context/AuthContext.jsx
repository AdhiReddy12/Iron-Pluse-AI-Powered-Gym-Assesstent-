import { createContext, useContext, useState, useEffect } from 'react';
import { fetchUserProfile, logoutUser, SESSION_AUTH } from '../api/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            const cached = localStorage.getItem('iron_auth_user');
            return cached ? JSON.parse(cached) : null;
        } catch {
            return null;
        }
    });
    const [loading, setLoading] = useState(() => {
        try {
            return !localStorage.getItem('iron_auth_user');
        } catch {
            return true;
        }
    });

    useEffect(() => {
        let active = true;

        // Remove JWTs saved by versions before HttpOnly cookie authentication.
        sessionStorage.removeItem('auth_credentials');
        sessionStorage.removeItem('auth_user');

        const handleAuthExpired = () => {
            setUser(null);
            try {
                localStorage.removeItem('iron_auth_user');
            } catch {}
        };
        window.addEventListener('auth-expired', handleAuthExpired);

        const restoreSession = async () => {
            try {
                const profile = await fetchUserProfile();
                if (active) {
                    setUser(profile);
                    try {
                        localStorage.setItem('iron_auth_user', JSON.stringify(profile));
                    } catch {}
                }
            } catch {
                if (active) {
                    setUser(null);
                    try {
                        localStorage.removeItem('iron_auth_user');
                    } catch {}
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        restoreSession();

        return () => {
            active = false;
            window.removeEventListener('auth-expired', handleAuthExpired);
        };
    }, []);

    const login = (userData) => {
        setUser(userData);
        try {
            if (userData) {
                localStorage.setItem('iron_auth_user', JSON.stringify(userData));
            }
        } catch {}
    };

    const logout = async () => {
        try {
            await logoutUser();
        } finally {
            setUser(null);
            try {
                localStorage.removeItem('iron_auth_user');
            } catch {}
        }
    };

    return (
        <AuthContext.Provider value={{ user, token: user ? SESSION_AUTH : null, loading, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
