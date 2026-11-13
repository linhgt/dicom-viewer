import { render } from 'preact'
import AppRouter from './router'
import './styles.css'

const container = document.getElementById('root');

if (!container) {
  throw new Error('Failed to find the root element');
}

render(<AppRouter />, container)
