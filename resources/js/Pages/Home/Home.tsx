import React from 'react'
import Header from '../../Components/Header/Header'
import Footer from "../../Components/Footer/Footer";
import Ads from "../../Components/Ads/Ads"
import Catalog from '../../Components/Catalog/Catalog'
import { PageProps } from '@/types';
import { useState } from 'react';
const Home = ({ auth }: PageProps) => {

    const [bgColor,setBgColor] = useState('red');

console.log('home loaded');
    return (
        <div>
            <Header user={auth.user} />
            {/* Body content container*/}
            <div className="bg-transparent w-full flex justify-center overflow-hidden">
                <div className="w-[1200px] ">
                        <Ads className="h-[250px] my-5 shadow-none" />



                        <Catalog className="min-h-[1000px]" />
                </div>
            </div>
            {/* Body content container*/}
            <Footer />
        </div>
    );
};

export default Home
