"use client"; // Este é um componente do lado do cliente

import { useSession, signOut } from 'next-auth/react'; // Importa os hooks de sessão e logout
import { useState } from 'react'; // Importa o hook useState do React
import { sendPasswordResetEmail } from 'firebase/auth'; // Importa a função para enviar email de redefinição de senha
import { auth } from '../../../firebase'; // Importa a instância de autenticação do Firebase

export default function ProfilePage() {
  const { data: session, status } = useSession(); // Obtém a sessão do usuário
  const [message, setMessage] = useState(''); // Estado para armazenar mensagens

  // Se a sessão estiver carregando, exibe uma mensagem de carregamento
  if (status === "loading") {
    return <div>Carregando...</div>;
  }

  // Se não houver sessão, redireciona ou exibe uma mensagem
  if (!session) {
    return <div>Você não está logado. Acesse a página de login.</div>;
  }

 

  return (
    <div>
      <h1>PAINEL</h1>
      <p>Email: {session.user.email}</p> {/* Exibe o email do usuário */}
      <button onClick={() => signOut()}>Sair</button> {/* Botão para logout */}
      <div>
        <button >Solicitar troca de senha</button> {/* Botão para solicitar troca de senha */}
      </div>
      {message && <p>{message}</p>} {/* Exibe a mensagem de sucesso ou erro */}
    </div>
  );
}
