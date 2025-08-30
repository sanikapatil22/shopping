import { useState } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth,signInAuthWithEmailAndPassword } from "../../utils/firebase/firebase.utils";
import FormInput from "../../form-input/form-input.component";
import { Button } from "../button/button.component";
import './sign-in-form.styles.scss';
const defaultFormFields = {
    email: "",
    password: ""
}; //object to store default values of form fields

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }
 const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);

    };
const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await signInAuthWithEmailAndPassword(email,password);
            resetFormFields();

        } catch (error) {
            switch(error){
                case 'auth/wrong-password':
                    alert('incorrect password');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this email');
                    break;
                default:
                    console.log(error);
                    
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };
    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
            
                <FormInput label="Email" required name="email" value={email} onChange={handleChange} />

                <FormInput label="Password" required name="password" type="password" value={password} onChange={handleChange} />
                <div className="buttons-container">
                       <Button type="submit">Sign In</Button>
                <Button type='button' buttonType="google" onClick={signInWithGoogle}>Google sign in</Button>
                </div>
                
            </form>
        </div>
    );
};

export default SignInForm;
