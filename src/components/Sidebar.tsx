import React, { createContext, useContext, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

interface SidebarContextType {
    expanded: boolean;
}

interface SidebarProps {
    children: React.ReactNode;
}

const SidebarContext = createContext<SidebarContextType>({
    expanded: true
})

const Sidebar: React.FC<SidebarProps> = ({ children }) => {
    const [expanded, setExpanded] = useState(true)

    return (
        <>
            <aside className={`h-screen  left-0 inline-block overflow-hidden transition-all   ${expanded ? "p-2" : "w-16"}`}>
                <nav className="h-full flex flex-col  rounded-md  border-2 border-gray-200 shadow-lg ">
                    <div className="p-4 pb-2 flex justify-between items-center">    
                        <h1 className={`overflow-hidden transition-all text-costume-primary-color text-xl font-extrabold 
                        ${expanded ? "w-full" : "w-0"}`}>ENGLISH</h1>
                        <button
                            onClick={() => setExpanded((curr) => !curr)}
                            className="p-1.5 rounded-lg  hover:bg-gray-100 text-costume-primary-color">
                            {expanded ? <CloseIcon/> : <MenuIcon/>}
                        </button>
                    </div>

                    <SidebarContext.Provider value={{ expanded }}>
                        <ul className="flex flex-col  flex-1 px-3">{children}</ul>
                    </SidebarContext.Provider>

                    <div className="border-t flex p-3">
                        <img
                            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
                            alt=""
                            className="w-10 h-10 rounded-md"/>
                        <div className={`flex justify-between items-center overflow-hidden transition-all 
                            ${expanded ? "w-full ml-3" : "w-0"}`}>
                            <div className="leading-4">
                                <h4 className="font-semibold">John Doe</h4>
                                <span className="text-xs text-gray-600">johndoe@gmail.com</span>
                            </div>
                            <p>L</p>
                        </div>
                    </div>
                </nav>
            </aside>
        </>
    );
}

export default Sidebar;



interface SidebarItemProps {
    icon: React.ReactNode;
    text: string;
    active?: boolean;
    alert?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ icon, text, active, alert }) => {

    const { expanded } = useContext(SidebarContext)
    console.log(expanded)
    return (
        <>
        <li className={`relative flex items-center py-2 px-2 my-1 font-md rounded-md cursor-pointer transition-colors group
            ${active ? "bg-costume-primary-color text-costume-secondary-color"
                : "hover:bg-indigo-50 text-gray-600"}`}>
            {icon}
            <span className={` overflow-hidden whitespace-nowrap transition-all
                ${expanded ? " ml-3" : "w-0 ml-0"}`}>{text}</span>
            {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-red-500
                ${expanded ? "" : "top-2 "}`}></div>}
            {!expanded &&
                <div className={`absolute left-full rounded-md px-2 py-1 ml-6
                bg-indigo-100 text-indigo-800 text-sm
                invisible opacity-20 -translate-x-3 transition-all group-hover:visible 
                group-hover:opacity-100 group-hover:translate-x-0`}>{text}</div>}
        </li>
        
        </>
    )
}
