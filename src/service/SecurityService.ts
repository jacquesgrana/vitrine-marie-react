
interface ApiResponse {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  data?: any;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface UserInfo {
  //id: number;
  email: string;
  name: string;
  firstName: string;
  //role: string;
}

class SecurityService {
    private static instance: SecurityService;

    private token: string | null = null;
    private user: UserInfo | null = null;

    //private readonly navigate = useNavigate();

    public static readonly SERVER_URL : string = 'https://sandybrown-duck-473650.hostingersite.com';
    public static readonly SUBMIT_LOGIN_URL : string = `${SecurityService.SERVER_URL}/api/login`;
    public static readonly GET_USER_INFO_URL : string = `${SecurityService.SERVER_URL}/api/user/user_infos`;

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
            const response = await fetch(SecurityService.SUBMIT_LOGIN_URL, {
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
        console.log('token récupéré !!', this.token);

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
            console.log('user recuperé !!', this.user);
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
            const response = await fetch(SecurityService.GET_USER_INFO_URL, {
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

    public logout(): void {
        this.clearToken();
        this.user = null;
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
        return this.token !== null;
    }

    public getUser(): UserInfo | null {
        return this.user;
    }
}

export default SecurityService;