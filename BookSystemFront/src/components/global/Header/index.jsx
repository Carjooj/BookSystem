import { Link } from 'react-router-dom'
import logo from '/assets/images/logo.svg'
import styles from './styles.module.css'

const Header = () => {
    return(
        <header className={styles.header}>
            <img className={styles.logo} src={logo} alt="Logo"/>
            <ul className={styles.ul}>
                <Link className={window.location.pathname == "/gerenciamento" ? styles.selectedPage : styles.page} to="/gerenciamento">Gerenciamento</Link>
                <Link className={window.location.pathname == "/emprestimos" ? styles.selectedPage : styles.page} to="/emprestimos">Empréstimos</Link>
                <span className={styles.bg}/>
            </ul>
            <button className={styles.profile}></button>
        </header>
    )
}

export default Header