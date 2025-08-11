import React from "react";
import { BlogPost } from "../../../../type/indexType";
import BlogPostService from "../../../../service/BlogPostService";
import { Button } from "react-bootstrap";

type BlogPostListItemProps = {
    blogPost: BlogPost;
    blogPostsSize: number;
    refreshPublishedList: () => Promise<void>;
    refreshUnpublishedList: () => Promise<void>;
    onViewPost: (blogPost: BlogPost) => void;
    onEditPost: (blogPost: BlogPost) => void;
    isWaiting: boolean;
    setIsWaiting: React.Dispatch<React.SetStateAction<boolean>>;
}

const BlogPostListItem: React.FC<BlogPostListItemProps> = ({
    blogPost,
    blogPostsSize,
    refreshPublishedList,
    refreshUnpublishedList,
    onViewPost,
    onEditPost,
    isWaiting,
    setIsWaiting
}) => {
    const blogPostService = BlogPostService.getInstance();


    const handleSetPostUp = async (blogPostId: number) => {
        setIsWaiting(true);
        await blogPostService.setPostUp(blogPostId);
        await refreshPublishedList();
        setIsWaiting(false);
    };

    const handleSetPostDown = async (blogPostId: number) => {
        setIsWaiting(true);
        await blogPostService.setPostDown(blogPostId);
        await refreshPublishedList();
        setIsWaiting(false);
    };

    const handleSetPostTop = async (blogPostId: number) => {
        setIsWaiting(true);
        await blogPostService.setPostTop(blogPostId);
        await refreshPublishedList();
        setIsWaiting(false);
    };

    const handleSetPostBottom = async (blogPostId: number) => {
        setIsWaiting(true);
        await blogPostService.setPostBottom(blogPostId);
        await refreshPublishedList();
        setIsWaiting(false);
    };

    // TODO passer dans le dashboard parent
    const handleDeletePost = async (blogPostId: number) => {
        const confirm = window.confirm('Etes-vous sûr(e) de vouloir supprimer post ?');
        if(!confirm) return;
        setIsWaiting(true);
        const result = await blogPostService.deletePublishedPost(blogPostId);
        if (result.success) {
            await refreshPublishedList();
        }
        setIsWaiting(false);
    };

    const handleUnpublishPost = async (blogPostId: number) => {
        setIsWaiting(true);
        await blogPostService.unpublishPost(blogPostId);
        await refreshPublishedList();
        await refreshUnpublishedList();
        setIsWaiting(false);
    };

    const handleViewPost = async () => {
        onViewPost(blogPost);
    };

    const handleEditPost = async () => {
        onEditPost(blogPost);
    };

    return(
        <div key={blogPost.id} className="dashboard-carousel-list-item">
            <img className='dashboard-carousel-image' 
            src={blogPostService.getBlogImageUrl(blogPost.imageName)} 
            alt={blogPost.title} 
            />
            <div className='dashboard-carousel-list-item-div'>
                <div className='dashboard-carousel-list-item-text-container'>
                    <h5 className="text-large-secondary dashboard-carousel-list-item-text">{blogPost.title}</h5>
                    <p className="modal-dark-body-text text-medium-white"><strong><span className="text-medium-secondary">Date de création :</span></strong> {new Date(blogPost.createdAt.date.replace(' ', 'T')).toLocaleString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}</p>
                    <p className="text-small-white dashboard-carousel-list-item-text"><strong><span className='text-small-secondary'>Auteur : </span></strong>{blogPost.author.firstName} {blogPost.author.name}</p>
                </div>
                <div className='dashboard-carousel-list-item-button-container'>
                    <Button 
                    title="Bouger le post vers le haut"
                    type='button' 
                    className='button-dark-very-small' 
                    onClick={() => handleSetPostUp(blogPost.id)}
                    disabled={blogPost.rank === 1 || isWaiting}
                    >↑</Button>
                    <Button 
                    title="Bouger le post vers le bas"
                    type='button' 
                    className='button-dark-very-small' 
                    onClick={() => handleSetPostDown(blogPost.id)}
                    disabled={blogPost.rank === blogPostsSize || isWaiting}
                    >↓</Button>
                    <Button 
                    title="Bouger le post en haut de la liste"
                    type='button' 
                    className='button-dark-very-small' 
                    onClick={() => handleSetPostTop(blogPost.id)}
                    disabled={blogPost.rank === 1 || isWaiting}
                    >↖</Button>
                    <Button 
                    title="Bouger le post en bas de la liste"
                    type='button' 
                    className='button-dark-very-small' 
                    onClick={() => handleSetPostBottom(blogPost.id)}
                    disabled={blogPost.rank === blogPostsSize || isWaiting}
                    >↘</Button>
                    <Button 
                    title="Voir le post"
                    type='button' 
                    onClick={() => handleViewPost()} 
                    className='button-dark-very-small'
                    disabled={isWaiting}
                    >👁️</Button>
                    <Button 
                    title="Modifier le post" 
                    type='button' 
                    onClick={() => handleEditPost()} 
                    className='button-dark-very-small'
                    disabled={isWaiting}
                    >🖊️</Button>
                    <Button 
                    title="Supprimer le post" 
                    type='button' 
                    onClick={() => handleDeletePost(blogPost.id)}
                    className='button-dark-very-small'
                    disabled={isWaiting}
                    >✖</Button>
                    <Button 
                    title="Dépublier le post" 
                    type='button' 
                    onClick={() => handleUnpublishPost(blogPost.id)}
                    className='button-dark-very-small'
                    disabled={isWaiting}
                    >🛑</Button>
                </div>
            </div>

            
        </div>
    );
}

export default BlogPostListItem;