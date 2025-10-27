import  { useContext } from 'react';
import { adminContext } from '../(admin-panel)/AdminContext/AdminContext';

const useAdmin = () => {
    const admin = useContext(adminContext);
    return admin;
};

export default useAdmin;