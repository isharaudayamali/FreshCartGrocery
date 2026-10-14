import { Routes, Route } from 'react-router-dom';
import CustomerList from '../components/pages/customer/CustomerList';
import LoginForm from '../components/pages/user/LoginForm';
import CustomerForm from '../components/pages/customer/CustomerForm';
import CustomerDetailView from '../components/pages/customer/CustomerDetailView';
import CustomerEditForm from '../components/pages/customer/CustomerEditForm';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

const AppRoutes = () => {
  return (
    <Routes>
      
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginForm />} />
      </Route>

      <Route element={<ProtectedRoute />}>
      
        <Route index element={<CustomerList />} />
        <Route path="customers">
          <Route index element={<CustomerList />} />           {/* Path: /customers */}
          <Route path="add" element={<CustomerForm />} />      {/* Path: /customers/add */}
          <Route path=":id" element={<CustomerDetailView />} />{/* Path: /customers/123 */}
          <Route path=":id/edit" element={<CustomerEditForm />}/>{/* Path: /customers/123/edit */}
        </Route>

      </Route>
    </Routes>
  );
};

export default AppRoutes;