import React, { useContext, useState } from 'react'
import { UserRepo } from './WorkspaceBody'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Image from 'next/image'
import { CheckCircle2, Link2Icon, ListChecks, Loader2, Loader2Icon, Settings2, Sparkles, TrendingUp, XCircle } from 'lucide-react'
import { Button } from '../ui/button'
import axios from 'axios'
import { UserDetailContext } from '@/context/UserDetailContext'
import TestCaseList from './TestCaseList'
import RepoSettings from './RepoSettings'

type props = {
    repoList: UserRepo[],
    setReload: () => void;
}

export type TestCase = {
    id: number;
    title: string;
    description: string;
    type: string;
    repoId: number;
    targetFiles: string[];
    expectedResult: string;
    repoName: string;
    repoOwner: string;
    targetRoute: string;
    status: string;
    browserbaseScript: string;
}

type StatusData = {
    totalTests: number;
    passedTests: number;
    failedTests: number;
    passRate: number;
}

function UserRepoList({ repoList, setReload }: props) {
    const [statusData, setStatusData] = useState<StatusData>({
        totalTests: 0,
        passedTests: 0,
        failedTests: 0,
        passRate: 0
    });

    const { userDetail } = useContext(UserDetailContext);
    const [loading, setLoading] = useState(false);
    const [testCaseLoading, setTestCaseLoading] = useState(false);
    const [testCases, setTestCases] = useState<TestCase[]>([]);

    const handleGenerateTestCases = async (repo: UserRepo) => {
        setLoading(true);
        try {
            const tokenRes = await axios.get('/api/github/token');
            const githubToken = tokenRes.data.token;

            const result = await axios.post('/api/generate-test-cases', {
                userId: userDetail?.id,
                repoId: repo?.repoId,
                owner: repo.owner,
                repo: repo.name,
                branch: repo.defaultBranch,
                githubToken,
            });

            console.log(result.data);
            GetTestCases(repo.repoId);
        } catch (error: any) {
            console.error(error);
            alert(error.response?.data?.error || "Failed to generate test cases");
        } finally {
            setLoading(false);
        }
    }

    const GetTestCases = async (repoId: number) => {
        setTestCaseLoading(true);
        setTestCases([]);
        const result = await axios.get(`/api/test-cases?repoId=${repoId}`);
        console.log(result.data);
        const userTestCases = result.data as TestCase[];
        const passedTests = userTestCases?.filter(testCase => testCase.status === 'passed').length || 0;
        const failedTests = userTestCases?.filter(testCase => testCase.status === 'failed').length || 0;
        const passRate = userTestCases?.length ? Math.round((passedTests / userTestCases.length) * 100) : 0;

        setStatusData({
            totalTests: result.data.length,
            passedTests: passedTests,
            failedTests: failedTests,
            passRate: passRate
        });

        setTestCases(result.data);
        setTestCaseLoading(false);
    }

    return (
        <div className='mt-10'>
            <h2 className='my-4 font-black text-sm tracking-wider text-zinc-400 uppercase'>Repositories</h2>
            <Accordion type="single" collapsible
                onValueChange={(value) => GetTestCases(Number(value))}
            >
                {repoList.map((repo) => (
                    <AccordionItem key={repo.repoId} value={(repo.repoId).toString()} className='border-2 border-[#1a1a1a] px-5 rounded-xl mb-5 bg-[#0d0d0f]/60 backdrop-blur-md shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]'>
                        <AccordionTrigger className="hover:no-underline py-4">
                            <div className='flex items-center gap-5'>
                                <Image src={'/github.png'} alt='github' width={30} height={30} className="invert" />
                                <div className='flex flex-col items-start gap-1'>
                                    <h2 className="text-white font-bold text-base hover:text-primary transition-colors"> {repo.fullName}</h2>
                                    <p className='text-xs text-zinc-400'>
                                        {repo.defaultBranch}   •   {repo.language}
                                    </p>
                                </div>
                            </div>
                        </AccordionTrigger>

                        <AccordionContent>
                            <div className='pt-2 pb-6 space-y-6'>
                                <div className='bg-[#121214] p-4 border-2 border-[#1a1a1a] rounded-xl flex justify-between items-center shadow-[2px_2px_0px_0px_rgba(26,26,26,1)]'>
                                    <div className='flex gap-3 items-center'>
                                        <Link2Icon className='text-primary h-4 w-4' />
                                        <span className="text-[#f5f0e8] font-bold text-sm">Target Domain:</span>
                                        <span className='bg-[#09090b] p-1 px-3 border border-primary/45 rounded-md text-primary font-bold text-xs'>{repo?.targetDomain || 'Not configured'}</span>
                                    </div>
                                    <RepoSettings repo={repo} setReload={setReload} />
                                </div>
                                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
                                    <StatusCard
                                        title="Total Tests"
                                        value={statusData?.totalTests}
                                        icon={<ListChecks className='h-5 w-5 text-blue-400' />}
                                        bgColor="bg-blue-950/20"
                                        borderColor="border-blue-900/30"
                                    />
                                    <StatusCard
                                        title="Passed"
                                        value={statusData?.passedTests}
                                        icon={<CheckCircle2 className='h-5 w-5 text-green-400' />}
                                        bgColor="bg-green-950/20"
                                        borderColor="border-green-900/30"
                                    />
                                    <StatusCard
                                        title="Failed"
                                        value={statusData?.failedTests}
                                        icon={<XCircle className='h-5 w-5 text-red-400' />}
                                        bgColor="bg-red-950/20"
                                        borderColor="border-red-900/30"
                                    />
                                    <StatusCard
                                        title="Pass Rate"
                                        value={`${statusData?.passRate}%`}
                                        icon={<TrendingUp className='h-5 w-5 text-purple-400' />}
                                        bgColor="bg-purple-950/20"
                                        borderColor="border-purple-900/30"
                                    />
                                </div>

                                {!testCaseLoading && testCases.length > 0
                                    && <TestCaseList testCases={testCases} onReload={(repoId: number) => GetTestCases(repoId)}
                                        repository={repo}
                                    />}

                                {testCaseLoading ?
                                    <h2 className='flex gap-3 items-center text-[#f5f0e8] font-medium'> <Loader2Icon className='animate-spin text-primary' /> Please Wait... </h2>
                                    :
                                    testCases?.length === 0 && (
                                        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-2 border-[#1a1a1a] rounded-xl p-6 bg-[#121214] shadow-[3px_3px_0px_0px_rgba(26,26,26,1)]'>
                                            <div>
                                                <h3 className='font-bold text-white text-lg'>
                                                    {loading ? 'Generating Test Cases...' : 'Generate AI Test Cases'}
                                                </h3>
                                                <p className='text-sm text-zinc-400 mt-1'>
                                                    Analyze this repository and generate automated test cases using AI.
                                                </p>
                                            </div>
                                            <Button className='gap-2 bg-primary text-black font-bold uppercase tracking-wider text-xs border-2 border-black rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 transition-all'
                                                disabled={loading}
                                                onClick={() => handleGenerateTestCases(repo)}>
                                                {loading ? <Loader2 className='animate-spin h-4 w-4' /> : <Sparkles className='h-4 w-4' />}
                                                Generate Test Cases
                                            </Button>
                                        </div>
                                    )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>
    )
}

export default UserRepoList

function StatusCard({
    title,
    value,
    icon,
    bgColor,
    borderColor
}: {
    title: string
    value: string | number
    icon: React.ReactNode
    bgColor: string
    borderColor: string
}) {
    return (
        <div className={`border-2 ${borderColor} rounded-xl p-4 flex items-center justify-between ${bgColor} shadow-[2px_2px_0px_0px_rgba(0,0,0,0.15)]`}>
            <div>
                <p className='text-xs text-zinc-400 font-bold uppercase tracking-wider'>{title}</p>
                <h3 className='text-2xl font-black text-white mt-1'>{value}</h3>
            </div>
            <div className='h-10 w-10 rounded-full flex items-center justify-center bg-black/35 border border-zinc-800/50'>
                {icon}
            </div>
        </div>
    )
}
