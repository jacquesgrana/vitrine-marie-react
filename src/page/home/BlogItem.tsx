import BlogPostService from "../../service/BlogPostService";
import { BlogPost } from "../../type/indexType";

type BlogPostProps = {
    blogPost: BlogPost;
};

const BlogItem = ({ blogPost }: BlogPostProps) => {
  const blogPostService = BlogPostService.getInstance();


    return (
        <article className="blog-post-container">
            <h3 className='mt-2 blog-post-title'>{blogPost.title}</h3>
            <p className='mt-3 blog-post-intro'>{blogPost.intro}</p>
            <img className='mt-2 mb-5 blog-post-image' src={blogPostService.getBlogImageUrl(blogPost.imageName)} alt={blogPost.title}></img>
            <p className='mt-1 blog-post-text'>{blogPost.text}</p>
            <p className="mt-3 blog-post-date">{new Date(blogPost.createdAt.date.replace(' ', 'T')).toLocaleString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}</p>
            <p className="mt-3 blog-post-date">{new Date(blogPost.modifiedAt.date.replace(' ', 'T')).toLocaleString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })}</p>
            <p className="mt-3 blog-post-author">{blogPost.author.firstName} {blogPost.author.name}</p>
        </article>
    );
};

export default BlogItem;
