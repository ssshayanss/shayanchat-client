import { useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { getRooms, searchRooms } from '../../redux';

import './searchBox.css';

const SearchBox = () => {

    const socket = useSelector(state => state.setting.socket);
    const dispatch = useDispatch();
    
    const searchRef = useRef('');

    const search = () => {
        if(searchRef.current.value.trim() === '') dispatch(getRooms(socket));
        else dispatch(searchRooms(socket, searchRef.current.value.trim()));
    };
    
    return (
        <div className="search-box">
            <input className="input" type="text" placeholder="جستجو ..." ref={searchRef} onChange={search} />
            <FaSearch className="icon" onClick={search} />
        </div>
    );
};

export default SearchBox;