import CustomNavbar from '../components/navbar/NavbarContainer';
import { BrowserRouter, Switch, Route, Routes, Navigate } from "react-router-dom";
import SignUpPage from '../pages/signup/SignupController';
import HomePage from '../pages/HomePage';
import SignInPage from '../pages/signin/SignInPageController';
import { ProtectedRoute } from '../utilities/ProtectedRoute';
import UserProfile from '../pages/UserProfile/UserProfile';
import AdminProfile from '../pages/AdminProfile/AdminProfile';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import RecipeAdminArea from '../pages/AdminProfile/childComponent/RecipeAdminArea';
import IngredientAreaAdmin from '../pages/AdminProfile/childComponent/IngredientAreaAdmin/IngredientAreaAdminContainer';
import UpdateIngredientAdmin from '../pages/AdminProfile/childComponent/UpdateIngredientAdmin.js/UpdateIngredientAdminContainer';
import AddRecipe from '../pages/UserProfile/AddRecipe/AddRecipeContainer';
import ViewRecipeUser from '../pages/UserProfile/ViewRecipeUser/ViewRecipeUserContainer';
import RecipeUserDetails from '../pages/UserProfile/RecipeUserDetails/RecipeUserDetailsContainer';



// const is_user_connected = () => {
//   const result = store.getState().rootReducer.isUserConnectedReducer;
// }

function App(props) {

  
  useEffect(() => {

    props.is_user_connected();

    props.is_user_admin();

  }, []);
  

  const is_user_connected = props.isUserConnectedReducer;

  const is_user_admin = props.isUserAdminReducer;


  return (


    <Box>
      <CustomNavbar />
      <Routes>
        <Route path="/signin" element={

          <ProtectedRoute redirectPath="/"
            isAllowed={!is_user_connected}>
            <SignInPage />
          </ProtectedRoute>
        } />

        <Route path="/signup" element={
          <ProtectedRoute redirectPath="/"
            isAllowed={!is_user_connected}>
            <SignUpPage />
          </ProtectedRoute>
        } />

        <Route path="/" element={<HomePage />} />

        <Route path="/userProfile" element={<UserProfile />}>
          <Route path="addrecipe" element={<AddRecipe />}/>
          <Route path="viewrecipe" element={<ViewRecipeUser />}/>
          <Route path="seerecipedetails/:recipeid" element={<RecipeUserDetails />}/>
          
        </Route>

        <Route path="/adminProfile" element={
          <ProtectedRoute redirectPath="/"
            isAllowed={true}>
            <AdminProfile />
          </ProtectedRoute>
        }>
           <Route path="ingredient" element={<IngredientAreaAdmin/>} />
           <Route path="recipe" element={<RecipeAdminArea/>} />
           <Route path="updateIngredient/:id" element={<UpdateIngredientAdmin />} />
        </Route>

      </Routes>

    </Box>
  );
}

export default App;
