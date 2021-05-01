import ColumnContainer from "../components/ColumnContainer/ColumnContainer";
import Sidebar from "../components/Sidebar/Sidebar"
// import { useUser } from "../contexts/UserProvider";
import Modal from '../components/Modal/Modal'
import { Dialog } from "@headlessui/react";
import { useState } from "react";

const Home = () => {
  // const { userDetails } = useUser();
  let [isOpen, setIsOpen] = useState(true);

  return (
    <main className="flex">
      <Sidebar />

      <div className="bg-gray-100 w-10/12">
        <div className="flex flex-col md:flex-row p-8 justify-around">
          <ColumnContainer />
          <ColumnContainer />
          <ColumnContainer />
        </div>
      </div>


    </main>
  );
};

export default Home;
