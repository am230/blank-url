import axios from 'axios';
import React from 'react';
import { Form } from 'react-final-form';


interface LinkResult {
    id: string
    createdAt: Date
    name: string
    url: string
}

const Home = () => {
    const [url, setUrl] = React.useState('');

    const [message, setMessage] = React.useState('');

    const createLink = async () => {
        const { data } = await axios.post<LinkResult>('/api/create', { url });
        const result = `${window.location.origin}/${data.id}`
        navigator.clipboard.writeText(result);
        setMessage('Copied!');
        setTimeout(() => {
            setMessage('');
        }, 500);
    }

    return (
        <div className='main'>
            <Form
                onSubmit={createLink}
                render={({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <input type="text" placeholder='url...' value={url} onChange={(e) => setUrl(e.target.value)} />
                        <button onClick={handleSubmit}>Create & Copy</button>
                    </form>
                )}
            />
            <p className='message'>{message}</p>
        </div >
    )
}

export default Home
