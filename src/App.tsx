import AttendeeDetails from "./Components/AttendeeDetails";
import Navbar from "./Components/Navbar";
import SelectTicket from "./Components/SelectTicket";
import TicketReady from "./Components/TicketReady";
import { useState, useEffect } from "react";

const App: React.FC = () => {
  const savedStep = localStorage.getItem("currentStep");
  const initialStep =
    savedStep && !isNaN(parseInt(savedStep)) ? parseInt(savedStep) : 1;

  const [currentStep, setCurrentStep] = useState(initialStep);

  useEffect(() => {
    // Ensure currentStep is a valid number before saving to localStorage
    if (!isNaN(currentStep)) {
      localStorage.setItem("currentStep", currentStep.toString());
    }
  }, [currentStep]);

  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    imageUrl: string;
    description: string;
  }>({
    name: "",
    email: "",
    imageUrl: "",
    description: "",
  });

  // Handle form data submission from the FirstComponent
  const handleFormData = (formData: {
    name: string;
    email: string;
    imageUrl: string;
    description: string;
  }) => {
    setFormData(formData); // Store form data in parent state
  };

  const goToNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1); // Move to the next step
    }
  };

  const goBackToTop = () => {
    setCurrentStep(1); // Go back to the first component
  };

  const resetToInitialState = () => {
    // Clear all localStorage data
    localStorage.clear();
    // Reset all state variables to their initial values (empty or default)
    setCurrentStep(1);
  };

  return (
    <>
      <Navbar />
      {currentStep === 1 && <SelectTicket goToNextStep={goToNextStep} />}
      {currentStep === 2 && (
        <AttendeeDetails
          handleSubmit={handleFormData}
          goToNextStep={goToNextStep}
          goBackToTop={goBackToTop}
        />
      )}
      {currentStep === 3 && (
        <TicketReady
          formData={formData}
          resetToInitialState={resetToInitialState}
        />
      )}
    </>
  );
};

export default App;
