import test from 'node:test'
import React, { useState } from 'react'
import { TestCase } from './UserRepoList'
import { Checkbox } from '../ui/checkbox'
import { Badge } from '../ui/badge'
import { Play, RefreshCw, Settings, SettingsIcon } from 'lucide-react'
import { Button } from '../ui/button'
import TestCaseSettingDialog from './TestCaseSettingDialog'
import TestExecutionModal from './TestCaseExecutionModel'

type Props = {
    testCases: TestCase[],
    onReload: any,
    repository: any
}
function TestCaseList({ testCases, onReload, repository }: Props) {

    const [selectedTestCases, setSelectedTestCases] = useState<TestCase[]>([]);

    const [isModelOpen, setIsModelOpen] = useState(false);
    const handleSelectedTestCase = (checked: boolean | string, testCase: TestCase) => {

        if (checked) {
            setSelectedTestCases((prev: any) => [...prev, testCase])
        }
        else {
            setSelectedTestCases((prev: any) => prev.filter((item: any) => item.id !== testCase.id))
        }
    }

    return (
        <div>
            <div className='flex items-center justify-between mt-2'>
                <h2 className='font-black text-sm tracking-wider text-primary uppercase'>Generated Test Cases</h2>
                <Button size={'sm'} onClick={() => onReload(repository?.repoId)} className="bg-transparent border border-primary text-primary hover:bg-primary/10 font-bold uppercase tracking-wider text-xs rounded-none transition-colors h-7 px-3"> 
                    <RefreshCw className='h-3 w-3 mr-1.5' /> Refresh 
                </Button>
            </div>
            <div className='border-2 border-[#1a1a1a] rounded-xl mt-3 overflow-hidden bg-[#0d0d0f]/60 divide-y divide-[#1a1a1a]'>
                {testCases.map((testCase, index) => (
                    <div key={index} className='p-4 flex items-center justify-between hover:bg-[#121214]/40 transition-colors'>
                        <div className='flex gap-3 items-center'>
                            <Checkbox
                                checked={selectedTestCases?.some((item: any) => item.id == testCase?.id)}
                                onCheckedChange={(checked) => handleSelectedTestCase(checked, testCase)} 
                                className="border-2 border-[#1a1a1a] bg-zinc-900 data-[state=checked]:bg-primary data-[state=checked]:text-black"
                            />
                            <div>
                                <h3 className="text-[#f5f0e8] font-bold text-sm">{testCase?.title}</h3>
                                <p className='text-xs text-zinc-400 mt-0.5'>{testCase?.description}</p>
                            </div>
                        </div>
                        <div className='gap-4 flex items-center'>
                            <Badge variant={'secondary'} className="bg-zinc-800 text-zinc-300 font-bold border border-zinc-700 rounded-none uppercase text-[10px] tracking-wider">{testCase?.type}</Badge>
                            {testCase?.status == 'failed' && <Badge variant={'destructive'} className='text-red-200 font-bold bg-red-950 border border-red-800 rounded-none uppercase text-[10px] tracking-wider'>{testCase?.status}</Badge>}
                            {testCase?.status == 'passed' && <Badge variant={'default'} className='text-green-200 font-bold bg-green-950 border border-green-800 rounded-none uppercase text-[10px] tracking-wider'>{testCase?.status}</Badge>}
                            {testCase?.status == 'running' && <Badge variant={'default'} className='text-yellow-200 font-bold bg-yellow-950 border border-yellow-800 rounded-none uppercase text-[10px] tracking-wider'>{testCase?.status}</Badge>}
                            {testCase?.status == 'generated' && <Badge variant={'secondary'} className="bg-zinc-800 text-zinc-400 border border-zinc-700 rounded-none uppercase text-[10px] tracking-wider">Pending</Badge>}

                            <TestCaseSettingDialog testCase={testCase} setReload={() => onReload(repository?.repoId)} />
                        </div>
                    </div>
                ))}
                <div className='p-4 flex items-center justify-between bg-[#121214] border-t border-[#1a1a1a]'>
                    <h3 className="text-white font-bold text-sm">Run Selected Test Cases</h3>
                    <Button 
                        disabled={selectedTestCases?.length == 0} 
                        onClick={() => setIsModelOpen(true)}
                        className="bg-primary text-black font-bold uppercase tracking-wider text-xs border-2 border-black rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-50 disabled:pointer-events-none"
                    > 
                        <Play className='h-4 w-4 mr-2' />Run Test Cases
                    </Button>
                </div>
            </div>

            <TestExecutionModal
                testCases={selectedTestCases}
                repository={repository}
                isOpen={isModelOpen}
                onClose={() => { setIsModelOpen(false); onReload(repository?.repoId) }}
            />
        </div>
    )
}

export default TestCaseList