import React from 'react'

export default function Die(props) {
  const styles = {
    backgroundColor: props.isHeld ? "aquamarine" : "white"
  }

  let diceValue = props.value
  let diceClassName = ""
  
  switch(diceValue){
    case 1:
      diceClassName = 'dice first-face'
      break;
    case 2:
      diceClassName = 'dice second-face'
      break;
    case 3:
      diceClassName = 'dice third-face'
      break;
    case 4:
      diceClassName = 'dice fourth-face'
      break;
    case 5:
      diceClassName = 'dice fifth-face'
      break;
    case 6:
      diceClassName = 'dice sixth-face'
      break;
    default:
      diceClassName = 'none'
      break;
  }

  return (
    <div 
      className={diceClassName}
      style={styles}
      onClick={props.holdDice}
    >
      { diceValue > 0 &&
        diceValue < 4 &&
        <span className='dot'></span>
      }
      { 
        diceValue > 1 && 
        diceValue < 4 && 
        <span className='dot'></span>
      }

      { diceValue === 3 && <span className='dot'></span> }
      
      { diceValue > 3 &&
        <div className='column'>
          <span className='dot'></span>
          <span className='dot'></span>
          { diceValue === 6 &&
            <span className='dot'></span>
          }
        </div>
      }
      { diceValue === 5 &&
        <div className='column'>
          <span className='dot'></span>
        </div>
      }
      { diceValue > 3 &&
        <div className='column'>
          <span className='dot'></span>
          <span className='dot'></span>
          { diceValue === 6 &&
            <span className='dot'></span>
          }
        </div>
      }
    </div>
  )
}