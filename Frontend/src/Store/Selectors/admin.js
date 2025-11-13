import { selector } from "recoil";
import { userState } from "../Atoms/admin";

export const isUserStateSelector = selector({
    key: "isUserStateSelector",
    get: ({get}) => {
        const state = get(userState);
        
        return state.user;
    }
})