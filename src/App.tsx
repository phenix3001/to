import { Route, Switch } from 'wouter';
import { AchievementsPage } from './pages/AchievementsPage';
import { GamePage } from './pages/GamePage';
import { HomePage } from './pages/HomePage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PlayMenuPage } from './pages/PlayMenuPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/game" component={GamePage} />
      <Route path="/play" component={PlayMenuPage} />
      <Route path="/achievements" component={AchievementsPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
}
