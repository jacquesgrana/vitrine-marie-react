import LocalStorageService from './LocalStorageService';
import { UserInfo, ApiResponse, LoginFormData } from '../type/indexType';
import Config from '../config/Config';

class SecurityService {
    private static instance: SecurityService;

    private token: string | null = null;
    private user: UserInfo | null = null;

    private _isAuthenticated: boolean = false;

    // Liste des souscripteurs de l'authentification : tableau de callback
    private subscribers: Array<(user: UserInfo | null) => void> = [];

    private localStorageService: LocalStorageService = LocalStorageService.getInstance();

    // TODO : mettre dans une classe config
    /*
    public static readonly SERVER_URL : string = 'https://sandybrown-duck-473650.hostingersite.com';
    public static readonly SUBMIT_LOGIN_URL : string = `${SecurityService.SERVER_URL}/api/login`;
    public static readonly GET_USER_INFO_URL : string = `${SecurityService.SERVER_URL}/api/user/user_infos`;
    */

    private constructor() {}

    public static getInstance(): SecurityService {
        if (!SecurityService.instance) {
            SecurityService.instance = new SecurityService();
        }
        return SecurityService.instance;
    }

    public async tryLogin(formData: LoginFormData): Promise<ApiResponse> {
        //route : /api/login
        // verifier données formulaire ?
        // requete au backend
        // si erreur, afficher message
        // si ok, stocker token

        try {
            // 5. Configuration de la requête
            const response = await fetch(Config.SUBMIT_LOGIN_URL, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            },
            body: JSON.stringify(formData),
            //credentials: 'omit', // Si tu as besoin des cookies
            //mode: 'cors'
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return {
            success: false,
            message: errorData.message || "Une erreur est survenue",
            errors: errorData.errors || {}
            };
        }

        const data = await response.json();

        //console.log('data recuperee', data);

        this.setToken(data.token);
        //console.log('token récupéré !!', this.token);

        const responseUserInfos : any = await this.getUserInfo();
        if(!responseUserInfos.success) {
            return {
                success: false,
                message: "Connexion reussie, mais impossible de recuperer les infos de l'utilisateur",
                errors: responseUserInfos.errors
            };
        }
        else {
            
            this.user = responseUserInfos.data;
            this.saveLocalStorageDatas();
            this._isAuthenticated = true;
            //console.log('user recuperé !!', this.user);
            this.notifySubscribers();
            //navigate('/admin/dashboard');
            //window.location.href = '/admin/dashboard';
        }   


        return {
            success: true,
            message: "Connexion reussie",
            data: data
        };

        // appeler méthode qui fait une requete sur /api/user_infos
        
        // si erreur, afficher message


        }
        catch (error) {
            return {
                success: false,
                message: "Une erreur est survenue",
                errors: {}
            };
        }

        
    }

    // méthode qui fait une requete sur /api/user_infos en GET
    public async getUserInfo(): Promise<ApiResponse> {
        try {
            // 5. Configuration de la requête
            const response = await fetch(Config.GET_USER_INFO_URL, {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${this.token}`
            },
            //credentials: 'omit', // Si tu as besoin des cookies
            //mode: 'cors'
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return {
            success: false,
            message: errorData.message || "Une erreur est survenue",
            errors: errorData.errors || {}
            };
        }

        const data = await response.json();

        //console.log('data recuperee', data);
        const toReturn = {
            success: true,
            message: "Connexion reussie",
            data: data
        }        
        //this.user = data;
        return toReturn;
        }
        catch (error) {
            return {
                success: false,
                message: "Une erreur est survenue",
                errors: {}
            };
        }
    }

    public subscribe(callback: (user: UserInfo | null) => void): () => void {
        this.subscribers.push(callback);
        return () => {
            this.subscribers = this.subscribers.filter(sub => sub !== callback);
        };
    }

    private notifySubscribers(): void {
        this.subscribers.forEach(callback => callback(this.user));
    }


    public onLoad(): void {
        //console.log("onLoad");
        //console.log('isAuthenticated', this.localStorageService.getIsAuthenticated());
        if(this.localStorageService.getIsAuthenticated() === true) {
            this._isAuthenticated = true;
            this.loadLocalStorageDatas();
        }
        
    }

    public saveLocalStorageDatas(): void {
        if(this.token === null || this.user === null) {
            return;
        }
        this.localStorageService.setToken(this.token);
        this.localStorageService.setUserName(this.user.name);
        this.localStorageService.setUserFirstName(this.user.firstName);
        this.localStorageService.setUserEmail(this.user.email);
        this.localStorageService.setIsAuthenticated(true);
    }

    public clearLocalStorageDatas(): void {
        this.localStorageService.clearToken();
        this.localStorageService.clearUserName();
        this.localStorageService.clearUserFirstName();
        this.localStorageService.clearUserEmail();
        this.localStorageService.clearIsAuthenticated();
    }

    public loadLocalStorageDatas(): void {
        this.token = this.localStorageService.getToken();
        //console.log('token', this.token);
        this.user = {
            name: this.localStorageService.getUserName() ?? '',
            firstName: this.localStorageService.getUserFirstName() ?? '',
            email: this.localStorageService.getUserEmail() ?? ''
        };
        //console.log('user', this.user);
        this._isAuthenticated = this.localStorageService.getIsAuthenticated() ?? false;
        //console.log('isAuthenticated', this._isAuthenticated);
        this.notifySubscribers(); // Ajoutez cette ligne
    }


    public clearUser(): void {
        this.user = null;
    }

    public logout(): void {
        this.clearToken();
        this.clearUser();
        this.clearLocalStorageDatas();
        this._isAuthenticated = false;
        this.notifySubscribers(); // Ajoutez cette ligne
    }

    public getToken(): string | null {
        return this.token;
    }

    public setToken(token: string): void {
        this.token = token;
    }

    public clearToken(): void {
        this.token = null;
    }

    public isAuthenticated(): boolean {
        return this.token !== null && this.user !== null && this._isAuthenticated;
    }

    public setIsAuthenticated(isAuthenticated: boolean): void {
        this._isAuthenticated = isAuthenticated;
    }

    public getUser(): UserInfo | null {
        return this.user;
    }
}

export default SecurityService;