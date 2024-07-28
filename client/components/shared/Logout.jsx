import { ExitIcon } from "@radix-ui/react-icons"
import { deleteCookie } from "cookies-next"
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const Logout = () => {

    const router = useRouter();

    const handleLogout = () => {
        deleteCookie('jwt', { path: '/' });
        deleteCookie('user', { path: '/' });

        toast.success('Logged out', {
            icon: '🚀'
        })

        router.push('/login');
    }

    return (
        <div className="absolute bottom-10 right-10">
            <Button size="icon" className='rounded-full' onClick={handleLogout}>
                <ExitIcon />
            </Button>
        </div>
    )
}

export default Logout