import { Layout, Pages } from "../../components/layout";

const Start = () => {
  return (
    <Layout currentPage={Pages.Start}>
      <p>Welkom bij de administratie omgeving van de Regio Noordkop app.</p>
      <p>
        Hier kunt u de programmering voor Regio Noordkop aanpassen. Ook kunt u
        pushberichten sturen die aankomen in de app.
      </p>
    </Layout>
  );
};

export default Start;
