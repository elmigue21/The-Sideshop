
import axios from 'axios';
import React from 'react'
import { useSearchParams } from "react-router-dom";
import { PageProps } from '@/types';
import Header from '@/Components/Header/Header';
import Catalog from '@/Components/Catalog/Catalog';
import { useState } from 'react';
import { Item } from '@/types';
import { useEffect } from 'react';

const SearchPage = ({auth}:PageProps) => {

     const queryString = window.location.search;

     // Create a URLSearchParams object
     const urlParams = new URLSearchParams(queryString);

     // Get the specific query parameter (e.g., 'myParam')
     const q = urlParams.get("query");
     console.log(q);

     const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        if (q) {
            axios
                .get("/search/results", {
                    params: {
                        q: q,
                    },
                })
                .then((response) => {
                    // Handle success
                    console.log("Response:", response.data);
                    setItems(response.data.items);
                })
                .catch((error) => {
                    // Handle error
                    console.error("Error fetching data:", error);
                });
        }
    }, [q]);

  return (
      <div>
          <Header user={auth.user} />
          this is search page{q}
          <div className="flex justify-center">
              <Catalog itemsProp={items} className="w-4/5" />
          </div>
      </div>
  );
}

export default SearchPage
