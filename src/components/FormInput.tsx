import { Dispatch, FC, InputHTMLAttributes, SetStateAction } from "react"

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {

    label: string;
    setValue: Dispatch<SetStateAction<string>>;
}

export const FormInput: FC<FormInputProps> = ({ id, label, value, setValue }) => (
        <fieldset className="grid">
            <label className="text-[#7b7c7b]" htmlFor={id}>
                {label}
            </label>
            
            <input
                className="px-2 py-1 text-[#7b7c7b ] border border-[#e8e9e9] focus:hover:border-[#b1b2b2] outline-none shadow-md rounded-lg"
                id={id}
                name={id}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                />
        </fieldset>
);