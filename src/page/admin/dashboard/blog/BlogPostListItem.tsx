import React from "react";
import { BlogPost } from "../../../../type/indexType";
import BlogPostService from "../../../../service/BlogPostService";

type BlogPostListItemProps = {
    blogPost: BlogPost;
    blogPostsSize: number;
    refreshPublishedList: () => Promise<void>;
    refreshUnpublishedList: () => Promise<void>;
    onViewPost: (blogPost: BlogPost) => void;
    onEditPost: (blogPost: BlogPost) => void;
}

const BlogPostListItem: React.FC<BlogPostListItemProps> = ({
    blogPost,
    blogPostsSize,
    refreshPublishedList,
    refreshUnpublishedList,
    onViewPost,
    onEditPost
}) => {
    const blogPostService = BlogPostService.getInstance();


    const handleSetPostUp = async (blogPostId: number) => {
        await blogPostService.setPostUp(blogPostId);
        await refreshPublishedList();
    };

    const handleSetPostDown = async (blogPostId: number) => {
        await blogPostService.setPostDown(blogPostId);
        await refreshPublishedList();
    };

    const handleSetPostTop = async (blogPostId: number) => {
        await blogPostService.setPostTop(blogPostId);
        await refreshPublishedList();
    };

    const handleSetPostBottom = async (blogPostId: number) => {
        await blogPostService.setPostBottom(blogPostId);
        await refreshPublishedList();
    };

    // TODO passer dans le dashboard parent
    const handleDeletePost = async (blogPostId: number) => {
        const confirm = window.confirm('Etes-vous sûr(e) de vouloir supprimer post ?');
        if(!confirm) return;
        const result = await blogPostService.deletePublishedPost(blogPostId);
        if (result.success) {
            await refreshPublishedList();
        }
    };

    const handleUnpublishPost = async (blogPostId: number) => {
        await blogPostService.unpublishPost(blogPostId);
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
                    <button 
                    title="Bouger le post vers le haut"
                    type='button' 
                    className='button-dark-very-small' 
                    onClick={() => handleSetPostUp(blogPost.id)}
                    disabled={blogPost.rank === 1}
                    >↑</button>
                    <button 
                    title="Bouger le post vers le bas"
                    type='button' 
                    className='button-dark-very-small' 
                    onClick={() => handleSetPostDown(blogPost.id)}
                    disabled={blogPost.rank === blogPostsSize}
                    >↓</button>
                    <button 
                    title="Bouger le post en haut de la liste"
                    type='button' 
                    className='button-dark-very-small' 
                    onClick={() => handleSetPostTop(blogPost.id)}
                    disabled={blogPost.rank === 1}
                    >↖</button>
                    <button 
                    title="Bouger le post en bas de la liste"
                    type='button' 
                    className='button-dark-very-small' 
                    onClick={() => handleSetPostBottom(blogPost.id)}
                    disabled={blogPost.rank === blogPostsSize}
                    >↘</button>
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
                    title="Dépublier le post" 
                    type='button' 
                    onClick={() => handleUnpublishPost(blogPost.id)}
                    className='button-dark-very-small'>🛑</button>
                </div>
            </div>

            
        </div>
    );
}

export default BlogPostListItem;