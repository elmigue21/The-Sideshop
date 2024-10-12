import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import AuthHeader from './AuthHeader'
import Logo from '../Components/assets/Logo300.png'
export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-stone-900 text-black">
        <AuthHeader/>
            <div className="flex flex-col sm:justify-center items-center sm:pt-0 overflow-hidden">
                <img src={Logo} alt="" />
                <div className="w-full sm:max-w-md px-6 py-10 my-10 bg-sky-950 shadow-md overflow-hidden sm:rounded-lg flex-1">
                    {children}
                </div>
            </div>
        </div>
    );
}
