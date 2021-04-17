import { useEffect } from 'react';

import { Loading } from '../components';
import { verifyUser } from '../services';

export const RootPage = ({ history }) => {
    
    useEffect(() => {
        verifyUser()
            .then(({ success }) => {
                if(success) history.push('/chat');
                else history.push('/auth');
            });
        // eslint-disable-next-line
    }, []);

    return <Loading />
};