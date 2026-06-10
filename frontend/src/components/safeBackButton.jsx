import { useNavigate, useLocation } from "react-router-dom";

export default function SafeBackButton({ isHeader = true }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Don't show the back button if we are already on the home page
  if (location.pathname === "/") {
    return null;
  }

  const handleBack = () => {
    // location.key is "default" if the user landed directly on this URL
    if (location.key === "default") {
      navigate("/", { replace: true });
    } else {
      navigate(-1);
    }
  };

  // Styles for when the button is inside the fixed Header
  const headerStyles = "flex items-center gap-2 md:hidden absolute right-10 top-full mt-2 z-20 bg-surface-container-lowest/80 backdrop-blur-md text-primary border border-outline-variant px-4 py-2 rounded-lg font-label-md font-medium shadow-sm hover:bg-surface-container-high/90 hover:shadow-md transition-all active:scale-95 cursor-pointer";
  
  // Styles for when the button is placed directly on a page without a header
  const pageStyles = "flex items-center gap-2 fixed right-10 top-5 z-50 bg-surface-container-lowest/80 backdrop-blur-md text-primary border border-outline-variant px-4 py-2 rounded-lg font-label-md font-medium shadow-sm hover:bg-surface-container-high/90 hover:shadow-md transition-all active:scale-95 cursor-pointer";

  return (
    <button 
      className={isHeader ? headerStyles : pageStyles}
      onClick={handleBack}
      aria-label="Go back"
    >
      <span className="material-symbols-outlined text-[20px]">arrow_back</span>
      <span>Back</span>
    </button>
  );
}