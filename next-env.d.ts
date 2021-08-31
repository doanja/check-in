/// <reference types="next" />
/// <reference types="next/types/global" />

type ToggleModal = (showModal: boolean) => void;
type SetTextField = (text: string) => void;

type CheckedInUser = {
  id: string;
  name: string;
  phoneNumber?: string;
  checkInTime: string;
  isCheckedIn: boolean;
};
type SetCheckedInUsers = (users: CheckedInUser[]) => void;

type PrevStep = () => void;
type NextStep = () => void;

type ToggleIsCheckedIn = (userId: string) => void;

type RemoveUserFromWaitlist = (id: string) => void;
