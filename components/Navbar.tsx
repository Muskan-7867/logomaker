import { useRouter } from "next/navigation";

type Props = {};

function Navbar({}: Props) {
  const handleCreateLogo = () => {
    const router = useRouter();
  };

  return (
    <div className="w-full px-8 py-4 flex items-center justify-between border-b border-white/10 relative z-50">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-lg">Logo Maker</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
        <a href="#" className="hover:text-white transition-colors">
          Features
        </a>
        <a href="#" className="hover:text-white transition-colors">
          Examples
        </a>
        <a href="#" className="hover:text-white transition-colors">
          How It Works
        </a>
      </div>

      <button
        onClick={handleCreateLogo}
        className="px-6 py-2 bg-black text-white font-semibold rounded-lg transition-colors"
      >
        Create Logo
      </button>
    </div>
  );
}

export default Navbar;
