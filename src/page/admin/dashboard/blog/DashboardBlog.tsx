import { useEffect, useState } from "react";
import { BlogPost } from "../../../../type/indexType";
import BlogPostService from "../../../../service/BlogPostService";
import LoadingSpinner from "../../../../common/LoadingSpinner";
import BlogPostListItem from "./BlogPostListItem";
import UnpublishedBlogPostListItem from "./UnpublishedBlogPostListItem";


const DashboardBlog: React.FC = () => {
    const [publishedBlogPosts, setPublishedBlogPosts] = useState<BlogPost[]>([]);
    const [unpublishedBlogPosts, setUnpublishedBlogPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const blogPostService: BlogPostService = BlogPostService.getInstance();

    useEffect(() => {
        const refreshPublishedListIn = async () => {
            setIsLoading(true);
            await blogPostService.fetchBlogPosts();
            const postsFromService = await blogPostService.getBlogPosts();
            setPublishedBlogPosts(postsFromService);
            setIsLoading(false);
        }

        const refreshUnpublishedListIn = async () => {
            setIsLoading(true);
            await blogPostService.fetchUnpublishedBlogPosts();
            const postsFromService = await blogPostService.getUnpublishedBlogPosts();
            setUnpublishedBlogPosts(postsFromService);
            setIsLoading(false);
        }

        refreshPublishedListIn();
        refreshUnpublishedListIn();
        
    }, [blogPostService]);

    
    const refreshPublishedList = async () => {
        setIsLoading(true);
        await blogPostService.fetchBlogPosts();
        const postsFromService = await blogPostService.getBlogPosts();
        setPublishedBlogPosts(postsFromService);
        setIsLoading(false);
    };

    const refreshUnpublishedList = async () => {
        setIsLoading(true);
        await blogPostService.fetchUnpublishedBlogPosts();
        const postsFromService = await blogPostService.getUnpublishedBlogPosts();
        setUnpublishedBlogPosts(postsFromService);
        setIsLoading(false);
    };

    const onViewPost = (blogPost: BlogPost) => {
        console.log('onViewPost', blogPost);
    };

    const onEditPost = (blogPost: BlogPost) => {
        console.log('onEditPost', blogPost);
    };

    const handleCreatePost = () => {
        console.log('handleCreatePost');
    };
    

    return(
        <div className='dashboard-carousel-container'>
            <h4 className='mt-3 mb-3'>Gestion des articles du blog</h4>
            <button title="Ajouter un post" className='button-dark-small' onClick={handleCreatePost}>Ajouter</button> 
            <p className="dashboard-carousel-list-title">LISTE DES ARTICLES PUBLIES</p>
            <div className='dashboard-carousel-list-container'>
                {isLoading ? (
                    <div className="photo-carousel-outer-container">
                        <LoadingSpinner minHeight={120}/>
                    </div>
                ) : (
                    publishedBlogPosts.map((blogPost) => (
                        <BlogPostListItem 
                        key={blogPost.id} 
                        blogPost={blogPost} 
                        blogPostsSize={publishedBlogPosts.length
                        } 
                        refreshPublishedList={refreshPublishedList}
                        refreshUnpublishedList={refreshUnpublishedList}
                        onViewPost={onViewPost}
                        onEditPost={onEditPost}
                        />
                    ))
                )}
            </div>
            <p className="dashboard-carousel-list-title">LISTE DES ARTICLES NON PUBLIES</p>
            <div className='dashboard-carousel-list-container'>
                {isLoading ? (
                    <div className="photo-carousel-outer-container">
                        <LoadingSpinner minHeight={120}/>
                    </div>
                ) : (
                    unpublishedBlogPosts.map((blogPost) => (
                        <UnpublishedBlogPostListItem 
                        key={blogPost.id} 
                        blogPost={blogPost} 
                        blogPostsSize={unpublishedBlogPosts.length
                        } 
                        refreshPublishedList={refreshPublishedList}
                        refreshUnpublishedList={refreshUnpublishedList}
                        onViewPost={onViewPost}
                        onEditPost={onEditPost}
                        />
                    ))
                )}
            </div>

        </div>
    );
}

export default DashboardBlog;