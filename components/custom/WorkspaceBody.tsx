"use client"
import { UserDetailContext } from '@/context/UserDetailContext'
import Image from 'next/image';
import React, { useContext } from 'react'

function WorkspaceBody() {

    const { userDetail } = useContext(UserDetailContext);

    return (
        <div>
            <div className='flex justify-between items-center'>
                <h2 className='text-4xl font-medium'>Workspace</h2>
                <h2 className='text-blue-800 bg-blue-100 px-2 rounded-lg'>Remaining Credits: {userDetail?.credits}</h2>
            </div>


            <div className={'mt-5'}>
                <Image src={'/github.png'} alt='github' width={40} height={40} />
                <h2 className='text-lg' >Connect Github & Add Repository</h2>
            </div>
        </div>
    )
}

export default WorkspaceBody