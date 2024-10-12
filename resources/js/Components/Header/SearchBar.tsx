import React from 'react'
import SearchIcon from "@mui/icons-material/Search";
import axios from 'axios';
import { useState,useEffect } from 'react';
import { Divider } from '@mui/material';

interface SearchBarProps{

    className?:string
}

const SearchBar: React.FC<SearchBarProps> = ({className}) => {

            axios.defaults.baseURL = "http://127.0.0.1:8000/api";
    const [searchData,setSearchData] = useState<any>([]);
    const [searchInput,setSearchInput] = useState("");
    
      const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    console.log('searcherd');
      e.preventDefault();
      if (searchInput.trim()) {
          // Redirect to /search with query parameter
          window.location.href = `/search?query=${encodeURIComponent(searchInput)}`;
      }
  };



    useEffect(()=>{
    axios
    .get('/search/suggestions')
    .then((response)=>{
        setSearchData(response.data.searches);
    })
    .catch((e)=>{
        console.log('errored')
        console.error(e);
    })
},[])



  return (
      <>
          <div
              className={`${className}`}
              onClick={() => setIsFocused(true)}
              onBlur={() => {
                  // Delay the blur event to allow click events to register
                  setTimeout(() => setIsFocused(false), 100);
              }}
          >
              <form className={`w-full h-full flex overflow-hidden`} onSubmit={handleSearch}>
                  <span className="content-center">
                      <SearchIcon
                          className="text-stone-500 m-3 outline-none z-20"
                          onClick={() => {handleSearch;
                            setIsFocused(false);
                          }}
                      />
                  </span>
                  <input
                      type="text"
                      className="bg-transparent mx-1 flex-1 overflow-hidden
                        border-none focus:outline-none
                        focus:ring-0"
                      value={searchInput}
                      onChange={(e) => {
                          setSearchInput(e.target.value);
                          setIsFocused(true);
                      }}
                      onSubmit={handleSearch}
                  />
              </form>
              <div className={`flex flex-col rounded overflow-hidden`}>
                  {isFocused &&
                      Array.isArray(searchData.searches) &&
                      searchData.searches
                          .slice(-5) // Get the last 5 items
                          .reverse() // Reverse the array to show last item first
                          .map((search: string, index: number) => (
                              <div
                                  key={index}
                                  className="w-full bg-slate-200 h-[50px] px-5 
                                  flex items-center overflow-hidden
                                  hover:bg-slate-400 hover:cursor-pointer z-10
                                  "
                                  onMouseDown={(e) => {
                                      e.stopPropagation(); // Prevent the click event from bubbling up
                                      setSearchInput(search);
                                      setIsFocused(false);
                                  }}
                              >
                                  {search}
                              </div>
                          ))}
              </div>
          </div>
      </>
  );
}

export default SearchBar
