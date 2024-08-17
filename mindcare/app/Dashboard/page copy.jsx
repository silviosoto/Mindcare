"use client"
import withAuth from '../withAuth';

const  AdminDashboard = () =>{
  return <div>Bienvenido al Dashboard de Administrador</div>;
}

export default withAuth(AdminDashboard);