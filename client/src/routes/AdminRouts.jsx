import PropTypes from "prop-types";
import useRole from "../hooks/UseRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import { Navigate } from "react-router-dom";




const AdminRouts = ({children}) => {
 

    const [role , isLoading] = useRole() ;
    
    
    if(isLoading) return <LoadingSpinner></LoadingSpinner>
    if(role === 'admin') return children 
    return <Navigate to='/dashboard'   replace='true'> </Navigate>
        
    
    
    };
    AdminRouts.prototype = {
        children: PropTypes.element,
     }
    

export default AdminRouts;