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
    const colors = ['text-[#be123c]', "text-[#9333ea]", "text-[#0891b2]", "text-[#65a30d]", "text-[#ca8a04]", "text-[#ea580c]"]
    let payloadIndex = 0;

    useEffect(() => {
      payloadIndex = 0;
    }, [])
    
  
    if (active) {
      return (
        <div className="bg-neutral-300/60 dark:bg-neutral-400/70 rounded-xl flex flex-col items-center">
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

  export function CustomTooltipPatents({ payload, label, active, }) {
    CustomTooltipPatents.propTypes = {
      payload: PropTypes.arrayOf(PropTypes.object),
      label: PropTypes.string,
      active: PropTypes.bool,
      data: PropTypes.object,
      showKeys: PropTypes.object
    }
    //const colors = ['text-[#be123c]', "text-[#9333ea]", "text-[#0891b2]", "text-[#65a30d]", "text-[#ca8a04]", "text-[#ea580c]"]
    console.log(payload)
    console.log(label)
    if (active) {
      return (
        <div className="bg-neutral-300/60 dark:bg-neutral-400/70 rounded-xl flex flex-col items-center">
          <p className="text-white-text font-bold text-2xl">{label}</p>
          {payload.length > 0 && <p>{payload[0].payload.val}</p>}
        </div>
      );
    }
  
    return null;
  }