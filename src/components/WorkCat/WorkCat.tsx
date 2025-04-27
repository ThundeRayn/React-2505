import styles from './WorkCat.module.css'
import dumb from '../../assets/dumb.webp'
import illegal from '../../assets/illegal.webp'
import junior from '../../assets/junior.webp'
import steady from '../../assets/steady.webp'
import ImageCompoennet from '../ImageComponent/ImageComponent'

interface Props{
    count:number;
}

const WorkCat = ({count}:Props) => {
  return (
    <div>
        WorkCat: {count}

        <div className={styles['container']}>
            
            {(count<=5)
            ?<ImageCompoennet src={dumb} hash='LiEyPhRk%MRj~qofofWB-;oyM{j['/>
            :(count<=17)
                ?<ImageCompoennet src={illegal} hash='LjEfKKWBxuRj~qofofWB-;ofM{j['/>
                :(count<=25)
                    ?<ImageCompoennet src={junior} hash='LjEfKKWBxuRj~qofofWB-;ofM{j['/>
                    :<ImageCompoennet src={steady} hash='LjEfKKWBxuRj~qofofWB-;ofM{j['/>}
            
            
        </div>
        
    </div>
  )
}

export default WorkCat;