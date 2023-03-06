import BaseLayout from "@/components/BaseLayout";
import UserUpdateForm from "@/components/UserUpdateForm";
import {useRecoilValue} from "recoil";
import {authUser} from "@/recoil/user";

const UpdateUserPage = () => {
    const user = useRecoilValue(authUser)


    return (
        user ?
            <BaseLayout title={"Modifier mon profil"}>
                <UserUpdateForm user={user}/>
            </BaseLayout>
            :
            <div>
                <h1>Vous n'êtes pas connecté</h1>
            </div>
    )
}

export default UpdateUserPage;