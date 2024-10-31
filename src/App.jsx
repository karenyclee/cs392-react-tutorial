import './App.css';
import Banner from './components/Banner';
import Chooser from './components/Chooser';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import EditForm from './components/EditForm';
import { useAuthState, useDbData } from "./utilities/firebase";
import { useProfile } from "./utilities/profile";

const EditLoader = ({courses}) => {
  const {id} = useParams();
  const course = courses[id];
  return <EditForm course={course} id={id}/>;
};

const Main = () => {
  const [profile, profileLoading, profileError] = useProfile();
  const [data, error] = useDbData('/cs-courses');
  
  if (error) return <h1>Error loading data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading data...</h1>;
  if (!data) return <h1>No data found</h1>;

  return (
      <BrowserRouter>
        <>
          <Banner title={data.title}></Banner>
          <Routes>
            <Route path="/" element={<Chooser courses={data.courses} profile={profile}/>} />
            <Route path="/edit/:id" element={<EditLoader courses={data.courses}/>} />
          </Routes>
        </>
      </BrowserRouter>
    );
}

const queryClient = new QueryClient();

const App = () => {
  return (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);
};


export default App;
