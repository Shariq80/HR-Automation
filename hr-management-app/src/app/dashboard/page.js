import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../lib/firebase';
import Dashboard from '../../components/Dashboard';

export default function DashboardPage() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to access the dashboard.</div>;
  }

  return <Dashboard user={user} />;
}