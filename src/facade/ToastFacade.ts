import toast from 'react-hot-toast';

class ToastFacade {
    public static showSuccessToast(message: string): void {
        toast.success(message, );
    }

    public static showErrorToast(message: string): void {
        toast.error(message);
    }
}

export default ToastFacade;