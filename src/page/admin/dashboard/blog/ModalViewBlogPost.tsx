
import { Modal } from 'react-bootstrap';
import { BlogPost } from "../../../../type/indexType";
import BlogPostService from '../../../../service/BlogPostService';
import BlogPostTag from '../../../../common/BlogPostTag';

type ModalViewBlogPostProps = {
    isModalViewOpen: boolean;
    selectedBlogPost: BlogPost;
    handleCloseViewModal: () => void;
}

const ModalViewBlogPost: React.FC<ModalViewBlogPostProps> = (
    {
        isModalViewOpen,
        selectedBlogPost,
        handleCloseViewModal
    }) => {
    const blogPostService = BlogPostService.getInstance();

    if (!selectedBlogPost) {
        return null;
    }

    return(
        <Modal 
        size="lg"
        className="modal-dark"
        show={isModalViewOpen} 
        onHide={handleCloseViewModal} 
        centered>
            <Modal.Header className="modal-dark-header">
                <Modal.Title className="modal-dark-header-title"><span className="text-secondary">Vue de :&nbsp;</span>{selectedBlogPost.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-dark-body">
                <p className="modal-dark-body-text"><span className="text-medium-secondary">ID : </span> {selectedBlogPost.id}</p>
                <p className="modal-dark-body-text"><span className="text-medium-secondary">Slug : </span> {selectedBlogPost.slug}</p>
                <p className="modal-dark-body-text"><span className="text-medium-secondary">Rang : </span> {selectedBlogPost.rank}</p>
                <p className="modal-dark-body-text"><span className="text-medium-secondary">Publié : </span> {selectedBlogPost.isPublished ? 'Oui' : 'Non'}</p>
                <img 
                    src={blogPostService.getBlogImageUrl(   selectedBlogPost.imageName)} 
                    alt={selectedBlogPost.title}
                    className="img-fluid mb-3 mt-3" // 'img-fluid' est une classe Bootstrap pour le responsive
                />
                <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">Intro :</span></strong> {selectedBlogPost.intro}</p>
                <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">Texte :</span></strong> {selectedBlogPost.text}</p>
                <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">Date de création :</span></strong> {new Date(selectedBlogPost.createdAt.date.replace(' ', 'T')).toLocaleString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })}
                </p>
                <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">Date de modification :</span></strong> {new Date(selectedBlogPost.modifiedAt.date.replace(' ', 'T')).toLocaleString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                })}
                </p>
                <div className="mt-1 d-flex flex-wrap gap-2">
                    <p className="modal-dark-body-text"><strong><span className="text-medium-secondary">Tags : </span></strong></p>
                    
                        {selectedBlogPost.tags && selectedBlogPost.tags.map((tag) => (
                            <BlogPostTag key={tag.id} tag={tag} />
                        ))}
                    
                </div>
            </Modal.Body>
            <Modal.Footer className="modal-dark-footer">
                <button 
                    className="button-dark-small" 
                    onClick={handleCloseViewModal}
                >
                    Fermer
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalViewBlogPost;