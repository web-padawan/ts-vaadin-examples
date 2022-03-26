import { color } from '@vaadin/vaadin-lumo-styles/color.js';
import { typography } from '@vaadin/vaadin-lumo-styles/typography.js';

const style = document.createElement('style');
style.innerHTML = `${color.toString()} ${typography.toString()}`;
document.head.appendChild(style);
