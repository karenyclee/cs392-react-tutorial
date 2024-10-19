import './App.css';
import Banner from './components/Banner';
import Chooser from './components/Chooser';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useJsonQuery } from './utilities/fetch';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import EditForm from './components/EditForm';

const EditLoader = ({courses}) => {
  const {id} = useParams();
  const course = courses[id];
  return <EditForm course={course}/>;
};

const Main = () => {
  const [data, isLoading, error] = useJsonQuery('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php');

  if (error) return <h1>Error loading user data: {`${error}`}</h1>;
  if (isLoading) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;

  return (
      <BrowserRouter>
        <>
          <Banner title={data.title}></Banner>
          <Routes>
            <Route path="/" element={<Chooser courses={data.courses}/>} />
            <Route path="/edit/:id" element={<EditLoader courses={data.courses} />} />
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
