import SectionTitle from "../assets/SectionTitle.svg";
import SectionTitleM from "../assets/SectionTitleM.svg";
import { useState, useEffect } from "react";

interface FirstComponentProps {
  goToNextStep: () => void;
}

const SelectTicket: React.FC<FirstComponentProps> = ({ goToNextStep }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
  };
  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        setSelectedIndex((prev) => (prev === null ? 0 : (prev + 1) % 3));
        break;
      case "ArrowLeft":
      case "ArrowUp":
        setSelectedIndex((prev) => (prev === null ? 0 : (prev - 1 + 3) % 3));
        break;
    }
  };

  useEffect(() => {
    // Listen for keydown events when the component is mounted
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      {/*main container*/}
      <div className="h-[1237px] md:h-[858px] md:w-[700px] w-[335px]  bg-[#041E23] backdrop-blur-[4px] border-solid border-[1px] border-[#0E464F] rounded-[40px] mx-auto my-[45px] mb-[112px]  ">
        <div className="mt-[48px] flex flex-col justify-between md:w-[604px] w-[287px] mx-auto">
          <h2 className="md:text-[32px] text-[24px] ">Ticket Selection</h2>
          <p className="text-[16px]">step 1/3</p>
        </div>
        <div className="md:w-[604px] w-[287px] h-[4px] bg-[#0E464F] mx-auto rounded-[5px]">
          <div className="h-[4px] w-[30%] rounded-[5px] bg-[#24A0B5]"></div>
        </div>

        {/*sub container*/}
        <div className="h-[682px]  md:bg-[#08252B] md:border-solid md:border-[1px] md:border-[#0E464F] rounded-[32px] mx-auto flex flex-col md:w-[604px] w-[287px] md:mt-[32px] md:mb-[48px]">
          <div className=" md:border-solid md:border-[1px] md:border-[#07373F] md:rounded-[24px] w-[556px] bg- h-[200px] md:my-[24px] my-[45px] mx-auto">
            <img className="hidden md:block " src={SectionTitle} alt="" />
            <img className="block md:hidden" src={SectionTitleM} alt="" />
          </div>
          <div className=" md:w-[556px] w-[287px] h-[4px] mx-auto bg-[#0E464F] my-[20px]">
            <div className=" md:w-[556px] w-[287px] h-[4px] mx-auto bg-[#0E464F]"></div>
          </div>

          {/*SELECT TICKET*/}
          <div className=" md:w-[556px] w-[287px] my-[24px] mx-auto">
            <p className="text-[16px]">Select Ticket Type:</p>
            <div className="bg-[#052228] border-solid border-[1px] border-[#07373F] rounded-[24px] md:w-[556px] w-[287px] md:h-[142px] h-[410px] flex md:flex-row flex-col justify-center md:justify-between items-center px-[13px] mx-auto">
              {/*free*/}
              <div
                onClick={() => handleClick(0)}
                className={`h-[110px] md:w-[158px] w-[255px]  rounded-[12px] pl-[8px] ${
                  selectedIndex === 0
                    ? "border-[#197686] bg-[#12464E] border-[1px]"
                    : "border-[#197686] border-[2px]"
                }`}
              >
                <h1 className="text-[24px]">Free</h1>
                <p className="text-[16px]"> REGULAR ACCESS</p>
                <p className="text-[14px]">20/52</p>
              </div>
              {/*Vip*/}
              <div
                onClick={() => handleClick(1)}
                className={`h-[110px] md:w-[158px] w-[255px] my-[21px] rounded-[12px] pl-[8px] ${
                  selectedIndex === 1
                    ? "border-[#197686] bg-[#12464E] border-[1px]"
                    : "border-[#197686] border-[2px]"
                }`}
              >
                <h1 className="text-[24px]">$150</h1>
                <p className="text-[16px]"> VIP ACCESS</p>
                <p className="text-[14px]">20/52</p>
              </div>
              {/*VVip*/}
              <div
                onClick={() => handleClick(2)}
                className={`h-[110px] md:w-[158px] w-[255px]  rounded-[12px] pl-[8px] ${
                  selectedIndex === 2
                    ? "border-[#197686] bg-[#12464E] border-[1px]"
                    : "border-[#197686] border-[2px]"
                }`}
              >
                <h1 className="text-[24px]">$200</h1>
                <p className="text-[16px]">VVIP ACCESS</p>
                <p className="text-[14px]">20/52</p>
              </div>
            </div>

            <form className=" flex flex-col mt-[32px] ">
              <label htmlFor="numberSelect">Number Of Tickets</label>
              <select
                className="border-[#07373F] border-[1px] bg-[#08252B]  h-[48px] rounded-[12px] px-[30px] focus:outline-none"
                id="numberSelect"
              >
                <option value="1" selected>
                  1
                </option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </form>

            <div className="flex md:flex-row flex-col justify-between">
              <div className="border-[1px] border-[#24A0B5] md:w-[266px] w-[287px] h-[48px] rounded-[8px] mt-[30px] flex justify-center items-center ">
                <p className=" text-[#24A0B5] text-[16px]">Cancel</p>
              </div>
              <div
                className="bg-[#24A0B5] md:w-[266px] md:mt-[30px] w-[287px] h-[48px] rounded-[8px] mt-[15px] flex justify-center items-center "
                onClick={goToNextStep}
              >
                <p className=" text-[#ffff] text-[16px] ">Next</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectTicket;
{
  /* */
}
