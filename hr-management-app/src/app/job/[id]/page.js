import { useRouter } from 'next/router';
import JobDetails from '../../../components/JobDetails';

export default function JobPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <div>Loading...</div>;
  }

  return <JobDetails jobId={id} />;
}