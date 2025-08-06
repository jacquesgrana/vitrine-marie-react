import Config from "../config/Config";
import ToastFacade from "../facade/ToastFacade";
import { BlogPost } from "../type/indexType";
import SecurityService from "./SecurityService";
//import SecurityService from "./SecurityService";

class BlogPostService {
    
    private static instance: BlogPostService;

    private blogPosts: BlogPost[] = [];
    private unpublishedBlogPosts: BlogPost[] = [];

    private securityService : SecurityService;


    private constructor() {
        this.securityService = SecurityService.getInstance();
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

    public getUnpublishedBlogPosts(): BlogPost[] {
        return this.unpublishedBlogPosts;
    }

    public setUnpublishedBlogPosts(unpublishedBlogPosts: BlogPost[]): void {
        this.unpublishedBlogPosts = unpublishedBlogPosts;
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

    public async fetchUnpublishedBlogPosts() {
        try {
            const response = await fetch(`${Config.GET_UNPUBLISHED_BLOG_POSTS_URL}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.securityService.getToken()}`
                }
                
            });
            const result = await response.json();
            this.setUnpublishedBlogPosts(result.data);
        } catch (error) {
            console.error('Error fetching unpublished blog posts:', error);
        }
    }

    public async setPostUp(blogPostId: number) {
        console.log('setPostUp : ' + blogPostId);
        
        try {
            const response = await fetch(Config.SET_BLOG_POST_UP_URL + blogPostId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.securityService.getToken()}`
                }
            });
            const result = await response.json();
            ToastFacade.showSuccessToast(result.message);
        } catch (error: any) {
            console.error('Error modifying blog post :', error);
            ToastFacade.showErrorToast(error);
        }
    }   

    public async setPostDown(blogPostId: number) {
        console.log('setPostDown : ' + blogPostId);
        
        try {
            const response = await fetch(Config.SET_BLOG_POST_DOWN_URL + blogPostId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.securityService.getToken()}`
                }
            });
            const result = await response.json();
            ToastFacade.showSuccessToast(result.message);
        } catch (error: any) {
            console.error('Error modifying blog post :', error);
            ToastFacade.showErrorToast(error);
        }
    }

    public async setPostTop(blogPostId: number) {
        console.log('setPostTop : ' + blogPostId);
        
        try {
            const response = await fetch(Config.SET_BLOG_POST_TOP_URL + blogPostId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.securityService.getToken()}`
                }
            });
            const result = await response.json();
            ToastFacade.showSuccessToast(result.message);
        } catch (error: any) {
            console.error('Error modifying blog post :', error);
            ToastFacade.showErrorToast(error);

        }
    }

    public async setPostBottom(blogPostId: number) {
        console.log('setPostBottom : ' + blogPostId);
        
        try {
            const response = await fetch(Config.SET_BLOG_POST_BOTTOM_URL + blogPostId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.securityService.getToken()}`
                }
            });
            const result = await response.json();
            ToastFacade.showSuccessToast(result.message);
        } catch (error: any) {
            console.error('Error modifying blog post :', error);
            ToastFacade.showErrorToast(error);
        }
    }

    public async deletePost(blogPostId: number) {
        console.log('deletePost : ' + blogPostId);
        /*
        try {
            const response = await fetch(Config.DELETE_BLOG_POST_URL + blogPostId, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.securityService.getToken()}`
                }
            });
            const result = await response.json();
            //this.setSlides(result.data);
            //alert(result.message);
            ToastFacade.showSuccessToast(result.message);
            //toast.success(result.message);
        } catch (error) {
            console.error('Error fetching slides :', error);
        }*/
    }

    public async publishPost(blogPostId: number) {
        console.log('publishPost : ' + blogPostId);
        try {
            const response = await fetch(Config.PUBLISH_BLOG_POST_URL + blogPostId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.securityService.getToken()}`
                }
            });
            const result = await response.json();
            ToastFacade.showSuccessToast(result.message);
        } catch (error) {
            console.error('Error publishing blog post :', error);
        }
    }

    public async unpublishPost(blogPostId: number) {
        console.log('unpublishPost : ' + blogPostId);
        try {
            const response = await fetch(Config.UNPUBLISH_BLOG_POST_URL + blogPostId, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.securityService.getToken()}`
                }
            });
            const result = await response.json();
            ToastFacade.showSuccessToast(result.message);
        } catch (error) {
            console.error('Error unpublishing blog post :', error);
        }
    }
}

export default BlogPostService;