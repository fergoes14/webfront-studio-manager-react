import { combineReducers } from "redux";
import {reducer as formReducer} from 'redux-form'
import { reducer as toastrReducer} from "react-redux-toastr";
import AuthReducer from "../auth/authReducer";
import TabReducer from "../common/tabs/tabReducer";
import CadastroAlunoReducer from "../cadastroAluno/cadastroAlunoReducer";
import storage from 'redux-persist/lib/storage'
import cadastroProfReducer from "../cadastroProfissional/cadastroProfReducer";
import evoAlunoReducer from "../cadastroAluno/evoAlunoReducer";



const rootReducer = combineReducers({
    
    tab : TabReducer,
    cadastroAluno : CadastroAlunoReducer,
    cadastroProf : cadastroProfReducer,
    evoAluno : evoAlunoReducer,
    form:formReducer,
    auth: AuthReducer,
    toastr: toastrReducer,

})


export default rootReducer