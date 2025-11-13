import { selector } from "recoil";
import { courseState } from "../Atoms/course";

export const isCourseLoadingSelector = selector({
    key: "isCourseLoadingSelector",
    
    get: ({ get }) => {
        const state = get(courseState);

        return state.isLoading;
    }
})

export const isCourseDetailsSelector = selector({
    key: "isCourseDetailsSelector",
    
    get: ({ get }) => {
        const state = get(courseState);

        if(state.course) {
            return state.course;
        }

        return "";
    }
})

export const isCourseTitleSelector = selector({
    key: "isCourseTitleSelector",
    
    get: ({ get }) => {
        const state = get(courseState);
        
        if(state.course) {
            return state.course.title;
        }

        return "";
    }
})

export const isCoursePriceSelector = selector({
    key: "isCoursePriceSelector",
    
    get: ({ get }) => {
        const state = get(courseState);

        if(state.course) {
            return state.course.price;
        }

        return "";
    }
})

export const isCourseImageSelector = selector({
    key: "isCourseImageSelector",
    get: ({ get }) => {
        const state = get(courseState);

        if(state.course) {
            return state.course.imageLink;
        }

        return "";
    }
})