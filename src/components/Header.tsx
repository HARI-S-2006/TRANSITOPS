export default function Header() {
  return (
    <header className="fixed top-0 right-0 w-[calc(100%-256px)] z-40 flex justify-between items-center h-20 px-8 bg-[#0e1628]/70 dark:bg-[#0e1628]/70 backdrop-blur-xl border-b border-white/10 dark:border-white/10">
      <div className="flex-1 flex items-center">
        <div className="relative w-72 focus-within:ring-1 focus-within:ring-[#6366f1]/50 transition-all rounded-lg">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">search</span>
          <input className="w-full bg-surface-container-high/50 border border-white/10 rounded-lg py-2.5 pl-10 pr-4 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:border-[#6366f1]/50 backdrop-blur-md" placeholder="Search operations..." type="text" />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <button className="font-label-md text-label-md text-on-surface-variant hover:text-[#6366f1] transition-colors duration-200 border border-white/10 rounded-lg px-4 py-2 flex items-center gap-2 bg-surface-container/30">
          <span className="material-symbols-outlined text-[18px]">headphones</span>
          Dispatcher
        </button>
        <button className="relative text-on-surface-variant dark:text-on-surface-variant hover:text-[#6366f1] transition-colors duration-200">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-[#6366f1] rounded-full border-2 border-surface"></span>
        </button>
        <div className="h-10 w-10 rounded-full bg-surface-container-highest border border-white/10 overflow-hidden shadow-lg">
          <img alt="Raven K." className="w-full h-full object-cover" data-alt="A small, professional avatar portrait of a dispatcher in a high-tech logistics control room setting, bathed in cool blue monitor light." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMIhBULmfRD7lAOgR9veVP-aGv1DziQTIb7Ox--jnzN5lPgVbZEs4jx-3uUaxM6FF9wXJzDvC0RWp_AtKwh4sYvMc8jpdx-_Aez9bXAHJluBwR28pEPX4T_BS6M4QVzHdSY4hMJwuMxIMB-AqwMINi_AwIdNzhF7TCJNwaHg68xAd7y6aoxub8r91XY20HezubqOaEeJLYIEUKiP0ruLid1O-xPtVGb8cDPaH8wbA_M1RN3nhJpvd_24OLp9_GtoApL8UQzt-XU6o" />
        </div>
      </div>
    </header>
  );
}
