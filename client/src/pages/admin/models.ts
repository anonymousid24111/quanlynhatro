import { PromiseStatus } from "../../utils";
import { IUserInfo } from "../auth/models";

export interface IAddDialog {
    isOpen: boolean;
    user: IUserInfo;
    status: PromiseStatus;
}
