import React, { useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { Formik } from 'formik';
import * as yup from 'yup';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  ContactsForm,
  ListForContactsForm,
  ItemsForContactsForm,
  LabelForContactsForm,
  InputForContactsForm,
  ButtonForContactsForm,
  ErrorForContactsForm,
} from './ContactForm.styled';
const phoneRegExp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;
let schema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'That doesnt look like your name')
    .typeError()
    .required(),
  number: yup
    .string()
    .required(`You need to type a number`)
    .min(3, 'Too short')
    .max(15, 'Too long')
    .matches(phoneRegExp, 'That doesnt look like a phone number'),
});

function ContactForm({ creatingContact }) {
  const [name] = useState('');
  const [number] = useState('');

  const handleSubmit = (values, actions) => {
    creatingContact(values);

    actions.resetForm();
  };

  const nameInputId = shortid.generate();
  const numberInputId = shortid.generate();

  return (
    <Formik
      validationSchema={schema}
      initialValues={{ name, number }}
      onSubmit={handleSubmit}
    >
      <ContactsForm autoComplete="off">
        <ListForContactsForm>
          <ItemsForContactsForm>
            <LabelForContactsForm htmlFor={nameInputId}>
              Name
            </LabelForContactsForm>

            <InputForContactsForm
              id={nameInputId}
              type="text"
              name="name"
              required
            />
            <ErrorForContactsForm name="name" component="div" />
          </ItemsForContactsForm>
          <ItemsForContactsForm>
            <LabelForContactsForm htmlFor={numberInputId}>
              Number
            </LabelForContactsForm>
            <InputForContactsForm
              id={numberInputId}
              type="tel"
              name="number"
              required
            />
            <ErrorForContactsForm name="number" component="div" />
          </ItemsForContactsForm>
        </ListForContactsForm>
        <ButtonForContactsForm type="submit">Add contact</ButtonForContactsForm>
        <ToastContainer
          transition={Flip}
          theme="dark"
          position="bottom-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
        />
      </ContactsForm>
    </Formik>
  );
}

ContactForm.propTypes = {
  creatingContact: PropTypes.func.isRequired,
};
export default ContactForm;

//state
//
// class ContactForm extends React.Component {
//   state = { name: '', number: '' };

//   static propTypes = {
//     creatingContact: PropTypes.func.isRequired,
//   };

//   handleSubmit = (values, actions) => {
//     this.props.creatingContact(values);
//     // console.log(`values`, values);
//     // console.log(`actions`, actions);
//     actions.resetForm();
//   };
//   resetForm = () => {
//     this.setState({
//       name: '',
//       number: '',
//     });
//   };
//   render() {
//     const nameInputId = shortid.generate();
//     const numberInputId = shortid.generate();
//     const { state, handleSubmit } = this;
//     return (
//       <Formik
//         validationSchema={schema}
//         initialValues={state}
//         onSubmit={handleSubmit}
//       >
//         <ContactsForm autoComplete="off">
//           <ListForContactsForm>
//             <ItemsForContactsForm>
//               <LabelForContactsForm htmlFor={nameInputId}>
//                 Name
//               </LabelForContactsForm>

//               <InputForContactsForm
//                 id={nameInputId}
//                 type="text"
//                 name="name"
//                 required
//               />
//               <ErrorForContactsForm name="name" component="div" />
//             </ItemsForContactsForm>
//             <ItemsForContactsForm>
//               <LabelForContactsForm htmlFor={numberInputId}>
//                 Number
//               </LabelForContactsForm>
//               <InputForContactsForm
//                 id={numberInputId}
//                 type="tel"
//                 name="number"
//                 required
//               />
//               <ErrorForContactsForm name="number" component="div" />
//             </ItemsForContactsForm>
//           </ListForContactsForm>
//           <ButtonForContactsForm type="submit">
//             Add contact
//           </ButtonForContactsForm>
//           <ToastContainer
//             transition={Flip}
//             theme="dark"
//             position="bottom-right"
//             autoClose={1000}
//             hideProgressBar={false}
//             newestOnTop={false}
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable={false}
//             pauseOnHover
//           />
//         </ContactsForm>
//       </Formik>
//     );
//   }
// }
