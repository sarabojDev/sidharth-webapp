import React from 'react'
import LoginScreen from './Screens/LoginScreen'
import { ConfigProvider } from 'antd';
import ResetPasswordScreen from './Screens/ResetPasswordScreen';
import AppsList from './Screens/AppsList';
import HrmsScreen from './Screens/HrmsScreen';

const App = () => {
  return <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#00b96b',
        fontFamily: "Karla"
      },
    }}
  >
    {/* <LoginScreen /> */}
    {/* <ResetPasswordScreen /> */}
    {/* <AppsList/> */}
    <HrmsScreen />
  </ConfigProvider>

}

export default App