import { useEffect } from 'react';
import {
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import './css/style.scss';

import { AuthProvider } from './context/AuthProvider';

// // Professional
import Signin from './pages/Signin';
import Signup from './pages/Signup';
// import ProfessionalProfile from './pages/ProfessionalProfile';

// // Patient
// import Patients from './pages/Patients';
// import Anamnesis from './pages/Anamnesis';
// import { PageNotFound } from './pages/PageNotFound';
// import PatientHome from './pages/PatientHome';
// import PatientProfile from './pages/PatientProfile';
// import EnergyExpenditure from './pages/EnergyExpenditure';
// import FoodPlan from './pages/FoodPlan';
// import Anthropometry from './pages/Anthropometry';

// Protected Layout Component
import { ProtectedLayout } from './components/ProtectedLayout'
import Home from './pages/Home';

function App() {

  const location = useLocation();

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<ProtectedLayout children={<Home />} />} />

          <Route path="/signin" element={<Signin />} />

          <Route path="/signup" element={<Signup />} />

          {/*<Route path="/profile" element={<ProtectedLayout children={<ProfessionalProfile />} />} />

          <Route path="/patients" element={<ProtectedLayout children={<Patients />} />} />

          <Route path="/patient/:id" element={<ProtectedLayout children={<PatientHome />} />} />

          <Route path="/patient/:id/profile" element={<ProtectedLayout children={<PatientProfile />} />} />

          <Route path="/patient/:id/new-anamnesis" element={<ProtectedLayout children={<Anamnesis />} />} />

          <Route path="/patient/:id/anamnesis/:anamnesisId" element={<ProtectedLayout children={<Anamnesis />} />} />

          <Route path="/patient/:id/new-gasto-energetico" element={<ProtectedLayout children={<EnergyExpenditure />} />} />

          <Route path="/patient/:id/gasto-energetico/:energyExpenditureId" element={<ProtectedLayout children={<EnergyExpenditure />} />} />

          <Route path="/patient/:id/new-antropometria" element={<ProtectedLayout children={<Anthropometry />} />} />

          <Route path="/patient/:id/antropometria/:anthropometryId" element={<ProtectedLayout children={<Anthropometry />} />} />

          <Route path="/patient/:id/new-food-plan" element={<ProtectedLayout children={<FoodPlan />} />} />

          <Route path="/patient/:id/food-plan/:foodPlanId" element={<ProtectedLayout children={<FoodPlan />} />} />
          
          <Route path="/*" element={<PageNotFound />} /> */}

        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
