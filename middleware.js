// Importa o middleware de autenticação do NextAuth.js
import { withAuth } from 'next-auth/middleware';

// Define o middleware que protege rotas específicas
export default withAuth({
  pages: {
    signIn: '/login', // Redireciona para a página de login se o usuário não estiver autenticado
  },
});

// Define as rotas que exigem autenticação
export const config = {
  matcher: ['/profile'], // Proteger a rota /profile
};
