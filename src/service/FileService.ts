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

    public static dataURLtoFile = (dataurl: string, filename: string): File => {
    // Séparer les métadonnées de la base64
    const arr = dataurl.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) {
        throw new Error('Type MIME non valide dans le Data URL.');
    }
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}
}

export default FileService;