// src/pages/Projects.js
import React, { useEffect, useRef } from 'react';
import { Typography, List, Card } from 'antd';
import { gsap } from 'gsap';

const { Title, Paragraph } = Typography;

const projects = [
    {
        title: 'Projet E-commerce',
        description: 'Développement d\'une plateforme de commerce électronique complète avec gestion des produits, panier et système de paiement.',
    },
    {
        title: 'Application de Chat en Temps Réel',
        description: 'Création d\'une application de messagerie instantanée avec WebSocket et intégration de notifications en temps réel.',
    },
    {
        title: 'Dashboard d\'Analytique',
        description: 'Conception et développement d\'un tableau de bord interactif pour visualiser les données d\'analytique en temps réel.',
    },
];

const Projects = React.forwardRef((props, ref) => {
    const cardRefs = useRef([]);
    cardRefs.current = [];

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    cardRefs.current.forEach((el, index) => {
                        gsap.fromTo(el, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: index * 0.3 });
                    });
                }
            });
        }, { threshold: 0.5 });

        observer.observe(ref.current);

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, [ref]);

    const addToRefs = (el) => {
        if (el && !cardRefs.current.includes(el)) {
            cardRefs.current.push(el);
        }
    };

    return (
        <section ref={ref} className="full-height-section">
            <Title level={3} style={{ textAlign: 'center' }}>Projets</Title>
            <List
                grid={{ gutter: 16, column: 3 }}
                dataSource={projects}
                renderItem={project => (
                    <List.Item>
                        <Card ref={addToRefs} title={project.title}>
                            <Paragraph>{project.description}</Paragraph>
                        </Card>
                    </List.Item>
                )}
            />
        </section>
    );
});

export default Projects;
