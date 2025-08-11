import React, { useCallback, useEffect, useState } from 'react'
import cyanYellowMandala from '../../assets/image/canvas/cyan_yellow_mandala.png'
import BlogPostService from '../../service/BlogPostService';
import { BlogPost, BlogTag } from '../../type/indexType';
import LoadingSpinner from '../../common/LoadingSpinner';
import BlogItem from './BlogItem';
import BlogPostTag from '../../common/BlogPostTag';
import BlogTagService from '../../service/BlogTagService';


const Home: React.FC = () => {
  const blogPostService = BlogPostService.getInstance();
  const blogTagService = BlogTagService.getInstance();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredBlogPosts, setFilteredBlogPosts] = useState<BlogPost[]>([]);
  const [allBlogPosts, setAllBlogPosts] = useState<BlogPost[]>([]);
  
  const [activeBlogTags, setActiveBlogTags] = useState<BlogTag[]>([]);
  const [inactiveBlogTags, setInactiveBlogTags] = useState<BlogTag[]>([]);
  //const [allBlogTags, setAllBlogTags] = useState<BlogTag[]>([]);
  
  const getInactiveTagsFromLists = useCallback((allTags: BlogTag[], activeTags: BlogTag[]): BlogTag[] => {
    if (!allTags || !activeTags) return [];
    const activeIds = new Set(activeTags.map(t => t.id));
    return allTags.filter(tag => !activeIds.has(tag.id));
  }, []);

  useEffect(() => {
    //blogPostService.fetchBlogPosts();
    const loadBlogPostsAndTags = async () => {
        setIsLoading(true);
        await blogPostService.fetchBlogPosts();
        const fetchedBlogPosts = blogPostService.getBlogPosts();
        setFilteredBlogPosts(fetchedBlogPosts);
        setAllBlogPosts(fetchedBlogPosts);

        await blogTagService.fetchBlogTags();
        const allTagsFromService = blogTagService.getBlogTags();

        const activeTags = blogPostService.getCollectedTagsFromPosts();
        setActiveBlogTags(activeTags);

        const inactivesTags = getInactiveTagsFromLists(allTagsFromService, activeTags);
        //console.log('inactivesTags', inactivesTags);
        setInactiveBlogTags(inactivesTags);

        setIsLoading(false);
    };

    loadBlogPostsAndTags();
  }, [blogPostService, blogTagService, getInactiveTagsFromLists]);

  useEffect(() => {
    const activeTagsIds = new Set((activeBlogTags ?? []).map(t => String(t.id)));
    if (activeTagsIds.size === 0) {
      setFilteredBlogPosts([]); // ou setFilteredBlogPosts([]); ou setFilteredBlogPosts(allBlogPosts)
      return;
    }
    setFilteredBlogPosts(
      (allBlogPosts ?? []).filter(post =>
        post.tags?.some(tag => activeTagsIds.has(String(tag.id)))
      ).sort((a, b) => a.rank - b.rank)
    );
  }, [activeBlogTags, allBlogPosts]);

  const handleClickOnActiveTag = useCallback((tag: BlogTag) => {
    setActiveBlogTags(prev => prev.filter(t => t.id !== tag.id));
    setInactiveBlogTags(prev => [...prev, tag]);
  }, []);

  const handleClickOnInactiveTag = useCallback((tag: BlogTag) => {
    setInactiveBlogTags(prev => prev.filter(t => t.id !== tag.id));
    setActiveBlogTags(prev => [...prev, tag]);
  }, []);

  /*
  const handleClickOnActiveTag = useCallback((tag: BlogTag) => {
    //console.log('active tag', tag);
    // enlever le tag de la liste des actifs
    setActiveBlogTags((prev) => {
        const filteredTags: BlogTag[] = prev.filter(t => t.id !== tag.id);
        updatePostsFromActiveTags(filteredTags);
        return filteredTags;
      });
    // ajouter le tag dans la liste des inactifs
    setInactiveBlogTags((prev) => [...prev, tag]);
    //updatePostsFromActiveTags();

  }, []);

  const handleClickOnInactiveTag = useCallback((tag: BlogTag) => {
    //console.log('inactive tag', tag);
    // enlever le tag de la liste des inactifs
    setInactiveBlogTags((prev) => prev.filter(t => t.id !== tag.id));
    // ajouter le tag dans la liste des actifs
    setActiveBlogTags((prev) => {
      const filteredTags: BlogTag[] = [...prev, tag];
      updatePostsFromActiveTags(filteredTags);
      return filteredTags;
    });
    //updatePostsFromActiveTags();
  }, []);

  const updatePostsFromActiveTags = (actives: BlogTag[]) => {
    setFilteredBlogPosts(prev => {
      const activeIds = new Set(actives.map(t => t.id));
      console.log('activeIds', activeIds);
      return allBlogPosts.filter(post => post.tags.some(tag => activeIds.has(tag.id)));
    });
  }; 
  */




  return(
    <div className='app-container'>
      <h2 className='mt-5'>Accueil</h2>
      <p className='mt-3 mb-3 text-xlarge-white'>Bienvenue sur le site de Sushi Dot Painting.</p>
      <div className='blog-post-tags-div-container'>
        <p className="blog-post-tags-list-title">TAGS ACTIFS</p>
        <div className='blog-post-tags-container'>
          {activeBlogTags && activeBlogTags.map((tag) => (
            <BlogPostTag 
            key={tag.id} 
            tag={tag} 
            handleClick={() => handleClickOnActiveTag(tag)}
            />
          ))}
        </div>
        <p className="blog-post-tags-list-title">TAGS INACTIFS</p>
        <div className='blog-post-tags-container'>
          {inactiveBlogTags && inactiveBlogTags.map((tag) => (
            <BlogPostTag 
            key={tag.id} 
            tag={tag} 
            handleClick={() => handleClickOnInactiveTag(tag)}
            />
          ))}
        </div>
      </div>
      {isLoading ? (
          <div className="photo-carousel-outer-container">
            <LoadingSpinner minHeight={120}/>
          </div>
        ) : (
          <div className="blog-container mt-2">
            {filteredBlogPosts.length === 0 && (
              <p className="text-medium-white">Aucun post correspondant aux tags actifs.</p>
            )}
            {filteredBlogPosts.map((blogPost) => (
              <BlogItem key={blogPost.id} blogPost={blogPost} />
            ))}
          </div>
        )}
      <img className='mt-5 mb-5 image-home' src={cyanYellowMandala} alt='cyan yellow mandala'></img>
    </div>
  )
}

export default Home;
