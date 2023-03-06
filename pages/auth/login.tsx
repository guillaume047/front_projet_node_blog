import LoginForm from "@/components/LoginForm";
import BaseLayout from "@/components/BaseLayout";

const Home = () => {
    
    return (
        <BaseLayout title={'Connexion'}>
            <LoginForm/>
        </BaseLayout>
    )
}

export default Home