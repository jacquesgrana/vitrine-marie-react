import React from "react";
import { BlogPost } from "../../../../type/indexType";
import BlogPostService from "../../../../service/BlogPostService";

interface UnpublishedBlogPostListItemProps {
    blogPost: BlogPost;
    blogPostsSize: number;
    refreshPublishedList: () => Promise<void>;
    refreshUnpublishedList: () => Promise<void>;
    onViewPost: (blogPost: BlogPost) => void;
    onEditPost: (blogPost: BlogPost) => void;
}

const UnpublishedBlogPostListItem: React.FC<UnpublishedBlogPostListItemProps> = ({
    blogPost,
    blogPostsSize,
    refreshPublishedList,
    refreshUnpublishedList,
    onViewPost,
    onEditPost
}) => {
    const blogPostService = BlogPostService.getInstance();

    const handleDeletePost = async (blogPostId: number) => {
        await blogPostService.deletePost(blogPostId);
    };

    const handlePublishPost = async (blogPostId: number) => {
        await blogPostService.publishPost(blogPostId);
        await refreshPublishedList();
        await refreshUnpublishedList();
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
        //alt={slide.alt} 
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
                    <button 
                    title="Voir le post"
                    type='button' 
                    onClick={() => handleViewPost()} 
                    className='button-dark-very-small'
                    >👁️</button>
                    <button 
                    title="Modifier le post" 
                    type='button' 
                    onClick={() => handleEditPost()} 
                    className='button-dark-very-small'>🖊️</button>
                    <button 
                    title="Supprimer le post" 
                    type='button' 
                    onClick={() => handleDeletePost(blogPost.id)}
                    className='button-dark-very-small'>✖</button>
                    <button 
                    title="Publier le post" 
                    type='button' 
                    onClick={() => handlePublishPost(blogPost.id)}
                    className='button-dark-very-small'>📢</button>
                </div>
            </div>

            
        </div>
    );
}

export default UnpublishedBlogPostListItem;