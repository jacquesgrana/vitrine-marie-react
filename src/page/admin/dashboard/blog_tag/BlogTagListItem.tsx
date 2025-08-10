import React from "react";
import { BlogTag } from "../../../../type/indexType";
import { Button } from "react-bootstrap";
import { on } from "events";
import BlogPostTag from "../../../../common/BlogPostTag";

type BlogTagListItemProps = {
    tag: BlogTag;
    onEditTag: (tag: BlogTag) => void;
    onDeleteTag: (tagId: number) => void;
    refreshTags: () => void;
}

const BlogTagListItem: React.FC<BlogTagListItemProps> = ({
     tag,
     onEditTag,
     onDeleteTag,
     refreshTags
    }) => {

    const handleEditTag = (tag: BlogTag) => {
        //console.log('edit tag', tag);
        onEditTag(tag);
    };

    const handleDeleteTag = (tagId: number) => {
        //console.log('delete tag', tagId);
        onDeleteTag(tagId);
    };
        
    return (
        <div key={tag.id} className="dashboard-carousel-list-item">
             <div className='dashboard-carousel-list-item-div'>
                <div className='dashboard-carousel-list-item-text-container position-relative'>   <p className="text-small-white dashboard-carousel-list-item-text"><strong><span className='text-small-secondary'>Id : </span></strong>  {tag.id}</p>
                    <p className="text-small-white dashboard-carousel-list-item-text"><strong><span className='text-small-secondary'>Nom : </span></strong>{tag.name}</p>
                    <p className="text-small-white dashboard-carousel-list-item-text"><strong><span className='text-small-secondary'>Slug : </span></strong>{tag.slug}</p>
                    <div className="mt-2 position-absolute top-0 end-0">
                        <BlogPostTag tag={tag} />
                    </div>
                </div> 
                <div className='dashboard-carousel-list-item-button-container'>
                    <Button 
                    title="Modifier le tag" 
                    type='button' 
                    onClick={() => handleEditTag(tag)} 
                    className='button-dark-very-small'>🖊️</Button>
                    <Button 
                    title="Supprimer le tag" 
                    type='button' 
                    onClick={() => handleDeleteTag(tag.id)}
                    className='button-dark-very-small'>✖</Button>
                </div> 
            </div>
        </div>
    );
};

export default BlogTagListItem;