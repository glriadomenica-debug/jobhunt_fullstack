import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useJobs } from "../../../hooks/useJobs";

interface Applicant {
  id: number;
  applicant_id: number;
  job_id: number;
  cover_letter: string;
  status: string;
  name: string;
  email: string;
}

function ApplicantsPage() {
  const { id } = useParams();
  const { getApplicants } = useJobs();

  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const data = await getApplicants(Number(id));

        setApplicants(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Job Applicants</h1>

      <div className="space-y-4">
        {applicants.map((applicant) => (
          <div key={applicant.id} className="bg-white p-6 rounded-2xl shadow">
            <h2 className="text-xl font-semibold">{applicant.name}</h2>

            <p className="text-slate-600">{applicant.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApplicantsPage;
