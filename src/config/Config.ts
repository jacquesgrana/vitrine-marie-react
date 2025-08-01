class Config {
    public static readonly SERVER_URL : string = 'https://sandybrown-duck-473650.hostingersite.com';
    
    //SecurityService
    public static readonly SUBMIT_LOGIN_URL : string = `${Config.SERVER_URL}/login`;
    public static readonly GET_USER_INFO_URL : string = `${Config.SERVER_URL}/api/user/user_infos`;
    
    //PhotoCarouselService
    public static readonly GET_PHOTO_SLIDES_URL : string = `${Config.SERVER_URL}/carousel/get_slides`;
    public static readonly SET_PHOTO_SLIDE_UP_URL : string = `${Config.SERVER_URL}/api/carousel/up/`;
    public static readonly SET_PHOTO_SLIDE_DOWN_URL : string = `${Config.SERVER_URL}/api/carousel/down/`;
    public static readonly SET_PHOTO_SLIDE_TOP_URL : string = `${Config.SERVER_URL}/api/carousel/top/`;
    public static readonly SET_PHOTO_SLIDE_BOTTOM_URL : string = `${Config.SERVER_URL}/api/carousel/bottom/`;
    public static readonly UPDATE_SLIDE_INFOS_URL : string = `${Config.SERVER_URL}/api/carousel/update/carousel-slide/`;
    public static readonly UPDATE_SLIDE_IMAGE_URL : string = `${Config.SERVER_URL}/api/carousel/update/carousel-image/`;
    public static readonly CREATE_SLIDE_URL : string = `${Config.SERVER_URL}/api/carousel/create/carousel-slide`;
    public static readonly DELETE_SLIDE_URL : string = `${Config.SERVER_URL}/api/carousel/delete/carousel-slide/`;

   //ContactFormService
    public static readonly SUBMIT_FORM_URL : string = `${Config.SERVER_URL}/contact-form`;
    public static readonly GET_CONTACT_FORMS_URL : string = `${Config.SERVER_URL}/api/contact-form/get`;
    public static readonly DELETE_CONTACT_FORM_URL : string = `${Config.SERVER_URL}/api/contact-form/delete/`;

    //ContactFormProspectService
    public static readonly GET_CONTACT_FORM_PROSPECTS_URL : string = `${Config.SERVER_URL}/api/contact-form-prospect/get`;
    public static readonly CREATE_PROSPECT_FROM_CONTACT_FORM_URL : string = `${Config.SERVER_URL}/api/contact-form-prospect/create/`;
    public static readonly UPDATE_PROSPECT_URL : string = `${Config.SERVER_URL}/api/contact-form-prospect/update/`;
    public static readonly DELETE_PROSPECT_URL : string = `${Config.SERVER_URL}/api/contact-form-prospect/delete/`;
    public static readonly CREATE_PROSPECT_URL : string = `${Config.SERVER_URL}/api/contact-form-prospect/create`;
    public static readonly EXPORT_PROSPECTS_URL : string = `${Config.SERVER_URL}/api/contact-form-prospect/export`;

    //BlogPostService
    public static readonly GET_PUBLISHED_BLOG_POSTS_URL : string = `${Config.SERVER_URL}/blog-post/published/get`;

    //LocalStorageService
    public static readonly TOKEN_DURATION_MS: number = (3600 - 30) * 1000;

    //carousel
    public static readonly GET_CAROUSEL_IMAGES_PATH : string = `${Config.SERVER_URL}/image/carousel/`;

    //blog homepage
    public static readonly GET_BLOG_POST_IMAGES_PATH : string = `${Config.SERVER_URL}/image/blog_post/`;
}

export default Config;