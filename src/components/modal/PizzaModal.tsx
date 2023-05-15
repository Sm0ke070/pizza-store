import React, {FC} from "react";
import Modal from "react-modal";
import styles from './pizzaModal.module.scss'
import PizzaButton from "../pizzaBlock/PizzaButton";

type MyModalPropsType = {
    isOpen: boolean;
    closeModal: () => void;
    title: string
    id: string
    price: number
    imageUrl: string
    onClickAdd: () => void
    addedCount: number
    size: number
    type: string
    //sizes: number[]
    //types: number[]

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
                                              onClickAdd
                                          }) => {
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
            transform: 'translate(-50%, -50%)'
        },
    };
    return (
        <>
            <Modal style={modalStyles} isOpen={isOpen} onRequestClose={closeModal}>
                <div className={styles.root}>

                    <div className={styles.pizza}>
                        <img style={{width: '300px'}} src={imageUrl} alt="pizza image"/>
                    </div>

                    <div className={styles.description}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet cupiditate dignissimos distinctio
                        dolorem eaque enim eum incidunt libero maiores, minus nobis obcaecati quisquam reiciendis
                        reprehenderit tempora? Deserunt quos sapiente ullam!

                        <div>
                            <div className={styles.current}> {title}, {type}, {size} см, {price}₽.</div>
                            <PizzaButton onClickAdd={onClickAdd} addedCount={addedCount}/>
                        </div>

                    </div>
                </div>

            </Modal>
        </>

    );
};

export default PizzaModal;