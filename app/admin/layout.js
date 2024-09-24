// app/admin/layout.js
import Link from 'next/link';
import HeaderAdmin from '../componentes/admin/HeaderAdmin';
import FooterAdmin from '../componentes/admin/FooterAdmin';

export const metadata = {
  title: "Admin - IEE",
  description: "Painel de administração",
};

export default function AdminLayout({ children }) {


    
  return (
    <>
    <HeaderAdmin/>
        <main className="bg-white">
          {children} {/* Renderiza o conteúdo das páginas dentro do layout */}
        </main>
    <FooterAdmin/>
    </>
  );
}
