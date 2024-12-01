import { PropTypes } from 'prop-types';
import { useEffect } from 'react';

export function CustomTooltip({ payload, label, active, data, showKeys }) {
    CustomTooltip.propTypes = {
      payload: PropTypes.arrayOf(PropTypes.object),
      label: PropTypes.string,
      active: PropTypes.bool,
      data: PropTypes.object,
      showKeys: PropTypes.object
    }
    const colors = ['text-[#AF2BBF]', "text-[#51CB20]", "text-[#E4572E]", "text-[#773344]", "text-[#DA3E52]"]
    let payloadIndex = 0;

    useEffect(() => {
      payloadIndex = 0;
    }, [])
    
  
    if (active) {
      return (
        <div className="bg-white-background/30 rounded-sm flex flex-col items-center">
          <p className="text-white-text font-bold text-2xl">{label}</p>
          {payload.length > 0 && 
            data.keys.map((key, index) => {
              if (showKeys[key]){
                const payloadValue = payload[payloadIndex].value;
                payloadIndex++
                return <p key={key} className={colors[index]}>{`${key}: ${payloadValue}`}</p>
              }
            })
          }
        </div>
      );
    }
  
    return null;
  }