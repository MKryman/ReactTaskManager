import React from 'react';
import { Route, Routes } from 'react-router';
import Layout from './Components/Layout';
import { AuthContextComponent } from './AuthContext';
import PrivateRoute from './Components/PrivateRoute';
import Tasks from './Pages/Tasks';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Logout from './Pages/Logout';

const App = () => {
    return (
        <AuthContextComponent>
            <Layout>
                <Routes>
                    <Route exact path='/' element={
                        <PrivateRoute>
                            <Tasks />
                        </PrivateRoute>} />
                    <Route exact path='/signup' element={<Signup />} />
                    <Route exact path='/login' element={<Login />} />
                    <Route exact path='/logout' element={
                        <PrivateRoute>
                            <Logout />
                        </PrivateRoute>
                    } />
                </Routes>
            </Layout>
        </AuthContextComponent>
    );
}

export default App;