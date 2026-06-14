"use client";

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import { UserDetailContext } from '@/context/UserDetailContext'

function WorkspaceHeader() {
    const { userDetail } = useContext(UserDetailContext);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-2.5 bg-[#0d0d0f]/80 backdrop-blur-md rounded-full mt-3 mx-auto max-w-6xl w-[95%] border-2 border-primary shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] transition-all duration-300">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
                <img alt="AutoQa Logo" className="w-8 h-8 object-contain" src="/logo.png" />
                <span className="font-headline text-lg font-black tracking-tighter text-primary uppercase">AutoQa</span>
            </Link>

            {/* Menu Options */}
            <ul className='hidden md:flex gap-8 text-xs font-bold uppercase tracking-widest text-[#f5f0e8]'>
                <li>
                    <Link href="/workspace" className='hover:text-primary cursor-pointer transition-colors'>
                        Workspace
                    </Link>
                </li>
            </ul>

            {/* User Details & Button */}
            <div className='flex items-center gap-4'>
                <UserButton afterSignOutUrl="/" />
            </div>
        </nav>
    )
}

export default WorkspaceHeader