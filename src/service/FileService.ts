class FileService {
    private static instance: FileService;

    private constructor() {}

    public static getInstance(): FileService {
        if (!FileService.instance) {
            FileService.instance = new FileService();
        }
        return FileService.instance;
    }

    public async selectFile(): Promise<File | null> {
        return new Promise((resolve) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (event: Event) => {
                const target = event.target as HTMLInputElement;
                const file = target.files ? target.files[0] : null;
                resolve(file);
            };
            input.click();
        });
    }
}

export default FileService;