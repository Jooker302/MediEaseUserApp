import React from 'react';
// import {View, Text, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import RoleSelectScreen from './src/screens/RoleSelectScreen';
import Login from './src/screens/Login';
import Register from './src/screens/Register';

const App = (): JSX.Element => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{title: 'SplashScreen',
                    headerShown: false,
          }}
        />
        <Stack.Screen
          name="RoleSelectScreen"
          component={RoleSelectScreen}
          options={{title: 'SplashScreen',
                    headerShown: false,
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{title: 'Register',
                    headerShown: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{title: 'Login',
                    headerShown: false,
          }}
        />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
