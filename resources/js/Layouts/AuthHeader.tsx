import React from 'react'
import { Link } from '@inertiajs/react'
const AuthHeader = () => {
  return (
      <header className="h-[100px] w-full bg-sky-950 text-white">
          <Link href="/">
              <h1 className="text-8xl px-10">THE SIDESHOP</h1>
          </Link>
      </header>
  );
}

export default AuthHeader
