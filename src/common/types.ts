export type IAuthContext = {
    token: string | null;
    onLoginSuccess: (token: string) => void;
    onLogout: () => void;
}