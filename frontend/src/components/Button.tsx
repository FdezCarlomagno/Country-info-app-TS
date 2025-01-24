import { Link } from "react-router-dom"

type ButtonProps = {
    message: string
    link: string
}

export const Button = ({ message, link } : ButtonProps) => {
    return (
        <Link to={link}><button className="m-4 block bg-white p-3 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 hover:border-indigo-400" >{message}</button></Link>
    )
}
