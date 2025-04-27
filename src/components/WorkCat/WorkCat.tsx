import styles from './WorkCat.module.css'
import dumb from '../../assets/dumb.png'
import illegal from '../../assets/illegal.png'
import junior from '../../assets/junior.png'
import steady from '../../assets/steady.png'
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
            ?<ImageCompoennet src={dumb}/>
            :(count<=17)
                ?<img src={illegal} alt='illegal' height={150}/>
                :(count<=25)
                    ?<img src={junior} alt='illegal' height={150}/>
                    :<img src={steady} alt='illegal' height={150}/>}
            
            
        </div>
        
    </div>
  )
}

export default WorkCat;