import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TeamPage from './views/TeamPage';
import TeamsPage from './views/TeamsPage';
import PlayerPage from './views/PlayerPage';


const App = () => (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={<TeamsPage />}
        />
        <Route
          path="/:teamId"
          element={<TeamPage/>}
        />
        <Route
          exact
          path="/:teamId/:playerId"
          element={<PlayerPage />}
        />
      </Routes>
    </Router>
);

export default App;
