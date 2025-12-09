import React, { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import SearchBar from '../components/SearchBar.jsx';
import JobCard from '../components/JobCard.jsx';
import JobDetailModal from '../components/JobDetailModal.jsx';
import ApplicationModal from '../components/ApplicationModal.jsx';
import ReportModal from '../components/ReportModal.jsx';
import { useJobsReducer } from '../hooks/useJobsReducer.js';
import { Card, CardContent, Badge } from '../components/ui';
import { useAuth } from '../context/AuthContext.jsx';

export default function Home() {
  const { user } = useAuth(); // <-- usamos el contexto
  const [state, dispatch] = useJobsReducer();

  useEffect(() => {
    loadSampleJobs();
  }, []);

  const loadSampleJobs = () => {
    const sampleJobs = [
      { title: 'Desarrollador Frontend Junior', location: 'Madrid, España', description: '...', id:1, job_type:'full-time', experience_level:'entry', company_name:'TechStart Madrid', deadline:'2025-12-30'},
      { title: 'Asistente de Soporte Técnico', location: 'Barcelona, España', description: '...', id:2, job_type:'full-time', experience_level:'entry', company_name:'CloudTech Solutions', deadline:'2025-12-25'},
      { title: 'Community Manager Trainee', location: 'Valencia, España', description: '...', id:3, job_type:'part-time', experience_level:'entry', company_name:'Digital Growth Agency', deadline:'2025-12-20'},
      { title: 'Data Entry Specialist', location: 'Madrid, España', description: '...', id:4, job_type:'full-time', experience_level:'entry', company_name:'Business Process Solutions', deadline:'2025-12-30'},
    ];
    dispatch({ type: 'SET_JOBS', payload: sampleJobs });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch({ type: 'FILTER_JOBS', payload: { searchTerm: state.search, locationTerm: state.location } });
  };

  const handleApply = (job, type) => {
    if (!user) return toast.error('Debes iniciar sesión para aplicar');
    if (user.user_type !== 'candidate') return toast.error('Solo candidatos pueden aplicar');
    dispatch({ type: 'SET_SELECTED_JOB', payload: job });
    dispatch({ type: 'SET_APPLICATION_TYPE', payload: type });
    dispatch({ type: 'SHOW_APPLICATION_MODAL' });
  };

  const handleReport = (job) => {
    if (!user) return toast.error('Debes iniciar sesión para reportar');
    dispatch({ type: 'SHOW_REPORT_MODAL', payload: job });
  };

  const handleViewDetails = (job) => {
    dispatch({ type: 'SHOW_JOB_DETAIL', payload: job });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Tu primer trabajo te está esperando</h1>
          <p className="text-xl mb-8 opacity-90">Encuentra oportunidades diseñadas para personas sin experiencia</p>
          <SearchBar 
            search={state.search} location={state.location} 
            setSearch={(v)=>dispatch({type:'SET_SEARCH',payload:v})} 
            setLocation={(v)=>dispatch({type:'SET_LOCATION',payload:v})} 
            onSearch={handleSearch} 
          />
        </div>
      </div>

      {/* Jobs Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Trabajos Disponibles</h2>
          <Badge variant="outline" className="text-green-600 border-green-600">
            {state.jobs.length} trabajos encontrados
          </Badge>
        </div>

        {state.loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(4)].map((_, i)=>(
              <Card key={i} className="animate-pulse"><CardContent className="p-6 h-40 bg-gray-200 rounded"></CardContent></Card>
            ))}
          </div>
        ) : state.jobs.length===0 ? (
          <p className="text-center text-gray-500">No se encontraron trabajos.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {state.jobs.map(job => (
              <JobCard key={job.id} job={job} user={user} onApply={handleApply} onReport={handleReport} onViewDetails={handleViewDetails} />
            ))}
          </div>
        )}

        {/* Modals */}
        <JobDetailModal isOpen={state.showJobDetail} onClose={()=>dispatch({type:'HIDE_JOB_DETAIL'})} job={state.selectedJob} onApply={handleApply} user={user} />
        <ApplicationModal isOpen={state.showApplication} onClose={()=>dispatch({type:'HIDE_APPLICATION_MODAL'})} job={state.selectedJob} applicationType={state.applicationType} user={user} />
        <ReportModal isOpen={state.showReport} onClose={()=>dispatch({type:'HIDE_REPORT_MODAL'})} job={state.reportJob} user={user} />
      </div>
    </div>
  );
}
