import { PhotoSlide } from "../page/gallery/PhotoCarouselItem";

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

import img14 from '../assets/image/carousel/stone_01.jpg';
import img15 from '../assets/image/carousel/stone_02.jpg';
import img16 from '../assets/image/carousel/stone_03.jpg';
import img17 from '../assets/image/carousel/stone_04.jpg';
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
import img33 from '../assets/image/carousel/stone_20.jpg';


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
            description: 'Description du premier slide.',
            alt: 'First slide'
            },
            {
            image: img2,
            title: 'Deuxième slide',
            description: 'Description du deuxième slide.',
            alt: 'Second slide'
            },
            {
            image: img3,
            title: 'Troisième slide',
            description: 'Description du troisième slide.',
            alt: 'Third slide'
            },
            {
            image: img4,
            title: 'Quatrième slide',
            description: 'Description du quatrième slide.',
            alt: 'Fourth slide'
            },
            {
            image: img5,
            title: 'Cinquière slide',
            description: 'Description du cinquième slide.',
            alt: 'Fifth slide'
            },
            {
            image: img6,
            title: 'Sixième slide',
            description: 'Description du sixième slide.',
            alt: 'Sixth slide'
            },
            {
            image: img7,
            title: 'Septième slide',
            description: 'Description du septième slide.',
            alt: 'Seventh slide'
            },
            {
            image: img8,
            title: 'Huitième slide',
            description: 'Description du huitième slide.',
            alt: 'Eighth slide'
            },
            {
            image: img9,
            title: 'Neuvième slide',
            description: 'Description du neuvième slide.',
            alt: 'Ninth slide'
            },
            {
            image: img10,
            title: 'Dixième slide',
            description: 'Description du dixième slide.',
            alt: 'Tenth slide'
            },
            {
            image: img11,
            title: 'Onzième slide',
            description: 'Description du onzième slide.',
            alt: 'Eleventh slide'
            },
            {
            image: img12,
            title: 'Douzième slide',
            description: 'Description du douzième slide.',
            alt: 'Twelfth slide'
            },
            {
            image: img13,
            title: 'Treizième slide',
            description: 'Description du Treizième slide.',
            alt: 'Thirteenth slide'
            },
            {
            image: img14,
            title: 'Quatorzième slide',
            description: 'Description du Quatorzième slide.',
            alt: 'Fourteenth slide'
            },
            {
            image: img15,
            title: 'Quinzième slide',
            description: 'Description du Quinzième slide.',
            alt: 'Fifteenth slide'
            },
            {
            image: img16,
            title: 'Seizième slide',
            description: 'Description du Seizième slide.',
            alt: 'Sixteenth slide'
            },
            {
            image: img17,
            title: 'Dix-septieme slide',
            description: 'Description du Dix-septieme slide.',
            alt: 'Seventeenth slide'
            },
            {
            image: img18,
            title: 'Dix-huitieme slide',
            description: 'Description du Dix-huitieme slide.',
            alt: 'Eighteenth slide'
            },
            {
            image: img19,
            title: 'Dix-neuvieme slide',
            description: 'Description du Dix-neuvieme slide.',
            alt: 'Nineteenth slide'
            },
            {
            image: img20,
            title: 'Vingtieme slide',
            description: 'Description du Vingtieme slide.',
            alt: 'Twenty slide'
            },
            {
            image: img21,
            title: 'Vingt-unieme slide',
            description: 'Description du Vingt-unieme slide.',
            alt: 'Twenty-first slide'
            },
            {
            image: img22,
            title: 'Vingt-deuxieme slide',
            description: 'Description du Vingt-deuxieme slide.',
            alt: 'Twenty-second slide'
            },
            {
            image: img23,
            title: 'Vingt-troisieme slide',
            description: 'Description du Vingt-troisieme slide.',
            alt: 'Twenty-third slide'
            },
            {
            image: img24,
            title: 'Vingt-quatrieme slide',
            description: 'Description du Vingt-quatrieme slide.',
            alt: 'Twenty-fourth slide'
            },
            {
            image: img25,
            title: 'Vingt-cinquieme slide',
            description: 'Description du Vingt-cinquieme slide.',
            alt: 'Twenty-fifth slide'
            },
            {
            image: img26,
            title: 'Vingt-sixieme slide',
            description: 'Description du Vingt-sixieme slide.',
            alt: 'Twenty-sixth slide'
            },
            {
            image: img27,
            title: 'Vingt-septieme slide',
            description: 'Description du Vingt-septieme slide.',
            alt: 'Twenty-seventh slide'
            },
            {
            image: img28,
            title: 'Vingt-huitieme slide',
            description: 'Description du Vingt-huitieme slide.',
            alt: 'Twenty-eighth slide'
            },
            {
            image: img29,
            title: 'Vingt-neuvieme slide',
            description: 'Description du Vingt-neuvieme slide.',
            alt: 'Twenty-ninth slide'
            },
            {
            image: img30,
            title: 'Trenteieme slide', 
            description: 'Description du Trenteieme slide.',
            alt: 'Thirtieth slide'
            },
            {
            image: img31,
            title: 'Trente-unieme slide',
            description: 'Description du Trente-unieme slide.',
            alt: 'Thirty-first slide'
            },
            {
            image: img32,
            title: 'Trente-deuxieme slide',
            description: 'Description du Trente-deuxieme slide.',
            alt: 'Thirty-second slide'
            },
            {
            image: img33,
            title: 'Trente-troisieme slide',
            description: 'Description du Trente-troisieme slide.',
            alt: 'Thirty-third slide'
            }
        ];
    }
    
}

export default PhotoCarouselService;