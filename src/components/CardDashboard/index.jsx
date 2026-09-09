import style from './style.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const CardDashboard = ({icon, text, dados, subText, color1, color2})=>{
    const cardStyle = {
        '--card-color-1': color1 || '#6366F1',
        '--card-color-2': color2 || '#4F46E5'
    };


    return(
        <article className={style.cardDashboard} style={cardStyle}>
            <div className={style.containerImg}>
                <FontAwesomeIcon icon={icon} className={style.icon} />
            </div>
            <div className={style.content}>
                <p>{text}</p>
                <p>{dados}</p>
                {subText && <p>{subText}</p>}
            </div>
        </article>
    )
}


export default CardDashboard;