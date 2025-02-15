import { useState, useEffect } from "react";

interface FirstComponentProps {
  handleSubmit: (data: {
    name: string;
    email: string;
    imageUrl: string;
    description: string;
  }) => void;
  goBackToTop: () => void;
  goToNextStep: () => void;
}

const AttendeeDetails: React.FC<FirstComponentProps> = ({
  goToNextStep,
  goBackToTop,
  handleSubmit,
}) => {
  const [image, setImage] = useState<string | null>(null);
  const savedName = localStorage.getItem("name") || "";
  const savedEmail = localStorage.getItem("email") || "";
  const savedImageUrl = localStorage.getItem("imageUrl") || "";
  const savedDescription = localStorage.getItem("description") || "";

  const [name, setName] = useState(savedName);
  const [email, setEmail] = useState(savedEmail);
  const [imageUrl, setImageUrl] = useState(savedImageUrl);
  const [description, setDescription] = useState(savedDescription);

  // Save the data to localStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("imageUrl", imageUrl);
    localStorage.setItem("description", description);
  }, [name, email, imageUrl, description]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImage(reader.result as string); // Set the image preview as the state
      };

      if (file) {
        reader.readAsDataURL(file); // Read the file as a data URL
      }
    }

    if (file) {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "hngprofilepic");
      data.append("cloud_name", "dhkjho8pc ");

      try {
        // Upload the image to Cloudinary
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dhkjho8pc/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        const uploadedImageURL = await res.json();
        setImageUrl(uploadedImageURL.secure_url);
        console.log(uploadedImageURL);

        const formDataToSave = {
          name,
          email,
          imageUrl: uploadedImageURL.data.secure_url,
          description,
        };
        localStorage.setItem("formData", JSON.stringify(formDataToSave));
      } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
      }
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name === "" || email === "" || imageUrl === "") {
      alert("Please fill out required fields.");
    } else {
      handleSubmit({ name, email, imageUrl, description });
      localStorage.setItem("formData", JSON.stringify(FormData)); // Send data to parent
      goToNextStep();
      console.log("yes");
    }
  };

  return (
    <>
      <div className="h-[1059px] md:h-[1083px] md:w-[700px] w-[335px]  bg-[#041E23] backdrop-blur-[4px] border-solid border-[1px] border-[#0E464F] rounded-[40px] mx-auto my-[45px] mb-[112px]  ">
        <div className="mt-[48px] flex flex-col md:flex-row justify-between md:w-[604px] w-[287px] mx-auto">
          <h2 className="text-[32px]">Attendee Details</h2>
          <p className="text-[16px]">step 2/3</p>
        </div>
        <div className="md:w-[604px] w-[287px] h-[4px] bg-[#0E464F] mx-auto rounded-[5px]">
          <div className="h-[4px] w-[65%] rounded-[5px] bg-[#24A0B5]"></div>
        </div>
        <div className="md:h-[907px]  md:w-[604px]  md:bg-[#08252B] md:border-solid md:border-[1px] md:border-[#0E464F] rounded-[32px] mx-auto flex flex-col md:mt-[32px] mb-[48px]">
          <form onSubmit={onSubmit}>
            <div className="bg-[#052228] border-solid border-[1px] border-[#07373F] rounded-[24px] md:w-[556px] w-[287px] h-[328px] flex flex-col justify-center items-center mx-auto mt-[32px]">
              <label
                className="md:absolute md:top-[180px] md:left-[100px]"
                htmlFor="pfp"
              >
                Upload Profile Picture
              </label>
              <div className=" md:bg-[#041B20]  md:w-[508px] md:h-[200px] flex justify-center items-center ">
                <input
                  className={
                    "h-[240px] w-[240px] text-white border-[4px] border-[#24A0B5] rounded-[32px] bg-[#0E464F] image-preview-container "
                  }
                  style={{ backgroundImage: `url(${image})` }}
                  id="pfp"
                  placeholder="Drag and drop or click to select file"
                  type="file"
                  onChange={handleFileUpload}
                />
              </div>
            </div>
            <div className="md:w-[556px] w-[287px] h-[4px] bg-[#0E464F] mx-auto rounded-[5px] mt-[21px] mb-[10px]"></div>

            <div className=" flex flex-col md:mt-[32px] ">
              <label className="ml-[30px]" htmlFor="name">
                Enter Your Name
              </label>
              <input
                className="border-[#07373F] border-[1px] md:w-[556px] w-[287px] h-[48px] rounded-[12px] mx-auto  px-[30px] "
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="mt-[32px] ml-[30px]" htmlFor="Email">
                Enter Your Email
              </label>
              <input
                className="border-[#07373F] border-[1px] md:w-[556px] w-[287px] h-[48px] rounded-[12px] mx-auto  px-[30px] "
                placeholder="hello@gmail.com"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="mt-[32px] ml-[30px]" htmlFor="about">
                About The Project
              </label>
              <textarea
                className="vertical-align-top resize-none border-[#07373F] border-[1px] md:w-[556px] w-[287px] h-[127px] md:h-[159px] rounded-[12px] mx-auto"
                value={description}
                placeholder="textarea"
                id="description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex md:flex-row flex-col justify-between md:w-[556px] w-[287px] mx-auto">
              <div
                onClick={goBackToTop}
                className="border-[1px] border-[#24A0B5] md:w-[266px] w-[287px] h-[48px] rounded-[8px] mt-[30px] flex justify-center items-center "
              >
                <p className=" text-[#24A0B5] text-[16px]">Back</p>
              </div>
              <button
                type="submit"
                className="bg-[#24A0B5] md:w-[266px] md:mt-[30px] w-[287px] h-[48px] rounded-[8px] mt-[15px] flex justify-center items-center "
              >
                <p className=" text-[#ffff] text-[16px]  ">
                  Get My Free Ticket
                </p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AttendeeDetails;
