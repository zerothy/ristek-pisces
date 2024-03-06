import { CgProfile } from "react-icons/cg";


export default function Profile() {
    return (
        <div className="bg-[#03002e] h-dvh w-full md:w-[82%] overflow-hidden flex flex-col justify-center items-center">
            <CgProfile className="text-white text-9xl" />
            <div className="text-white text-6xl font-semibold">
                Joe Mathew
            </div>
        </div>
    );
}