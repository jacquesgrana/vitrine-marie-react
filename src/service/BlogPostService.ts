import Config from "../config/Config";
import { BlogPost } from "../type/indexType";
//import SecurityService from "./SecurityService";

class BlogPostService {
    
    private static instance: BlogPostService;

    private blogPosts: BlogPost[] = [];

    //private securityService : SecurityService;


    private constructor() {
        //this.securityService = SecurityService.getInstance();
     }

    public static getInstance(): BlogPostService {
        if (!BlogPostService.instance) {
            BlogPostService.instance = new BlogPostService();
        }
        return BlogPostService.instance;
    }

    public getBlogImageUrl = (imageName: string) => {
        const url = `${Config.GET_BLOG_POST_IMAGES_PATH}${imageName}`;
        return (url);
    }

    public getBlogPosts(): BlogPost[] {
        return this.blogPosts;
    }

    public setBlogPosts(blogPosts: BlogPost[]): void {
        this.blogPosts = blogPosts;
    }

    public async fetchBlogPosts() {
        try {
            const response = await fetch(`${Config.GET_PUBLISHED_BLOG_POSTS_URL}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            const result = await response.json();
            this.setBlogPosts(result.data);
            //console.log('Fetched blog posts : ' + result.data);
            //console.log('test : ' + result.data[0].intro);
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        }
    }
}

export default BlogPostService;