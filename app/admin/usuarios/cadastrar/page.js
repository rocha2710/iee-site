"use client"; // Indica que este é um componente do lado do cliente


import { SessionProvider, useSession, signOut } from 'next-auth/react'; // Importa o SessionProvider e o hook useSession
import { useState } from 'react'; // Importa o hook useState
import { auth } from '../../../../firebase'; // Importa a instância de autenticação do Firebase
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'; // Importa funções do Firebase
import { useRouter } from 'next/navigation'; // Importa o hook useRouter

export default function CadastrarUsuarioPage() {
  const { data: session } = useSession(); // Obtém a sessão do usuário
  const [email, setEmail] = useState(''); // Estado para o email
  const [password, setPassword] = useState(''); // Estado para a senha
  const [confirmPassword, setConfirmPassword] = useState(''); // Estado para confirmação da senha
  const [error, setError] = useState(''); // Estado para mensagens de erro
  const router = useRouter(); // Inicializa o hook useRouter

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita o comportamento padrão do formulário
    setError(''); // Limpa mensagens de erro

    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      setError('As senhas não coincidem!');
      return;
    }

    try {
      // Cria um novo usuário com email e senha
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Envia e-mail de verificação
      await sendEmailVerification(user);

      // Redireciona após o cadastro bem-sucedido
      router.push('/profile');
    } catch (err) {
      setError(err.message); // Armazena mensagem de erro
    }
  };

  return (
<>
    {!session ? ( // Verifica se o usuário está logado
      <p>Acesso restrito.</p> // Botão de login
    ) : (
      <div>
        <div>
      <h1>Cadastrar Novo Usuário</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Exibe erro, se houver */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Atualiza o estado do email
            required
          />
        </div>
        <div>
          <label>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Atualiza o estado da senha
            required
          />
        </div>
        <div>
          <label>Confirme a Senha:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Atualiza o estado da confirmação
            required
          />
        </div>
        <button type="submit">Cadastrar</button> {/* Botão de enviar */}
      </form>
    </div>
         
      </div>
    )}




    
    </>
  );
}
