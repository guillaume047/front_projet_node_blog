import {FunctionComponent} from "react";

interface IProps {
    options: string[]
}

const MultiSelect: FunctionComponent<IProps> = ({options}) => {
    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log(e.target.select.value)
    }

    return (

    )
}

export default MultiSelect

