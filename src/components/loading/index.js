import { Spinner } from 'react-bootstrap';

export const Loading = () => (
    <div className="d-flex justify-content-center align-items-center w-100 h-100">
        <Spinner animation="border" variant="secondary" />
    </div>
);