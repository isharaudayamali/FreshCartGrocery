
import { Routes, Route } from 'react-router-dom';
import CustomerList from '../components/customer/CustomerList';
import LoginForm from '../components/user/LoginForm';
import CustomerForm from '../components/customer/CustomerForm';
import CustomerDetailView from '../components/customer/CustomerDetailView';
import CustomerEditForm from '../components/customer/CustomerEditForm';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

const AppRoutes = () => {
  return (

    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginForm />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<CustomerList />} />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/add" element={<CustomerForm />} />
        <Route path="/customers/:id" element={<CustomerDetailView />} />
        <Route path="/customers/:id/edit" element={<CustomerEditForm />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
