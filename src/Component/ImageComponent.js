import './Styles/image-style.scss';
import FirstImage from './Images/Tulips.jpg';
import data from '../colors.json';
import _ from 'lodash';

_.map([1,2], item => console.log(item));

class ImageComponent {

    createImageTag() {
        const image = document.createElement('img');
    
        image.alt = 'MY Image';
        image.classList.add('image');
        image.src = FirstImage;
        console.log(data);
        return image;
    }

    createTextTag() {
        const text = document.createElement('h2');
        text.innerText = "سلام حسین دوران";

        return text;
    }

    render() {
        const element = document.createElement('div');
        element.classList.add('image-box');

        element.appendChild(this.createImageTag());
        element.appendChild(this.createTextTag());
        return element;
    }
}

export default new ImageComponent;