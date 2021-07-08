/// <reference types="next" />
/// <reference types="next/types/global" />

type ToggleModal = (showModal: boolean) => void;
type SetTextField = (text: string) => void;

type CheckedInUser = {
  name: string;
  checkInTime: string;
};
type SetCheckedInUsers = (users: CheckedInUser[]) => void;
