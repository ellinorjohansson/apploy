// JobDetailPage.tsx

import { useParams } from "react-router-dom";

export const JobsDetailPage = () => {
  const { jobId } = useParams(); // Hämtar jobId från URL

  return (
    <section>
      <h1>Enskilt jobb</h1>
      <p>Detaljsidan{jobId}</p>
    </section>
  );
};
