import { toast } from 'react-hot-toast';

const handleError = (error: any) => {
  if (error.response) {
    switch (error.response.status) {
      case 400:
        toast.error('Common man.. Thats a bad request! Did you just really try that?');
        break;
      case 401:
        toast.error('Are you trying to break in? Or did you forgot your credentials?');
        break;
      case 403:
        toast.error('You do not have permission to perform this action');
        break;
      case 404:
        toast.error('The stuff you are looking for is not here!');
        break;
      case 500:
        toast.error('Oops! Something broke on our side. We are on it!');
        break;
      default:
        toast.error('Status code is not included');
    }
  } else {
    toast.error('Network error');
  }
};

export default handleError;

