import Config from "../config/Config";
import { BlogTag } from "../type/indexType";

class BlogTagService {
    private static instance: BlogTagService;

    private blogTags: BlogTag[] = [];

    private constructor() { }

    public static getInstance(): BlogTagService {
        if (!BlogTagService.instance) {
            BlogTagService.instance = new BlogTagService();
        }
        return BlogTagService.instance;
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
            this.setBlogTags(result.data);
        } catch (error) {
            console.error('Error fetching blog tags:', error);
        }
    }
}

export default BlogTagService;