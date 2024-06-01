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

const AutocompleteInput = ({ placeholder, value, onChange }) => {
  // State to manage suggestions, loading status, and visibility of suggestions
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Effect to fetch suggestions from the API when the input value changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (value.length > 2) {
        setLoading(true);
        try {
          const response = await axios.get(`/api/autocomplete?q=${value}`);
          setSuggestions(response.data);
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching autocomplete suggestions:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };

    // Debounce fetching suggestions to avoid too many API calls
    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [value]);

  // Handle click on a suggestion to set the input value and hide suggestions
  const handleSuggestionClick = (suggestion) => {
    onChange(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  // Handle blur event to hide suggestions after a short delay
  const handleBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  return (
    <Box position='relative' width='100%'>
      <InputGroup>
        {/* Show a spinner while loading suggestions */}
        <InputLeftElement pointerEvents='none'>
          {loading && <Spinner size='sm' />}
        </InputLeftElement>
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            if (e.target.value.length <= 2) {
              setSuggestions([]);
              setShowSuggestions(false);
            }
          }}
          onBlur={handleBlur}
          rounded='full'
          pl={10}
        />
      </InputGroup>
      {/* Show the suggestions list if there are suggestions and it's visible */}
      {showSuggestions && suggestions.length > 0 && (
        <List
          zIndex='20'
          bg='white'
          border='1px solid #CBD5E0'
          borderRadius='md'
          mt='2'
          width='100%'
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
