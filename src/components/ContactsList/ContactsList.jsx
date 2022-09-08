import { useSelector } from 'react-redux';
import { useMemo } from 'react';
import { ContactItem } from 'components/ContactItem/ContactItem';
import { List } from './ContactsList.styled';
import { getFilter } from 'redux/contactsSlice';
import { useGetContactsQuery } from 'redux/services';

export const ContactsList = () => {
  const filter = useSelector(getFilter);
  const { data: contacts } = useGetContactsQuery();

  const filtredContact = useMemo(() => {
    return (
      contacts?.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      ) ?? []
    );
  }, [filter, contacts]);

  return (
    <List>
      {filtredContact.map(contact => (
        <ContactItem key={contact.id} contact={contact} />
      ))}
    </List>
  );
};
