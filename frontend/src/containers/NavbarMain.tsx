import { Avatar } from "@mantine/core";

export default function NavbarMain() {
  return (
    <>
        <div className='nav w-full h-50 bg-cgrey-900 p-2 drop-shadow-lg'>
            <div className="nav-header flex items-center justify-center sm:justify-start">
                <Avatar src='/Bangalore_City_Police_Logo.png' className="mx-2" />
                <h1 className="text-2xl font-pts font-bold px-2">BLRPD Face Recognition</h1>
            </div>
        </div>
    </>
  );
}
