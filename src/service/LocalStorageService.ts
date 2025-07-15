import Config from '../config/Config';

class LocalStorageService {
    private static instance: LocalStorageService;

    //private static readonly TOKEN_DURATION_MS: number = (3600 - 50) * 1000;

    private constructor() {}

    public static getInstance(): LocalStorageService {
        if (!LocalStorageService.instance) {
            LocalStorageService.instance = new LocalStorageService();
        }
        return LocalStorageService.instance;
    }

    public setItem(key: string, value: string): void {
        localStorage.setItem(key, value);
    }

    public getItem(key: string): string | null {
        return localStorage.getItem(key);
    }

    public removeItem(key: string): void {
        localStorage.removeItem(key);
    }

    public clear(): void {
        localStorage.clear();
    }

    public setTokenTimestamp(timestamp: number): void {
        this.setItem('tokenTimestamp', timestamp.toString());
    }

    public getTokenTimestamp(): string | null {
        return this.getItem('tokenTimestamp');
    }

    public clearTokenTimestamp(): void {
        this.removeItem('tokenTimestamp');
    }

    public setToken(token: string): void {
        this.setItem('token', token);
        this.setTokenTimestamp(Date.now());
    }

    public getToken(): string | null {
        const tokenTimestamp = this.getTokenTimestamp();
        if (tokenTimestamp) {
            const timestampNow = Date.now();
            if (timestampNow - parseInt(tokenTimestamp) > Config.TOKEN_DURATION_MS) {
                this.clearToken();
                this.clearUserName();
                this.clearUserFirstName();
                this.clearUserEmail();
                this.clearIsAuthenticated();
                this.clearTokenTimestamp();
                return null;
            }
        }
        return this.getItem('token');
    }

    public clearToken(): void {
        this.removeItem('token');
    }

    public setUserName(name: string): void { 
        this.setItem('userName', name);
    }

    public getUserName(): string | null {
        return this.getItem('userName');
    }

    public clearUserName(): void {
        this.removeItem('userName');
    }

    public setUserFirstName(firstName: string): void { 
        this.setItem('userFirstName', firstName); 
    }

    public getUserFirstName(): string | null {
        return this.getItem('userFirstName');
    }

    public clearUserFirstName(): void {
        this.removeItem('userFirstName');
    }

    public setUserEmail(email: string): void { 
        this.setItem('userEmail', email); 
    }

    public getUserEmail(): string | null {
        return this.getItem('userEmail');
    }

    public clearUserEmail(): void {
        this.removeItem('userEmail');
    }

    public setIsAuthenticated(isAuthenticated: boolean): void { 
        this.setItem('isAuthenticated', isAuthenticated.toString()); 
    }

    public getIsAuthenticated(): boolean | null {
        return this.getItem('isAuthenticated') === 'true';
    }

    public clearIsAuthenticated(): void {
        this.removeItem('isAuthenticated');
    }
}

export default LocalStorageService;