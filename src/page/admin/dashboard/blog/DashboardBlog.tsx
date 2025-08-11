import { useCallback, useEffect, useState } from "react";
import { BlogPost, BlogTag } from "../../../../type/indexType";
import BlogPostService from "../../../../service/BlogPostService";
import LoadingSpinner from "../../../../common/LoadingSpinner";
import BlogPostListItem from "./BlogPostListItem";
import UnpublishedBlogPostListItem from "./UnpublishedBlogPostListItem";
import ModalViewBlogPost from "./ModalViewBlogPost";
import ModalEditBlogPost from "./ModalEditBlogPost";
import BlogTagService from "../../../../service/BlogTagService";
import ModalCreateBlogPost from "./ModalCreateBlogPost";


const DashboardBlog: React.FC = () => {
    const [publishedBlogPosts, setPublishedBlogPosts] = useState<BlogPost[]>([]);
    const [unpublishedBlogPosts, setUnpublishedBlogPosts] = useState<BlogPost[]>([]);
    const [allTags, setAllTags] = useState<BlogTag[]>([]);
    const [isLoadingPublished, setIsLoadingPublished] = useState(true);
    const [isLoadingUnpublished, setIsLoadingUnpublished] = useState(true);
    const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);

    const blogPostService: BlogPostService = BlogPostService.getInstance();
    const blogTagService: BlogTagService = BlogTagService.getInstance();

    const [isWaiting, setIsWaiting] = useState<boolean>(false);
    
    
    useEffect(() => {
        const refreshPublishedListIn = async () => {
            setIsLoadingPublished(true);
            await blogPostService.fetchBlogPosts();
            const postsFromService = await blogPostService.getBlogPosts();
            setPublishedBlogPosts(postsFromService);
            setIsLoadingPublished(false);
        }

        const refreshUnpublishedListIn = async () => {
            setIsLoadingUnpublished(true);
            await blogPostService.fetchUnpublishedBlogPosts();
            const postsFromService = await blogPostService.getUnpublishedBlogPosts();
            setUnpublishedBlogPosts(postsFromService);
            setIsLoadingUnpublished(false);
        }

        const refreshTagsIn = async () => {
            //setIsLoading(true);
            await blogTagService.fetchBlogTags();
            const tagsFromService = await blogTagService.getBlogTags();
            setAllTags(tagsFromService);
            //setIsLoading(false);
        }

        refreshTagsIn();
        refreshPublishedListIn();
        refreshUnpublishedListIn();
    }, [blogPostService, blogTagService]);

    
    const refreshPublishedList = useCallback(async () => {
        setIsLoadingPublished(true);
        await blogPostService.fetchBlogPosts();
        const postsFromService = await blogPostService.getBlogPosts();
        setPublishedBlogPosts(postsFromService);
        setIsLoadingPublished(false);
    }, [blogPostService]);

    const refreshUnpublishedList = useCallback(async () => {
        setIsLoadingUnpublished(true);
        await blogPostService.fetchUnpublishedBlogPosts();
        const postsFromService = await blogPostService.getUnpublishedBlogPosts();
        setUnpublishedBlogPosts(postsFromService);
        setIsLoadingUnpublished(false);
    }, [blogPostService]);

    const refreshTags = useCallback(async () => {
        await blogTagService.fetchBlogTags();
        const tagsFromService = await blogTagService.getBlogTags();
        setAllTags(tagsFromService);
    }, [blogTagService]);


    const resfreshAll = useCallback(async () => {
        await refreshTags();
        await refreshPublishedList();
        await refreshUnpublishedList();
    }, [refreshTags, refreshPublishedList, refreshUnpublishedList]);


    useEffect(() => {
        blogTagService.subscribeTagsObservers(resfreshAll);
        return () => {
            blogTagService.unsubscribeTagsObservers(resfreshAll);
        };
    }, [blogTagService, resfreshAll]);


    

    const onViewPost = useCallback((blogPost: BlogPost) => {
        setSelectedBlogPost(blogPost);
        setIsModalViewOpen(true);
    }, []);

    const onEditPost = useCallback((blogPost: BlogPost) => {
        setSelectedBlogPost(blogPost);
        setIsModalEditOpen(true);
    }, []);

    const handleCreatePost = useCallback(() => {
        setIsModalCreateOpen(true);
    }, []);

    const handleCloseViewModal = useCallback(() => {
        setSelectedBlogPost(null);
        setIsModalViewOpen(false);
    }, []);

    const handleCloseEditModal = useCallback(() => {
        setSelectedBlogPost(null);
        setIsModalEditOpen(false);
    }, []);

    const handleCloseCreateModal = useCallback(() => {
        setIsModalCreateOpen(false);
    }, []); 
    

    return(
        <div className='dashboard-carousel-container'>
            <h4 className='mt-3 mb-3'>Gestion des articles du blog</h4>
            <button title="Ajouter un post" className='button-dark-small' onClick={handleCreatePost}>Ajouter</button> 
            <p className="dashboard-carousel-list-title">LISTE DES ARTICLES PUBLIES</p>
            <div className='dashboard-carousel-list-container'>
                {isLoadingPublished ? (
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
                        isWaiting={isWaiting}
                        setIsWaiting={setIsWaiting}
                        />
                    ))
                )}
            </div>
            <p className="dashboard-carousel-list-title">LISTE DES ARTICLES NON PUBLIES</p>
            <div className='dashboard-carousel-list-container'>
                {isLoadingUnpublished ? (
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
                        isWaiting={isWaiting}
                        setIsWaiting={setIsWaiting}
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
                    refreshPublishedList={refreshPublishedList}
                    refreshUnpublishedList={refreshUnpublishedList}
                    />
                )}

                {isModalCreateOpen && (
                    <ModalCreateBlogPost 
                    isModalCreatePostOpen={isModalCreateOpen}
                    handleCloseCreatePostModal={handleCloseCreateModal}
                    allTags={allTags}
                    refreshPublishedList={refreshPublishedList}
                    refreshUnpublishedList={refreshUnpublishedList}
                    />
                )}
        </div>
    );
}

export default DashboardBlog;