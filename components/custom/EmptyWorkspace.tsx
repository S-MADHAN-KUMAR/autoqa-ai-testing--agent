import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'lucide-react'

function EmptyWorkspace() {
    return (
        <div className='flex flex-col items-center justify-center py-6'>
            <Image src={'/folder.png'} alt='folder' width={70} height={70} className="opacity-80" />
            <h2 className='font-black text-2xl mt-5 mb-3 text-white uppercase tracking-tight'>No Repository Connected</h2>
            <p className='text-center max-w-sm text-zinc-400 text-sm'>
                Connect your GitHub accounts and add a repository to generate and run automated test cases.
            </p>

            <Button className='mt-6 bg-primary text-black font-bold uppercase tracking-wider text-xs border-2 border-black rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all'>
                <Link className='h-4 w-4 mr-2' /> Connect Repo
            </Button>
        </div>
    )
}

export default EmptyWorkspace