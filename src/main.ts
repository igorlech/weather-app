import { weatherPanel } from '@components/weatherPanel/weatherPanel';
import './styles.scss';

// bootstrap main App when DOMContentLOADED
document.addEventListener('DOMContentLoaded', () => {
    new weatherPanel();
});

