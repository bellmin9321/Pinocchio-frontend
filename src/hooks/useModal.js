import { useState } from "react";
import useStore from "../zustand/store";

export default function useModal() {
  const { showModal } = useStore();
  const [isShowing, setIsShowing] = useState(showModal);

  const toggle = () => {
    setIsShowing(!isShowing);
  };

  return {
    showModal,
    toggle,
  };
}
