import ticket from "../assets/ticket.svg";
import html2canvas from "html2canvas";
import { useRef, useState } from "react";

interface ThirdComponentProps {
  formData: (data: {
    name: string;
    email: string;
    imageUrl: string;
    description: string;
  }) => void;
  resetToInitialState: () => void;
}

const TicketReady: React.FC<ThirdComponentProps> = ({
  formData,
  resetToInitialState,
}) => {
  const divToCapture = useRef<HTMLDivElement>(null);
  const [image, setImage] = useState<string | null>(null);

  const handleDownload = async () => {
    if (divToCapture.current) {
      const canvas = await html2canvas(divToCapture.current, {
        backgroundColor: null,
        allowTaint: true,
        useCORS: true,
      });
      const pngUrl = canvas.toDataURL("image/png");
      setImage(pngUrl);
    }

    if (image) {
      const a = document.createElement("a");
      a.href = image;
      a.download = "image.png";
      a.click();
    }
  };

  return (
    <>
      <div className=" md:w-[700px] w-[335px] h-[1025px]  bg-[#041E23] backdrop-blur-[4px] border-solid border-[1px] border-[#0E464F] rounded-[40px] mx-auto flex justify-center items-center flex-col ">
        <div className="fixed top-[50px]">
          <div className="md:mt-[20px] flex flex-row justify-between md:w-[604px] w-[287px] mx-auto">
            <h2 className="md:text-[32px] text-[24px] ">Ready</h2>
            <p className="text-[16px]">step 3/3</p>
          </div>
          <div className="md:w-[604px] w-[287px] h-[4px] bg-[#0E464F] mx-auto rounded-[5px]">
            <div className="h-[4px] w-[100%] rounded-[5px] bg-[#24A0B5]"></div>
          </div>
        </div>

        <div className="mb-[15px]">
          <h2 className="md:text-[32px] text-[24px] font-bold text-center ">
            Your Ticket is Booked!
          </h2>
          <p className="text-[16px]">
            You can download or Check your email for a copy
          </p>
        </div>

        <div ref={divToCapture}>
          <img src={ticket} alt="" />
          <img
            className="profile-pic fixed  top-[380px] md:top-[385px] left-[98px] md:left-[277px]"
            src={formData.imageUrl}
            alt="profile image"
          />
          <div className="result-container fixed left-[54px] md:left-[235px] top-[545px]  ">
            <p className="item1">{formData.name}</p>
            <p className="item2">{formData.email}</p>
            <p className="item3">{formData.description} </p>
          </div>
        </div>

        <div className="fixed bottom-[50px] flex md:flex-row flex-col justify-between gap-2.5">
          <div
            className="border-[1px] border-[#24A0B5] md:w-[266px] w-[287px] h-[48px] rounded-[8px] mt-[30px] flex justify-center items-center "
            onClick={resetToInitialState}
          >
            <p className=" text-[#24A0B5] text-[16px]">Book Another Ticket</p>
          </div>
          <div
            className="bg-[#24A0B5] md:w-[266px] md:mt-[30px] w-[287px] h-[48px] rounded-[8px] mt-[15px] flex justify-center items-center "
            onClick={handleDownload}
          >
            <p className=" text-[#ffff] text-[16px] ">Download Ticket</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default TicketReady;
