import { useReducer } from 'react';

const initialState = {
  allJobs: [],
  jobs: [],
  loading: true,
  search: '',
  location: '',
  selectedJob: null,
  applicationType: null,
  showApplication: false,
  showReport: false,
  reportJob: null,
  showJobDetail: false,
};

export const jobsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_JOBS':
      return { ...state, jobs: action.payload, allJobs: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_SEARCH':
      return { ...state, search: action.payload };
    case 'SET_LOCATION':
      return { ...state, location: action.payload };
    case 'SET_SELECTED_JOB':
      return { ...state, selectedJob: action.payload };
    case 'SET_APPLICATION_TYPE':
      return { ...state, applicationType: action.payload };
    case 'SHOW_APPLICATION_MODAL':
      return { ...state, showApplication: true };
    case 'HIDE_APPLICATION_MODAL':
      return { ...state, showApplication: false, selectedJob: null, applicationType: null };
    case 'SHOW_REPORT_MODAL':
      return { ...state, showReport: true, reportJob: action.payload };
    case 'HIDE_REPORT_MODAL':
      return { ...state, showReport: false, reportJob: null };
    case 'SHOW_JOB_DETAIL':
      return { ...state, showJobDetail: true, selectedJob: action.payload };
    case 'HIDE_JOB_DETAIL':
      return { ...state, showJobDetail: false, selectedJob: null };
    case 'FILTER_JOBS':
      const { searchTerm, locationTerm } = action.payload;
      let filtered = state.allJobs;
      if (searchTerm) {
        filtered = filtered.filter(job =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      if (locationTerm) {
        filtered = filtered.filter(job =>
          job.location.toLowerCase().includes(locationTerm.toLowerCase())
        );
      }
      return { ...state, jobs: filtered };
    default:
      return state;
  }
};

export const useJobsReducer = () => useReducer(jobsReducer, initialState);
