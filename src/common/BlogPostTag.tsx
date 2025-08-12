import { BlogTag } from "../type/indexType";

type BlogPostTagProps = {
    tag: BlogTag;
    handleClick?: (e: any) => void;
    title?: string;
}

const BlogPostTag: React.FC<BlogPostTagProps> = ({ 
    tag,
    handleClick,
    title
 }: BlogPostTagProps) => {
    return (
        <div 
        className="blog-post-tag"
        style={{cursor: handleClick ? 'pointer' : 'default'}}
        onClick={handleClick}
        title={title ?? "Tag " + tag.name}
        >{tag.name}</div>
    );
};

export default BlogPostTag;