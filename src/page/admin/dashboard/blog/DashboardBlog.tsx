import { useEffect, useState } from "react";
import { BlogPost, BlogTag } from "../../../../type/indexType";
import BlogPostService from "../../../../service/BlogPostService";
import LoadingSpinner from "../../../../common/LoadingSpinner";
import BlogPostListItem from "./BlogPostListItem";
import UnpublishedBlogPostListItem from "./UnpublishedBlogPostListItem";
import ModalViewBlogPost from "./ModalViewBlogPost";
import ModalEditBlogPost from "./ModalEditBlogPost";
import BlogTagService from "../../../../service/BlogTagService";


const DashboardBlog: React.FC = () => {
    const [publishedBlogPosts, setPublishedBlogPosts] = useState<BlogPost[]>([]);
    const [unpublishedBlogPosts, setUnpublishedBlogPosts] = useState<BlogPost[]>([]);
    const [allTags, setAllTags] = useState<BlogTag[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);

    const blogPostService: BlogPostService = BlogPostService.getInstance();
    const blogTagService: BlogTagService = BlogTagService.getInstance();

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

        const refreshTagsIn = async () => {
            //setIsLoading(true);
            await blogTagService.fetchBlogTags();
            const tagsFromService = await blogTagService.getBlogTags();
            setAllTags(tagsFromService);
            //setIsLoading(false);
        }

        refreshPublishedListIn();
        refreshUnpublishedListIn();
        refreshTagsIn();
        
    }, [blogPostService, blogTagService]);

    
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

    const refreshTags = async () => {
        //setIsLoading(true);
        await blogTagService.fetchBlogTags();
        const tagsFromService = await blogTagService.getBlogTags();
        setAllTags(tagsFromService);
        //setIsLoading(false);
    };

    const onViewPost = (blogPost: BlogPost) => {
        //console.log('onViewPost', blogPost);
        setSelectedBlogPost(blogPost);
        setIsModalViewOpen(true);
    };

    const onEditPost = (blogPost: BlogPost) => {
        //console.log('onEditPost', blogPost);
        setSelectedBlogPost(blogPost);
        setIsModalEditOpen(true);
    };

    const handleCreatePost = () => {
        console.log('handleCreatePost');
    };

    const handleCloseViewModal = () => {
        setSelectedBlogPost(null);
        setIsModalViewOpen(false);
    };

    const handleCloseEditModal = () => {
        setSelectedBlogPost(null);
        setIsModalEditOpen(false);
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
                        refreshPublishedList={refreshPublishedList}
                        refreshUnpublishedList={refreshUnpublishedList}
                        onViewPost={onViewPost}
                        onEditPost={onEditPost}
                        />
                    ))
                )}
            </div>
                {selectedBlogPost && isModalViewOpen && (
                    <ModalViewBlogPost 
                    selectedBlogPost={selectedBlogPost}
                    isModalViewOpen={isModalViewOpen}
                    handleCloseViewModal={handleCloseViewModal}
                    />
                )}
                {selectedBlogPost && isModalEditOpen && (
                    <ModalEditBlogPost 
                    blogPost={selectedBlogPost}
                    isModalEditPostOpen={isModalEditOpen}
                    handleCloseEditPostModal={handleCloseEditModal}
                    allTags={allTags}
                    />
                )}
        </div>
    );
}

export default DashboardBlog;