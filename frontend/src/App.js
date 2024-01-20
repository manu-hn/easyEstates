import React from 'react';
import Body from './components/Body';
import { userStore, persistor } from "./redux/store.js";
import { Provider } from "react-redux"
import { PersistGate } from 'redux-persist/integration/react';



const App = () => {
  return (
    <>
      <Provider store={userStore}>
        <PersistGate persistor={persistor} loading={null}>
        <Body />
        </PersistGate>
      </Provider>
    </>
  )
}

export default App