import { PropTypes } from 'prop-types';

export function MainButton({text}) {
  MainButton.propTypes = {
    text: PropTypes.string.isRequired
  }

  return (
    <a href="https://web.siia.unam.mx/siia-publico/index.php" 
      target="_blank" 
      className='transition inline-flex items-center justify-center h-24 font-bold rounded-sm font-sans text-sm
        line-clamp-2 border-y-2 bg-white-secondary/10 text-white-secondary border-white-primary
        dark:bg-white/5 dark:text-dark-secondary  dark:border-dark-secondary/10 
        hover:text-dark-primary hover:bg-dark-primary/5 hover:scale-x-105 duration-300'>
      {text}
    </a>
  )
}