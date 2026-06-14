import WorkspaceHeader from '@/components/custom/WorkspaceHeader';
import React from 'react'

function WorkspaceLayout({ children }: {
    children: React.ReactNode;
}) {
    return (
        <div className='min-h-screen bg-[#09090b] text-[#f5f0e8] antialiased'>
            <WorkspaceHeader />
            <div className='pt-28 pb-16 px-4 max-w-6xl mx-auto'>
                {children}
            </div>
        </div>
    )
}

export default WorkspaceLayout