import { useState, useMemo } from 'react';
import { nanoid } from 'nanoid';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Form, Label, Input, Button } from './ContactForm.styled';
import { useGetContactsQuery, useAddContactMutation } from 'redux/services';

export default function ContactForm() {
  const nameInputId = useMemo(() => nanoid(), []);
  const phoneInputId = useMemo(() => nanoid(), []);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const { data: contacts } = useGetContactsQuery();
  const [addContact, { isLoading }] = useAddContactMutation();

  const handleInputChange = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'phone':
        setPhone(value);
        break;

      default:
        return;
    }
  };

  const formReset = () => {
    setName('');
    setPhone('');
  };

  const handleSubmit = event => {
    event.preventDefault();

    const newContact = {
      name: name,
      phone: phone,
    };

    contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())
      ? toast.error(`${name} is already in contacts`)
      : addContact(newContact);

    toast.success('Contact is added');
    formReset();
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor={nameInputId}>
          Name
          <Input
            value={name}
            onChange={handleInputChange}
            id={nameInputId}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>
        <Label htmlFor={phoneInputId}>
          Number
          <Input
            value={phone}
            onChange={handleInputChange}
            id={phoneInputId}
            type="tel"
            name="phone"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>
        <Button type="submit" disabled={isLoading}>
          Add contact
        </Button>
      </Form>
    </>
  );
}
