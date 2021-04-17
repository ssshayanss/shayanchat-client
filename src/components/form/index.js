import { useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';

import './form.css';
import Input from './input';

const MyForm = ({ name, items, submitHandler }) => {
    
    const loading = useSelector(state => state.setting.loadingForm);

    return (
        <Form className="d-flex flex-column" onSubmit={submitHandler}>
            {
                items.map((item, index) => {
                    return <Input key={index} item={item} />
                })
            }
            <Button type="submit" disabled={loading ? "disabled" : ""}>{name}</Button>
        </Form>
    );
};

export default MyForm;