"use client"
import React from 'react'

import { ChakraProvider } from "@chakra-ui/react";

import "./globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProvider } from '../context/UserProvider';
import { JournalProvider } from '../context/JournalProvider';
import { ModalProvider } from '../context/ModalProvider';
import { RefProvider } from '../context/RefProvider';
import CardClickedProvider from '../context/CardClickedProvider';
import { PostInteractionProvider } from '../context/PostInteractionProvider';

export function Providers({ children }: { children: React.ReactNode }) {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <UserProvider>
                <ChakraProvider>
                    <JournalProvider>
                        <ModalProvider>
                            <RefProvider>
                                <CardClickedProvider>
                                    <PostInteractionProvider>
                                        {children}
                                    </PostInteractionProvider>
                                </CardClickedProvider>
                            </RefProvider>
                        </ModalProvider>
                    </JournalProvider>
                </ChakraProvider>
            </UserProvider>
        </QueryClientProvider>
    )
}

export default Providers
