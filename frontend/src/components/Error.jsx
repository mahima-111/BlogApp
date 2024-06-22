import {Link} from 'react-router-dom';

const Error = () => {
    return (
        <div className='text-center mt-40 '>
            <h1 className='text-4xl font-semibold mb-4'>an error occured</h1>
            <Link to='/'><button>Go to home page</button></Link>
        </div>
    )
}

export default Error