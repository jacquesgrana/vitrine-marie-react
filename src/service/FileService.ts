class FileService {
    private static instance: FileService;

    private constructor() {}

    public static getInstance(): FileService {
        if (!FileService.instance) {
            FileService.instance = new FileService();
        }
        return FileService.instance;
    }

    public async selectImageFile(): Promise<File | null> {
        return new Promise((resolve) => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.jpg, .jpeg, .png';
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
    };

    public static getFileSignature = async (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                const arrayBuffer = event.target?.result as ArrayBuffer;
                const uint8Array = new Uint8Array(arrayBuffer);
                const header = Array.from(uint8Array.slice(0, 4))
                    .map(byte => byte.toString(16).padStart(2, '0'))
                    .join('');
                resolve(header);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(file.slice(0, 4));
        });
    };

    public static isImageFile = async (file: File): Promise<boolean> => {
        const allowedSignatures = {
            '89504e47': 'image/png',
            'ffd8ffe0': 'image/jpeg',
            'ffd8ffe1': 'image/jpeg',
            'ffd8ffe2': 'image/jpeg',
        };
        const signature = await FileService.getFileSignature(file);
        return Object.keys(allowedSignatures).includes(signature);
    };

    /*
    public static getFileExtension = (fileName: string): string => {
        const dotIndex = fileName.lastIndexOf('.');
        if (dotIndex === -1) {
            return '';
        }
        return fileName.slice(dotIndex);
    };
    */
}

export default FileService;