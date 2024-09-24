"use client"; // Este é um componente do lado do cliente

import { useSession, signOut } from 'next-auth/react'; // Importa os hooks de sessão e logout
import { useState } from 'react'; // Importa o hook useState do React
import { sendPasswordResetEmail } from 'firebase/auth'; // Importa a função para enviar email de redefinição de senha
import { auth } from '../../firebase'; // Importa a instância de autenticação do Firebase

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

  // Função para solicitar a troca de senha
  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, session.user.email); // Envia email para redefinição de senha
      setMessage('Email enviado com o link para trocar a senha. Consulte sua caixa de entrada e a caixa de spam.'); // Atualiza a mensagem de sucesso
    } catch (error) {
      setMessage('Ocorreu um erro ao enviar o email.'); // Atualiza a mensagem de erro
    }
  };

  return (
    <div>
      <h1>Página de Perfil</h1>
      <p>Email: {session.user.email}</p> {/* Exibe o email do usuário */}
      <button onClick={() => signOut()}>Sair</button> {/* Botão para logout */}
      <div>
        <button onClick={handlePasswordReset}>Solicitar troca de senha</button> {/* Botão para solicitar troca de senha */}
      </div>
      {message && <p>{message}</p>} {/* Exibe a mensagem de sucesso ou erro */}
    </div>
  );
}
