import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  // State
  const phoneNumber = ref("");
  const countryCode = ref("+237");
  const securityCode = ref("");
  const otpCode = ref("");
  const profilePhoto = ref(null);
  const fullName = ref("");
  const country = ref("");
  const businessExperience = ref("");
  const businessProcess = ref("");
  const contactMethod = ref("");
  const isLoggedIn = ref(false);
  const currentStep = ref(0);

  // Actions
  const setPhoneNumber = (phone) => {
    phoneNumber.value = phone;
  };

  const setCountryCode = (code) => {
    countryCode.value = code;
  };

  const setSecurityCode = (code) => {
    securityCode.value = code;
  };

  const setOTPCode = (code) => {
    otpCode.value = code;
  };

  const setProfilePhoto = (photo) => {
    profilePhoto.value = photo;
  };

  const setFullName = (name) => {
    fullName.value = name;
  };

  const setCountry = (countryName) => {
    country.value = countryName;
  };

  const setBusinessExperience = (experience) => {
    businessExperience.value = experience;
  };

  const setBusinessProcess = (process) => {
    businessProcess.value = process;
  };

  const setContactMethod = (method) => {
    contactMethod.value = method;
  };

  const setLoggedIn = (status) => {
    isLoggedIn.value = status;
  };

  const setCurrentStep = (step) => {
    currentStep.value = step;
  };

  const resetUser = () => {
    phoneNumber.value = "";
    countryCode.value = "+237";
    securityCode.value = "";
    otpCode.value = "";
    profilePhoto.value = null;
    fullName.value = "";
    country.value = "";
    businessExperience.value = "";
    businessProcess.value = "";
    contactMethod.value = "";
    isLoggedIn.value = false;
    currentStep.value = 0;
  };

  // Getters
  const getFullPhoneNumber = () => {
    return `${countryCode.value}${phoneNumber.value}`;
  };

  const isProfileComplete = () => {
    return (
      fullName.value &&
      country.value &&
      businessExperience.value &&
      businessProcess.value &&
      contactMethod.value
    );
  };

  return {
    // State
    phoneNumber,
    countryCode,
    securityCode,
    otpCode,
    profilePhoto,
    fullName,
    country,
    businessExperience,
    businessProcess,
    contactMethod,
    isLoggedIn,
    currentStep,

    // Actions
    setPhoneNumber,
    setCountryCode,
    setSecurityCode,
    setOTPCode,
    setProfilePhoto,
    setFullName,
    setCountry,
    setBusinessExperience,
    setBusinessProcess,
    setContactMethod,
    setLoggedIn,
    setCurrentStep,
    resetUser,

    // Getters
    getFullPhoneNumber,
    isProfileComplete,
  };
});
