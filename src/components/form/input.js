import { useState } from 'react';
import { FaUser, FaGlobe, FaAt, FaPen, FaKey, FaFileImage, FaEye, FaEyeSlash } from 'react-icons/fa';

const Input = ({ item }) => {
    
    const [showPassword, setShowPassword] = useState(false);
    
    return (
        <div className={ item.type === 'checkbox' ? "checkBox" : "formGroup" }>
            <span className="inputIcon" title={item.title}>
                { item.name === 'name' && <FaUser /> }
                { item.name === 'email' && <FaGlobe /> }
                { item.name === 'username' && <FaAt /> }
                { item.name === 'roomName' && <FaPen /> }
                { new RegExp('password', 'i').test(item.name) && <FaKey /> }
                { new RegExp('picture', 'i').test(item.name) && <FaFileImage /> }
            </span>
            <input 
                className={ 
                    item.type === 'file' 
                        ? "input file" 
                        : item.type === 'checkbox' ? "ml-2" : "input" 
                } 
                type={
                    new RegExp('password', 'i').test(item.name)
                        ? showPassword ? "text" : "password"
                        : item.type
                } 
                placeholder={item.placeholder} 
                ref={item.fieldRef}
                accept={ item.type === 'file' && new RegExp('picture', 'i').test(item.name) ? "image/*" : null }
            />
            { 
                new RegExp('password', 'i').test(item.name)
                    ? showPassword 
                        ? <FaEye className="eyeIcon" onClick={() => setShowPassword(false)} /> 
                        : <FaEyeSlash className="eyeIcon" onClick={() => setShowPassword(true)} />
                    : null 
            }
            { item.type === 'checkbox' &&  <label className="lbl">{item.placeholder}</label> }
        </div>
    );
};
    
export default Input;