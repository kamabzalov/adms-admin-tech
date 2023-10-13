import { ChangeEvent, useEffect, useState } from 'react';

interface CustomInputProps {
    currentValue: number;
    id: string;
    name: string;
    title: string;
    disabled?: boolean;
}

interface CustomCheckboxProps extends CustomInputProps {
    action?: (value: [string, number]) => void;
}
interface CustomTextInputProps extends CustomInputProps {
    action?: (event: ChangeEvent<HTMLInputElement>) => void;
}

interface CustomRadioButtonProps extends CustomInputProps {
    options: RadioButtonOption[];
    action: (value: [string, string]) => void;
}

interface RadioButtonOption {
    value: number;
    label: string;
}

export const CustomCheckbox = ({ currentValue, id, name, title, action }: CustomCheckboxProps) => {
    const [value, setValue] = useState<number>(Number(currentValue));
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleChange = () => {
        const newValue = value === 1 ? 0 : 1;
        setValue(newValue);

        if (action) {
            setIsLoading(true);
            action([name, newValue]);
        }
    };

    useEffect(() => {
        setIsLoading(false);
        if (currentValue !== value && action) {
        }
    }, [name, value, currentValue, action]);

    return (
        <div className='mb-4'>
            <div className='form-check form-check-custom form-check-solid'>
                <input
                    className='form-check-input cursor-pointer'
                    type='checkbox'
                    value={value}
                    checked={value === 1}
                    onChange={handleChange}
                    id={`checkbox-${id}`}
                    disabled={isLoading}
                />
                <label className='form-check-label cursor-pointer' htmlFor={`checkbox-${id}`}>
                    {title}
                </label>
            </div>
        </div>
    );
};

export const CustomTextInput = ({
    currentValue,
    id,
    name,
    title,
    action,
    disabled,
}: CustomTextInputProps): JSX.Element => {
    const handleInputAction = (event: ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;
        if (action) {
            action(event);
        }
    };
    return (
        <div className='row'>
            <div className='col-6 d-flex align-items-center'>
                <label htmlFor={`text-input-${id}`} className='form-label fs-6 fw-bolder text-dark'>
                    {title}
                </label>
            </div>
            <div className='col-6 d-flex align-items-center'>
                <input
                    disabled={disabled}
                    className='form-control bg-transparent'
                    name={name}
                    type={'text'}
                    value={currentValue}
                    onChange={handleInputAction}
                />
            </div>
        </div>
    );
};

export const CustomRadioButton = ({
    currentValue,
    id,
    name,
    title,
    options,
    action,
}: CustomRadioButtonProps) => {
    const [selectedValue, setSelectedValue] = useState<number>(currentValue);
    const [isLoading, setIsLoading] = useState(false);

    const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setSelectedValue(Number(newValue));

        if (action) {
            setIsLoading(true);
            action([name, newValue]);
        }
    };

    useEffect(() => {
        setIsLoading(false);
    }, [name, selectedValue, action]);

    return (
        <div className='mb-4'>
            <span className='d-inline-block mb-2 form-check-label'>{title}</span>
            <div className='form-check form-check-custom form-check-solid'>
                {options.map((option, key) => (
                    <div className='me-10' key={id + key}>
                        <input
                            className='form-check-input cursor-pointer'
                            type='radio'
                            value={option.value}
                            checked={selectedValue === option.value}
                            onChange={handleRadioChange}
                            id={`radio-${id}-${option.value}`}
                            disabled={isLoading}
                        />
                        <label
                            className='form-check-label cursor-pointer'
                            htmlFor={`radio-${id}-${option.value}`}
                        >
                            {option.label}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};
