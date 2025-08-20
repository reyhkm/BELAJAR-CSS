import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="bg-brand-primary p-4 shadow-lg">
      <div className="container mx-auto">
        <Link to="/" className="text-2xl font-bold text-brand-accent hover:text-white transition-colors">
          CSS Quest
        </Link>
      </div>
    </header>
  );
}

export default Header;
