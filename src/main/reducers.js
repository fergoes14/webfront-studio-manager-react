import { combineReducers } from "redux";
import {reducer as formReducer} from 'redux-form'
import { reducer as toastrReducer} from "react-redux-toastr";
import AuthReducer from "../auth/authReducer";
import TabReducer from "../common/tabs/tabReducer";
import CadastroAlunoReducer from "../cadastroAluno/cadastroAlunoReducer";
import storage from 'redux-persist/lib/storage'
import cadastroProfReducer from "../cadastroProfissional/cadastroProfReducer";
import evoAlunoReducer from "../cadastroAluno/evoAlunoReducer";
import CadastroSalasReducer from "../cadastroSalas/CadastroSalasReducer";
import CadastroPlanosReducer from "../cadastroPlanos/CadastroPlanosReducer";
import CadastroMatriculaReducer from "../cadastroMatricula/CadastroMatriculaReducer";
import billingCyclesReducer from "../billingCicles/billingCycleReducer";



const rootReducer = combineReducers({
    
    tab : TabReducer,
    cadastroAluno : CadastroAlunoReducer,
    cadastroProf : cadastroProfReducer,
    cadastroSalas : CadastroSalasReducer,
    cadastroPlanos: CadastroPlanosReducer,
    cadastroMatricula:CadastroMatriculaReducer,
    billingCycle: billingCyclesReducer,
    evoAluno : evoAlunoReducer,
    form:formReducer,
    auth: AuthReducer,
    toastr: toastrReducer,
   

})


export default rootReducer