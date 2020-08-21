import React from 'react';
import './MainComponent.css';
import Modal from '../modal/Modal';

export default function MainComponent(props) {
    const [images, setImages] = React.useState([]);
    const [isModalOpen, setModal] = React.useState(false);

    const toggleModal = (el) => {
        setModal(!isModalOpen);
        if(!isModalOpen) {
        localStorage.setItem('idImg', el);
        } else {
        localStorage.removeItem('idImg');
        }
    };
    React.useEffect( () => {
        window.fetch("https://boiling-refuge-66454.herokuapp.com/images")
        .then( res => res.json() )
        .then( result => setImages(result) )
    } )
    return (
        <main className="main-wrapper">
            {images.map( elem => (
                <img key={elem.id} src={elem.url} alt="Click!" onClick={() => toggleModal(elem.id)} />
            ) )}
            {isModalOpen &&
                <Modal onClose={toggleModal} />
            }
        </main>
    )
}