import type { Metadata } from "next";
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from "@clerk/nextjs";
import "../styles/globals.css";

export const metadata: Metadata = {
    title: "FitCheck PWA",
    description: "Your personal fashion assistant",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body>
                    <header className="p-4 flex justify-between items-center">
                        <SignedOut>
                            <div className="space-x-4">
                                <SignInButton mode="modal" />
                                <SignUpButton mode="modal" />
                            </div>
                        </SignedOut>
                        <SignedIn>
                            <UserButton afterSignOutUrl="/" />
                        </SignedIn>
                    </header>
                    <main>{children}</main>
                </body>
            </html>
        </ClerkProvider>
    );
} 