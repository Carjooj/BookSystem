import styles from './styles.module.css'

const Button = ({ children, ...rest }) => {
    return (
        <button className={styles.primaryButton} {...rest}>
            {children}
        </button>
    )
}

export default Button