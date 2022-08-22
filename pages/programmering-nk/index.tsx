import { Layout } from "../../components/layout";
import ProgrammeringComponent from "../../components/programmeringComponent";

const Programmering = () => {
  return (
    <Layout currentPage={2}>
      <ProgrammeringComponent name="programmering-nk" omroep="RTV Noordkop" />
    </Layout>
  );
};

export default Programmering;
