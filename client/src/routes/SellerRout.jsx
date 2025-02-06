import { Navigate, useLocation } from "react-router-dom";
import useRole from "../hooks/UseRole";
import LoadingSpinner from "../components/Shared/LoadingSpinner";
import SellerRouts from './SellerRout.jsx';
import PropTypes from "prop-types";





const SellerRout = ({children}) => {
   
    const [role, isLoading] = useRole() ;

console.log(role)
 if(isLoading) return <LoadingSpinner></LoadingSpinner>
if(role === 'seller') return children 
 return <Navigate to='/dashboard'   replace='true'> </Navigate>
  

//  SellerRout.prototype = {
//      children: PropTypes.element,
//   }
}

export default SellerRout;