import NextAuth from 'next-auth'; // Importa o NextAuth para gerenciar a autenticação
import CredentialsProvider from 'next-auth/providers/credentials'; // Importa o provedor de credenciais
import { signInWithEmailAndPassword } from 'firebase/auth'; // Importa a função para login
import { auth } from '../../../../firebase'; // Importa a instância de autenticação do Firebase

// Configuração do NextAuth
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "seu-email@example.com" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Tenta autenticar o usuário com o Firebase
          const userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
          const user = userCredential.user;
          return { email: user.email }; // Retorna o email do usuário autenticado
        } catch (error) {
          console.error(error); // Loga o erro no console
          return null; // Retorna null se não conseguir autenticar
        }
      }
    })
  ],
  pages: {
    signIn: '/login', // Redireciona para a página de login personalizada
  },
  secret: process.env.NEXTAUTH_SECRET, // Chave secreta para o NextAuth
});

export { handler as GET, handler as POST }; // Exporta o handler para GET e POST
