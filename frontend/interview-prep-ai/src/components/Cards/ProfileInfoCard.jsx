import React, { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom';

const ProfileInfoCard = () => {
  const { user, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/");
  }

  return user && (
    <div className='flex items-center'>
      <img 
        src={user.profilePicture || '/default-avatar.png'} 
        alt="Profile" 
        className="w-13 h-13 rounded-full object-cover border border-gray-300 shadow-sm mr-3"
      />
      <div>
        <div className='text-[15px] text-black font-bold leading-3'>
          {user.username || ""}
        </div>
        <button 
          className='text-amber-600 text-sm font-semibold cursor-pointer' 
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default ProfileInfoCard;
