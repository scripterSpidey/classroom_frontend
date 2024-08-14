import { toast } from 'react-hot-toast';

const handleError = (error: any) => {
  console.log('axios error: ',error.response)
  if (error.response) {
    toast.error(error.response.data)
  } else {
    toast.error('Network error or might be code error! check it out!',error);
  }
};

export default handleError;

