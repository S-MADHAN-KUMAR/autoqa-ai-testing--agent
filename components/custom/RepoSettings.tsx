import React, { useState } from 'react'
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
import { Settings2 } from 'lucide-react'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { UserRepo } from './WorkspaceBody'
import axios from 'axios'

type props = {
    repo: UserRepo,
    setReload: () => void;
}
function RepoSettings({ repo, setReload }: props) {

    const [isOpen, setIsOpen] = useState(false);
    const [repoSettings, setRepoSettings] = useState({
        targetDomain: repo?.targetDomain || '',
        globalInstruction: repo?.gloablInstruction || ''
    });

    const handleSaveSettings = async () => {
        // Implement the logic to save the updated settings to the database
        // You can make an API call to update the repository settings in the backend
        console.log('Saved Settings:', repoSettings);

        const result = await axios.post('/api/user-repo/settings', {
            repoId: repo.repoId,
            targetDomain: repoSettings.targetDomain,
            globalInstruction: repoSettings.globalInstruction,
        });

        console.log(result?.data);
        setIsOpen(false);
        setReload();

    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
            <DialogTrigger asChild>
                <Button className="bg-transparent border-2 border-primary text-primary hover:bg-primary/10 font-bold uppercase tracking-wider text-xs rounded-none transition-colors">
                    <Settings2 className='h-4 w-4 mr-1.5' /> Project Config
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-[#0d0d0f] border-2 border-[#1a1a1a] text-white">
                <DialogHeader>
                    <DialogTitle className='flex gap-2 items-center text-xl font-black uppercase text-white tracking-tight'>
                        <Settings2 className='text-primary h-5 w-5' /> Project/Repo Settings
                    </DialogTitle>
                    <DialogDescription className="text-zinc-400">
                        Configure project-level defaults used during script generation and execution.
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 my-2">
                    <div>
                        <label className='text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1'>APP URL/DEFAULT WEBSITE</label>
                        <Input value={repoSettings?.targetDomain}
                            onChange={(e) => setRepoSettings({ ...repoSettings, targetDomain: e.target.value })}
                            placeholder='https://example.com' className='bg-[#09090b] border-2 border-[#1a1a1a] text-white focus:border-primary placeholder-zinc-500 mt-1' />
                        <p className='text-xs text-zinc-500 mt-1'>The target address where automated headless browsers will connect and run test cases.</p>
                    </div>
                    <div>
                        <label className='text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1'>GLOBAL TEST INSTRUCTION</label>
                        <Textarea value={repoSettings?.globalInstruction}
                            onChange={(e) => setRepoSettings({ ...repoSettings, globalInstruction: e.target.value })}
                            placeholder='e.g., Use credentials demo/demo to log in first.' className='bg-[#09090b] border-2 border-[#1a1a1a] text-white focus:border-primary placeholder-zinc-500 mt-1 min-h-[100px]' />
                        <p className='text-xs text-zinc-500 mt-1'>Include any authentication credentials, cookies, setup, or teardown instructions. These are automatically appended to Gemini's prompts.</p>
                    </div>
                </div>
                <DialogFooter className="flex flex-row gap-3 justify-end mt-4">
                    <DialogClose asChild>
                        <Button variant={'outline'} className="border-2 border-[#1a1a1a] bg-transparent text-[#f5f0e8] hover:bg-[#121214] font-bold uppercase tracking-wider text-xs rounded-none">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button onClick={handleSaveSettings} className="bg-primary text-black font-bold uppercase tracking-wider text-xs border-2 border-black rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
                        Save Config
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default RepoSettings