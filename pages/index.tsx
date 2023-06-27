import axios from 'axios';
import React from 'react';
import {Form} from 'react-final-form';
import {Response} from "./api/create";

const Home = () => {
    const [url, setUrl] = React.useState('');
    const [message, setMessage] = React.useState(<p className='message'></p>);

    const destroyMessage = () => {
        setMessage(<p className='message'></p>);
    };

    const createLink = async () => {
        destroyMessage();
        const {data} = await axios.post<Response>('/api/create', {url});
        if (!data.ok) {
            console.log(data);
            setMessage(<p className='message failed'>
                <span className="material-symbols-outlined">&#xe000;</span>
                {data.error}
            </p>);
            setTimeout(() => destroyMessage(), 5000);
            return;
        }
        const result = `${window.location.origin}/${data.id}`
        navigator.clipboard.writeText(result);
        setMessage(<p className='message'>
            <span className="material-symbols-outlined">&#xe86c;</span>
            コピーしました！
        </p>);
        setTimeout(() => destroyMessage(), 5000);
    }

    return (<div className='main'>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
        <Form
            onSubmit={createLink}
            render={({handleSubmit}) => (<form onSubmit={handleSubmit}>
                1.
                <input
                    type="text"
                    placeholder='@id...'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                2.
                <button onClick={handleSubmit}>作ってコピー</button>
            </form>)}
        />
        {message}
        <div className="bottom">
            <a href="https://github.com/am230/blank-url">BlankUrl</a>
            made by
            <a href="https://twitter.com/AM4_02">二時半</a>
        </div>
    </div>);
}

export default Home
