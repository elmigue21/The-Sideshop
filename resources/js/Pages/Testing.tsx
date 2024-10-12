import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Header from '@/Components/Header/Header';
import { PageProps } from '@/types';



const Testing = ({auth}:PageProps) => {
    axios.defaults.baseURL = "http://127.0.0.1:8000/api";
    const [dataProp,setDataProp] = useState<any>([]);
console.log('test page load');


    useEffect(()=>{
    axios
    .get('/search')
    .then((response)=>{
        console.log('then met')
        setDataProp(response.data.searches);
    })
    .catch((e)=>{
        console.log('errored')
        console.error(e);
    })
},[])



    return (
        <div>
            <Header user={auth.user} />
            <p>Testing page</p>
            {/* Check if searches is an array and process it */}
            {Array.isArray(dataProp.searches) &&
            dataProp.searches.length > 0 ? (
                dataProp.searches
                    .slice(-5) // Get the last two items
                    .reverse() // Reverse the array to show last item first
                    .map((search: string, index: number) => (
                        <div key={index}>
                            {/* Render item properties here */}
                            {search}
                        </div>
                    ))
            ) : (
                <p>No searches found</p>
            )}
        </div>
    );
}

export default Testing
