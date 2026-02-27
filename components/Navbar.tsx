import { useRouter } from "next/navigation";

type Props = {};

function Navbar({}: Props) {
  const handleCreateLogo = () => {
    const router = useRouter();
  };

  return (
    <div className="w-full px-4 md:px-8 py-4 flex items-center justify-between border-b border-white/10 relative z-50 bg-black/50 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <span className="font-semibold text-base md:text-lg">Logo Maker</span>
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
        className="px-4 md:px-6 py-2 bg-black text-white text-sm md:text-base font-semibold rounded-lg transition-colors border border-white/10"
      >
        Create Logo
      </button>
    </div>
  );
}

export default Navbar;
