// src/pages/Contact.js
import React from 'react';
import { Typography, Form, Input, Button } from 'antd';

const { Title } = Typography;
const { TextArea } = Input;

const Contact = React.forwardRef((props, ref) => (
    <section ref={ref} className="full-height-section" style={{ textAlign: 'center' }}>
        <Title level={3}>Contact</Title>
        <Form
            name="contact"
            layout="vertical"
            style={{ maxWidth: '600px', margin: '0 auto' }}
        >
            <Form.Item
                name="name"
                label="Nom"
                rules={[{ required: true, message: 'Veuillez entrer votre nom!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Veuillez entrer votre email!' }]}
            >
                <Input type="email" />
            </Form.Item>
            <Form.Item
                name="message"
                label="Message"
                rules={[{ required: true, message: 'Veuillez entrer votre message!' }]}
            >
                <TextArea rows={4} />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Envoyer</Button>
            </Form.Item>
        </Form>
    </section>
));

export default Contact;
