import React, { createContext, useContext, useState } from 'react';

type PasswordVisibilityContextValue = {
    showPassword: boolean;
    toggle: () => void;
};

const PasswordVisibilityContext = createContext<PasswordVisibilityContextValue | null>(null);

export function PasswordVisibilityProvider({ children }: { children: React.ReactNode }) {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const toggle = () => setShowPassword((prev) => !prev);

    return (
        <PasswordVisibilityContext.Provider value={{ showPassword, toggle }}>
            {children}
        </PasswordVisibilityContext.Provider>
    );
}

export function usePasswordVisibility(): PasswordVisibilityContextValue {
    const context = useContext(PasswordVisibilityContext);

    if (!context) {
        throw new Error('usePasswordVisibility must be used within a <Form> component.');
    }

    return context;
}
