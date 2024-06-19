// src/pages/Accueil.js
import React, { useEffect, useRef } from 'react';
import { Typography } from 'antd';
import gsap from 'gsap';

const { Title, Paragraph } = Typography;

const randomChar = (isUpperCase) => {
    const chars = isUpperCase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : 'abcdefghijklmnopqrstuvwxyz';
    return chars.charAt(Math.floor(Math.random() * chars.length));
};

const animateFullname = (element, fullname) => {
    const interval = 0.05; // interval between each letter change
    const maxSteps = 10; // maximum steps for the animation

    const animateLetter = (index) => {
        if (index >= fullname.length) return; // stop if all letters are animated

        if (fullname[index] === ' ') {
            element.textContent = element.textContent.substring(0, index) + ' ' + element.textContent.substring(index + 1);
            animateLetter(index + 1);
            return;
        }

        const steps = Math.floor(Math.random() * (maxSteps - 2)) + 2; // random steps between 2 and maxSteps
        let step = 0;

        const updateText = () => {
            let text = '';
            for (let i = 0; i < fullname.length; i++) {
                if (i < index) {
                    text += fullname[i]; // previously revealed letters
                } else if (i === index) {
                    text += step >= steps ? fullname[i] : randomChar(fullname[i] === fullname[i].toUpperCase());
                } else if (i === index + 1) {
                    text += '_'; // underscore for the next letter
                } else {
                    text += ' '; // space for the remaining letters
                }
            }
            element.textContent = text;
            step++;
            if (step <= steps) {
                setTimeout(updateText, interval * 1000);
            } else {
                animateLetter(index + 1); // move to the next letter
            }
        };

        updateText();
    };

    animateLetter(0); // start animation from the first letter
};

const Accueil = React.forwardRef((props, ref) => {
    const fullnameRef = useRef(null);

    useEffect(() => {
        animateFullname(fullnameRef.current, 'Rayan Ravelonirina');
    }, []);

    return (
        <section ref={ref} className="full-height-section" style={{ textAlign: 'center',  cursor: 'none' }}>
            <Title ref={fullnameRef} className='fullname' level={2}>Rayan Ravelonirina</Title>
            <Title className='title' level={4}>Développeur Fullstack</Title>
            <Paragraph className='bio'>
                Passionné par le développement web, avec une expertise en technologies front-end et back-end.
                Toujours à la recherche de nouvelles technologies pour améliorer l'expérience utilisateur.
            </Paragraph>
        </section>
    );
});

export default Accueil;
