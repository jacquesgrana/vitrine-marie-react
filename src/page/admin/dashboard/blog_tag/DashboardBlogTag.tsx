import { useCallback, useEffect, useState } from "react";
import { BlogTag, Nullable } from "../../../../type/indexType";
import BlogTagService from "../../../../service/BlogTagService";
import LoadingSpinner from "../../../../common/LoadingSpinner";
import BlogTagListItem from "./BlogTagListItem";
import ModalEditBlogTag from "./ModalEditBlogTag";
import ModalCreateBlogTag from "./ModalCreateBlogTag";

const DashboardBlogTag: React.FC = () => {
    const [tags, setTags] = useState<BlogTag[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);
    const [isModalCreateOpen, setIsModalCreateOpen] = useState(false);
    const [selectedTag, setSelectedTag] = useState<Nullable<BlogTag>>(null);

    const blogTagService: BlogTagService = BlogTagService.getInstance();

    useEffect(() => {
        const refreshTagsIn = async () => {
            setIsLoading(true);
            await blogTagService.fetchBlogTags();
            const tagsFromService = await blogTagService.getBlogTags();
            setTags(tagsFromService);
            setIsLoading(false);
        }
        refreshTagsIn();
    }, [blogTagService]);

    
    const refreshTags = useCallback(async () => {
        setIsLoading(true);
        await blogTagService.fetchBlogTags();
        const tagsFromService = await blogTagService.getBlogTags();
        setTags(tagsFromService);
        setIsLoading(false);
    }, [blogTagService]); // Ajoute blogTagService si c'est une instance stable, sinon adapte

    const handleCreateTag = useCallback(() => {
        setIsModalCreateOpen(true);
    }, []);

    const onEditTag = useCallback((tag: BlogTag) => {
        setSelectedTag(tag);
        setIsModalEditOpen(true);
    }, []);

    const onDeleteTag = useCallback(async (tagId: number) => {
        const confirmDelete = window.confirm('Etes-vous sur de vouloir supprimer ce tag ?');
        if (!confirmDelete) return;
        const result = await blogTagService.deleteBlogTag(tagId);
        if (result.success) {
            await refreshTags();
            blogTagService.notifyTagsSubscribers();
        }
    }, [blogTagService, refreshTags]); // Ajoute refreshTags et blogTagService comme dépendances

    const handleCloseEditModal = useCallback(() => {
        setSelectedTag(null);
        setIsModalEditOpen(false);
    }, []);

    const handleCloseCreateModal = useCallback(() => {
        setIsModalCreateOpen(false);
    }, []);

    return(
        <div className='dashboard-carousel-container'>
            <h4 className='mt-3 mb-3'>Gestion des tags des articles</h4>
            <button title="Ajouter un tag" className='button-dark-small' onClick={handleCreateTag}>Ajouter</button> 
            <p className="dashboard-carousel-list-title">LISTE DES TAGS DES POSTS</p>
            <div className='dashboard-carousel-list-container'>
                {isLoading ? (
                    <LoadingSpinner minHeight={120}/>
                ) : (
                    tags.map((tag) => (
                        <BlogTagListItem 
                        key={tag.id} 
                        tag={tag} 
                        onEditTag={onEditTag} 
                        onDeleteTag={onDeleteTag}
                        refreshTags={refreshTags}
                        />
                    ))
                )}  
            </div>
            {isModalEditOpen && selectedTag && (
                <ModalEditBlogTag
                isModalEditOpen={isModalEditOpen}
                selectedBlogTag={selectedTag}
                handleCloseEditModal={handleCloseEditModal}
                refreshTags={refreshTags}
                />
            )}
            {isModalCreateOpen && (
                <ModalCreateBlogTag
                isModalCreateOpen={isModalCreateOpen}
                handleCloseCreateModal={handleCloseCreateModal}
                refreshTags={refreshTags}
                />
            )}
        </div>
    );
};

export default DashboardBlogTag;