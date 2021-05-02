import * as React from "react";
import { Appointment } from "../../interfaces/Interface";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { DISEASES, SYMPTOMS } from "../../interfaces/constants";

type DoctorAppointmentModalProps = {
  appointment: Appointment;
};

const DoctorAppointmentModal = ({
  appointment,
}: DoctorAppointmentModalProps) => {
  const [showModal, setShowModal] = React.useState(true);
  const [symptoms, setSymptoms] = React.useState<string[]>([]);
  const [diseases, setDiseases] = React.useState<any[]>([]);

  const convertSymptoms = () => {
    const names = [];
    for (let i = 0; i < appointment.symptoms.length; i++) {
      if (appointment.symptoms[i] === 1) {
        names.push(SYMPTOMS[i].label);
      }
    }
    setSymptoms(names);
  };

  const convertML = () => {
    const confidence_intervals: any = [];

    console.log(appointment.results);

    appointment.results.forEach((item) => {
      let res = {
        label: DISEASES[item.index].label,
        confidence: item.confidencePercent,
      };

      confidence_intervals.push(res);
    });

    return confidence_intervals;
  };

  React.useEffect(() => {
    convertSymptoms();
    const res = convertML();
    setDiseases(res);
    console.log(diseases);
  }, []);

  return (
    <>
      {showModal && (
        <div className="w-full px-4 pt-4 text-l text-leading font-sans">
          <div className="px-4" style={{fontSize: '1.1rem'}}>Note: {appointment.note}</div>
          <div className="w-full pt-4 max-w-md mx-auto bg-white rounded-2xl">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-indigo-900 bg-indigo-100 rounded-lg hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                    <span>Symptoms</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-indigo-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500 text-xl text-gray-700">
                    {symptoms.map((item) => (
                      <>{`${item}, `}</>
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
            <Disclosure as="div" className="mt-2">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-indigo-900 bg-indigo-100 rounded-lg hover:bg-indigo-200 focus:outline-none focus-visible:ring focus-visible:ring-indigo-500 focus-visible:ring-opacity-75">
                    <span>Predicted Diagnosis</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-5 h-5 text-indigo-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    <ul>
                      {diseases.map((item) => {
                        return <li className="text-xl text-gray-700 font-semibold">{item.label} ↔️ <span className="text-green-600">{parseFloat(item.confidence.toFixed(4))}</span></li>;
                      })}
                    </ul>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        </div>
      )}
    </>
  );
};

export default DoctorAppointmentModal;
