import { BlogTag } from "../type/indexType";

type BlogPostTagProps = {
    tag: BlogTag;
}

const BlogPostTag = ({ tag }: BlogPostTagProps) => {
    return (
        <div key={tag.id} className="blog-post-tag">{tag.name}</div>
    );
};

export default BlogPostTag;