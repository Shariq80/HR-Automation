import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../../lib/firebase';
import AdminDashboard from '../../../components/AdminDashboard';

export default function AdminPage() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user || user.uid !== 'your-admin-uid') {
    return <div>Please log in as an admin.</div>;
  }

  return <AdminDashboard />;
}