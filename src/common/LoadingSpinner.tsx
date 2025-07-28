import { Spinner } from "react-bootstrap";

interface LoadingSpinnerProps {
    minHeight: number;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ minHeight }) => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight }}>
            <Spinner animation="border" variant="secondary" role="status">
                <span className="visually-hidden">Chargement...</span>
            </Spinner>
        </div>
    );
};

export default LoadingSpinner;

