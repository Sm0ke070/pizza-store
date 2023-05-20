import React, {FC, useEffect} from "react";
import Modal from "react-modal";
import styles from './pizzaModal.module.scss'
import PizzaButton from "../pizzaBlock/PizzaButton";

type MyModalPropsType = {
    isOpen: boolean;
    closeModal: (isOpen: boolean) => void;
    title: string
    id: string
    price: number
    imageUrl: string
    onClickAdd: () => void
    addedCount: number
    description: string
    size: number
    type: string
}

const PizzaModal: FC<MyModalPropsType> = ({
                                              id,
                                              size,
                                              type,
                                              title,
                                              price,
                                              isOpen,
                                              imageUrl,
                                              closeModal,
                                              addedCount,
                                              onClickAdd,
                                              description
                                          }) => {

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('modal-open')
        } else {
            document.body.classList.remove('modal-open')
        }
        return () => {
            document.body.classList.remove('modal-open')
        };
    }, [isOpen])

    const modalStyles = {
        content: {
            minWidth: '320px',
            top: '50%',
            left: '50%',
            right: '50%',
            bottom: 'auto',
            marginRight: '-35%',
            borderRadius: '10px',
            backgroundColor: '#fff',
            transform: 'translate(-50%, -50%)',
        },
    }
    return (
        <div>
            <Modal style={modalStyles} isOpen={isOpen} onRequestClose={() => closeModal(false)}>
                <div className={styles.root}>
                    <button onClick={() => closeModal(false)} className={styles.closeModal}>X</button>
                    <div className={styles.pizza}>
                        <img style={{width: '250px'}} src={imageUrl} alt="pizza_image"/>
                    </div>
                    <div className={styles.description}>
                        <div>
                            <h2>{title}</h2>
                            <h3 style={{color: '#B2B4B6FF'}}>Состав:</h3>
                            <span>{description}</span>
                        </div>
                        <div>
                            <div className={styles.current}> {title}, {type}, {size} см, {price}₽.</div>
                            <PizzaButton onClickAdd={onClickAdd} addedCount={addedCount}/>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>

    );
};

export default PizzaModal;