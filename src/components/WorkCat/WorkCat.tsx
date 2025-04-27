import styles from './WorkCat.module.css'
import dumb from '../../assets/dumb.webp'
import illegal from '../../assets/illegal.webp'
import junior from '../../assets/junior.webp'
import steady from '../../assets/steady.webp'
import glass from '../../assets/glasses_no_bg.png'
import cigarette from '../../assets/cigarette.webp'
import ImageCompoennet from '../ImageComponent/ImageComponent'

interface Props{
    count:number;
}

const WorkCat = ({count}:Props) => {

  return (
    <div className={styles['container']}>

        <div className={styles['img-container']}>
            
            {(count<=5)
            ?<ImageCompoennet src={dumb} hash='LiEyPhRk%MRj~qofofWB-;oyM{j['/>
            :(count<=17)
                ?<ImageCompoennet src={illegal} hash='LjEfKKWBxuRj~qofofWB-;ofM{j['/>
                :(count<=25)
                    ?<ImageCompoennet src={junior} hash='LjEfKKWBxuRj~qofofWB-;ofM{j['/>
                    :<ImageCompoennet src={steady} hash='LjEfKKWBxuRj~qofofWB-;ofM{j['/>}
            
        </div>

        {(count>=35)  &&
        <div className={styles['glass']}>
            <img src={glass} alt='glass' height={100}/>
        </div>}

        {(count>=50)  &&
        <div className={styles['cigarette']}>
            <img src={cigarette} alt='cigarette' height={25}/>
        </div>}
        
    </div>
  )
}

export default WorkCat;