import axios from "axios"
import React, { useRef } from 'react';

import { getToken, setToken, setUserDetails } from "../helper/SessionHelper";

// import { HideLoader, ShowLoader } from "../redux/state-slice/settings-slice"
// import store from "../redux/stor/store"

// const BaseURL = "https://taskmanagerproject-p0m3.onrender.com/api/v1"
const BaseURL = "http://localhost:5000/api/v1"

// LoderDisplay = useRef()

// Registration Request function
export function RegistrationRequest(Email, FirstName, LasttName, Mobile, Password, Photo){
    
    // loder stop display none
    // store.dispatch(ShowLoader())
    // let LoderDisplay = useRef()
    
    let URL = BaseURL+"/Registration"
    let PostBody = {
        Email:Email,
        FirstName:FirstName,
        LasttName:LasttName,
        Mobile:Mobile,
        Password: Password,
        Photo:Photo
    }
    return axios.post(URL, PostBody).then( (res) => {

        // loder start display none 
        // store.dispatch(HideLoader())

        // LoderDisplay.classList.add("Display_None")


        if(res.status === 200){
            
            if(res.data["status"]=== "Fail"){
                // email exist kore ki na seta chack kora hoyeche
                if(res.data.data.keyPattern.Email ===1){
                    alert("Email Already Exist");
                    return false
                }else{
                    alert("Something Went Wrong" + res)
                    console.log(res);
                    return false;
                }
                // end email exist kore ki na seta chack kora hoyeche 
            }else{
                // LoderDisplay.classList.remove("Display_None")

                alert("Success");
                return true;

            }


        }else{
            alert("Error in status not match in == 200")
            return false
        }


    }).catch( (Err) => {

        // loder stop display none
        // store.dispatch(ShowLoader())

        if(Err.status === 200){
            alert("Email All Redy exist")
            return false
        }else{
            alert("error Catch block")
            return false
        }


        // console.error(err);
        // alert("Error Catch Block");
        // return false;
    });

}




// Login Request Function 
export function LoginRequest(Email, Password){
    let URL = BaseURL+"/LoginUser";

    let PostBody={"Email":Email, "Password":Password};
    return axios.post(URL, PostBody).then((Res)=>{
        if(Res.status===200){

            // Token 
            setToken(Res.data["Token"]);
            setUserDetails(Res.data["data"])
            // Token

            alert("Login Success From API Request")
            return true;
        }else{
            alert("Login Faild From API Request")
            return false;
        }
    }).catch((Err)=>{
        alert("Login Faild From API Request");
        return false;
    })
}



// Token 
    const AxiosHeader ={headers:{"token":getToken()}}
// Token end 



// New Task Request 
export function NewTaskRequest(Title, Description){
    let URL = BaseURL+"/CreateTask";

    let PostBody = {"title":Title,"description":Description,status: "New"};

    return axios.post(URL, PostBody, AxiosHeader).then((Res)=>{

        if(Res.status===200){
            alert("Create Task Success from then block API Request");
            return true
        }else{
            alert("Create Task Faild from then block in API Request");
            return false;
        }

    }).catch((Err)=>{
        alert("Create Task Faild From Catch block APIRequest");
        return false;
    })
    
}