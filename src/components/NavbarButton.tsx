import { useState } from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

// ICONS
import { AiOutlineSearch } from "react-icons/ai";
import { link } from 'fs';

//TODO: Add the rest of the navbar items
//! Make use of other website youve made

const navbarItems = [{
    id: 'dashboard',
    name: 'Dashboard',
    linkTo: '/'
}, {
    id:'transactions',
    name: 'Transactions',
    linkTo: '/transactions'
}, {
    id: 'profile',
    name: 'Profile',
    linkTo: '/profile'
}
];

const NavLink = ({name, linkGoTo}: {name: string, linkGoTo: string}) => {
    const [mouseDown, setMouseDown] = useState(false)
    const handleMouseDown = () => setMouseDown(true)

    const [currentPage, setCurrentPage] = useState('')

    const router = useRouter()

    useEffect(() => {
    setCurrentPage(router.pathname)
    }, [router.pathname])

    return (
        <div 
            draggable={false}
            onMouseDown={handleMouseDown}
            onMouseUp={() => setMouseDown(false)}
            
            className={`${currentPage === linkGoTo ? '' : 'text-gray-400 cursor-pointer mt-2 mx-4 py-2 pl-4 hover:bg-[#010057] hover:rounded-lg'} ${mouseDown ? 'scale-100' : 'hover:scale-105'} duration-200 transition-all`}
        > 
            <Link href={linkGoTo}>
                <div className={`${currentPage === linkGoTo && 'text-white font-bold scale-105 bg-[#09008893] rounded-lg mt-2 mx-4 py-2 pl-4'} duration-100 transition-all`}>
                    { name }
                </div>
            </Link>
        </div>
    )
}

const SearchBar = () => {
    const [isClicked, setIsClicked] = useState(false)
    const [mouseDown, setMouseDown] = useState(false)
    const handleMouseDown = () => setMouseDown(true)
    
    return (
        <div
            draggable={false}
            onClick={() => setIsClicked(!isClicked)}
            onMouseDown={handleMouseDown}
            onMouseUp={() => setMouseDown(false)}
            className={`flex justify-center items-center cursor-pointer relative bg-[#010057] mx-4 rounded-lg transition-all duration-200 ${mouseDown && 'scale-105'}`}
        > 
            <input 
                type="text"
                placeholder='Search'
                maxLength={50}
                className={`text-left w-[60%] outline-none placeholder:text-center bg-[#010057] text-white py-1 cursor-pointer ${mouseDown && 'scale-105'} transition-all duration-200`}
            />
            <AiOutlineSearch 
                className={`text-slate-500 text-2xl cursor-pointer ${mouseDown && 'scale-105 left-[1rem]'} transition-all duration-200 absolute left-5 top-1`}
            />
        </div>
    )

}
    
export default function NavbarButton() {
    return (
        <div>
            <SearchBar />
            <div className="cursor-default">
                {
                    navbarItems.map((item) => (
                        <NavLink key={item.id} name={item.name} linkGoTo={item.linkTo} />
                    ))
                }
            </div>
        </div>
    )
}