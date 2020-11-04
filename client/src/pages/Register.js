import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation, gql } from '@apollo/client';

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks.js';

function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, value } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, result) {
      context.login(result.data.register);
      props.history.push('/');
    },
    onError(err) {
      console.log(props);
      setErrors(err.graphQLErrors[0].extensions.errors);
    },
    variables: value,
  });

  function registerUser() {
    addUser();
  }

  return (
    <div className='form-container'>
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>
        <Form.Input
          type='text'
          label='Username'
          placeholder='John Doe'
          name='username'
          value={value.username}
          error={errors.username ? true : false}
          onChange={onChange}
        />
        <Form.Input
          type='email'
          label='Email'
          placeholder='john@doe.com'
          error={errors.email ? true : false}
          name='email'
          value={value.email}
          onChange={onChange}
        />
        <Form.Input
          type='password'
          label='Password'
          placeholder='●●●●●●●●'
          name='password'
          error={errors.password ? true : false}
          value={value.password}
          onChange={onChange}
        />
        <Form.Input
          type='password'
          label='Confirm Password'
          placeholder='●●●●●●●●'
          name='confirmPassword'
          error={errors.confirmPassword ? true : false}
          value={value.confirmPassword}
          onChange={onChange}
        />
        <Button type='submit' primary>
          Register
        </Button>
      </Form>
      {Object.keys(errors).length > 0 && (
        <div className='ui error message'>
          <ul className='list'>
            {Object.values(errors).map((el) => (
              <li key={el}>{el}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;
