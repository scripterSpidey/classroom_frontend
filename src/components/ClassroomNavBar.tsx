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
import { useAppSelector } from '../store/store';
import useRole from '../hooks/useRole';

const ClassroomNavBar = () => {
  const role = useRole()
  const [activeLink, setActiveLink] = useState('null');

  const classrood_id = role == 'student' ?
    useAppSelector(state => state.persistedData.studentDatas?.classroom_id) :
    useAppSelector(state => state.persistedData.teacherDatas?.classroom_id)

  return (
    <>
      <Sidebar >
        <NavLink to={`${classrood_id}/summary`} onClick={() => setActiveLink('summary')}>
          <SidebarItem icon={<SchoolIcon />} text={"Summary"} active={activeLink === 'summary'} alert={true} />
        </NavLink>
        <NavLink to="chat" onClick={() => setActiveLink('chat')}>
          <SidebarItem icon={<ChatIcon />} text={"Chat Space"} active={activeLink === 'chat'} alert={false} />
        </NavLink>
        <NavLink to="live_class" onClick={() => setActiveLink('liveclass')}>
          <SidebarItem icon={<VideoCameraFrontIcon />} text={"Live Class"} active={activeLink === 'liveclass'} alert={false} />
        </NavLink>
        <NavLink to="exams" onClick={() => setActiveLink('exams')}>
          <SidebarItem icon={<NoteAltIcon />} text={"Exams"} alert={false} active={activeLink === 'exams'} />
        </NavLink>
        <NavLink to="materials" onClick={() => setActiveLink('materials')}>
          <SidebarItem icon={<AutoStoriesIcon />} text={"Materials"} alert={false} active={activeLink === 'materials'} />
        </NavLink>
        <NavLink to="works" onClick={() => setActiveLink('works')}>
          <SidebarItem icon={<AssignmentIcon />} text={"Works"} alert={false} active={activeLink === 'works'} />
        </NavLink>
        <NavLink to="announcements" onClick={() => setActiveLink('announcements')}>
          <SidebarItem icon={<CampaignIcon />} text={"Announcements"} alert={false} active={activeLink === 'announcements'} />
        </NavLink>
      </Sidebar>
    </>
  )
}

export default ClassroomNavBar