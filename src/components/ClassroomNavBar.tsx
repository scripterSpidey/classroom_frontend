import { NavLink } from 'react-router-dom';
import { useState } from 'react';

import Sidebar from './Sidebar'
import SchoolIcon from '@mui/icons-material/School';
import ChatIcon from '@mui/icons-material/Chat';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import AssignmentIcon from '@mui/icons-material/Assignment';
import CampaignIcon from '@mui/icons-material/Campaign';

import { SidebarItem } from './Sidebar'

const ClassroomNavBar = () => {
  
  const [activeLink,setActiveLink] = useState('null');

  return (
    <>
    <Sidebar >
      <NavLink to="summary" onClick={()=>setActiveLink('summary')}>
        <SidebarItem icon={<SchoolIcon/>} text={"Summary"} active={activeLink==='summary'} alert={true}/>
      </NavLink>
      <NavLink to="chat" onClick={()=>setActiveLink('chat')}>
        <SidebarItem icon={<ChatIcon/>} text={"Chat Space"} active={activeLink==='chat'} alert={false}/>
      </NavLink>
      <NavLink to="live_class" onClick={()=>setActiveLink('liveclass')}>
        <SidebarItem icon={<VideoCameraFrontIcon/>} text={"Live Class"} active={activeLink==='liveclass'} alert={false}/>
      </NavLink>
      <NavLink to="exams" onClick={()=>setActiveLink('exams')}>
        <SidebarItem icon={<NoteAltIcon/>} text={"Exams"} active={false} alert={activeLink==='exams'}/>
      </NavLink>
      <NavLink to="materials" onClick={()=>setActiveLink('materials')}>
        <SidebarItem icon={<AutoStoriesIcon/>} text={"Materials"} active={false} alert={activeLink==='materials'}/>
      </NavLink>
      <NavLink to="works" onClick={()=>setActiveLink('works')}>
        <SidebarItem icon={<AssignmentIcon/>} text={"Works"} active={false} alert={activeLink==='works'}/>
      </NavLink>
      <NavLink to="announcements" onClick={()=>setActiveLink('announcements')}>
        <SidebarItem icon={<CampaignIcon/>} text={"Announcements"} active={false} alert={activeLink==='announcements'}/>
      </NavLink>
    </Sidebar>
    </>
  )
}

export default ClassroomNavBar