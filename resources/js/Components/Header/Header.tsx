import React from 'react'
import Logo from '../assets/Logo300.png'
// import Image from 'next/image'
import SearchBar from './SearchBar'
import { Head } from '@inertiajs/react'
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import {Link} from '@inertiajs/react';
import { PageProps } from '@/types';
import { User } from "@/types";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Dropdown from '../Dropdown';
interface HeaderProps{
    user:User
}
const Header: React.FC<HeaderProps> = ({user}) => {



    let navlist;
    if(!user){
        navlist = (
            <ul className="bg-cyan-800 w-full text-right flex justify-end px-8">
                <li className="mx-5 hover:text-blue-500 hover:cursor-pointer">
                    Help
                </li>
                <li className="mx-5 hover:text-blue-500 hover:cursor-pointer">
                    Notifications
                </li>
                <Link href={route("register")}>
                    <li className="mx-5 hover:text-blue-500 hover:cursor-pointer">
                        Signup
                    </li>
                </Link>
                <Link href={route("login")}>
                    <li className="mx-5 hover:text-blue-500 hover:cursor-pointer">
                        Login
                    </li>
                </Link>
            </ul>
        );
    }else{
        navlist = (
            <ul className="bg-cyan-800 w-full text-right flex justify-end px-10">
                <li className="mx-5 hover:text-blue-500 flex items-center hover:cursor-pointer">
                    Help
                </li>
                <li className="mx-5 hover:text-blue-500 flex items-center  hover:cursor-pointer ">
                    Notifications
                </li>

                <Dropdown>
                    <Dropdown.Trigger>
                        <span className="inline-flex rounded-md">
                            <button
                                type="button"
                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md bg-transparent hover:text-blue-500 focus:outline-none transition ease-in-out duration-150"
                            >
                                {user.name}
                                <svg
                                    className="ms-2 -me-0.5 h-4 w-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </span>
                    </Dropdown.Trigger>

                    <Dropdown.Content>
                        <Dropdown.Link href={route("profile.edit")}>
                            Profile
                        </Dropdown.Link>
                        <Dropdown.Link
                            href={route("logout")}
                            method="post"
                            as="button"
                        >
                            Log Out
                        </Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </ul>
        );
    }



  return (
      <>
          {navlist}

          <header className="bg-stone-900 w-full h-[100px] whitespace-nowrap flex justify-center">
              <Head title="Home" />
              <div className="inline-block w-4/5 flex items-center">
                  <Link href="/">
                      <img
                          src={Logo}
                          alt=""
                          width={100}
                          height={100}
                          className="p-1 mb-2"
                      />
                  </Link>
                  <SearchBar className="bg-slate-50 rounded w-4/5 h-3/5 text-black"/>
                  <Link href="/cart">
                      <ShoppingCartOutlinedIcon fontSize="large" 
                      className="text-4xl mx-5 hover:text-blue-500 hover:cursor-pointer" />
                  </Link>

              </div>
          </header>
      </>
  );
}

export default Header
