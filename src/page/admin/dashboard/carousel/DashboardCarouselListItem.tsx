import { PhotoSlide } from "../../../../type/indexType"; // Assurez-vous que le chemin d'importation est correct
import PhotoCarouselService from '../../../../service/PhotoCarouselService';

// Définition des types pour les props du composant
interface DashboardCarouselListItemProps {
  slide: PhotoSlide;
  refreshList: () => Promise<void>; 
}

const DashboardCarouselListItem: React.FC<DashboardCarouselListItemProps> = ({ slide, refreshList }) => {
    const photoCarouselService = PhotoCarouselService.getInstance();


    const handleSetSlideUp = async (id: number) => {
        await photoCarouselService.setSlideUp(id);
        await refreshList();
    };

    const handleSetSlideDown = async (id: number) => {
        await photoCarouselService.setSlideDown(id);
        await refreshList();
    };
  
    return (
    <div className="dashboard-carousel-list-item">
      <img className='dashboard-carousel-image' 
      src={photoCarouselService.getImageUrl(slide.image)} 
      alt={slide.alt} />
        <div className='dashboard-carousel-list-item-div'>
            <div className='dashboard-carousel-list-item-text-container'>
                <h5 className=''>{slide.title}</h5>
                <p className='text-small-white'>{slide.description}</p>
            </div>
            <div className='dashboard-carousel-list-item-button-container'>
                <button type='button' className='button-dark-very-small' onClick={() => handleSetSlideUp(slide.id)}>▲</button>
                <button type='button' className='button-dark-very-small' onClick={() => handleSetSlideDown(slide.id)}>▼</button>
                <button type='button' className='button-dark-very-small'>👁️</button>
                <button type='button' className='button-dark-very-small'>✍</button>
                <button type='button' className='button-dark-very-small'>❌</button>
            </div>
      </div>
    </div>
  );
}

export default DashboardCarouselListItem;
