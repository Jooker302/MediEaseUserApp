import React from 'react';
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

const App = (): JSX.Element => {
  const Stack = createNativeStackNavigator();

  return (
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
          options={{ headerShown: false }} // Optionally hide the header for the nested navigator
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

