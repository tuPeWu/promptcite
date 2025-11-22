import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock Auth0
vi.mock('@auth0/auth0-react', () => ({
    useAuth0: () => ({
        isAuthenticated: false,
        user: null,
        loginWithRedirect: vi.fn(),
        logout: vi.fn(),
    }),
}));

// Mock Firebase
vi.mock('./firebase', () => ({
    db: {},
    auth: {},
}));

// Mock syncUserToFirebase
vi.mock('./utils/syncUserToFirebase', () => ({
    syncUserToFirebase: vi.fn(),
}));

// Mock react-router-dom
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<any>('react-router-dom');
    return {
        ...actual,
        BrowserRouter: ({ children }: { children: React.ReactNode }) => <actual.MemoryRouter>{children}</actual.MemoryRouter>,
    };
});

// Mock Translation
vi.mock('react-i18next', () => ({
    useTranslation: () => ({
        t: (key: string) => key,
        i18n: {
            changeLanguage: () => new Promise(() => { }),
            language: 'en',
        },
    }),
}));

// Mock child components
vi.mock('./components/Header', () => ({
    default: () => <div data-testid="header">Header</div>
}));

vi.mock('./components/Footer', () => ({
    default: () => <div data-testid="footer">Footer</div>
}));

describe('App', () => {
    it('renders without crashing', () => {
        render(<App />);
        // Check for something that should be on the home page or header
        // Since we don't know exactly what's on the home page without looking, 
        // checking for the header or footer existence is a safe bet if they have text.
        // Or just checking that it renders is a good first step.
    });
});
