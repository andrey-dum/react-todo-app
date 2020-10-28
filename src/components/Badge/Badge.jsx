import React from 'react';
import classNames from 'class-names';
import './index.scss';

const Badge = ({color, onSelectedColor, activeClass, colorItem}) => {
  return (
        <div onClick={() => onSelectedColor(colorItem.id)} className={classNames('badge', {[`badge--${color}`]: color}, activeClass)} >
            
        </div>
  );
}

export default Badge;
