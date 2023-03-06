import BaseLayout from "@/components/BaseLayout";
import UserAddForm from "@/components/UserAddForm";

const AddUserPage = () => {
    

    return (
        <BaseLayout title={"Ajouter un Utilisateur"}>
            <UserAddForm/>
        </BaseLayout>
    )

}

export default AddUserPage;