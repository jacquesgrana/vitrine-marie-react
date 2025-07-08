import { PhotoSlide } from '../type/indexType';
/*
import img1 from '../assets/image/carousel/image_carousel_01.jpg';
import img2 from '../assets/image/carousel/image_carousel_02.jpg';
import img3 from '../assets/image/carousel/image_carousel_03.jpg';
import img4 from '../assets/image/carousel/image_carousel_04.jpg';
import img5 from '../assets/image/carousel/image_carousel_05.jpg';
import img6 from '../assets/image/carousel/image_carousel_06.jpg';
import img7 from '../assets/image/carousel/image_carousel_07.jpg';
import img8 from '../assets/image/carousel/image_carousel_08.jpg';
import img9 from '../assets/image/carousel/image_carousel_09.jpg';
import img10 from '../assets/image/carousel/image_carousel_10.jpg';
import img11 from '../assets/image/carousel/image_carousel_11.jpg';
import img12 from '../assets/image/carousel/image_carousel_12.jpg';
import img13 from '../assets/image/carousel/image_carousel_13.jpg';
import img13bis from '../assets/image/carousel/image_carousel_14.jpg';

import img14 from '../assets/image/carousel/stone_01.jpg';
import img15 from '../assets/image/carousel/stone_02.jpg';
import img16 from '../assets/image/carousel/stone_03.png';
import img17 from '../assets/image/carousel/stone_04.png';
import img18 from '../assets/image/carousel/stone_05.jpg';
import img19 from '../assets/image/carousel/stone_06.jpg';
import img20 from '../assets/image/carousel/stone_07.jpg';
import img21 from '../assets/image/carousel/stone_08.jpg';
import img22 from '../assets/image/carousel/stone_09.jpg';
import img23 from '../assets/image/carousel/stone_10.jpg';
import img24 from '../assets/image/carousel/stone_11.jpg';
import img25 from '../assets/image/carousel/stone_12.jpg';
import img26 from '../assets/image/carousel/stone_13.jpg';
import img27 from '../assets/image/carousel/stone_14.jpg';
import img28 from '../assets/image/carousel/stone_15.jpg';
import img29 from '../assets/image/carousel/stone_16.jpg';
import img30 from '../assets/image/carousel/stone_17.jpg';
import img31 from '../assets/image/carousel/stone_18.jpg';
import img32 from '../assets/image/carousel/stone_19.jpg';
//import img33 from '../assets/image/carousel/stone_20.jpg';
*/
import SecurityService from './SecurityService';


class PhotoCarouselService {

    private static instance: PhotoCarouselService;

    private slides: PhotoSlide[] = [];

    // TODO : faire classe config !!!!!!!!!!!!!!!!!!!!!!!
    static readonly SERVER_URL : string = 'https://sandybrown-duck-473650.hostingersite.com';
    static readonly GET_PHOTO_SLIDES_URL : string = `${PhotoCarouselService.SERVER_URL}/carousel/get_slides`;
    static readonly SET_PHOTO_SLIDES_UP_URL : string = `${PhotoCarouselService.SERVER_URL}/api/carousel/up/`;
    static readonly SET_PHOTO_SLIDES_DOWN_URL : string = `${PhotoCarouselService.SERVER_URL}/api/carousel/down/`;

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
        const url =`${PhotoCarouselService.SERVER_URL}/image/carousel/${imageName}`;
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
            const response = await fetch(PhotoCarouselService.GET_PHOTO_SLIDES_URL, {
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
            const response = await fetch(PhotoCarouselService.SET_PHOTO_SLIDES_UP_URL + slideId, {
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
            return {success: true, message: result.message}
        } catch (error) {
            console.error('Error fetching slides :', error);
            return {success: false, message: error}
        }
    }

    public async setSlideDown(slideId: number): Promise<any> {
        try {
            const response = await fetch(PhotoCarouselService.SET_PHOTO_SLIDES_DOWN_URL + slideId, {
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
            return {success: true, message: result.message}
        } catch (error) {
            console.error('Error fetching slides :', error);
            return {success: false, message: error}
        }
    }
    
}

export default PhotoCarouselService;

/*
private initSlides() {
        this.slides = [
            {
            id: 1,
            image: img1,
            title: 'Premier slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 2,
            image: img2,
            title: 'Deuxième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 3,
            image: img3,
            title: 'Troisième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 4,
            image: img4,
            title: 'Quatrième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 5,
            image: img5,
            title: 'Cinquière slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 6,
            image: img6,
            title: 'Sixième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 7,
            image: img7,
            title: 'Septième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 8,
            image: img8,
            title: 'Huitième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 9,
            image: img9,
            title: 'Neuvième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 10,
            image: img10,
            title: 'Dixième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 11,
            image: img11,
            title: 'Onzième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 12,
            image: img12,
            title: 'Douzième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 13,
            image: img13,
            title: 'Treizième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },            
            {
            id: 14,
            image: img13bis,
            title: 'Quatorzième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 15,
            image: img14,
            title: 'Quinzième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 16,
            image: img15,
            title: 'Seizième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 17,
            image: img16,
            title: 'Dix-septième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 18,
            image: img17,
            title: 'Dix-huitième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 19,
            image: img18,
            title: 'Dix-neuvième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 20,
            image: img19,
            title: 'Vingtième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 21,
            image: img20,
            title: 'Vingt et unième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 22,
            image: img21,
            title: 'Vingt-deuxième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 23,
            image: img22,
            title: 'Vingt-troisième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 24,
            image: img23,
            title: 'Vingt-quatrième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 25,
            image: img24,
            title: 'Vingt-cinquième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 26,
            image: img25,
            title: 'Vingt-sixième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 27,
            image: img26,
            title: 'Vingt-septième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 28,
            image: img27,
            title: 'Vingt-huitième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 29,
            image: img28,
            title: 'Vingt-neuvième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 30,
            image: img29,
            title: 'Trentième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 31,
            image: img30,
            title: 'Trente-et-unième slide', 
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 32,
            image: img31,
            title: 'Trente-deuxième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            id: 33,
            image: img32,
            title: 'Trente-troisième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            }
        ];
    }
*/