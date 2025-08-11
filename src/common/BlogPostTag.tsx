import { BlogTag } from "../type/indexType";

type BlogPostTagProps = {
    tag: BlogTag;
    handleClick?: (e: any) => void
}

const BlogPostTag: React.FC<BlogPostTagProps> = ({ 
    tag,
    handleClick
 }: BlogPostTagProps) => {
    return (
        <div 
        className="blog-post-tag"
        style={{cursor: handleClick ? 'pointer' : 'default'}}
        onClick={handleClick}
        >{tag.name}</div>
    );
};

export default BlogPostTag;