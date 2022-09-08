import { GlobalStyle } from './GlobalStyle';
import { ToastContainer } from 'react-toastify';
import { Container } from 'components/Container/Container';
import { Section } from './Section/Section';
import ContactForm from 'components/ContactForm/ContactForm';
import { ContactsList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import { useGetContactsQuery } from 'redux/services';
import Loader from 'components/Loader/Loader';

export default function App() {
  const { data: contacts, isFetching } = useGetContactsQuery();
  return (
    <>
      <GlobalStyle />
      {isFetching && <Loader />}

      {!isFetching && (
        <>
          <h1>Phonebook</h1>
          <Section>
            <Container>
              <ContactForm />
            </Container>
          </Section>
          <Section title="Contacts">
            <Container>
              <Filter />
              {contacts && <ContactsList />}
            </Container>
          </Section>
        </>
      )}
      <ToastContainer position="top-center" autoClose={1500} />
    </>
  );
}
