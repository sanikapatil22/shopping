import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import FormInput from "../../form-input/form-input.component";
import { Button } from "../button/button.component";
import './sign-up-form.styles.scss';
const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}; //object to store default values of form fields

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            //console.log(user);
            setFormFields(defaultFormFields);

            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.log('user creation encountered an error', error);
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };
    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign Up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label="Display Name" required name="displayName" value={displayName} onChange={handleChange} />

                <FormInput label="Email" required name="email" value={email} onChange={handleChange} />

                <FormInput label="Password" required name="password" type="password" value={password} onChange={handleChange} />

                <FormInput label="Confirm Password" required name="confirmPassword" type="password" value={confirmPassword} onChange={handleChange} />

                <Button type="submit">Sign Up</Button>
            </form>
        </div>
    );
};

export default SignUpForm;
