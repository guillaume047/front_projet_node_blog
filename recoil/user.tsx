import {atom} from "recoil";
import {IUser} from "@/interfaces/IUser";
import {recoilPersist} from "recoil-persist";

const {persistAtom} = recoilPersist()

export const authUser = atom({
    key: 'authUser',
    default: undefined as IUser | undefined,
    effects_UNSTABLE: [persistAtom]
})