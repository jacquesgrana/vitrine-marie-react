import { PhotoSlide } from '../type/indexType';
import SecurityService from './SecurityService';
import Config from '../config/Config';
import ToastFacade from '../facade/ToastFacade';

class PhotoCarouselService {

    private static instance: PhotoCarouselService;

    private slides: PhotoSlide[] = [];

    // TODO : faire classe config !!!!!!!!!!!!!!!!!!!!!!!
    /*
    static readonly SERVER_URL : string = 'https://sandybrown-duck-473650.hostingersite.com';
    static readonly GET_PHOTO_SLIDES_URL : string = `${PhotoCarouselService.SERVER_URL}/carousel/get_slides`;
    static readonly SET_PHOTO_SLIDE_UP_URL : string = `${PhotoCarouselService.SERVER_URL}/api/carousel/up/`;
    static readonly SET_PHOTO_SLIDE_DOWN_URL : string = `${PhotoCarouselService.SERVER_URL}/api/carousel/down/`;
    static readonly SET_PHOTO_SLIDE_TOP_URL : string = `${PhotoCarouselService.SERVER_URL}/api/carousel/top/`;
    static readonly SET_PHOTO_SLIDE_BOTTOM_URL : string = `${PhotoCarouselService.SERVER_URL}/api/carousel/bottom/`;
    static readonly UPDATE_SLIDE_INFOS_URL : string = `${PhotoCarouselService.SERVER_URL}/api/carousel/update/carousel-slide/`;
    static readonly UPDATE_SLIDE_IMAGE_URL : string = `${PhotoCarouselService.SERVER_URL}/api/carousel/update/carousel-image/`;
    static readonly CREATE_SLIDE_URL : string = `${PhotoCarouselService.SERVER_URL}/api/carousel/create/carousel-slide`;
    static readonly DELETE_SLIDE_URL : string = `${PhotoCarouselService.SERVER_URL}/api/carousel/delete/carousel-slide/`;
    */
    private securityService : SecurityService;

    private constructor() {
        this.securityService = SecurityService.getInstance();
    }
    public static getInstance(): PhotoCarouselService {
        if (!PhotoCarouselService.instance) {
            PhotoCarouselService.instance = new PhotoCarouselService();
        }
        return PhotoCarouselService.instance;
    }


    public getImageUrl = (imageName: string) => {
        //console.log(imageName);
        //const baseUrl = window.location.origin;
        //const url = `${baseUrl}/image/carousel/${imageName}`;
        // TODO : améliorer !!!
        const url =`${Config.SERVER_URL}/image/carousel/${imageName}`;
        return (url);
    }

    public async getSlides(): Promise<PhotoSlide[]> {
        await this.fetchSlides();
        this.slides.sort((a, b) => a.rank - b.rank);
        return this.slides;
    }

    public setSlides(slides: PhotoSlide[]): void {
        this.slides = slides;
    }

    public addSlide(slide: PhotoSlide): void {
        this.slides.push(slide);
    }

    public removeSlide(index: number): void {
        this.slides.splice(index, 1);
    }

    public updateSlide(index: number, slide: PhotoSlide): void {
        this.slides[index] = slide;
    }

    public async fetchSlides(): Promise<void> {
        try {
            const response = await fetch(Config.GET_PHOTO_SLIDES_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            const result = await response.json();
            this.setSlides(result.data); //this.setSlides(result.data);
        } catch (error) {
            console.error('Error fetching slides:', error);
        }
    }

    public async initSlides() {
        await this.fetchSlides();
    }

    public async setSlideUp(slideId: number): Promise<any> {
        try {
            const response = await fetch(Config.SET_PHOTO_SLIDE_UP_URL + slideId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.securityService.getToken()}`
                }
            });
            const result = await response.json();
            //this.setSlides(result.data);
            //alert(result.message);
            ToastFacade.showSuccessToast(result.message);
            //toast.success(result.message);
            return {success: true, message: result.message}
        } 
        catch (error) {
            console.error('Error fetching slides :', error);
            return {success: false, message: error}
        }
    }

    public async setSlideDown(slideId: number): Promise<any> {
        try {
            const response = await fetch(Config.SET_PHOTO_SLIDE_DOWN_URL + slideId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.securityService.getToken()}`
                }
            });
            const result = await response.json();
            //this.setSlides(result.data);
            //alert(result.message);
            ToastFacade.showSuccessToast(result.message);
            //toast.success(result.message);
            return {success: true, message: result.message}
        } 
        catch (error) {
            console.error('Error fetching slides :', error);
            return {success: false, message: error}
        }
    }

    public async setSlideTop(slideId: number): Promise<any> {
        try {
            const response = await fetch(Config.SET_PHOTO_SLIDE_TOP_URL + slideId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.securityService.getToken()}`
                }
            });
            const result = await response.json();
            //this.setSlides(result.data);
            //alert(result.message);
            ToastFacade.showSuccessToast(result.message);

            //toast.success(result.message);
            return {success: true, message: result.message}
        } 
        catch (error) {
            console.error('Error fetching slides :', error);
            return {success: false, message: error}
        }
    }

    public async setSlideBottom(slideId: number): Promise<any> {
        try {
            const response = await fetch(Config.SET_PHOTO_SLIDE_BOTTOM_URL + slideId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.securityService.getToken()}`
                }
            });
            const result = await response.json();
            //this.setSlides(result.data);
            //alert(result.message);
            ToastFacade.showSuccessToast(result.message);
            //toast.success(result.message);
            return {success: true, message: result.message}
        } 
        catch (error) {
            console.error('Error fetching slides :', error);
            return {success: false, message: error}
        }
    }

    
    public async updateSlideFromForm(slideId: number, title: string, description: string, alt: string): Promise<any> {
        try {
            const response = await fetch(Config.UPDATE_SLIDE_INFOS_URL + slideId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.securityService.getToken()}`
                },
                body: JSON.stringify({ title, description, alt })
            });
            const result = await response.json();
            //this.setSlides(result.data);
            //alert(result.message);
            ToastFacade.showSuccessToast(result.message);
            //toast.success(result.message);
            return {success: result.success, message: result.message}
        } catch (error) {
            console.error('Error fetching slides :', error);
            return {success: false, message: error}
        }
    }
    
    
    // version avec 'Content-Type': 'application/x-www-form-urlencoded',
    /*
    public async updateSlideFromForm(slideId: number, title: string, description: string, alt: string): Promise<any> {
        try {
            // 1. On prépare le corps de la requête au format 'x-www-form-urlencoded'
            const body = new URLSearchParams();
            body.append('title', title);
            body.append('description', description);
            body.append('alt', alt);

            const response = await fetch(PhotoCarouselService.UPDATE_SLIDE_INFOS_URL + slideId, {
                method: 'POST',
                headers: {
                    // 2. On change le Content-Type pour qu'il corresponde au body
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.securityService.getToken()}`
                },
                // 3. On envoie l'objet URLSearchParams
                body: body 
            });
            const result = await response.json();
            return {success: result.success, message: result.message}
        } catch (error) {
            console.error('Error fetching slides :', error);
            return {success: false, message: error}
        }
    }*/

    public async updateSlideImageFromForm(slideId: number, imageFile: File): Promise<any> {
        try {
            // 1. Créer une instance de FormData
            const formData = new FormData();

            formData.append('imageFile', imageFile);

            const response = await fetch(Config.UPDATE_SLIDE_IMAGE_URL + slideId, { // Assurez-vous que l'URL est correcte
                method: 'POST',
                headers: {
                    // ATTENTION : Ne mettez PAS le header 'Content-Type' !
                    // Le navigateur le fera pour vous, et il ajoutera la partie 'boundary'
                    // qui est essentielle pour que le serveur puisse parser le corps de la requête.
                    // Si vous le mettez manuellement, ça ne marchera pas.
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.securityService.getToken()}`
                },
                // 3. Envoyer l'objet formData comme body
                body: formData
            });
            
            const result = await response.json();
            ToastFacade.showSuccessToast(result.message);
            //toast.success(result.message);
            return { success: result.success, message: result.message, data: result.data };
        } catch (error) {
            console.error('Error uploading image:', error);
            return { success: false, message: error };
        }
    }

    public async createSlideFromForm(title: string, description: string, alt: string, imageFile: File): Promise<any> {
        try {
            // 1. Créer une instance de FormData
            const formData = new FormData();

            formData.append('title', title);
            formData.append('description', description);
            formData.append('alt', alt);
            formData.append('imageFile', imageFile);

            const response = await fetch(Config.CREATE_SLIDE_URL, { // Assurez-vous que l'URL est correcte
                method: 'POST',
                headers: {
                    // ATTENTION : Ne mettez PAS le header 'Content-Type' !
                    // Le navigateur le fera pour vous, et il ajoutera la partie 'boundary'
                    // qui est essentielle pour que le serveur puisse parser le corps de la requête.
                    // Si vous le mettez manuellement, ça ne marchera pas.
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.securityService.getToken()}`
                },
                // 3. Envoyer l'objet formData comme body
                body: formData
            });
            
            const result = await response.json();
            //toast.success(result.message);
            ToastFacade.showSuccessToast(result.message);
            return { success: result.success, message: result.message, data: result.data };
        } 
        catch (error) {
            console.error('Error uploading image:', error);
            return { success: false, message: error };
        }
    }

    public async deleteSlide(slideId: number): Promise<any> {
        try {
            const response = await fetch(Config.DELETE_SLIDE_URL + slideId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.securityService.getToken()}`
                }
            });
            const result = await response.json();
            ToastFacade.showSuccessToast(result.message);
            //toast.success(result.message);
            //this.setSlides(result.data);
            //alert(result.message);
            return {success: true, message: result.message}
        } 
        catch (error) {
            console.error('Error fetching slides :', error);
            return {success: false, message: error}
        }
    }   

}

export default PhotoCarouselService;