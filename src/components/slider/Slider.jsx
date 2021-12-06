/*libs*/
import React from 'react';
import { Carousel } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';

/*other*/
import './style.css';

const Slider = ({ typeSlider, handleSlider, refSlider, settingsSlider }) => {
    return (
        <div className={`${typeSlider}-slider slider`}>
            <div className="slider-grad slider-left-grad"></div>
            <div className="slider-grad slider-right-grad"></div>
            <LeftOutlined onClick={() => refSlider.current.prev()} />
            <RightOutlined onClick={() => refSlider.current.next()} />
            <Carousel ref={refSlider} {...settingsSlider}>
                {handleSlider()}
            </Carousel>
        </div>
    )
}

export default Slider;