import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { useEffect } from "react";

const darkModeAtom = atomWithStorage("darkMode", false);
darkModeAtom.debugLabel = "darkMode";

const AtomWithStorage = () => {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  useEffect(() => {
    // Set the color-scheme property based on the darkMode state
    if (darkMode) {
      document.documentElement.style.setProperty("color-scheme", "dark");
    } else {
      document.documentElement.style.setProperty("color-scheme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className={`h-screen flex justify-center items-center flex-col gap-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <h1>AtomWithStorage</h1>
      <h1>Welcome to {darkMode ? "dark" : "light"} mode!</h1>
      <button
        className={`p-2 rounded ${
          darkMode ? "bg-gray-700 text-white" : "bg-gray-300 text-black"
        }`}
        onClick={() => setDarkMode(!darkMode)}
      >
        toggle theme
      </button>
    </div>
  );
};

export default AtomWithStorage;
