import axios from "axios";
import { TokenResponse } from "@react-oauth/google";

export interface GoogleUserProfileType {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

export const  getUserGoogleProfile = async  (authResponse:TokenResponse):Promise<GoogleUserProfileType>=>{
    try {
        const res = await axios.get(
            `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${"authResponse.access_token"}`,
            {
              headers: {
                Authorization: `Bearer ${"authResponse.access_token"}`,
                Accept: 'application/json'
              }
            }
          );
        return res.data
    } catch (error) {
        throw error
    }
}


