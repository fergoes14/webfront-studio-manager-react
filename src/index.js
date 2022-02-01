import React from 'react' // Importa o React
import ReactDOM from 'react-dom' // Importa o React para visualização no browser
import { applyMiddleware, createStore } from 'redux' // Importa o Create Store que pertence ao Redux
import { Provider } from 'react-redux' // Importa a integração do React com o Redux
import registerServiceWorker from './registerServiceWorker' 


import thunk from 'redux-thunk'

import promise from 'redux-promise'

import multi from 'redux-multi' 


import reducers from './main/reducers'


import AuthOrApp from './main/authOrApp'



 
const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ 
      && window.__REDUX_DEVTOOLS_EXTENSION__()

      
const store = applyMiddleware(multi,promise,thunk)(createStore)(reducers,devTools) // Chama todos os Reducers para envolver a aplicação em <App /> com o <Provider> puxando essa constante



ReactDOM.render(


    <Provider store={store}>
        <AuthOrApp/>
    </Provider>
, document.getElementById('app'))

registerServiceWorker()