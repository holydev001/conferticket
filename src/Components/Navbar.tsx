import icon from "../assets/icon.png";
import arrow from "../assets/arrow.png";

const navItems = [
  { label: "Events", href: "#" },
  { label: "My Tickets", href: "#" },
  { label: "About Project", href: "#" },
];

const Navbar = () => {
  return (
    <>
      <nav className="relative top-0 z-50 py-3 bg-[#05252C] bg-opacity-40 backdrop-blur-[4px] border-solid border-[1px] border-[#197686] rounded-[24px] h-[76px] mt-[24px] mx-auto flex justify-between items-center w-[90%]  ">
        <div className="flex items-center flex-shrink-0 ml-[16px]">
          <img className="h-[36px] w-[91px] mr-2" src={icon} alt="logo" />
        </div>

        <ul className="hidden  md:flex ml-14 space-x-12 text-[18px] ">
          {navItems.map((item, index) => (
            <li key={index}>
              <a href="{item.href}">{item.label}</a>
            </li>
          ))}
        </ul>

        <div className=" lg:flex  mr-[16px] space-x-12 items-center">
          <a
            href=""
            className="py-2 px-3 border rounded-[12px] bg-white  h-[52px] w-[169px]  text-[black] flex justify-center items-center"
          >
            MY TICKETS <img src={arrow} alt="arrow" />
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

<div className=" container px-4 mx-auto relative  "></div>;
