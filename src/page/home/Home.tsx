import React, { useEffect, useState } from 'react'
import cyanYellowMandala from '../../assets/image/canvas/cyan_yellow_mandala.png'
import BlogPostService from '../../service/BlogPostService';
import { BlogPost } from '../../type/indexType';
import LoadingSpinner from '../../common/LoadingSpinner';
import BlogItem from './BlogItem';


const Home: React.FC = () => {
  const blogPostService = BlogPostService.getInstance();
  const [isLoading, setIsLoading] = useState(true);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  
  useEffect(() => {
    //blogPostService.fetchBlogPosts();
    const loadBlogPosts = async () => {
        setIsLoading(true);
        await blogPostService.fetchBlogPosts();
        const fetchedBlogPosts = await blogPostService.getBlogPosts();
        setBlogPosts(fetchedBlogPosts);
        setIsLoading(false);
    };

    loadBlogPosts();
  }, [blogPostService]);

  return(
    <div className='app-container'>
      <h2 className='mt-5'>Accueil</h2>
      <p className='mt-3 mb-3 text-xlarge-white'>Bienvenue sur le site de Sushi Dot Painting.</p>
      {isLoading ? (
          <div className="photo-carousel-outer-container">
            <LoadingSpinner minHeight={120}/>
          </div>
        ) : (
          <div className="blog-container">
            {blogPosts.map((blogPost) => (
              <BlogItem key={blogPost.id} blogPost={blogPost} />
            ))}
          </div>
        )}
      <img className='mt-5 mb-5 image-home' src={cyanYellowMandala} alt='cyan yellow mandala'></img>
    </div>
  )
}

export default Home;
