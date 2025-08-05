import BlogPostTag from "../../common/BlogPostTag";
import BlogPostService from "../../service/BlogPostService";
import { BlogPost } from "../../type/indexType";

type BlogPostProps = {
    blogPost: BlogPost;
};

const BlogItem = ({ blogPost }: BlogPostProps) => {
  const blogPostService = BlogPostService.getInstance();


    return (
        <article className="blog-post-container">
            <h3 className='blog-post-title'>{blogPost.title}</h3>
            <p className='blog-post-intro'>{blogPost.intro}</p>
            <img className='blog-post-image' src={blogPostService.getBlogImageUrl(blogPost.imageName)} alt={blogPost.title}></img>
            <p className='blog-post-text'>{blogPost.text}</p>
            {
                blogPost.tags && (
                    <div className="blog-post-tags-container">
                        {blogPost.tags.map((tag) => (
                            <BlogPostTag key={tag.id} tag={tag} />
                        ))}
                    </div>
                )
            }
            <p className="blog-post-author"><span className="text-medium-white">Par </span>{blogPost.author.firstName} {blogPost.author.name}</p>
            <div className="d-flex justify-content-between gap-3">
                <p className="blog-post-date"><span className="text-medium-white">Créé le </span>{new Date(blogPost.createdAt.date.replace(' ', 'T')).toLocaleString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                })}</p>
                <p className="blog-post-date"><span className="text-medium-white">Modifié le </span>{new Date(blogPost.modifiedAt.date.replace(' ', 'T')).toLocaleString('fr-FR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                })}</p>
            </div>
        </article>
    );
};

export default BlogItem;
