import { useAuth } from "../../context/useAuth";
const RoleBasedComponent = ({ allowedRoles, children, fallback = null }) => {
    const { canAccess } = useAuth();
    
    if (!canAccess(allowedRoles)) {
        return fallback;
    }
    
    return children;
};

export default RoleBasedComponent;