import ImageUpload from "../../components/ImageUpload";
import { useSelector} from 'react-redux';

export const TenantProfile = () => {
    const userState = useSelector((state) => state.user);
    const typeOf = 'user'
    return(
        <h1>
            Tenant profile!
            <ImageUpload imageTargetId={userState._id} typeOfImage={typeOf}/>
        </h1>
    );
}