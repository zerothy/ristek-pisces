import NavbarButton from "./NavbarButton";
import Logo from "./Logo";

export default function Navbar() {
    return (
        <div className="hidden md:block w-[18%] min-w-max h-svh border-solid border-opacity-40 border-r-2 border-[#ffc900] font-medium z-10 bg-[#010048] font-monserrat">
            <Logo />
            <NavbarButton />
        </div>
    );
}