import { Link } from 'wouter';

export function NotFoundPage() {
  return (
    <main className="simple-page">
      <h1>Такой страницы пока нет</h1>
      <Link href="/">Вернуться в главное меню</Link>
    </main>
  );
}
