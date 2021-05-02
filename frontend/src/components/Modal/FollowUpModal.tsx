import * as React from 'react';
import { FollowUp } from '../../interfaces/Interface';

type FollowUpModalProps = {
  followUp: FollowUp
};

export default function FollowUpModal({ followUp }: FollowUpModalProps) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <>
      <button
        className="text-gray-500 font-semibold"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Follow Up
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="max-w-4xl  bg-white w-full rounded-lg shadow-xl">
              <div className="p-4 border-b">
                <h2 className="text-2xl ">Doctor's follow up:</h2>
                <p className="text-sm text-gray-500">
                  Suggestions for updates.
                </p>
              </div>
              <div>
                <div className="md:grid md:grid-cols-2 hover:bg-gray-50 md:space-y-0 space-y-1 p-4 border-b">
                  <p className="text-gray-600">Note</p>
                  <p>{followUp.note}</p>
                </div>
              
                <div className="flex justify-end">
                  <button
                    className="py-2 px-4 bg-gray-200 rounded-md"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}