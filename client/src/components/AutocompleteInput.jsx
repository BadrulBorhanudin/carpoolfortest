import { useState, useEffect } from 'react';
import {
  Input,
  Box,
  List,
  ListItem,
  Spinner,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const AutocompleteInput = ({ placeholder, value, onChange }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (value.length > 2) {
        setLoading(true);
        try {
          const response = await axios.get(`/api/autocomplete?q=${value}`);
          setSuggestions(response.data);
        } catch (error) {
          console.error('Error fetching autocomplete suggestions:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [value]);

  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion);
    setSuggestions([]);
  };

  return (
    <Box position='relative' width='100%'>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <FontAwesomeIcon icon={faSearch} color='#CBD5E0' />
        </InputLeftElement>
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            if (e.target.value.length <= 2) {
              setSuggestions([]);
            }
          }}
          rounded='full'
          bg=''
          pl={10}
        />
      </InputGroup>
      {loading && <Spinner size='sm' />}
      {suggestions.length > 0 && (
        <List
          // position='absolute'
          zIndex='20'
          bg='white'
          border='1px solid #ccc'
          borderRadius='md'
          mt='2'
          width='100%'
          boxShadow='md'
        >
          {suggestions.map((suggestion, index) => (
            <ListItem
              key={index}
              p='2'
              _hover={{ bg: 'gray.100' }}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default AutocompleteInput;
