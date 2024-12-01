import { PropTypes } from 'prop-types';

export function CustomTooltip({ payload, label, active, data, showKeys }) {
    CustomTooltip.propTypes = {
      payload: PropTypes.arrayOf(PropTypes.object),
      label: PropTypes.string,
      active: PropTypes.bool,
      data: PropTypes.object,
      showKeys: PropTypes.object
    }
    const colors = ['text-[#AF2BBF]', "text-[#51CB20]", "text-[#E4572E]", "text-[#773344]", "text-[#DA3E52]"]
  
    if (active) {
      return (
        <div className="bg-white-background/30 rounded-sm flex flex-col items-center">
          <p className="text-white-text font-bold text-2xl">{label}</p>
          {payload.length > 0 &&
            data.keys.map((key, index) => {
              let i = 0;
              console.log(payload)
              console.log(showKeys)
              console.log(active)
              console.log(key)
              if (showKeys[key]){
                const payloadValue = payload[i].value;
                i++
                return <p key={key} className={colors[index]}>{`${key}: ${payloadValue}`}</p>
              }
                
            })
          }
        </div>
      );
    }
  
    return null;
  }