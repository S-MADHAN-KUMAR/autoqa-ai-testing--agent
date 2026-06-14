import React, { useContext, useEffect, useMemo, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '../ui/button'
import axios from 'axios';
import { Input } from '../ui/input';
import { UserDetailContext } from '@/context/UserDetailContext';

export type Repo = {
    id: number;
    name: string;
    full_name: string;
    private_: boolean;
    html_url: string;
    description: string;
    language: string;
    updated_at: string;
    default_branch: string;
    owner: string;
}

function RepoDialog({ setRefreshPage }: { setRefreshPage: (refresh: boolean) => void }) {

    const [repoList, setRepoList] = useState<Repo[]>([]);
    const [selectedRepo, setSelectedRepo] = useState<Repo | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { userDetail } = useContext(UserDetailContext);
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        GetRepoList();
    }, [])

    const GetRepoList = async () => {
        const result = await axios.get('/api/github/repos');
        console.log(result.data);
        setRepoList(result.data);
    }

    const filteredRepoList = useMemo(() => {
        const q = searchTerm.trim().toLowerCase();

        if (!q) return repoList;

        return repoList.filter(r => r.full_name.toLowerCase().includes(q));
    }, [searchTerm, repoList])

    const SaveRepoToDB = async () => {
        if (!selectedRepo) return;

        const result = await axios.post('/api/user-repo', {
            repoId: selectedRepo.id,
            name: selectedRepo.name,
            full_name: selectedRepo.full_name,
            private_: selectedRepo.private_,
            html_url: selectedRepo.html_url,
            description: selectedRepo.description,
            userId: userDetail?.id,
            owner: typeof selectedRepo.owner === 'object' ? (selectedRepo.owner as any).login : selectedRepo.owner,
            updatedAt: selectedRepo.updated_at,
            language: selectedRepo.language,
            default_branch: selectedRepo.default_branch,
        });

        console.log(result.data);
        setIsOpen(false);
        setRefreshPage(true);
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <DialogTrigger asChild>
                <Button className="bg-primary text-black font-bold uppercase tracking-wider text-xs border-2 border-black rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                    + Add Repo
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0d0d0f] border-2 border-[#1a1a1a] text-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-black uppercase text-white tracking-tight">Add Repository</DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Search and select one of your GitHub repositories
                    </DialogDescription>
                </DialogHeader>
                <div>
                    <Input 
                        placeholder='Search Repos by Name' 
                        onChange={(event) => setSearchTerm(event.target.value)} 
                        className="bg-[#09090b] border-2 border-[#1a1a1a] text-white focus:border-primary placeholder-zinc-500"
                    />
                    {/* Repo List */}
                    <ul className='max-h-60 overflow-y-auto border-2 border-[#1a1a1a] rounded-xl mt-4 bg-[#09090b] divide-y divide-[#1a1a1a]'>
                        {filteredRepoList.map((repo) => (
                            <li 
                                key={repo.id}
                                className={`p-4 hover:bg-[#121214] cursor-pointer text-[#f5f0e8] transition-colors
                                    ${selectedRepo?.id == repo.id ? 'bg-[#18181b] text-primary font-bold border-l-4 border-l-primary' : ''}`}
                                onClick={() => setSelectedRepo(repo)}
                            >
                                {repo.full_name}
                            </li>
                        ))}
                    </ul>
                </div>
                <DialogFooter className='flex flex-row gap-3 justify-end mt-4'>
                    <DialogClose asChild>
                        <Button variant="outline" className="border-2 border-[#1a1a1a] bg-transparent text-[#f5f0e8] hover:bg-[#121214] font-bold uppercase tracking-wider text-xs rounded-none">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button 
                        onClick={() => SaveRepoToDB()}
                        className="bg-primary text-black font-bold uppercase tracking-wider text-xs border-2 border-black rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                    >
                        Add
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default RepoDialog