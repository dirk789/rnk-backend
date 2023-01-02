import { Layout, Pages } from "../../components/layout";
import ProgrammeringComponent from "../../components/programmeringComponent";

const Programmering = () => {
  return (
    <Layout currentPage={Pages.Programmering}>
      <ProgrammeringComponent name="programmering" omroep="LOS Den Helder" />
    </Layout>
  );
};

export default Programmering;
