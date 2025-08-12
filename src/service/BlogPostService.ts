import Config from "../config/Config";
import ToastFacade from "../facade/ToastFacade";
import { ApiResponse, BlogPost, BlogTag } from "../type/indexType";
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

    public async deletePost(blogPostId: number): Promise<ApiResponse> {
        console.log('deletePost : ' + blogPostId);
        
        try {
            const response = await fetch(Config.DELETE_BLOG_POST_URL + blogPostId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.securityService.getToken()}`
                }
            });
            const result = await response.json();
            ToastFacade.showSuccessToast(result.message);
            return {
                success: true,
                message: result.message,
                data: result.data
            }
        } 
        catch (error: any) {
            console.error('Error deleting blog post :', error);
            return {
                success: false,
                message: error,
                data: null
            }
        }
    }

    public async deletePublishedPost(blogPostId: number): Promise<ApiResponse> {        
        return await this.deletePost(blogPostId);
    }

    public async deleteUnpublishedPost(blogPostId: number): Promise<ApiResponse> {
        return await this.deletePost(blogPostId);
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

    public async updatePostFromForm(
        id: number,
        slug: string,
        title: string,
        intro: string,
        text: string,
        tags: string[]
    ): Promise<ApiResponse> {
        /*
        console.log('slug : ' + slug);
        console.log('title : ' + title);
        console.log('intro : ' + intro);
        console.log('text : ' + text);
        console.log('tags : ' + tags);
        console.log('id : ' + id);
        */
        try {
            const bodyData = JSON.stringify({ 
                slug: slug,
                title: title, 
                intro: intro, 
                text: text, 
                tags: tags.join(';') 
            });
            //console.log(bodyData);
            
            const response = await fetch(Config.UPDATE_BLOG_POST_INFOS_URL + id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.securityService.getToken()}`
                },
                body: bodyData
            });
            const result = await response.json();
            result.success ? ToastFacade.showSuccessToast(result.message) : ToastFacade.showErrorToast(result.message);
            return {
                success: result.success, 
                message: result.message, 
                data: result.data
            }
        } catch (error) {
            console.error('Error updating blog post :', error);
            return {
                success: false,
                message: 'Error updating blog post',
                data: error
            }
        }
        
    }

    public async updatePostImageFromForm(id: number, image: File): Promise<ApiResponse> {
        try {
            const formData = new FormData();
            formData.append('imageFile', image);
            //formData.append('imageName', imageName);
            const response = await fetch(Config.UPDATE_BLOG_POST_IMAGE_URL + id, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.securityService.getToken()}`
                },
                body: formData
            });
            const result = await response.json();
            if(!result.success) {
                ToastFacade.showErrorToast(result.message);
                return {
                    success: result.success, 
                    message: result.message, 
                    data: result.data
                }
            }      
            ToastFacade.showSuccessToast(result.message);
            return {
                success: result.success, 
                message: result.message, 
                data: result.data
            }
        } catch (error) {
            console.error('Error updating blog post image :', error);
            return {
                success: false,
                message: 'Error updating blog post image',
                data: error
            }
        }
    }

    public async createPostFromForm(
        slug: string,
        title: string,
        intro: string,
        text: string,
        tags: string,
        fileToSend: File
    ): Promise<ApiResponse> {
        try {
            const formData = new FormData();
            formData.append('slug', slug);
            formData.append('title', title);
            formData.append('intro', intro);
            formData.append('text', text);
            formData.append('tags', tags);
            formData.append('imageFile', fileToSend);
            const response = await fetch(Config.CREATE_BLOG_POST_URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.securityService.getToken()}`
                },
                body: formData
            });
            const result = await response.json();
            if(!result.success) {
                ToastFacade.showErrorToast(result.message);
                return {
                    success: result.success, 
                    message: result.message, 
                    data: result.data
                }
            }      
            ToastFacade.showSuccessToast(result.message);
            return {
                success: result.success, 
                message: result.message, 
                data: result.data
            }
        } catch (error) {
            console.error('Error creating blog post :', error);
            return {
                success: false,
                message: 'Error creating blog post',
                data: error
            }
        }
    }
    
    public getCollectedTagsFromPosts(): BlogTag[] {
        if (this.blogPosts.length === 0) {
            return [];
        }

        const uniqueTags: BlogTag[] = [];
        
        this.blogPosts.forEach((post) => {
            post.tags.forEach((tag) => {
                // Vérifier si un tag avec cet id existe déjà
                if (!uniqueTags.some(existingTag => existingTag.id === tag.id)) {
                    uniqueTags.push(tag);
                }
            });
        });

        return uniqueTags.sort((a, b) => a.name.localeCompare(b.name));
    }

}


export default BlogPostService;