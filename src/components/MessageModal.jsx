import { useContext } from "react";
import { userContext } from "../context/UserContext";

export default function MessageModal({ message, noClose}) {
  const { setShowMessageModal } = useContext(userContext);

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-[10000] flex justify-center items-center">
        <div className="bg-white w-1/3 rounded-xl shadow-lg flex flex-col items-center px-5 py-10">
        {!noClose &&
          <div className="w-full flex justify-end">
            
              <button
              className="!bg-black !text-white"
              onClick={() => {
                setShowMessageModal(false);
              }}
            >
              X
            </button>
            
          </div>
          }
          <h1 className="mt-10">{message}</h1>
        </div>
      </div>
    </>
  );
}
