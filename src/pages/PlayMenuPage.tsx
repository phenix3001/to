import { WarehouseAtmosphere } from '../components/WarehouseAtmosphere';
import '../styles/play-menu.css';

export function PlayMenuPage() {
  return (
    <main className="play-menu" aria-label="Игровая комната">
      <div className="play-menu__backdrop" aria-hidden="true" />
      <WarehouseAtmosphere />
    </main>
  );
}
