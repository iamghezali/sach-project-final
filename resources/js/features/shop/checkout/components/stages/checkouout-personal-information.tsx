import type { JSX } from 'react';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from '@/features/auth/components/login-form';
import RegisterForm from '@/features/auth/components/register-form';

export default function CheckououtPersonalInformation(): JSX.Element {
    return (
        <div>
            <Tabs defaultValue="login">
                <TabsList className="gap-5 bg-transparent group-data-horizontal/tabs:h-auto group-data-horizontal/tabs:p-0">
                    <TabsTrigger
                        value="register"
                        className="bg-transparent p-0 text-xl leading-5 font-normal text-brand-neutral-1000 hover:text-brand-tertiary-200 data-active:bg-transparent data-active:text-brand-tertiary-300 group-data-[variant=default]/tabs-list:data-active:shadow-none"
                    >
                        Create a New Account
                    </TabsTrigger>
                    <Separator
                        orientation="vertical"
                        className="bg-brand-neutral-1000 data-vertical:w-0.5"
                    />
                    <TabsTrigger
                        value="login"
                        className="bg-transparent p-0 text-xl leading-5 font-normal text-brand-neutral-1000 hover:text-brand-tertiary-200 data-active:bg-transparent data-active:text-brand-tertiary-300 group-data-[variant=default]/tabs-list:data-active:shadow-none"
                    >
                        Login
                    </TabsTrigger>
                </TabsList>

                <TabsContent
                    value="login"
                    className="pt-8"
                >
                    <LoginForm />
                </TabsContent>
                <TabsContent
                    value="register"
                    className="pt-8"
                >
                    <RegisterForm />
                </TabsContent>
            </Tabs>
        </div>
    );
}
