import defaultData from './defaultData';
const baseUrl = 'https://www.breakingbadapi.com';

const character = (id) => {
  return defaultData.find((item) => {
    return item.char_id === id;
  });
};

export const fetchAllCharaters = async () => {
  try {
    //default data to prevent unnecessary fetch
    if (window.location.hostname === 'localhost') {
      return defaultData;
    }
    const response = await fetch(`${baseUrl}/api/characters`);
    return await response.json();
  } catch (error) {
    console.log('error: ', error);
  }
};

export const fetchCharacter = async (id) => {
  try {
    //default data to prevent unnecessary fetch
    if (window.location.hostname === 'localhost') {
      return [character(id * 1)];
    }
    const response = await fetch(`${baseUrl}/api/characters/${id}`);
    return await response.json();
  } catch (error) {
    console.log('error: ', error);
  }
};

export const fetchQuoteByAuthor = async (author) => {
  try {
    //default data to prevent unnecessary fetch
    if (window.location.hostname === 'localhost') {
      return [
        {
          quote_id: 1,
          quote: 'I am not in danger, Skyler. I am the danger!',
          author: 'Walter White',
          series: 'Breaking Bad',
        },
        {
          quote_id: 1,
          quote: 'I am not in danger, Skyler. I am the danger!',
          author: 'Walter White',
          series: 'Breaking Bad',
        },
      ];
    }
    const response = await fetch(
      `${baseUrl}/api/quote?author=${author.trim().split(' ').join('+')}`
    );
    return await response.json();
  } catch (error) {
    console.log('error: ', error);
  }
};
