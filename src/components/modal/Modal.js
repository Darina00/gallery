import React from 'react';
import './Modal.css';

export default function Modal(props) {
    const idPhoto = localStorage.getItem('idImg');
    const [infoPhoto, setInfo] = React.useState(null);
    const [name, setName] = React.useState('');
    const [comment, setComment] = React.useState('');
    const [isDisabled, setDisabled] = React.useState(true);
    React.useEffect( () => {
        fetch(`https://boiling-refuge-66454.herokuapp.com/images/${idPhoto}`)
        .then( res => res.json() )
        .then( result => setInfo(result) )    
    }, [idPhoto] );

    const changeDisabled = () => {
        if(name.length > 0 && comment.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        };
    }

    const changeComment = e => {
        setComment(e.target.value);
        changeDisabled();
    };

    const changeName = e => {
        setName(e.target.value);
        changeDisabled();
    };

    const post = () => {
        fetch(`https://boiling-refuge-66454.herokuapp.com/images/${idPhoto}/comments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: name, comment: comment })
        })
        .then(response => {
            let currentInfo = infoPhoto;
            currentInfo.comments.push({id: Math.round( 400 - 0.5 + Math.random() * (2000 - 400 + 1) ), date: new Date()/1000, text: comment});
            setInfo(currentInfo);
            setComment('');
            setName('');
        })
    }

    return (
        <div className="modal-wrapper">
            <div className="modal">
                <h1 onClick={props.onClose} className="close-button">X</h1>    
                {infoPhoto ? 
                    <div className="modal-content">
                        <div>
                            <img src={infoPhoto.url ? infoPhoto.url : 'Загрузка...'} alt="pct" />
                            <form>
                                <input type="text" placeholder="Ваше имя" value={name} onChange={changeName} /> 
                                <input type="text" placeholder="Ваш комментарий" value={comment} onChange={changeComment} /> 
                                <input type="button" value="Оставить комментарий" onClick={post} disabled={isDisabled} />   
                            </form> 
                        </div>
                        <div>
                            {infoPhoto.comments.length > 0 ? infoPhoto.comments.map( item => (
                                <div key={item.id}>
                                    <h6>{new Date(item.date * 1000).getDay()}.{new Date(item.date * 1000).getMonth()}.{new Date(item.date * 1000).getFullYear()}</h6>
                                    <h3>{item.text}</h3>
                                </div>
                            ) ) : 'Комментариев нет'}
                        </div>
                    </div> : 'Загрузка...'}
            </div>
        </div>
    )
}