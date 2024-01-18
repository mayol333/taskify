import { ChangeEventHandler } from "react"
export interface SelectOption {
    label:string
    value:string
}
export interface SelectProps {
    placeholder:string
    options:SelectOption[]
    handleSelect:ChangeEventHandler<HTMLSelectElement>
    value:string
}