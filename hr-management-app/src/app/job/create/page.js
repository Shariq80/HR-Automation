import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../lib/firebase';
import JobCreationForm from '../../../components/JobCreationForm';

export default function CreateJobPage() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Please log in to create a job posting.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Create New Job Posting</h1>
      <JobCreationForm user={user} />
    </div>
  );
}