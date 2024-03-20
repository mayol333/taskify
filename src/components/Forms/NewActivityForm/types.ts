import { ActivityType } from "../../Activities/types";

export type FormState = Omit<ActivityType,"id">

export interface NewActivityFormProps {
    submit: (formState:FormState) => Promise<void>;
}