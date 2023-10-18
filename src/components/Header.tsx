import  styles  from './Header.module.css';
import rocket from '../assets/rocket.svg'
export function Header(){
  return (
    <div className={styles.header}>
        <img src={rocket} alt="Rocket" />
        <header className={styles.to}>to</header>
        <header className={styles.do}>do</header>

    </div>
    
  )
}
