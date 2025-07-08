import { PhotoSlide } from "../../../../type/indexType"; // Assurez-vous que le chemin d'importation est correct
import PhotoCarouselService from '../../../../service/PhotoCarouselService';

// TODO passer dans les types
interface DashboardCarouselListItemProps {
  slide: PhotoSlide;
  slidesSize: number;
  refreshList: () => Promise<void>;
  onViewSlide: (slide: PhotoSlide) => void;
  onEditSlide: (slide: PhotoSlide) => void;
}

const DashboardCarouselListItem: React.FC<DashboardCarouselListItemProps> = ({ slide, slidesSize, refreshList, onViewSlide, onEditSlide }) => {
    const photoCarouselService = PhotoCarouselService.getInstance();


    const handleSetSlideUp = async (id: number) => {
        await photoCarouselService.setSlideUp(id);
        await refreshList();
    };

    const handleSetSlideDown = async (id: number) => {
        await photoCarouselService.setSlideDown(id);
        await refreshList();
    };
    
    const handleViewSlide = async () => {
        console.log('View slide :', slide);
        onViewSlide(slide);
    };


    const handleEditSlide = async () => {
        console.log('Edit slide :', slide);
        onEditSlide(slide);
    };

    
    const handleDeleteSlide = async () => {
        console.log('Delete slide :', slide.id);
        //await photoCarouselService.deleteSlide(slide.id);
        //await refreshList();
    }
    

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
                <button 
                title="Bouger le slide vers le haut"
                type='button' 
                className='button-dark-very-small' 
                onClick={() => handleSetSlideUp(slide.id)}
                disabled={slide.rank === 1}
                >▲</button>
                <button 
                title="Bouger le slide vers le bas"
                type='button' 
                className='button-dark-very-small' 
                onClick={() => handleSetSlideDown(slide.id)}
                disabled={slide.rank === slidesSize}
                >▼</button>
                <button 
                title="Voir le slide"
                type='button' 
                onClick={() => handleViewSlide()} 
                className='button-dark-very-small'
                >👁️</button>
                <button 
                title="Modifier le slide" 
                type='button' 
                onClick={() => handleEditSlide()} 
                className='button-dark-very-small'>✍</button>
                <button 
                title="Supprimer le slide" 
                type='button' 
                onClick={() => handleDeleteSlide()}
                className='button-dark-very-small'>✖</button>
            </div>
      </div>
    </div>
  );
}

export default DashboardCarouselListItem;
