import React from 'react';
import Home from '../screen/Home/Home';
import Login from '../screen/Auth/Login';
import Signup from '../screen/Auth/Signup';
import Splash from '../screen/Splash/Splash';
import AdminHome from '../screen/Admin/AdminHome';
import Employee from '../screen/Employee/Employee';
import CreateAsset from '../screen/Asset/CreateAsset';
import ListOfAssets from '../screen/Asset/ListOfAssets';
import CreateEmployee from '../screen/Employee/CreateEmployee';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Employee_profile from '../screen/Home/Employee_profile';
import EmployeeLeave from '../screen/Leave/EmployeeLeave';
import Project from '../screen/Project/Project';
import AddProject from '../screen/Project/AddProject';
import ProjectDetails from '../screen/Project/ProjectDetails';
import SuperAdminHome from '../screen/SuperAdmin/SuperAdminHome';
import CreateAdmin from '../screen/SuperAdmin/CreateAdmin';
import ChangePassword from '../screen/Auth/ChangePassword';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={Signup} />
      <Stack.Screen name="changePassword" component={ChangePassword} />
      {/* Employee Home */}
      <Stack.Screen name="home" component={Home} />
      <Stack.Screen name="employee" component={Employee} />
      <Stack.Screen name="createemployee" component={CreateEmployee} />
      <Stack.Screen name="assets" component={ListOfAssets} />
      <Stack.Screen name="createassets" component={CreateAsset} />
      <Stack.Screen name="employeeprofile" component={Employee_profile} />
      <Stack.Screen name="employeeleave" component={EmployeeLeave} />
      {/* Admin */}
      <Stack.Screen name="adminhome" component={AdminHome} />
      <Stack.Screen name="project" component={Project} />
      <Stack.Screen name="addproject" component={AddProject} />
      <Stack.Screen name="projectdescription" component={ProjectDetails} />

      {/* Super Admin */}
      <Stack.Screen name="superadminhome" component={SuperAdminHome} />
      <Stack.Screen name="createadmin" component={CreateAdmin} />

    </Stack.Navigator>
  );
};

export default AppNavigator;
