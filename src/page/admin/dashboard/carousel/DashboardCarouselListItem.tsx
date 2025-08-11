import { PhotoSlide } from "../../../../type/indexType"; // Assurez-vous que le chemin d'importation est correct
import PhotoCarouselService from '../../../../service/PhotoCarouselService';
import { Button } from "react-bootstrap";

interface DashboardCarouselListItemProps {
  slide: PhotoSlide;
  slidesSize: number;
  refreshList: () => Promise<void>;
  onViewSlide: (slide: PhotoSlide) => void;
  onEditSlide: (slide: PhotoSlide) => void;
  onEditImage: (slide: PhotoSlide) => void;
  isWaiting: boolean;
  setIsWaiting: React.Dispatch<React.SetStateAction<boolean>>;
}

const DashboardCarouselListItem: React.FC<DashboardCarouselListItemProps> = ({ 
    slide, 
    slidesSize, 
    refreshList, 
    onViewSlide, 
    onEditSlide, 
    onEditImage,
    isWaiting,
    setIsWaiting
 }) => {
    const photoCarouselService = PhotoCarouselService.getInstance();

    const handleSetSlideUp = async (id: number) => {
        setIsWaiting(true);
        await photoCarouselService.setSlideUp(id);
        await refreshList();
        setIsWaiting(false);
    };

    const handleSetSlideDown = async (id: number) => {
        setIsWaiting(true);
        await photoCarouselService.setSlideDown(id);
        await refreshList();
        setIsWaiting(false);
    };

    const handleSetSlideTop = async (id: number) => {
        setIsWaiting(true);
        await photoCarouselService.setSlideTop(id);
        await refreshList();
        setIsWaiting(false);
    };

    const handleSetSlideBottom = async (id: number) => {
        setIsWaiting(true);
        await photoCarouselService.setSlideBottom(id);
        await refreshList();
        setIsWaiting(false);
    };
    
    const handleViewSlide = async () => {
        //console.log('View slide :', slide);
        onViewSlide(slide);
    };


    const handleEditSlide = async () => {
        //console.log('Edit slide :', slide);
        onEditSlide(slide);
    };

    const handleEditImageSlide = async () => {
        //console.log('Edit image slide :', slide);
        onEditImage(slide);
    };

    
    const handleDeleteSlide = async () => {
        //console.log('Delete slide :', slide.id);
        const confirm = window.confirm('Etes-vous sur de vouloir supprimer ce slide ?');
        if(!confirm) return;
        setIsWaiting(true);
        await photoCarouselService.deleteSlide(slide.id);
        await refreshList();
        setIsWaiting(false);
    }
    

    return (
    <div className="dashboard-carousel-list-item">
        <img className='dashboard-carousel-image' 
        src={photoCarouselService.getSlideImageUrl(slide.image)} 
        alt={slide.alt} />
        <div className='dashboard-carousel-list-item-div'>
            <div className='dashboard-carousel-list-item-text-container'>
                <h5 className='text-large-secondary'>{slide.title}</h5>
                <p className='text-small-white'>{slide.description}</p>
            </div>
            <div className='dashboard-carousel-list-item-button-container'>
                <Button 
                title="Bouger le slide vers le haut"
                type='button' 
                className='button-dark-very-small' 
                onClick={() => handleSetSlideUp(slide.id)}
                disabled={isWaiting || slide.rank === 1}
                >↑</Button>
                <Button 
                title="Bouger le slide vers le bas"
                type='button' 
                className='button-dark-very-small' 
                onClick={() => handleSetSlideDown(slide.id)}
                disabled={isWaiting || slide.rank === slidesSize}
                >↓</Button>
                <Button 
                title="Bouger le slide en haut de la liste"
                type='button' 
                className='button-dark-very-small' 
                onClick={() => handleSetSlideTop(slide.id)}
                disabled={isWaiting || slide.rank === 1}
                >↖</Button>
                <Button 
                title="Bouger le slide en bas de la liste"
                type='button' 
                className='button-dark-very-small' 
                onClick={() => handleSetSlideBottom(slide.id)}
                disabled={isWaiting || slide.rank === slidesSize}
                >↘</Button>
                <Button 
                title="Voir le slide"
                type='button' 
                onClick={() => handleViewSlide()} 
                className='button-dark-very-small'
                disabled={isWaiting}
                >👁️</Button>
                <Button 
                title="Modifier les informations du slide" 
                type='button' 
                onClick={() => handleEditSlide()} 
                className='button-dark-very-small'
                disabled={isWaiting}
                >🖊️</Button>
                <Button 
                title="Modifier l'image du slide" 
                type='button' 
                onClick={() => handleEditImageSlide()} 
                className='button-dark-very-small'
                disabled={isWaiting}
                >🖼️</Button>
                <Button 
                title="Supprimer le slide" 
                type='button' 
                onClick={() => handleDeleteSlide()}
                className='button-dark-very-small'
                disabled={isWaiting}
                >✖</Button>
            </div>
      </div>
    </div>
  );
}

export default DashboardCarouselListItem;
