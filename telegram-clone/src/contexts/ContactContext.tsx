import React, { createContext, useState, useContext, ReactNode } from "react";

export interface Contact {
  id: string;
  name: string;
  phone: string;
}

interface ContactContextType {
  contacts: Contact[];
  addContact: (name: string, phone: string) => void;
  getContactById: (id: string) => Contact | undefined;
}

const ContactContext = createContext<ContactContextType>({
  contacts: [],
  addContact: () => {},
  getContactById: () => undefined,
});

interface ContactProviderProps {
  children: ReactNode;
}

export function ContactProvider({ children }: ContactProviderProps) {
  const [contacts, setContacts] = useState<Contact[]>([]);

  const addContact = (name: string, phone: string) => {
    const newContact: Contact = {
      id: Date.now().toString(),
      name,
      phone,
    };
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const getContactById = (id: string) => {
    return contacts.find((contact) => contact.id === id);
  };

  return (
    <ContactContext.Provider value={{ contacts, addContact, getContactById }}>
      {children}
    </ContactContext.Provider>
  );
}

export function useContacts() {
  return useContext(ContactContext);
}

