export default function Cell({ isAlive, toggleCell }:
   { 
      isAlive: boolean;
      toggleCell: () => void
   }) {
  return (
    <div
      onClick={toggleCell}
      className={`w-6 h-6 border border-gray-300 ${isAlive ? "bg-blue-500" : "bg-gray"}`}
    ></div>
  );
};


