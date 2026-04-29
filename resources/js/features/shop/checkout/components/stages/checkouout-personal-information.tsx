import type { JSX } from 'react';
import LoginForm from '@/features/auth/components/login-form';
import RegisterForm from '@/features/auth/components/register-form';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function CheckououtPersonalInformation(): JSX.Element {
    return (
        <div>
            <Tabs defaultValue="login">
                <TabsList>
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                    <LoginForm />
                </TabsContent>
                <TabsContent value="register">
                    <RegisterForm />
                </TabsContent>
            </Tabs>
        </div>
    );
}
