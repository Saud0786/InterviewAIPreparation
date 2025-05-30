import React, { useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import { CARD_BG } from "../../utils/data";
import DashboardLayout from '../../components/Layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstanse from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import SummaryCard from '../../components/Cards/SummaryCard';
import moment from "moment";
import Modal from '../../components/Modal';
import CreateSessionForm from './CreateSessionForm';
import DeleteAlertContent from '../../components/Loader/DeleteAlertContent';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const [openCreateModel, setOpenCreateModel] = useState(false);
  const [session, setSession] = useState([]);

  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    open: false,
    data: null
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstanse.get(API_PATHS.SESSION.GET_ALL);

      // ✅ Check if sessions are in response.data.sessions
      const sessionData = response.data?.sessions || []; // Adjust this if the key is different
      setSession(sessionData);

    } catch (err) {
      console.log("err fetching session data", err);
    }
  };

  const deleteSession = async (sessionData) => {
    // Delete logic 
    try{
       await axiosInstanse.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
       toast.success("Session Delete Successfully");
       setOpenDeleteAlert({
        open:false,
        data:null
       });
       fetchAllSessions();
    }catch(error){
        console.log("Error deleting session data: ",error);
        
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className='container mx-auto pt-4 pb-4'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pd-6 px-4 md:px-0'>
          {
            Array.isArray(session) && session.length > 0 ? (
              session.map((data, index) => (
                <SummaryCard
                  key={data?._id}
                  colors={CARD_BG[index % CARD_BG.length]}
                  role={data?.role || ""}
                  topicsToFocus={data?.topicsToFocus || ""}
                  experience={data?.experience || "-"}
                  questions={data?.questions?.length || "-"}
                  description={data?.description || ""}
                  lastUpdated={
                    data?.updatedAt
                      ? moment(data.updatedAt).format("Do MMM YYYY")
                      : ""
                  }
                  onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                  onDelete={() => setOpenDeleteAlert({ open: true, data })}
                />
              ))
            ) : (
              <p className="text-muted-foreground col-span-3 text-center">No sessions available.</p>
            )
          }
        </div>

        <button
          className='h-12 md:h-12 flex items-center justify-center gap-3 bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md:right-20'
          onClick={() => setOpenCreateModel(true)}
        >
          <LuPlus className="text-2xl text-white" />
          Add New
        </button>
      </div>

    <Modal
    isOpen={openCreateModel}
    onClose={()=>{
      setOpenCreateModel(false);
    }}
    hideHeader>
      <div>
        <CreateSessionForm/>
      </div>
    </Modal>

    <Modal isOpen={openDeleteAlert?.open}
     onClose={()=>{setOpenDeleteAlert({open:false, data:null})}}
     title="Delete Alert"
     >
      <div className='w-[30vw]'>
        <DeleteAlertContent 
          content = "Are you sure want to delete this session details?"
          onDelete={()=> deleteSession(openDeleteAlert.data)}
        />
      </div>

     </Modal>

    </DashboardLayout>
  );
};

export default Dashboard;
