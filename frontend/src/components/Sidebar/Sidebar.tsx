const Sidebar = () => {
  return (
    <>
      <nav className="bg-red-200 w-2/12 h-screen justify-between flex flex-col">
        <div>
          <a
            className="w-full font-thin uppercase text-blue-500 flex items-center p-4 my-2 justify-start bg-white border-r-4 border-blue-500"
            href="#"
          >
            <span className="text-left">ICON</span>
            <span className="mx-4 text-sm font-normal">Dashboard</span>
          </a>
          <a
            className="w-full font-thin uppercase text-blue-500 flex items-center p-4 my-2 justify-start bg-white border-r-4"
            href="#"
          >
            <span className="text-left">ICON</span>
            <span className="mx-4 text-sm font-normal">Prescriptions</span>
          </a>
        </div>
        {/* <div>Hello</div>
        <div>
          <ul>
            <li>
              <div>hi</div>
            </li>
          </ul>
        </div>
        <div>Hello</div> */}
      </nav>

    </>  
  )
}

export default Sidebar;