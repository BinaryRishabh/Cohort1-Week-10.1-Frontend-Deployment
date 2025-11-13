import { selector } from "recoil";
import { userState } from "../Atoms/admin";

export const isLoadingStateSelector = selector({
    key: "isLoadingStateSelector",
    get: ({get}) => {
        const state = get(userState)

        return state.isLoading;
    }
})
