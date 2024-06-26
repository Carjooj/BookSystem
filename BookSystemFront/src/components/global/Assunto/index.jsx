import styles from './styles.module.css'

export default function Assunto({ fechavel=false, children, ...rest }){
    return(
        <p className={styles.assunto} {...rest}>
            {children}
            {fechavel && <button className={styles.botao}>
                <span className="material-symbols-outlined">close</span>
            </button>}
        </p>
    )
}