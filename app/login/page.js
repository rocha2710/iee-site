"use client"; // Este é um componente do lado do cliente

import { useState } from 'react'; // Importa o hook useState
import { signIn } from 'next-auth/react'; // Importa a função de login
import { useRouter } from 'next/navigation'; // Atualizado para usar o caminho correto

export default function LoginPage() {
  const [email, setEmail] = useState(''); // Estado para o email
  const [password, setPassword] = useState(''); // Estado para a senha
  const router = useRouter(); // Inicializa o hook useRouter

  // Função para gerenciar o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault(); // Previne o comportamento padrão do formulário
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false, // Evita o redirecionamento automático do NextAuth
    });

    if (result?.error) {
      // Se houver um erro, exiba uma mensagem (você pode melhorar isso)
      console.error('Erro ao fazer login:', result.error);
    } else {
      // Redireciona para a página de perfil após o login bem-sucedido
      router.push('/admin/painel'); // Redireciona após o login
    }
  };

  return (
    <div>
      <h1>Página de Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email
            required 
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
            required 
          />
        </div>
        <button type="submit">Entrar</button> {/* Botão para enviar o formulário */}
      </form>
    </div>
  );
}
