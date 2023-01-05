import '../styles/globals.css';
import { useState } from 'react';
import type { AppProps } from 'next/app';
import {
  createBrowserSupabaseClient,
  SupabaseClient,
} from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider, Session } from '@supabase/auth-helpers-react';

function MyApp({
  Component,
  pageProps,
}: AppProps<{ initialSession: Session }>) {
  const [supabseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabseClient}
      initialSession={pageProps.initialSession}>
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}

export default MyApp;
