import { Route } from "react-router";

import Login from "./Pages/Login/Login";
import { useContext, useEffect } from "react";
import { Routes } from "react-router-dom";

import Not from "./Pages/404/index";

//Paginas Admin
import HomeAdmin from "./Pages/HomeAdmin/homeadmin";
import Gestaotecnicos from "./Pages/GestaoTecnicos/gestaotecnicos";
import GestaoBeneficiarios from "./Pages/GestaoBeneficiarios/gestaobeneficiarios";
import Definicoes from "./Pages/Definicoes/definicoes";
import Suporte from "./Pages/Suporte/suport";
// import SuportAdmin from "../Pages/Suporte/suportAdmin";

//Rotas para o template
import TemplateAnexoII from "./Pages/Template/anexoIItemplate";
import TemplateAnexoIII from "./Pages/Template/anexoIIItemplate";


//Paginas dos Tecnicos
import Home from "./Pages/Home_tecnico/Home";
import DefinicoesTecnico from "./Pages/Definicoes/definicoesTecnico";
import Historico from "./Pages/Historico/historico";

//ROTAS CADERNOS **********************************************
import IdentBenExp from "./Pages/Cadernos/1-IdentificacaoBenExp";
import CaraterizacaoAreas from "./Pages/Cadernos/2-CaraterizacaoAreas";
import CaracterizacaoEfePecuaria from "./Pages/Cadernos/3-CaraterizEfePecuario";
import RegProtFitossanitaria from "./Pages/Cadernos/4-RegistoProtFitossanitaria";
import RegistoOperCulturais from "./Pages/Cadernos/5-RegistoOperCulturais";
import RegOperFertil from "./Pages/Cadernos/5A-RegOperFertilizacao";
import RegAtividades from "./Pages/Cadernos/5B-RegAtividades";
// import RegAtividPP from "./Pages/Cadernos/5C-RegAtividPP";
import RegAtividadesFO from "./Pages/Cadernos/5D-RegAtividadesFO";
// import RegCalRega from "./Pages/Cadernos/6-RegCalRega";
// import RegProducaoAnimal from "./Pages/Cadernos/7-RegProducaoAnimal";
// import RegPosColheita from "./Pages/Cadernos/8-RegPosColheita";
// import RegAquisicoesEntra from "./Pages/Cadernos/9-RegAquisicoesEntra";
// import RegVendas from "./Pages/Cadernos/10-RegVendas";
// import RegGestaoEP from "./Pages/Cadernos/11-RegGestaoEP";
import Anexo1 from "./Pages/Anexos/Anexo1";
import Anexo2 from "./Pages/Anexos/Anexo2";
import Anexo3 from "./Pages/Anexos/Anexo3";
import Anexo4 from "./Pages/Anexos/Anexo4";
import Anexo5 from "./Pages/Anexos/Anexo5";
import Anexo6 from "./Pages/Anexos/Anexo6";
import Anexo7 from "./Pages/Anexos/Anexo7";

//Eficiência Alimentar
// import EFIdentBenfExp from "./Pages/EficAlimentar/1-IdentificbenefExp/EFBeneficiario";
// import EFPlanoAlimentar from "./Pages/EficAlimentar/2-PaPlanoAlimentar";
import EF_PA_GH1 from "./Pages/EficAlimentar/2.1.PA_GH1";
import EF_PA_GH2 from "./Pages/EficAlimentar/2.2PA_GH2";
import EF_PA_GH3 from "./Pages/EficAlimentar/2.3-PA_GH3";
import EFCadernoCampos from "./Pages/EficAlimentar/3-CC_Caderno_Campo";
import EF_CC_GH1 from "./Pages/EficAlimentar/3.1.CC_GH1";
import EF_CC_GH2 from "./Pages/EficAlimentar/3.2.CC_GH2";
import EF_CC_GH3 from "./Pages/EficAlimentar/3.3.CC_GH3";

// Outras
import { AuthContext } from "./AuthContext/AuthContext";
import { func_print } from "./Func_genericas/func_print";
import { verify_role } from "./Func_genericas/verify_role";
import AnexoIVtemplate from "./Pages/Template/AnexoIVtemplate";
import AnexoVtemplate from "./Pages/Template/AnexoVtemplate";

//ADRIANA VINHAS
function App() {
  const auth = useContext(AuthContext);
  

  const verify_if_token_exist = () => {
    try {
      let token = localStorage.getItem("token");
      if (token !== null) {
        let role = verify_role(token);
        auth.func_set_user_role(role);
        auth.func_set_user(token);
      }
    } catch (error) {
      func_print("verify_if_token_exist", error, true);
    }
  };

  useEffect(() => {
    verify_if_token_exist();
  }, []);

  return (
    <Routes>
      {auth.user_role === "admin" ? (
        <Route>
          <Route path="/" element={<HomeAdmin />} />
          <Route path="/gestaotecnicos" element={<Gestaotecnicos />} />
          <Route
            path="/gestaoBeneficiarios"
            element={<GestaoBeneficiarios />}
          />
          <Route path="/suporte" element={<Suporte />} />
          <Route path="/definicoes" element={<Definicoes />} />
          <Route path="/anexoIItemplate" element={<TemplateAnexoII />} />
          <Route path="/anexoIIItemplate" element={<TemplateAnexoIII />} />

          {/* Cadernos de campo */}
          <Route path="/IdentificacaoBenExp" element={<IdentBenExp />} />
          <Route path="/CaraterizacaoAreas" element={<CaraterizacaoAreas />} />
          <Route
            path="/CaracterizacaoEfePecuaria"
            element={<CaracterizacaoEfePecuaria />}
          />
          <Route
            path="/RegistoProtFitossanitaria"
            element={<RegProtFitossanitaria />}
          />
          <Route
            path="/RegistoOperCulturais"
            element={<RegistoOperCulturais />}
          />
          <Route path="/RegOperFertil" element={<RegOperFertil />} />
          <Route path="/RegAtividades" element={<RegAtividades />} />
          {/* <Route path="/RegAtividPP" element={<RegAtividPP />} /> */}
          <Route path="/RegAtividadesFO" element={<RegAtividadesFO />} />
          {/* <Route path="/RegCalRega" element={<RegCalRega />} /> */}
          {/* <Route path="/RegProducaoAnimal" element={<RegProducaoAnimal />} /> */}
          {/* <Route path="/RegPosColheita" element={<RegPosColheita />} /> */}
          {/* <Route path="/RegAquisicoesEntra" element={<RegAquisicoesEntra />} /> */}
          {/* <Route path="/RegVendas" element={<RegVendas />} /> */}
          {/* <Route path="/RegGestaoEP" element={<RegGestaoEP />} /> */}
          <Route path="/Anexo1" element={<Anexo1 />} />
          <Route path="/Anexo2" element={<Anexo2 />} />
          <Route path="/Anexo3" element={<Anexo3 />} />
          <Route path="/Anexo4" element={<Anexo4 />} />
          <Route path="/Anexo5" element={<Anexo5 />} />
          <Route path="/Anexo6" element={<Anexo6 />} />
          <Route path="/Anexo7" element={<Anexo7 />} />
          {/* Eficiência alimentar */}
          {/* <Route path="/EFIdentBenfExp" element={<EFIdentBenfExp />} /> */}
          {/* <Route path="/EFPlanoAlimentar" element={<EFPlanoAlimentar />} /> */}
          <Route path="/EF_PA_GH1" element={<EF_PA_GH1 />} />
          <Route path="/EF_PA_GH2" element={<EF_PA_GH2 />} />
          <Route path="/EF_PA_GH3" element={<EF_PA_GH3 />} />
          <Route path="/EF_Caderno_Campos" element={<EFCadernoCampos />} />
          <Route path="/EF_CC_GH1" element={<EF_CC_GH1 />} />
          <Route path="/EF_CC_GH2" element={<EF_CC_GH2 />} />
          <Route path="/EF_CC_GH3" element={<EF_CC_GH3 />} />
          <Route path="*" element={<Not />} />
        </Route>
      ) : auth.user_role === "tecnico" ? (
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/IdentificacaoBenExp" element={<IdentBenExp />} />

          <Route path="definicoestecnico" element={<DefinicoesTecnico />} />

          <Route path="/CaraterizacaoAreas" element={<CaraterizacaoAreas />} />
          <Route
            path="/CaracterizacaoEfePecuaria"
            element={<CaracterizacaoEfePecuaria />}
          />
          <Route
            path="/RegistoProtFitossanitaria"
            element={<RegProtFitossanitaria />}
          />
          <Route
            path="/RegistoOperCulturais"
            element={<RegistoOperCulturais />}
          />
          <Route path="/RegOperFertil" element={<RegOperFertil />} />
          <Route path="/RegAtividades" element={<RegAtividades />} />
          {/* <Route path="/RegAtividPP" element={<RegAtividPP />} /> */}
          <Route path="/RegAtividadesFO" element={<RegAtividadesFO />} />
          {/* <Route path="/RegCalRega" element={<RegCalRega />} /> */}
          {/* <Route path="/RegProducaoAnimal" element={<RegProducaoAnimal />} /> */}
          {/* <Route path="/RegPosColheita" element={<RegPosColheita />} /> */}
          {/* <Route path="/RegAquisicoesEntra" element={<RegAquisicoesEntra />} /> */}
          {/* <Route path="/RegVendas" element={<RegVendas />} /> */}
          {/* <Route path="/RegGestaoEP" element={<RegGestaoEP />} /> */}
          <Route path="/Anexo1" element={<Anexo1 />} />
          <Route path="/Anexo2" element={<Anexo2 />} />
          <Route path="/Anexo3" element={<Anexo3 />} />
          <Route path="/Anexo4" element={<Anexo4 />} />
          <Route path="/Anexo5" element={<Anexo5 />} />
          <Route path="/Anexo6" element={<Anexo6 />} />
          <Route path="/Anexo7" element={<Anexo7 />} />

          {/* Eficiência alimentar */}
          {/* <Route path="/EFIdentBenfExp" element={<EFIdentBenfExp />} /> */}
          {/* <Route path="/EFPlanoAlimentar" element={<EFPlanoAlimentar />} /> */}
          <Route path="/EF_PA_GH1" element={<EF_PA_GH1 />} />
          <Route path="/EF_PA_GH2" element={<EF_PA_GH2 />} />
          <Route path="/EF_PA_GH3" element={<EF_PA_GH3 />} />
          <Route path="/EF_Caderno_Campos" element={<EFCadernoCampos />} />
          <Route path="/EF_CC_GH1" element={<EF_CC_GH1 />} />
          <Route path="/EF_CC_GH2" element={<EF_CC_GH2 />} />
          <Route path="/EF_CC_GH3" element={<EF_CC_GH3 />} />

          <Route path="/historico" element={<Historico />} />
          <Route path="*" element={<Not />} />
        </Route>
      ) : (
        <Route>
          <Route path="/*" element={<Login />} />
          <Route path="*" element={<Login />} />
          <Route path="/" element={<Login />} />
        </Route>
      )}

      {/* </Route> */}

        {auth.user_role === "admin" ? (
          <Route>
            <Route path="/" element={<HomeAdmin />} />
            <Route path="/gestaotecnicos" element={<Gestaotecnicos />} />
            <Route
              path="/gestaoBeneficiarios"
              element={<GestaoBeneficiarios />}
            />
            <Route path="/suporte" element={<Suporte />} />
            <Route path="/definicoes" element={<Definicoes />} />
            <Route path="/anexoIItemplate" element={<TemplateAnexoII />} />
            <Route path="/anexoIIItemplate" element={<TemplateAnexoIII />} />
            <Route path="/AnexoIVtemplate" element={<AnexoIVtemplate />} />
            <Route path="/AnexoVtemplate" element={<AnexoVtemplate />} />

            <Route path="definicoestecnico" element={<DefinicoesTecnico />} />
            {/* Cadernos de campo */}
            <Route path="/IdentificacaoBenExp" element={<IdentBenExp />} />
            <Route
              path="/CaraterizacaoAreas"
              element={<CaraterizacaoAreas />}
            />
            <Route
              path="/CaracterizacaoEfePecuaria"
              element={<CaracterizacaoEfePecuaria />}
            />
            <Route
              path="/RegistoProtFitossanitaria"
              element={<RegProtFitossanitaria />}
            />
            <Route
              path="/RegistoOperCulturais"
              element={<RegistoOperCulturais />}
            />
            <Route path="/RegOperFertil" element={<RegOperFertil />} />
            <Route path="/RegAtividades" element={<RegAtividades />} />
            {/* <Route path="/RegAtividPP" element={<RegAtividPP />} /> */}
            <Route path="/RegAtividadesFO" element={<RegAtividadesFO />} />
            {/* <Route path="/RegCalRega" element={<RegCalRega />} /> */}
            {/* <Route path="/RegProducaoAnimal" element={<RegProducaoAnimal />} /> */}
            {/* <Route path="/RegPosColheita" element={<RegPosColheita />} /> */}
            {/* <Route path="/RegAquisicoesEntra"element={<RegAquisicoesEntra />}/> */}
            
            {/* <Route path="/RegVendas" element={<RegVendas />} /> */}
            {/* <Route path="/RegGestaoEP" element={<RegGestaoEP />} /> */}
            <Route path="/Anexo1" element={<Anexo1 />} />
            <Route path="/Anexo2" element={<Anexo2 />} />
            <Route path="/Anexo3" element={<Anexo3 />} />
            <Route path="/Anexo4" element={<Anexo4 />} />
            <Route path="/Anexo5" element={<Anexo5 />} />
            <Route path="/Anexo6" element={<Anexo6 />} />
            <Route path="/Anexo7" element={<Anexo7 />} />
            {/* Eficiência alimentar */}
            {/* <Route path="/EFIdentBenfExp" element={<EFIdentBenfExp />} /> */}
            {/* <Route path="/EFPlanoAlimentar" element={<EFPlanoAlimentar />} /> */}
            <Route path="/EF_PA_GH1" element={<EF_PA_GH1 />} />
            <Route path="/EF_PA_GH2" element={<EF_PA_GH2 />} />
            <Route path="/EF_PA_GH3" element={<EF_PA_GH3 />} />
            <Route path="/EF_Caderno_Campos" element={<EFCadernoCampos />} />
            <Route path="/EF_CC_GH1" element={<EF_CC_GH1 />} />
            <Route path="/EF_CC_GH2" element={<EF_CC_GH2 />} />
            <Route path="/EF_CC_GH3" element={<EF_CC_GH3 />} />
            <Route path="*" element={<Not />} />

          </Route>
        ) : auth.user_role === "tecnico" ? (
          <Route>
            <Route  path="/" element={<Home />} />

            {/*  <Route path="/IdentificacaoBenExp" element={<IdentBenExp />} /> */}

            <Route
              path="/CaraterizacaoAreas"
              element={<CaraterizacaoAreas />}
            />
            <Route
              path="/CaracterizacaoEfePecuaria"
              element={<CaracterizacaoEfePecuaria />}
            />
            <Route
              path="/RegistoProtFitossanitaria"
              element={<RegProtFitossanitaria />}
            />
            <Route
              path="/RegistoOperCulturais"
              element={<RegistoOperCulturais />}
            />
            <Route path="/RegOperFertil" element={<RegOperFertil />} />
            <Route path="/RegAtividades" element={<RegAtividades />} />
            {/* <Route path="/RegAtividPP" element={<RegAtividPP />} /> */}
            <Route path="/RegAtividadesFO" element={<RegAtividadesFO />} />
            {/* <Route path="/RegCalRega" element={<RegCalRega />} /> */}
            {/* <Route path="/RegProducaoAnimal" element={<RegProducaoAnimal />} /> */}
            {/* <Route path="/RegPosColheita" element={<RegPosColheita />} /> */}
            {/* <Route path="/RegAquisicoesEntra"element={<RegAquisicoesEntra />} />*/}
            
            {/* <Route path="/RegVendas" element={<RegVendas />} /> */}
            {/* <Route path="/RegGestaoEP" element={<RegGestaoEP />} /> */}
            <Route path="/Anexo1" element={<Anexo1 />} />
            <Route path="/Anexo2" element={<Anexo2 />} />
            <Route path="/Anexo3" element={<Anexo3 />} />
            <Route path="/Anexo4" element={<Anexo4 />} />
            <Route path="/Anexo5" element={<Anexo5 />} />
            <Route path="/Anexo6" element={<Anexo6 />} />
            <Route path="/Anexo7" element={<Anexo7 />} />

            {/* Eficiência alimentar */}
            {/* <Route path="/EFIdentBenfExp" element={<EFIdentBenfExp />} /> */}
            {/* <Route path="/EFPlanoAlimentar" element={<EFPlanoAlimentar />} /> */}
            <Route path="/EF_PA_GH1" element={<EF_PA_GH1 />} />
            <Route path="/EF_PA_GH2" element={<EF_PA_GH2 />} />
            <Route path="/EF_PA_GH3" element={<EF_PA_GH3 />} />
            <Route path="/EF_Caderno_Campos" element={<EFCadernoCampos />} />
            <Route path="/EF_CC_GH1" element={<EF_CC_GH1 />} />
            <Route path="/EF_CC_GH2" element={<EF_CC_GH2 />} />
            <Route path="/EF_CC_GH3" element={<EF_CC_GH3 />} />
            {/* <Route
              path="/IdentificacaoBen/create"
              element={<CreateIdentBen />} /> */}

            <Route path="/historico" element={<Historico />} />
            <Route path="*" element={<Not />} />

          </Route>
        ) : (
          <Route>
            {/* <Route path="/*" element={<Login />} /> 
            <Route path="*" element={<Login />} />  */}
            <Route  path="/" element={<Login />} />


          </Route>

        )}
    {/*   </Route> */}

    </Routes>
  );
}

export default App;
