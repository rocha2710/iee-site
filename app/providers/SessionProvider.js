'use client'; // Indica que este é um componente do lado do cliente

import { SessionProvider } from 'next-auth/react'; // Importa o provedor de sessão do Next-Auth

export default function SessionProviderWrapper({ children }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
