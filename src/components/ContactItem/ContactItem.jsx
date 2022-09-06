import PropTypes from 'prop-types';
import { Item, Name, Number, Button } from './ContactItem.styled';
import { useDeleteContactMutation } from 'redux/services';

export const ContactItem = ({ contact }) => {
  const { id, name, phone } = contact;
  const [deleteContact, { isLoading: isDeleting }] = useDeleteContactMutation();

  return (
    <Item key={id}>
      <Name>{name}:</Name>
      <Number>{phone}</Number>
      <Button onClick={() => deleteContact(id)} disabled={isDeleting}>
        {isDeleting ? 'Deleting...' : 'Delete'}
      </Button>
    </Item>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }),
};
