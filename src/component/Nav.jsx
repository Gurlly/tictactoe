import React from 'react'

import Logo from '../resources/favicon.png'

import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

const Nav = ({dark, setDark}) => {

  return (
    <>
        <div className="md:container md:mx-auto navbar-start justify-between">
            <a 
            className="flex items-center text-stone-800 font-semibold"
            href="/"
            >
                <img src={Logo} alt="Application Logo" className="w-9 h-9 mr-2" />
                <p className="text-xl text-stone-800 dark:text-zinc-50">TicTacToe</p>
            </a>
            <button
            type="button"
            className="
            navbar-item border text-xl bg-stone-800 text-zinc-50
            dark:bg-zinc-100 dark:text-yellow-500
            "
            onClick={() => setDark(() => !dark)}
            >
                {dark ? <MdLightMode/> : <MdDarkMode/>}
            </button>
        </div>
    </>
  )
}

export default Nav