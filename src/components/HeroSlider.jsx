import React, {useState , useEffect , useCallback} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Button from './Button'
const HeroSlider = props => {
    const data= props.data
    const [activeSlide,setActiveSlide] = useState(0)
    const timeOut = props.timeOut ? props.timeOut : 3000
    const nextSlide  =useCallback(
        ()=>{
            setActiveSlide((oldSlider) => {
                 oldSlider += 1
                if(oldSlider > data.length - 1){
                    return oldSlider=0
                }
                else{
                    return oldSlider
                }
                
            })
        },
      [data]
    )
   
    const prevSlide =()=>{
        setActiveSlide((oldSlider) => {
            oldSlider -= 1
            if(oldSlider < 0){
                return oldSlider=data.length - 1
            }
            else{
                return oldSlider
            }
        })
    }

    useEffect(()=>{
        if(props.auto){
            const slideAuto = setInterval(()=>{nextSlide()}, timeOut) 
            return ()=> clearInterval(slideAuto)
        }
    },[nextSlide, timeOut, props])
  return (
    <div className='hero-slider'>
        {
            data.map((item,index)=>(
                <HeroSliderItem key={index} item={item} active={activeSlide === index}/>
            ))

        }
            {
                props.control ? (
                    <div className="hero-slider__control">
                        <div className="hero-slider__control__item">
                            <i className="bx bx-chevron-left" onClick={prevSlide}></i>
                        </div>
                        <div className="hero-slider__control__item">
                            <div className="index">
                                {activeSlide+1}/{data.length}
                            </div>
                        </div>
                        <div className="hero-slider__control__item" onClick={nextSlide}>
                            <i className="bx bx-chevron-right"></i>
                        </div>
                    </div>
                ) : null
            
            }
    </div>
  )
}

HeroSlider.propTypes = {
    data: PropTypes.array.isRequired,
    control : PropTypes.bool,
    auto: PropTypes.bool,
    timeOut: PropTypes.number

}
const HeroSliderItem = props => (
    <div className={`hero-slider__item ${props.active ? 'active' : ''}  `}>
        <div className="hero-slider__item__info">
            <div className={`hero-slider__item__info__title color-${props.item.color}`}>
                <span>{props.item.title}</span>
            </div>
            <div className="hero-slider__item__info__description">
                <span>{props.item.description}</span>
            </div>
            <div className="hero-slider__item__info__btn">
                <Link to={props.item.path}>
                   <Button backgroundColor={props.item.color}
                   animate
                   icon='bx bx-cart'>
                        xem chi tiết
                   </Button>
                </Link>
            </div>
        </div>
        <div className="hero-slider__item__image">
            <div className={`shape bg-${props.item.color}`}></div>
            <img src={props.item.img} alt="" />
        </div>
    </div>
)
export default HeroSlider