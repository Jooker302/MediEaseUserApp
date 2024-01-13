import React from 'react';
// import {View, Text, SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen';
import RoleSelectScreen from './src/screens/RoleSelectScreen';
import UserLogin from './src/screens/UserLogin';
import Register from './src/screens/Register';
import DoctorLogin from './src/screens/DoctorLogin';
import UserHome from './src/screens/UserHome';
import DcotorHome from './src/screens/DcotorHome';

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
          name="UserLogin"
          component={UserLogin}
          options={{title: 'UserLogin',
                    headerShown: false,
          }}
        />
        <Stack.Screen
          name="DoctorLogin"
          component={DoctorLogin}
          options={{title: 'DoctorLogin',
                    headerShown: false,
          }}
        />
        <Stack.Screen
          name="DoctorHome"
          component={DcotorHome}
          options={{title: 'DcotorHome',
                    headerShown: false,
          }}
        />
        <Stack.Screen
          name="UserHome"
          component={UserHome}
          options={{title: 'UserHome',
                    headerShown: false,
          }}
        />
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
