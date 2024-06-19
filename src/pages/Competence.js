// src/pages/Competence.js
import React, { useEffect, useRef } from 'react';
import { Card, Row, Col } from 'antd';
import { gsap } from 'gsap';
import './Competence.css';

const skills = [
    { title: 'HTML, CSS, JavaScript', description: 'Building the structure and style of web pages.' },
    { title: 'React, Angular, Vue.js', description: 'Popular front-end frameworks for building user interfaces.' },
    { title: 'Node.js, Express', description: 'Server-side JavaScript runtime and framework.' },
    { title: 'Python, Django, Flask', description: 'Programming language and frameworks for back-end development.' },
    { title: 'Java, Spring Boot', description: 'Enterprise-level back-end development with Java.' },
    { title: 'SQL, NoSQL (MongoDB, Redis)', description: 'Databases for data storage and retrieval.' },
    { title: 'RESTful APIs, GraphQL', description: 'APIs for communication between client and server.' },
    { title: 'Git, GitHub, CI/CD', description: 'Version control and continuous integration/delivery.' },
    { title: 'Docker, Kubernetes', description: 'Containerization and orchestration tools.' },
    { title: 'Cloud Services (AWS, Azure, GCP)', description: 'Cloud computing platforms.' }
];

const Competence = React.forwardRef((props, ref) => {
    const skillRefs = useRef([]);
    const circleRef = useRef(null);

    useEffect(() => {
        gsap.fromTo(
            skillRefs.current,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power3.out'
            }
        );

        const handleMouseMove = (event) => {
            gsap.to(circleRef.current, {
                x: event.clientX - 50,
                y: event.clientY - 50,
                ease: 'power3.out',
                duration: 0,
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div ref={ref} className="competence-container">
            <h2>Compétences</h2>
            <Row gutter={[16, 16]}>
                {skills.map((skill, index) => (
                    <Col key={index} xs={24} sm={12} md={8} lg={6}>
                        <Card
                            ref={(el) => (skillRefs.current[index] = el)}
                            title={skill.title}
                            bordered={false}
                        >
                            {skill.description}
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
});

export default Competence;
