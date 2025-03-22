import React, { useState } from 'react';

interface FormData {
    name: string;
    email: string;
    message: string;
}

interface FormErrors {
    name?: string;
    email?: string;
    message?: string;
}

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validate = (): FormErrors => {
        const newErrors: FormErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Имя обязательно для заполнения.';
        if (!formData.email.trim()) {
            newErrors.email = 'Email обязателен для заполнения.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Введите корректный email.';
        }
        if (!formData.message.trim()) newErrors.message = 'Сообщение обязательно для заполнения.';
        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            console.log('Форма отправлена:', formData);
            alert('Форма успешно отправлена!');
            setFormData({ name: '', email: '', message: '' });
            setErrors({});
        }
    };

    const styles = {
        container: {
            fontFamily: 'Arial, sans-serif',
            margin: '20px',
        },
        form: {
            maxWidth: '400px',
            margin: '0 auto',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            fontWeight: 'bold',
        },
        input: {
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '5px',
        },
        button: {
            width: '100%',
            padding: '10px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
        },
        buttonHover: {
            backgroundColor: '#0056b3',
        },
        error: {
            color: 'red',
            fontSize: '0.9em',
        },
    };

    return (
        <div style={styles.container}>
            <h1>Форма обратной связи</h1>
            <form style={styles.form} onSubmit={handleSubmit}>
                <label style={styles.label} htmlFor="name">Имя</label>
                <input
                    style={styles.input}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Введите ваше имя"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && <span style={styles.error}>{errors.name}</span>}

                <label style={styles.label} htmlFor="email">Email</label>
                <input
                    style={styles.input}
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Введите ваш email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <span style={styles.error}>{errors.email}</span>}

                <label style={styles.label} htmlFor="message">Сообщение</label>
                <textarea
                    style={styles.input}
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Введите ваше сообщение"
                    value={formData.message}
                    onChange={handleChange}
                />
                {errors.message && <span style={styles.error}>{errors.message}</span>}

                <button
                    type="submit"
                    style={styles.button}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
                >
                    Отправить
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
