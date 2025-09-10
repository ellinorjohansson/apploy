import { useParams } from "react-router-dom";

export const JobsDetailPage = () => {
  const { jobId } = useParams(); // Hämtar jobId från URL

  return (
    <section>
      <h1>Jobbsidan</h1>
      <p>Detaljsita för enskilt jobb{jobId}</p>
    </section>
  );
};
