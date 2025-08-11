import Config from "../config/Config";
import ToastFacade from "../facade/ToastFacade";
import { ApiResponse, BlogTag } from "../type/indexType";
import SecurityService from "./SecurityService";

class BlogTagService {
    private static instance: BlogTagService;

    private securityService = SecurityService.getInstance();

    private blogTags: BlogTag[] = [];
    private observers: Set<() => void> = new Set();

    private constructor() { }

    public static getInstance(): BlogTagService {
        if (!BlogTagService.instance) {
            BlogTagService.instance = new BlogTagService();
        }
        return BlogTagService.instance;
    }

    public subscribeTagsObservers(observer: () => void): void {
        this.observers.add(observer);
    }

    public unsubscribeTagsObservers(observer: () => void): void {
        this.observers.delete(observer);
    }

    public notifyTagsSubscribers(): void {
        this.observers.forEach(observer => observer());
    }

    public getBlogTags(): BlogTag[] {
        return this.blogTags;
    }

    public setBlogTags(blogTags: BlogTag[]): void {
        this.blogTags = blogTags;
    }

    public async fetchBlogTags() {
        try {
            const response = await fetch(`${Config.GET_BLOG_TAGS_URL}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            const result = await response.json();
            //console.log('Fetched blog tags : ' + result.data);
            this.setBlogTags(result.data);
        } catch (error) {
            console.error('Error fetching blog tags:', error);
        }
    }

    public async checkBlogTagUniqueness(slug: string): Promise<{success: boolean, isNewSlug: boolean}> { //Promise<boolean> {
        try {
            const data = { "slug": slug };
            const response = await fetch(`${Config.CHECK_BLOG_TAG_UNIQUENESS_URL}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.securityService.getToken()}`
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if(!result.success){
                return {success: false, isNewSlug: false};
            }
            return {success: true, isNewSlug: result.data.isNewSlug};
        } catch (error) {
            console.error('Error checking blog tag uniqueness:', error);
            return {success: false, isNewSlug: false};
        }
    }

    public async updateBlogTagFromForm(id: number, name: string, slug: string): Promise<any> {
        try {
            const data = { "name": name, "slug": slug };
            const response = await fetch(Config.UPDATE_BLOG_TAG_URL + id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.securityService.getToken()}`
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();

            if(!result.success){
                ToastFacade.showErrorToast(result.message);
                return {success: false, message: result.message}
            }
            ToastFacade.showSuccessToast(result.message);
            return {success: result.success, message: result.message}
        } 
        catch (error) {
            console.error('Error updating blog tag:', error);
            return {success: false, message: error}
        }
    }

    public async createBlogTagFromForm(name: string, slug: string): Promise<any> {
        try {
            const data = { "name": name, "slug": slug };
            const response = await fetch(Config.CREATE_BLOG_TAG_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${this.securityService.getToken()}`
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if(!result.success){
                ToastFacade.showErrorToast(result.message);
                return {success: false, message: result.message}
            }
            ToastFacade.showSuccessToast(result.message);
            return {success: result.success, message: result.message}
        } 
        catch (error) {
            console.error('Error creating blog tag:', error);
            return {success: false, message: error}
        }
    }

    public async deleteBlogTag(id: number): Promise<ApiResponse> {
        try {
            const response = await fetch(Config.DELETE_BLOG_TAG_URL + id, {
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
                success: result.success, 
                message: result.message,
                data: result.data
            }
        } 
        catch (error: any) {
            console.error('Error deleting blog tag:', error);
            return {
                success: false, 
                message: error,
                data: null
            }
        }
    }
}

export default BlogTagService;