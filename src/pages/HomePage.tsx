import { AnimatedAtmosphere } from '../components/AnimatedAtmosphere';
import { MagnifyingGlassButton } from '../components/MagnifyingGlassButton';
import { NotebookButton } from '../components/NotebookButton';
import { WrenchButton } from '../components/WrenchButton';
import { useLanguage } from '../lib/i18n';
import '../styles/home-menu.css';
import '../styles/home-atmosphere.css';

export function HomePage() {
  const { text } = useLanguage();

  return (
    <main className="home-menu" onContextMenu={(event) => event.preventDefault()}>
      <div className="home-menu__shade" aria-hidden="true" />
      <AnimatedAtmosphere />
      <h1 className="home-menu__title">{text.title}</h1>

      <div className="home-menu__play">
        <MagnifyingGlassButton />
      </div>

      <div className="home-menu__achievements">
        <NotebookButton />
      </div>

      <div className="home-menu__settings">
        <WrenchButton />
      </div>
    </main>
  );
}
