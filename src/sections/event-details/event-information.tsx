import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { RootState } from "src/redux/store";
import { useSelector } from "react-redux";

import CustomizedSteppers from './steper';
import { StepperStepFour } from "./stepper-componentes/stepper-step-four";
import { StepperStepOne } from "./stepper-componentes/stepper-step-One";
import { StepperStepTwo } from "./stepper-componentes/stepper-step-two";
import { StepperStepThree } from "./stepper-componentes/stepper-step-three";
import { StepperSuccessful } from "./stepper-componentes/event-created-succesfull";


export function EventInformation() {
  const stepComponents = [<StepperStepOne />, <StepperStepTwo />, <StepperStepThree />, <StepperStepFour />];
  const steps = ['0', '1', '2', '3'];
  const { stepper } = useSelector((state: RootState) => state?.event);
  const [activeStep, setActiveStep] = useState(3);

  useEffect(() => {
    setActiveStep(stepper);
  }, [stepper]);

  // useEffect(() => {
  //   if (stepper === 3) {
  //     const timer = setTimeout(() => {
  //       setActiveStep(0);
  //     }, 10000);
  //     return () => clearTimeout(timer);
  //   }
  //   return undefined; // Explicit return for other cases
  // }, [stepper]);

  return (
    <Box
      mt={3}
      sx={{
        p: 3,
        borderRadius: 3,
        backgroundColor: '#fff',
        boxShadow: 3,
      }}
    >
      <CustomizedSteppers steps={steps} activeStep={activeStep} />
      {stepComponents[activeStep]}
    </Box>
  )
}