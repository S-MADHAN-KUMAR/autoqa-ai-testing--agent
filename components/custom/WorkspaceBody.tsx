"use client"
import { UserDetailContext } from '@/context/UserDetailContext'
import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import EmptyWorkspace from './EmptyWorkspace';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import RepoDialog, { Repo } from './RepoDialog';
import UserRepoList from './UserRepoList';

export type UserRepo = {
    id: number;
    repoId: number;
    name: string;
    fullName: string;
    private: boolean;
    htmlUrl: string;
    description: string;
    userId: number;
    owner: string;
    updatedAt: string;
    language: string;
    defaultBranch: string;
    targetDomain?: string;
    gloablInstruction?: string;
}

function WorkspaceBody() {


    const { userDetail } = useContext(UserDetailContext);
    const router = useRouter()
    const [token, setToken] = useState('');
    const [userRepoList, setUserRepoList] = useState<UserRepo[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        GetGithubUserToken();

    }, [])

    useEffect(() => {
        userDetail?.id && GetUserAddedRepoList();
    }, [userDetail?.id])

    const GetGithubUserToken = async () => {
        const result = await axios.get('/api/github/token');
        console.log(result.data.token)
        setToken(result.data.token);
    }

    const OnAddRepo = async () => {
        router.push('/api/github');
    }

    const GetUserAddedRepoList = async () => {
        setLoading(true);
        const result = await axios.get('/api/user-repo?userId=' + userDetail?.id);
        console.log(result.data);
        setUserRepoList(result.data);
        setLoading(false);
    }


    return (
        <div className="py-4">
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-4xl font-black uppercase tracking-tight text-white'>Workspace</h1>
            </div>

            <div className='glass-panel neo-brutalist-border rounded-xl flex flex-col sm:flex-row justify-between items-center p-6 bg-[#0d0d0f]/60 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] gap-4'>
                <div className='flex items-center gap-5'>
                    <Image src={'/github.png'} alt='github' width={40} height={40} className="invert" />
                    <div>
                        <h2 className='text-xl font-bold text-white' >Connect GitHub & Add Repository</h2>
                        <p className='text-sm text-zinc-400 mt-1'>Add your repository to start generating and running tests.</p>
                    </div>
                </div>
                <div>
                    {!token ? (
                        <Button 
                            onClick={OnAddRepo} 
                            className="bg-primary text-black font-bold uppercase tracking-wider text-xs border-2 border-black rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                        >
                            Setup
                        </Button>
                    ) : (
                        <RepoDialog setRefreshPage={(refresh: boolean) => GetUserAddedRepoList()} />
                    )}
                </div>
            </div>

            {loading ? (
                <div className='mt-10 space-y-4'>
                    <div className='my-3 bg-zinc-800 animate-pulse w-32 h-6 rounded'></div>
                    {[1, 2, 3].map((item) => (
                        <div key={item} className='w-full h-20 bg-zinc-900/60 border border-zinc-800 animate-pulse rounded-xl'></div>
                    ))}
                </div>
            ) : userRepoList?.length === 0 ? (
                <div className='glass-panel neo-brutalist-border rounded-xl mt-10 p-8 bg-[#0d0d0f]/60 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]'>
                    <EmptyWorkspace />
                </div>
            ) : (
                <UserRepoList repoList={userRepoList} setReload={() => GetUserAddedRepoList()} />
            )}
        </div>
    )
}

export default WorkspaceBody