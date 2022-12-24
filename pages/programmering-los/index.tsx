import { Layout } from "../../components/layout";
import ProgrammeringComponent from "../../components/programmeringComponent";

const Programmering = () => {
  return (
    <Layout currentPage={1}>
      <ProgrammeringComponent name="programmering" omroep="LOS Den Helder" />
    </Layout>
  );
};

export default Programmering;
