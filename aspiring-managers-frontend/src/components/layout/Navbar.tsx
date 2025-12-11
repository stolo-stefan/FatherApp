import logo from "../../assets/Aspiring_Managers_Logomark&Text_V2_color.svg"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 h-14">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-center">
        <img 
          src={logo} 
          alt="Aspiring Managers"
          className="h-10 w-auto"   // Increase logo size
        />
      </div>
    </header>
  );
}
