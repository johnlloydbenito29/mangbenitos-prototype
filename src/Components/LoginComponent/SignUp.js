import React, { useRef, useState } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Contex/AuthenticationContext';


function SignUp() {
   const emailRef = useRef();
   const passwordRef = useRef();
   const passwordConfirmRef = useRef();
   const { signup } = useAuth();
   const [signUpError, setSignUpError] = useState('');
   const [loadingSignup, setLoadingSignup] = useState(false);


   async function handleSubmitSignUp(e) {
      e.preventDefault();

      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
         return setSignUpError('Password do not match');
      } else if (passwordRef.current.value.length <= 5) {
         return setSignUpError('Password is too weak');
      }

      try {
         setSignUpError('');
         setLoadingSignup(true);
         await signup(emailRef.current.value, passwordRef.current.value);
      } catch (err) {
         console.log(err.message);
         setSignUpError('Failed to Create an Acount!');
      }
   }


   return (
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
         <div className="w-100" style={{ maxWidth: '400px' }}>
            <Card>
               <Card.Body className="w-400">
                  <h2 className="text-center mb-4">Sign up</h2>
                  {signUpError && <Alert variant="danger">{signUpError}</Alert>}
                  <Form onSubmit={handleSubmitSignUp}>
                     <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                     </Form.Group>
                     <Form.Group id="password">
                        <Form.Label>password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                     </Form.Group>
                     <Form.Group id="password-confirm">
                        <Form.Label>Password Confermation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required />
                     </Form.Group>
                     <Button disabled={loadingSignup} className="w-100 my-4" type="submit">
                        Sign Up
                     </Button>
                  </Form>
               </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
               Already have a account? <Link to="/Login">Log in</Link>
            </div>
         </div>
      </Container>
   );
}

export default SignUp;
