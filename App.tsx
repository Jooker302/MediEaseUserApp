import React, {forwardRef, useImperativeHandle } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import RoleSelectScreen from './src/screens/RoleSelectScreen';
import UserLogin from './src/screens/UserLogin';
import Register from './src/screens/Register';
import DoctorLogin from './src/screens/DoctorLogin';
import UserHome from './src/screens/UserHome';
import DcotorHome from './src/screens/DcotorHome';
import UserNavigator from './src/components/UserNavigator';
import UserPredication from './src/screens/UserPredication';
import Toast from 'react-native-toast-message';
import { useRef }from 'react';

const ForwardedToast = forwardRef((props: any, ref: any) => {
  useImperativeHandle(ref, () => ({
    // Define methods or properties you want to expose here
  }));

  return <Toast {...props} />;
});

const App = (): JSX.Element => {
  const Stack = createNativeStackNavigator();
  // const ForwardedToast = forwardRef((props: ToastProps, ref: any) => {
  //   return <Toast {...props} ref={ref} />;
  // });
  const toastRef = useRef<any>(null);
  
  return (
    <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ title: 'SplashScreen', headerShown: false }}
        />
        <Stack.Screen
          name="RoleSelectScreen"
          component={RoleSelectScreen}
          options={{ title: 'SplashScreen', headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ title: 'Register', headerShown: false }}
        />
        <Stack.Screen
          name="UserLogin"
          component={UserLogin}
          options={{ title: 'UserLogin', headerShown: false }}
        />
        <Stack.Screen
          name="DoctorLogin"
          component={DoctorLogin}
          options={{ title: 'DoctorLogin', headerShown: false }}
        />
        <Stack.Screen
          name="DoctorHome"
          component={DcotorHome}
          options={{ title: 'DcotorHome', headerShown: false }}
        />
        <Stack.Screen
          name="UserHome"
          component={UserHome}
          options={{ title: 'UserHome', headerShown: false }}
        />
        <Stack.Screen
          name="UserNavigator"
          component={UserNavigator}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="UserPrediction"
          component={UserPredication}
          options={{ headerShown: true,
            headerStyle: {
              backgroundColor: '#fff8dc', 
            },
            headerTintColor: '#04b1b2', 
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            headerTitle: 'Predictions', 
           }} 
        />
      </Stack.Navigator>
      <ForwardedToast ref={toastRef} />
    </NavigationContainer>
    </>
  );
};

export default App;

