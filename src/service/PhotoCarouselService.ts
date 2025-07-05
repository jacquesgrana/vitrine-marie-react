import { PhotoSlide } from '../type/indexType';

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


class PhotoCarouselService {

    private static instance: PhotoCarouselService;

    private slides: PhotoSlide[] = [];

    private constructor() {}
    public static getInstance(): PhotoCarouselService {
        if (!PhotoCarouselService.instance) {
            PhotoCarouselService.instance = new PhotoCarouselService();
            PhotoCarouselService.instance.initSlides();
        }
        return PhotoCarouselService.instance;
    }



    public async getSlides(): Promise<PhotoSlide[]> {
        // Simule un appel réseau qui prend du temps
    //await new Promise(resolve => setTimeout(resolve, 333)); 

    // Retourne les données (ceci viendrait d'une API dans un cas réel)
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

    private initSlides() {
        this.slides = [
            {
            image: img1,
            title: 'Premier slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img2,
            title: 'Deuxième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img3,
            title: 'Troisième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img4,
            title: 'Quatrième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img5,
            title: 'Cinquière slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img6,
            title: 'Sixième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img7,
            title: 'Septième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img8,
            title: 'Huitième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img9,
            title: 'Neuvième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img10,
            title: 'Dixième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img11,
            title: 'Onzième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img12,
            title: 'Douzième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img13,
            title: 'Treizième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },            
            {
            image: img13bis,
            title: 'Quatorzième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img14,
            title: 'Quinzième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img15,
            title: 'Seizième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img16,
            title: 'Dix-septième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img17,
            title: 'Dix-huitième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img18,
            title: 'Dix-neuvième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img19,
            title: 'Vingtième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img20,
            title: 'Vingt et unième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img21,
            title: 'Vingt-deuxième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img22,
            title: 'Vingt-troisième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img23,
            title: 'Vingt-quatrième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img24,
            title: 'Vingt-cinquième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img25,
            title: 'Vingt-sixième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img26,
            title: 'Vingt-septième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img27,
            title: 'Vingt-huitième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img28,
            title: 'Vingt-neuvième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img29,
            title: 'Trentième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img30,
            title: 'Trente-et-unième slide', 
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img31,
            title: 'Trente-deuxième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            },
            {
            image: img32,
            title: 'Trente-troisième slide',
            description: 'Description du slide.',
            alt: 'Slide'
            }
        ];
    }
    
}

export default PhotoCarouselService;