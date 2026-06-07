import { useMutation } from "@tanstack/react-query";
import { registerUser, loginUser, type registerData, type loginData } from "../../api/auth";


export const useRegisterMutation = () => {
    return useMutation({
        mutationFn: (userData: registerData) => registerUser(userData) 
    })
}

export const useLoginMutation = () => {
    return useMutation({
        mutationFn: (userData: loginData) => loginUser(userData)
    })
}